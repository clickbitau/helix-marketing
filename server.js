const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || '8080', 10);
const PUBLIC_DIR = __dirname;

// The downloads page and its platform JSONs live in the helix-downloads R2
// bucket; this server proxies them (DockBit's cd-helix-downloads used to).
const R2_BASE = (process.env.HELIX_DOWNLOADS_R2 || 'https://pub-780a08894a6741e49581879e17f7784e.r2.dev').replace(/\/+$/, '');
const SITE = 'https://helix.clickbit.com.au';
const PLATFORM_JSON = /^\/(desktop|android)\/platforms\/[A-Za-z0-9._-]+\.json$/;
const OLD_PLATFORM_JSON = /^\/platforms\/(mac|windows|linux|linux-deb)\.json$/;

// The R2 object for a request path, or null when the path isn't proxied.
function r2Key(pathname, oldDownloadsHost) {
  if (PLATFORM_JSON.test(pathname)) return pathname;
  if (oldDownloadsHost && OLD_PLATFORM_JSON.test(pathname)) return '/desktop' + pathname;
  if (!oldDownloadsHost && pathname.startsWith('/downloads/')) {
    return pathname.endsWith('/') ? pathname + 'index.html' : pathname;
  }
  return null;
}

function proxyR2(req, res, key) {
  const upstream = (R2_BASE.startsWith('http:') ? http : https).get(R2_BASE + key, (up) => {
    const headers = { 'Cache-Control': key.endsWith('.json') ? 'no-store' : 'no-cache' };
    for (const h of ['content-type', 'content-length', 'etag', 'last-modified']) {
      if (up.headers[h]) headers[h] = up.headers[h];
    }
    res.writeHead(up.statusCode === 200 ? 200 : up.statusCode === 404 ? 404 : 502, headers);
    if (req.method === 'HEAD') {
      up.resume();
      res.end();
    } else {
      up.pipe(res);
    }
  });
  upstream.setTimeout(15000, () => upstream.destroy(new Error('timeout')));
  upstream.on('error', () => {
    if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Bad Gateway');
  });
}

function redirect(res, location) {
  res.writeHead(301, { Location: location });
  res.end();
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(parsedUrl.pathname);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
    return;
  }

  const host = String(req.headers.host || '').toLowerCase().replace(/:\d+$/, '');
  const oldDownloadsHost = host === 'helix-downloads.clickbit.com.au';
  const key = r2Key(parsedUrl.pathname, oldDownloadsHost);
  if (key) {
    proxyR2(req, res, key);
    return;
  }
  if (oldDownloadsHost) {
    redirect(res, SITE + '/downloads' + parsedUrl.pathname + parsedUrl.search);
    return;
  }
  if (host === 'helix-landing.clickbit.com.au') {
    redirect(res, SITE + parsedUrl.pathname + parsedUrl.search);
    return;
  }
  if (pathname === '/downloads') {
    redirect(res, '/downloads/' + parsedUrl.search);
    return;
  }

  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const safeSuffix = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safeSuffix);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1><p>The requested file does not exist.</p>');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

const os = require('os');

function getNetworkAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        addresses.push({ name, address: net.address });
      }
    }
  }
  return addresses;
}

function startServer(port) {
  server.listen(port, '0.0.0.0', () => {
    console.log(`\n==================================================`);
    console.log(`Helix Static Server is running!`);
    console.log(`--------------------------------------------------`);
    console.log(`  > Local:   http://localhost:${port}/`);
    const nets = getNetworkAddresses();
    if (nets.length > 0) {
      nets.forEach((net) => {
        console.log(`  > Network (${net.name}): http://${net.address}:${port}/`);
      });
    } else {
      console.log(`  > Network: http://0.0.0.0:${port}/`);
    }
    console.log(`==================================================\n`);
  });

  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);
