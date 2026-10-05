'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Film,
  Music,
  Shield,
  Play,
  ArrowDown,
  Sparkles,
  Wifi,
  HardDrive,
  Download,
  CheckCircle2,
  Tv,
  Smartphone,
  Laptop,
  Layers,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';

type TabKey = 'server' | 'media' | 'music';

interface TabConfig {
  id: TabKey;
  label: string;
  badge: string;
  tagline: string;
  title: string;
  highlight: string;
  desc: string;
  image: string;
  hudBadge: string;
  hudStat1: string;
  hudStat2: string;
  hudStat3: string;
  hudColor: string;
  bullets: { title: string; desc: string; icon: string }[];
  accentColor: string;
}

export default function HelixLandingPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<TabKey>('server');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dlModalOpen, setDlModalOpen] = useState(false);
  const [selectedAppForDl, setSelectedAppForDl] = useState('Helix Server');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const tabs: Record<TabKey, TabConfig> = {
    server: {
      id: 'server',
      label: 'Helix Server',
      badge: 'The Core Hub',
      tagline: 'The Core · Personal Media Hub',
      title: 'Your Entire Library.',
      highlight: 'Under Your Control.',
      desc: 'The brain of your home theater. Helix Server indexes your complete video and music collection, streaming it at original pristine quality with zero third-party clouds.',
      image: '/server-mockup.jpg',
      hudBadge: 'HELIX SERVER · ONLINE HUB',
      hudStat1: '3 Devices Streaming',
      hudStat2: 'Direct Original',
      hudStat3: '100% Private',
      hudColor: '#10b981',
      accentColor: 'from-cyan-400 to-sky-500',
      bullets: [
        {
          title: 'Instant Home Network Streaming',
          desc: 'Hits play the moment you tap with zero buffering.',
          icon: '⚡'
        },
        {
          title: '100% Private Local Storage',
          desc: 'No corporate tracking, no recurring fees, no revoked licenses.',
          icon: '🔒'
        },
        {
          title: 'Zero-Config Auto Discovery',
          desc: 'All your Helix player apps automatically find the server in seconds.',
          icon: '📡'
        }
      ]
    },
    media: {
      id: 'media',
      label: 'Helix Media',
      badge: '4K Cinema',
      tagline: 'Cinematic Player · 4K HDR',
      title: 'Theater Magic on',
      highlight: 'Every Screen.',
      desc: 'Designed for true cinema lovers. Enjoy stunning 4K HDR playback, spatial audio immersion, and instant cross-device resume from the living room to your phone.',
      image: '/video-mockup.jpg',
      hudBadge: 'HELIX MEDIA · 4K HDR PLAYING',
      hudStat1: 'Dolby Atmos Spatial',
      hudStat2: '4K Ultra HD (60fps)',
      hudStat3: 'Living Room TV',
      hudColor: '#ff4757',
      accentColor: 'from-rose-500 to-pink-500',
      bullets: [
        {
          title: 'Cinematic 4K HDR & Surround Sound',
          desc: 'Every subtle color grade and spatial effect rendered with crystal clarity.',
          icon: '🎬'
        },
        {
          title: 'Seamless Device Handoff',
          desc: 'Pause on your Smart TV, continue on your tablet right where you left off.',
          icon: '🔄'
        },
        {
          title: 'Offline Travel Downloads',
          desc: 'Save full seasons or movies to your device with a single click.',
          icon: '✈️'
        }
      ]
    },
    music: {
      id: 'music',
      label: 'Helix Music',
      badge: 'Audiophile',
      tagline: 'Audiophile Streamer · Studio Sound',
      title: 'Pure Sound As The',
      highlight: 'Artist Intended.',
      desc: 'A bespoke listening experience engineered for music purists. Studio-grade lossless audio with synchronized lyrics and zero audio compression.',
      image: '/music-mockup.jpg',
      hudBadge: 'HELIX MUSIC · FLAC 96kHz / 24-bit',
      hudStat1: 'Lossless Studio Master',
      hudStat2: 'Synced Lyrics Active',
      hudStat3: 'Bit-Perfect',
      hudColor: '#38bdf8',
      accentColor: 'from-sky-500 to-blue-500',
      bullets: [
        {
          title: 'Bit-Perfect Lossless Stream',
          desc: 'Direct FLAC 96kHz / 24-bit audio playback without quality loss.',
          icon: '🎧'
        },
        {
          title: 'Live-Synced Karaoke Lyrics',
          desc: 'Follow along line-by-line with real-time typographic motion.',
          icon: '✨'
        },
        {
          title: 'Gapless Playback & EQ',
          desc: 'Uninterrupted live concerts and tailored sound customization.',
          icon: '🎚️'
        }
      ]
    }
  };

  const currentTab = tabs[activeTab];

  const openDownloadModal = (appName: string) => {
    setSelectedAppForDl(appName);
    setDlModalOpen(true);
  };

  const handleSimulateDownload = (platform: string) => {
    setDownloadSuccess(`Starting download for ${platform}...`);
    setTimeout(() => {
      setDownloadSuccess(null);
      setDlModalOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* ============================================
          NAVBAR
      ============================================ */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#070709]/80 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <img
              src="/logo.jpeg"
              alt="Helix Logo"
              className="w-9 h-9 rounded-xl object-contain shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform"
            />
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-500 to-pink-500 bg-clip-text text-transparent">
              Helix
            </span>
          </a>

          {/* Desktop 3-Part Ecosystem Nav */}
          <div className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <a
              href="#helix-server"
              className="px-4 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              Helix Server
            </a>
            <a
              href="#helix-media"
              className="px-4 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
              Helix Media
            </a>
            <a
              href="#helix-music"
              className="px-4 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-all flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14, 165, 233,0.8)]" />
              Helix Music
            </a>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* High-Contrast Conversion CTA */}
            <a
              href="#download"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-sky-600 via-blue-600 to-rose-600 text-white shadow-[0_0_25px_rgba(14, 165, 233,0.5)] hover:shadow-[0_0_35px_rgba(14, 165, 233,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Download Helix ↓
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-300 hover:bg-white/10"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-b border-white/10 bg-[#070709] px-6 py-6 space-y-4"
          >
            <a
              href="#helix-server"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-zinc-200 hover:text-cyan-400"
            >
              Helix Server (The Core)
            </a>
            <a
              href="#helix-media"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-zinc-200 hover:text-rose-400"
            >
              Helix Media (4K Cinema)
            </a>
            <a
              href="#helix-music"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-semibold text-zinc-200 hover:text-sky-400"
            >
              Helix Music (Audiophile)
            </a>
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-center text-sm font-bold rounded-full bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg"
            >
              Download Helix Now ↓
            </a>
          </motion.div>
        )}
      </nav>

      {/* ============================================
          HERO SECTION — 3-TAB ECOSYSTEM CONTROLLER
      ============================================ */}
      <section id="hero" className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
        
        {/* Ambient Backlight Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-sky-600/20 via-cyan-500/15 to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[350px] bg-blue-600/15 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Punchy Hero Headline */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-300 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              The Complete Entertainment Ecosystem
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-5">
              One Ecosystem.<br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-pink-500 bg-clip-text text-transparent">
                Infinite Entertainment.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
              Your personal media hub for 4K movies, TV series, and studio lossless music — running on your hardware with zero subscriptions.
            </p>
          </div>

          {/* 3-TAB ECOSYSTEM CONTROLLER TABS */}
          <div className="flex items-center justify-center gap-2 max-w-xl mx-auto mb-12 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-2xl">
            {(['server', 'media', 'music'] as TabKey[]).map(tabKey => {
              const tab = tabs[tabKey];
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`flex-1 py-3 px-4 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 relative ${
                    isActive
                      ? tabKey === 'server'
                        ? 'bg-gradient-to-r from-cyan-500/30 to-sky-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                        : tabKey === 'media'
                        ? 'bg-gradient-to-r from-rose-500/30 to-red-500/20 text-rose-300 border border-rose-400/40 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                        : 'bg-gradient-to-r from-sky-500/30 to-blue-500/20 text-sky-300 border border-sky-400/40 shadow-[0_0_20px_rgba(14, 165, 233,0.3)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{tabKey === 'server' ? '🖥️' : tabKey === 'media' ? '🎬' : '🎵'}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* HERO STAGE: VISUAL DYNAMIC CROSSFADE & CONTEXTUAL DETAILS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* LEFT: DYNAMIC VISUAL MOCKUP CROSSFADE FRAME */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl p-3 bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/80">
                  
                  {/* Crossfading Images */}
                  {(['server', 'media', 'music'] as TabKey[]).map(tabKey => {
                    const tab = tabs[tabKey];
                    const isCurrent = activeTab === tabKey;
                    return (
                      <motion.img
                        key={tabKey}
                        src={tab.image}
                        alt={tab.label}
                        initial={false}
                        animate={{
                          opacity: isCurrent ? 1 : 0,
                          scale: isCurrent ? 1 : 1.04
                        }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    );
                  })}

                  {/* Top Live Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/20 text-xs font-bold text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,1)]" />
                    <span>{currentTab.hudBadge}</span>
                  </div>

                  {/* Bottom HUD Bar */}
                  <div className="absolute bottom-3 inset-x-3 z-20 p-3 rounded-xl bg-black/75 backdrop-blur-xl border border-white/15 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-zinc-400">Connection</div>
                        <div className="font-bold text-white">{currentTab.hudStat1}</div>
                      </div>
                      <div className="h-6 w-px bg-white/15" />
                      <div>
                        <div className="text-[10px] uppercase font-semibold text-zinc-400">Playback</div>
                        <div className="font-bold text-white">{currentTab.hudStat2}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-semibold text-zinc-400">Status</div>
                      <div className="font-bold text-emerald-400">{currentTab.hudStat3}</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT: TAB-SPECIFIC PUNCHY COPY & HIGH-CONTRAST CTAS */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/[0.05] border border-white/10 text-zinc-300">
                    {currentTab.tagline}
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    {currentTab.title} <br />
                    <span className={`bg-gradient-to-r ${currentTab.accentColor} bg-clip-text text-transparent`}>
                      {currentTab.highlight}
                    </span>
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    {currentTab.desc}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-3 pt-2">
                    {currentTab.bullets.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          {b.icon}
                        </div>
                        <div>
                          <strong className="block text-sm font-bold text-white">{b.title}</strong>
                          <span className="text-xs text-zinc-400 leading-normal">{b.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => openDownloadModal(currentTab.label)}
                      className="px-7 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-rose-600 text-white shadow-[0_0_25px_rgba(14, 165, 233,0.55)] hover:shadow-[0_0_40px_rgba(14, 165, 233,0.85)] hover:scale-105 active:scale-95 transition-all"
                    >
                      Download {currentTab.label} ↓
                    </button>
                    <a
                      href={`#helix-${activeTab}`}
                      className="px-6 py-3 rounded-full text-sm font-semibold text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
                    >
                      Explore Details →
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================
          ECOSYSTEM ARCHITECTURE STRIP
      ============================================ */}
      <section className="py-12 border-y border-white/10 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-xl text-cyan-400">
                🖥️
              </div>
              <h3 className="text-base font-bold text-white">1. Helix Server (The Core)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Runs silently on your home computer or mini PC. Manages storage, automates organization, and delivers zero-buffering streams.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-xl text-rose-400">
                🎬
              </div>
              <h3 className="text-base font-bold text-white">2. Helix Media (Cinema)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Cinema-grade 4K HDR playback on Smart TVs, PCs, and tablets with seamless cross-device resume.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-xl text-sky-400">
                🎵
              </div>
              <h3 className="text-base font-bold text-white">3. Helix Music (Audiophile)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pure bit-perfect FLAC audio streaming with real-time synced lyrics and offline downloads.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================
          SHOWCASE 1: HELIX SERVER (THE CORE)
      ============================================ */}
      <section id="helix-server" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-12">
          
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              Ecosystem Core
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Helix <span className="bg-gradient-to-r from-cyan-400 to-sky-500 bg-clip-text text-transparent">Server</span>: Your Personal Media Hub
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              No subscriptions, no cloud bottlenecks, no complex setup. Install in one click, point to your hard drive, and stream instantly to every screen in your home.
            </p>
          </div>

          {/* High-Res Server Mockup */}
          <div className="w-full max-w-5xl rounded-3xl p-3 bg-white/[0.03] border border-cyan-500/25 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            <img
              src="/server-mockup.jpg"
              alt="Helix Server Dashboard UI"
              className="w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl text-left">
            {[
              { icon: '📁', title: 'Universal Organization', desc: 'Detects movie artwork, TV episode guides, and lossless metadata automatically.' },
              { icon: '⚡', title: 'Instant Streaming', desc: 'Hits play the second you tap with zero buffering on your local Wi-Fi.' },
              { icon: '🔒', title: '100% Private & Local', desc: 'Your watch history never leaves your hardware. Zero tracking, zero telemetry.' },
              { icon: '👥', title: 'Family Profiles & PIN', desc: 'Separate watchlists for everyone with parental controls.' }
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.025] border border-white/10 hover:border-cyan-500/30 transition-all">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h4 className="text-sm font-bold text-white mb-1.5">{f.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => openDownloadModal('Helix Server')}
            className="px-8 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-rose-600 text-white shadow-[0_0_25px_rgba(14, 165, 233,0.5)] hover:scale-105 transition-transform"
          >
            Download Helix Server for Your PC ↓
          </button>

        </div>
      </section>

      {/* ============================================
          SHOWCASE 2: HELIX MEDIA (CINEMA EXPERIENCE)
      ============================================ */}
      <section id="helix-media" className="py-24 relative overflow-hidden bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-12">
          
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 border border-rose-500/30 text-rose-300">
              Cinematic Player
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Helix <span className="bg-gradient-to-r from-rose-500 to-red-500 bg-clip-text text-transparent">Media</span>: Cinema in Any Room
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              A luxury television and mobile player interface that puts your movie and show collection front and center.
            </p>
          </div>

          {/* High-Res Video Mockup */}
          <div className="w-full max-w-5xl rounded-3xl p-3 bg-white/[0.03] border border-rose-500/25 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            <img
              src="/video-mockup.jpg"
              alt="Helix Media 4K HDR Player UI"
              className="w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>

          <button
            onClick={() => openDownloadModal('Helix Media')}
            className="px-8 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-rose-600 text-white shadow-[0_0_25px_rgba(14, 165, 233,0.5)] hover:scale-105 transition-transform"
          >
            Download Helix Media Client ↓
          </button>

        </div>
      </section>

      {/* ============================================
          SHOWCASE 3: HELIX MUSIC (AUDIOPHILE SOUND)
      ============================================ */}
      <section id="helix-music" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            
            {/* High-Res Music Mockup */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl p-3 bg-white/[0.03] border border-sky-500/25 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                <img
                  src="/music-mockup.jpg"
                  alt="Helix Music Audiophile App UI"
                  className="w-full rounded-2xl object-cover shadow-2xl"
                />
              </div>
            </div>

            {/* Music Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/10 border border-sky-500/30 text-sky-300">
                Studio Sound Experience
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Helix <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Music</span>: Studio Sound in Your Pocket
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Stream your private collection of lossless FLAC files directly to your phone or desktop. Features live synced lyrics, custom sound EQ, and gapless album playback.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { icon: '🎵', title: 'Bit-Perfect Lossless Fidelity', desc: 'Direct audio stream to your headphones without artificial compression.' },
                  { icon: '✨', title: 'Real-Time Synced Lyrics', desc: 'Frosted glass karaoke lyrics scroll smoothly with every verse.' },
                  { icon: '📶', title: 'Offline Vault', desc: 'Take your favorite playlists on planes or road trips without data.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <strong className="block text-sm font-bold text-white">{item.title}</strong>
                      <span className="text-xs text-zinc-400 leading-normal">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => openDownloadModal('Helix Music')}
                  className="px-8 py-3.5 rounded-full text-sm font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-rose-600 text-white shadow-[0_0_25px_rgba(14, 165, 233,0.5)] hover:scale-105 transition-transform"
                >
                  Download Helix Music App ↓
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================
          CONVERSION SECTION & DOWNLOAD MATRIX
      ============================================ */}
      <section id="download" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070709] via-[#0c0b14] to-[#070709]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-sky-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/15 border border-sky-500/35 text-sky-300 mb-6">
            ⚡ Instant Setup · Zero Subscriptions
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
            Own Your Entertainment.<br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-pink-500 bg-clip-text text-transparent">
              Get Started in Seconds.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-16">
            Download the server to power your hub, and grab the player apps for every screen in your life.
          </p>

          {/* 3-Part Download Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
            
            {/* CARD 1: SERVER */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-cyan-500/30 backdrop-blur-2xl flex flex-col justify-between gap-6 hover:scale-102 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-2xl text-cyan-400">
                  🖥️
                </div>
                <h3 className="text-xl font-bold text-white">Helix Server</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  The central engine for your home library. Silently scans, indexes, and streams your media.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Windows', 'macOS', 'Linux', 'Docker'].map(p => (
                    <span key={p} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/[0.05] border border-white/10 text-zinc-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => openDownloadModal('Helix Server')}
                className="w-full py-3 rounded-full text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-600/30 hover:scale-105 transition-transform"
              >
                Download Server (v2.4) ↓
              </button>
            </div>

            {/* CARD 2: MEDIA */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-rose-500/30 backdrop-blur-2xl flex flex-col justify-between gap-6 hover:scale-102 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-2xl text-rose-400">
                  🎬
                </div>
                <h3 className="text-xl font-bold text-white">Helix Media</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  The cinema client for movies, 4K HDR series, and home videos with instant device resume.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Apple TV', 'Android TV', 'Windows', 'iOS / iPad'].map(p => (
                    <span key={p} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/[0.05] border border-white/10 text-zinc-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => openDownloadModal('Helix Media')}
                className="w-full py-3 rounded-full text-xs font-bold tracking-wide uppercase bg-white/[0.08] hover:bg-white/[0.14] text-white border border-rose-500/40 transition-all"
              >
                Download Media Client ↓
              </button>
            </div>

            {/* CARD 3: MUSIC */}
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-sky-500/30 backdrop-blur-2xl flex flex-col justify-between gap-6 hover:scale-102 transition-transform shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-2xl text-sky-400">
                  🎵
                </div>
                <h3 className="text-xl font-bold text-white">Helix Music</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  The audiophile player for pristine lossless music, synced lyrics, and offline playlists.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['iOS / iPhone', 'Android', 'macOS', 'Windows'].map(p => (
                    <span key={p} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/[0.05] border border-white/10 text-zinc-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => openDownloadModal('Helix Music')}
                className="w-full py-3 rounded-full text-xs font-bold tracking-wide uppercase bg-white/[0.08] hover:bg-white/[0.14] text-white border border-sky-500/40 transition-all"
              >
                Download Music App ↓
              </button>
            </div>

          </div>

          {/* Trust Strip */}
          <div className="inline-flex flex-wrap items-center justify-center gap-6 px-8 py-3.5 rounded-full bg-white/[0.02] border border-white/10 text-xs text-zinc-400">
            <span>🔒 100% Private</span>
            <span>⚡ Zero Subscriptions</span>
            <span>🎬 Pure 4K HDR</span>
            <span>🎧 Lossless Audio</span>
            <span>🌐 Runs Offline</span>
          </div>

        </div>
      </section>

      {/* ============================================
          DOWNLOAD MODAL
      ============================================ */}
      {dlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#111118] border border-white/20 rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setDlModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-2">Download {selectedAppForDl}</h3>
            <p className="text-xs text-zinc-400 mb-6">Select your operating system to start download:</p>

            {downloadSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold text-center">
                ✓ {downloadSuccess}
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { name: 'Windows (64-bit Installer)', hint: 'Direct .exe' },
                  { name: 'macOS (Apple Silicon & Intel)', hint: 'Direct .dmg' },
                  { name: 'Linux (.AppImage / .deb)', hint: 'Universal' },
                  { name: 'Docker / Mobile Store', hint: 'Direct Hub' }
                ].map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSimulateDownload(p.name)}
                    className="w-full p-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between text-xs font-semibold text-zinc-200 hover:text-white transition-all text-left"
                  >
                    <span>{p.name}</span>
                    <span className="text-cyan-400">{p.hint} →</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================
          FOOTER
      ============================================ */}
      <footer className="border-t border-white/10 py-12 bg-[#050507] text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Helix" className="w-6 h-6 rounded-md" />
            <span className="font-bold text-white text-sm">Helix Ecosystem</span>
          </div>
          <div>© 2026 Helix. 100% Private, Self-Hosted Entertainment.</div>
          <div className="flex gap-4">
            <a href="#helix-server" className="hover:text-white">Server</a>
            <a href="#helix-media" className="hover:text-white">Media</a>
            <a href="#helix-music" className="hover:text-white">Music</a>
            <a href="#download" className="hover:text-white">Download</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
