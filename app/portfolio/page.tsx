'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function PortfolioPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const open  = (cls: string) => () => document.body.classList.add(cls);
    const close = (cls: string) => () => document.body.classList.remove(cls);

    const pairs: [string, string][] = [
      ['.fpv',      'fpv-on'],
      ['.cinematic','cinematic-on'],
      ['.neo1',     'neo1-on'],
      ['.camera',   'camera-on'],
    ];

    const cleanup: (() => void)[] = [];

    pairs.forEach(([sel, cls]) => {
      const btn      = document.querySelector(sel);
      const closeBtn = document.querySelector(`.${cls.replace('-on', '-close')}`);
      const openFn   = open(cls);
      const closeFn  = close(cls);
      btn?.addEventListener('click', openFn);
      closeBtn?.addEventListener('click', closeFn);
      cleanup.push(
        () => btn?.removeEventListener('click', openFn),
        () => closeBtn?.removeEventListener('click', closeFn),
      );
    });

    return () => {
      cleanup.forEach((fn) => fn());
      document.body.className = '';
    };
  }, []);

  const VIDEO_CLASSES =
    'mt-5 w-full h-auto block rounded-lg shadow-xl cursor-pointer';

  return (
    <>
      {/* Loader */}
      <div className={`hk-loader ${loaded ? 'loaded' : ''}`}>
        <div className="hk-spinner" />
      </div>

      <Header />

      <style jsx global>{`
        /* ── Body states ─────────────────────────────── */
        body {
          background: #0d1410;
          overflow: hidden;
          height: 100vh;
        }
        body.fpv-on,
        body.cinematic-on,
        body.neo1-on,
        body.camera-on {
          background: #101a14;
        }

        /* ── Hero shrink when a panel is open ────────── */
        .pf-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: scale(1) rotateX(0) translateZ(0);
          transform-origin: center center;
          transition: transform 0.65s cubic-bezier(0.4,0,0.2,1),
                      opacity  0.45s ease;
          overflow: hidden;
        }
        body.fpv-on      .pf-hero,
        body.cinematic-on .pf-hero,
        body.neo1-on     .pf-hero,
        body.camera-on   .pf-hero {
          transform: scale(0.92) rotateX(8deg) translateZ(-100px);
          opacity: 0;
          pointer-events: none;
        }

        /* ── Slide-up panels ─────────────────────────── */
        .pf-panel {
          position: fixed;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: transparent;
          backdrop-filter: blur(0px);
          transition: top 0.55s cubic-bezier(0.4,0,0.2,1),
                      opacity 0.4s ease,
                      backdrop-filter 0.5s ease;
          z-index: 10;
          opacity: 0;
        }
        body.fpv-on       .fpv-panel,
        body.cinematic-on .cinematic-panel,
        body.neo1-on      .neo1-panel,
        body.camera-on    .camera-panel {
          top: 0;
          opacity: 1;
          backdrop-filter: blur(6px);
        }

        /* ── Scrollable panel content ────────────────── */
        .pf-scroll {
          position: absolute;
          inset: 0;
          padding: 100px 24px 40px;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
        }
        .pf-scroll::-webkit-scrollbar { display: none; }

        /* ── Close buttons ───────────────────────────── */
        .fpv-close,
        .cinematic-close,
        .neo1-close,
        .camera-close {
          position: fixed;
          top: 88px;
          right: 20px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(201,164,95,0.3);
          background: rgba(13,20,16,0.7);
          cursor: pointer;
          z-index: 11;
          opacity: 0;
          visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .fpv-close::before, .fpv-close::after,
        .cinematic-close::before, .cinematic-close::after,
        .neo1-close::before, .neo1-close::after,
        .camera-close::before, .camera-close::after {
          content: '';
          position: absolute;
          width: 14px;
          height: 1px;
          background: #c9a45f;
        }
        .fpv-close::before, .cinematic-close::before,
        .neo1-close::before, .camera-close::before { transform: rotate(45deg); }
        .fpv-close::after,  .cinematic-close::after,
        .neo1-close::after,  .camera-close::after  { transform: rotate(-45deg); }
        .fpv-close:hover, .cinematic-close:hover,
        .neo1-close:hover, .camera-close:hover {
          background: rgba(201,164,95,0.15);
          border-color: rgba(201,164,95,0.6);
        }

        body.fpv-on      .fpv-close,
        body.cinematic-on .cinematic-close,
        body.neo1-on     .neo1-close,
        body.camera-on   .camera-close {
          opacity: 1;
          visibility: visible;
        }

        /* ── Panel typography ────────────────────────── */
        .pf-panel h3 {
          font-size: clamp(2.5rem, 8vw, 6rem);
          font-weight: 700;
          color: #f0ead6;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .pf-panel p { color: #6d8871; font-size: 0.9rem; line-height: 1.7; }
        .pf-panel p span { color: #f0ead6; font-weight: 600; font-size: 1rem; }
        .pf-panel video, .pf-panel img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 0.75rem;
          margin-top: 1.25rem;
          box-shadow: 0 20px 48px rgba(0,0,0,0.5);
        }

        /* ── Mobile ──────────────────────────────────── */
        @media (max-width: 768px) {
          .pf-scroll { padding-top: 80px; }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────── */}
      <div className="pf-hero">
        {/* Subtle gradient bg */}
        <div className="absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(90,148,112,0.12) 0%, transparent 65%)' }} />

        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold mb-6">
          Portfolio
        </p>
        <h1 className="font-display font-bold text-center text-ink"
          style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
          HK<br />
          <span style={{ color: '#c9a45f' }}>IMAGING</span>
        </h1>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted mb-2">
          Select a category
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-3 px-6">
          {[
            { cls: 'fpv',      label: 'FPV' },
            { cls: 'cinematic',label: 'Cinematic' },
            { cls: 'neo1',     label: 'Indoor' },
            { cls: 'camera',   label: 'Camera Work' },
          ].map(({ cls, label }) => (
            <span
              key={cls}
              className={`${cls} cursor-pointer font-display font-semibold text-lg md:text-2xl text-ink/25 hover:text-gold transition-colors duration-200 select-none`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── FPV Panel ────────────────────────────────── */}
      <div className="fpv-panel pf-panel">
        <div className="fpv-close" />
        <div className="pf-scroll">
          <div className="max-w-4xl mx-auto text-center">
            <h3>FPV</h3>
            <p className="mt-4"><span>DJI O4 Air Unit Pro</span></p>
            <p className="mt-2">Camera: O4 FPV (1/1.3″ CMOS) · Use: Automotive · Action · Architecture</p>
            <p className="mt-8 text-muted/60 text-sm italic">Footage coming soon.</p>
          </div>
        </div>
      </div>

      {/* ── Cinematic Panel ──────────────────────────── */}
      <div className="cinematic-panel pf-panel">
        <div className="cinematic-close" />
        <div className="pf-scroll">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h3>Cinematic</h3>
              <p className="mt-3"><span>DJI Mavic 2 Pro · DJI Mini 2 Pro</span></p>
              <p className="mt-1">Hasselblad L1D-20c &amp; 1/1.3″ CMOS · Real Estate · Tourism · Marine</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                '/videos/mountain_walk.MP4',
                '/videos/walk.MP4',
                '/videos/water.MP4',
                '/videos/yacht.mp4',
                '/videos/yacht_rainbow.MP4',
              ].map((src) => (
                <video
                  key={src}
                  autoPlay muted loop playsInline preload="metadata" controls
                  className={VIDEO_CLASSES}
                  onClick={(e) => e.currentTarget.requestFullscreen?.()}
                >
                  <source src={src} type="video/mp4" />
                </video>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Indoor Panel ─────────────────────────────── */}
      <div className="neo1-panel pf-panel">
        <div className="neo1-close" />
        <div className="pf-scroll">
          <div className="max-w-4xl mx-auto text-center">
            <h3>Indoor</h3>
            <p className="mt-4"><span>DJI NEO</span></p>
            <p className="mt-2">NEO wide-angle CMOS · Interiors · Hospitality · Close Proximity</p>
            <p className="mt-8 text-muted/60 text-sm italic">Footage coming soon.</p>
          </div>
        </div>
      </div>

      {/* ── Camera Work Panel ────────────────────────── */}
      <div className="camera-panel pf-panel">
        <div className="camera-close" />
        <div className="pf-scroll">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h3>Camera Work</h3>
              <p className="mt-3"><span>Canon 750D</span></p>
              <p className="mt-1">EF-S 18-55mm IS · RF 75-300mm F4-5.6 · Macro</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                ['/photos/DRONE1_1.1.1.jpg', 'Drone setup'],
                ['/photos/DRONE2_1.1.2.jpg', 'Drone close-up'],
                ['/photos/CONTROLLER2_1.1.3.jpg', 'Controller'],
                ['/photos/DRON3_1.1.4.jpg', 'Drone 3'],
                ['/photos/MAX2_1.1.5.jpg', 'Max 2'],
                ['/photos/DRONE4_1.1.6.jpg', 'Drone 4'],
                ['/photos/DRONE5_1.1.7.jpg', 'Drone 5'],
              ].map(([src, alt]) => (
                <img key={src} src={src} alt={alt} className="w-full h-auto object-cover rounded-lg shadow-xl mt-0" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
