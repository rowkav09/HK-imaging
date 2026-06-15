'use client';

import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/home/Hero';
import { Footer } from '../components/ui/footer-section';

/* ── Connection quality detection ───────────────────────────────────────────
   Uses the Network Information API (Chrome/Android).
   Falls back to 'fast' on browsers that don't support it (Safari, Firefox).
───────────────────────────────────────────────────────────────────────────── */
type Quality = 'fast' | 'moderate' | 'slow';

function useConnectionQuality(): Quality {
  const [quality, setQuality] = useState<Quality>('fast');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conn = (navigator as any).connection ?? (navigator as any).mozConnection ?? (navigator as any).webkitConnection;
    if (!conn) return; // API unavailable — assume fast

    const check = () => {
      const type: string = conn.effectiveType ?? '';
      const dl: number  = conn.downlink ?? 10;
      if (type === 'slow-2g' || type === '2g' || dl < 1)  setQuality('slow');
      else if (type === '3g' || dl < 4)                    setQuality('moderate');
      else                                                  setQuality('fast');
    };

    check();
    conn.addEventListener('change', check);
    return () => conn.removeEventListener('change', check);
  }, []);

  return quality;
}

/* ── VideoInView ─────────────────────────────────────────────────────────────
   • Fast/moderate: plays automatically when ≥10% in viewport, pauses when not.
   • Slow: shows a "tap to load" overlay instead of auto-downloading the video.
   preload="none" = zero bytes fetched until play() is called.
───────────────────────────────────────────────────────────────────────────── */
function VideoInView({
  src,
  className,
  quality,
}: {
  src: string;
  className?: string;
  quality: Quality;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [unlocked, setUnlocked] = useState(quality !== 'slow');

  // When user taps overlay on slow connection, also start playback
  useEffect(() => {
    if (!unlocked) return;
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [unlocked]);

  return (
    <>
      <video ref={ref} className={className} muted loop playsInline preload="none">
        <source src={src} type="video/mp4" />
      </video>

      {/* Slow-connection overlay — tap to dismiss and load the video */}
      {!unlocked && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 cursor-pointer"
          style={{ background: 'rgba(13,20,16,0.88)' }}
          onClick={() => setUnlocked(true)}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ border: '1px solid rgba(201,164,95,0.4)' }}
          >
            <span style={{ color: '#c9a45f', fontSize: '1.1rem', paddingLeft: '3px' }}>▶</span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: '#6d8871' }}>
            Tap to load
          </span>
        </div>
      )}
    </>
  );
}

/* ── Data ────────────────────────────────────────────────────────────────────*/
const projects = [
  { title: 'Highland Trail',    tag: 'Landscape', location: 'UK', video: '/videos/mountain_walk.MP4' },
  { title: 'Forest Path',       tag: 'Lifestyle', location: 'UK', video: '/videos/walk.MP4'          },
  { title: 'Still Waters',      tag: 'Waterscape',location: 'UK', video: '/videos/water.MP4'         },
  { title: 'Yacht Glide',       tag: 'Marine',    location: 'UK', video: '/videos/yacht.mp4'         },
  { title: 'Yacht Rainbow Run', tag: 'Marine',    location: 'UK', video: '/videos/yacht_rainbow.MP4' },
];

const fleet = [
  {
    badge: 'Cinematic',
    name:  'DJI Mini 2 Pro',
    sub:   'Compact aerial platform',
    desc:  'Lightweight, portable cinematography',
    tags:  'Real Estate · Automotive · Events',
    price: '£130',
    specs: ['1/1.3″ CMOS Camera Module', '4K/60fps HDR video', 'Sub-249g, no CAA restrictions'],
  },
  {
    badge: 'Cinematic',
    name:  'DJI Mavic 2 Pro',
    sub:   'Professional aerial platform',
    desc:  'Premium establishing shots & orbits',
    tags:  'Real Estate · Tourism · Marine',
    price: '£180',
    specs: ['Hasselblad L1D-20c (1″ CMOS)', '10-bit D-Log M colour', '3-axis mechanical gimbal'],
  },
  {
    badge: 'FPV Specialist',
    name:  'DJI O4 Air Unit Pro',
    sub:   'High-speed FPV platform',
    desc:  'Dynamic chase shots & fly-throughs',
    tags:  'Automotive · Action · Architecture',
    price: '£175',
    specs: ['O4 FPV Camera (1/1.3″ CMOS)', '4K/120fps slow motion', 'Acrobatic & proximity capable'],
  },
  {
    badge: 'Indoor / Slow Follow',
    name:  'DJI NEO',
    sub:   'Indoor & follow specialist',
    desc:  'Safe indoor flight & slow tracking',
    tags:  'Interiors · Hospitality · BTS',
    price: '£80',
    specs: ['NEO wide-angle CMOS', '135g ultra-lightweight', 'Prop guards, indoor-safe'],
  },
  {
    badge: 'Ground Camera',
    name:  'Canon 750D',
    sub:   'DSLR camera system',
    desc:  'Professional photo & video',
    tags:  'Portraits · Products · Events',
    price: '£75',
    specs: ['Canon EF-S 18-55mm IS', 'Canon RF 75-300mm F4-5.6', 'Macro lens capability'],
  },
];

const packages = [
  { title: 'Real Estate',            price: '£450',  sub: 'Property aerials',    lines: ['Exterior aerials', 'Property context', 'Basic or Premium edit'] },
  { title: 'Automotive — Cinematic', price: '£650',  sub: 'Rolling & hero shots', lines: ['Rolling shots', 'Hero passes', 'Basic or Premium edit'] },
  { title: 'Automotive — FPV',       price: '£1,000', sub: 'Chase sequences',      lines: ['Close-proximity FPV chase', 'Dynamic passes', 'Basic or Premium edit'] },
  { title: 'Tourism & Hospitality',  price: '£600',  sub: 'Destination coverage', lines: ['Exterior flyovers', 'Location context', 'Basic or Premium edit'] },
  { title: 'Construction',           price: '£450',  sub: 'Site documentation',   lines: ['Site overview', 'Progress documentation', 'Basic or Premium edit'] },
  { title: 'Events (non-live)',       price: '£550',  sub: 'Venue coverage',       lines: ['Planned venue coverage', 'Basic or Premium edit'] },
  { title: 'Marine',                 price: '£700',  sub: 'Yacht & marina',       lines: ['Yacht / marina flyarounds', 'Basic or Premium edit'] },
];

const stats = [
  { value: '5',    label: 'Drone Platforms' },
  { value: '4K',   label: '10-bit Colour' },
  { value: 'UK',   label: 'Wide Coverage' },
  { value: '48hr', label: 'Edit Turnaround' },
];

/* ── Page ────────────────────────────────────────────────────────────────────*/
export default function Home() {
  const quality = useConnectionQuality();

  // Reveal-on-scroll for .reveal elements
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <Hero />

      <main>
        {/* ── 01 — Services / Manifesto ──────────────────────────────── */}
        <section className="bg-bg px-6 py-20 md:py-28 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="reveal mb-10 md:mb-14">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                01 — What We Do
              </span>
              <h2 className="mt-4 font-display text-3xl leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
                We turn aerial perspective<br className="hidden md:block" /> into story.
              </h2>
            </div>

            <div className="reveal">
              <p className="max-w-3xl text-lg leading-relaxed text-muted md:text-xl mb-10">
                HK Imaging creates cinematic drone footage that makes every project feel
                intentional and premium — from luxury property listings to FPV
                automotive sequences and coastal marine coverage.
              </p>
            </div>

            {/* Services grid */}
            <div className="reveal grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6 pt-8 border-t border-white/[0.07]">
              {[
                ['Real Estate',       'Exteriors, interiors, neighbourhood context, luxury listings.'],
                ['Automotive',        'FPV chase sequences, rolling shots, hero passes.'],
                ['Tourism',           'Resorts, venues, and destination highlights.'],
                ['Construction',      'Progress tracking, site context, project timelines.'],
                ['Events',            'Cinematic event films and highlight edits.'],
                ['Marine',            'Yachts, marinas, and coastal visuals.'],
              ].map(([title, desc]) => (
                <div key={title} className="space-y-1.5">
                  <span className="text-sm font-semibold text-ink">{title}</span>
                  <p className="text-xs text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 02 — Portfolio ─────────────────────────────────────────── */}
        <section id="portfolio" className="bg-surface px-6 py-20 md:py-28 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="reveal mb-10 md:mb-14">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
                  02 — Portfolio
                </span>
                {/* Connection quality badge */}
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider"
                  style={{ color: quality === 'fast' ? '#5a9470' : quality === 'moderate' ? '#c9a45f' : '#b87a5a' }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{ background: quality === 'fast' ? '#5a9470' : quality === 'moderate' ? '#c9a45f' : '#b87a5a' }} />
                  {quality === 'fast' ? 'HD Ready' : quality === 'moderate' ? 'Good Connection' : 'Limited — tap cards to load'}
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-ink md:text-5xl lg:text-6xl">
                Featured Work
              </h2>
              <p className="mt-4 max-w-xl text-sm text-muted leading-relaxed">
                From serene landscapes to marine sequences — each project showcases
                our mastery of aerial cinematography.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {projects.map((project, idx) => (
                <div
                  key={project.title}
                  className={`reveal vid-card group relative overflow-hidden rounded-xl ${
                    idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                  style={{ aspectRatio: '4/3' }}
                >
                  {/* Video */}
                  <VideoInView
                    src={project.video}
                    quality={quality}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Meta */}
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <span
                      className="inline-block mb-2 rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
                      style={{ background: 'rgba(200,165,106,0.18)', color: '#c8a56a', border: '1px solid rgba(200,165,106,0.25)' }}
                    >
                      {project.tag}
                    </span>
                    <h3 className="text-base font-semibold text-white tracking-tight">{project.title}</h3>
                    <p className="text-xs text-white/50 mt-0.5">{project.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats strip ────────────────────────────────────────────── */}
        <section className="bg-bg border-y border-white/[0.07] px-6 py-10 md:py-12">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label} className="reveal space-y-1">
                <p className="font-display text-3xl md:text-4xl font-bold text-gold">{value}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Marquee ────────────────────────────────────────────────── */}
        <section className="bg-surface overflow-hidden py-5 border-b border-white/[0.07]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, var(--color-surface), transparent)' }} />
            <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, var(--color-surface), transparent)' }} />
            <div className="flex w-max animate-marquee items-center gap-12">
              {['Real Estate','Automotive','Tourism','Construction','Events','Marine',
                'Real Estate','Automotive','Tourism','Construction','Events','Marine',
                'Real Estate','Automotive','Tourism','Construction','Events','Marine'].map((label, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted whitespace-nowrap"
                >
                  {label}
                  <span className="mx-6" style={{ color: '#c8a56a' }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── 03 — Fleet / Equipment ─────────────────────────────────── */}
        <section id="drone-services" className="bg-bg px-6 py-20 md:py-28 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="reveal mb-10 md:mb-14">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                03 — Fleet
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl tracking-tight text-ink">
                Our Equipment
              </h2>
              <p className="mt-4 text-sm text-muted leading-relaxed max-w-xl">
                Transparent hourly pricing. Every platform carries professional-grade sensors.
              </p>
            </div>

            <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
              {fleet.map((item) => (
                <div key={item.name} className="equip-card flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gold mb-3">
                    {item.badge}
                  </span>
                  <h3 className="text-base font-semibold text-ink tracking-tight">{item.name}</h3>
                  <p className="text-xs text-muted mt-0.5 mb-4">{item.sub}</p>
                  <p className="text-sm text-muted mb-1">{item.desc}</p>
                  <p className="text-[11px] text-faint mb-5">{item.tags}</p>
                  <div className="mt-auto pt-4 border-t border-white/[0.07] mb-4">
                    <span className="text-2xl font-bold text-gold">{item.price}</span>
                    <span className="text-sm text-muted ml-1">/hr</span>
                  </div>
                  <ul className="space-y-2">
                    {item.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-xs text-muted">
                        <span className="text-gold mt-0.5 shrink-0">·</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04 — Packages ──────────────────────────────────────────── */}
        <section className="bg-surface px-6 py-20 md:py-28 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="reveal mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
                  04 — Packages
                </span>
                <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-tight text-ink">
                  Project Pricing
                </h2>
              </div>
              {/* Scroll arrows */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => document.getElementById('pkg-carousel')?.scrollBy({ left: -280, behavior: 'smooth' })}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#f0ece5' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#c8a56a')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  aria-label="Scroll left"
                >
                  ←
                </button>
                <button
                  onClick={() => document.getElementById('pkg-carousel')?.scrollBy({ left: 280, behavior: 'smooth' })}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#f0ece5' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#c8a56a')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  aria-label="Scroll right"
                >
                  →
                </button>
              </div>
            </div>

            {/* Carousel */}
            <div
              id="pkg-carousel"
              className="no-scrollbar flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory reveal"
            >
              {packages.map((pkg) => (
                <div
                  key={pkg.title}
                  className="equip-card min-w-[240px] snap-center flex-shrink-0 flex flex-col"
                >
                  <h4 className="text-sm font-semibold text-ink tracking-tight mb-0.5">{pkg.title}</h4>
                  <p className="text-xs text-muted mb-4">{pkg.sub}</p>
                  <div className="pt-3 pb-4 border-t border-white/[0.07] mb-3">
                    <span className="text-xl font-bold text-gold">{pkg.price}</span>
                    <span className="text-xs text-muted ml-1">starting</span>
                  </div>
                  <ul className="space-y-1.5 mt-auto">
                    {pkg.lines.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-xs text-muted">
                        <span className="text-gold mt-0.5 shrink-0">·</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Edit options + add-ons */}
            <div className="reveal mt-5 grid gap-4 md:grid-cols-2">
              <div className="equip-card">
                <h4 className="text-sm font-semibold text-ink mb-3">Edit Options</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-ink">Basic Edit <span className="text-muted font-normal">— included</span></p>
                    <p className="text-xs text-muted mt-0.5">Clean cut, music, colour correction</p>
                  </div>
                  <div>
                    <p className="font-medium text-ink">Premium Edit <span className="text-gold font-semibold">+£200</span></p>
                    <p className="text-xs text-muted mt-0.5">Cinematic pacing, advanced colour grade, sound design, social master</p>
                  </div>
                </div>
              </div>
              <div className="equip-card">
                <h4 className="text-sm font-semibold text-ink mb-3">Global Add-ons</h4>
                <ul className="space-y-1.5 text-xs text-muted">
                  {[
                    ['Interior drone footage',        '+£120'],
                    ['FPV sequences (non-automotive)', '+£250'],
                    ['Sunrise / sunset shoot',         '+£150'],
                    ['Multiple locations',             '+£100 per location'],
                    ['Raw footage delivery',           '+£100'],
                  ].map(([label, price]) => (
                    <li key={label} className="flex justify-between gap-4">
                      <span>{label}</span>
                      <span className="text-gold font-semibold shrink-0">{price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="reveal mt-4 equip-card">
              <h4 className="text-sm font-semibold text-ink">Multi-drone setups</h4>
              <p className="text-xs text-muted mt-1">Quoted per job — get in touch to discuss requirements.</p>
            </div>
          </div>
        </section>

        {/* ── 05 — Contact ───────────────────────────────────────────── */}
        <section id="contact" className="bg-bg px-6 py-20 md:py-32 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="reveal">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                05 — Start a Project
              </span>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
                Let's work<br />
                <span style={{ color: '#c8a56a' }}>together.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base text-muted leading-relaxed">
                Tell us about your shoot — location, type, timeline. We'll come back within
                24 hours with a tailored quote.
              </p>
            </div>

            <div className="reveal mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Primary CTA — update this email */}
              <a
                href="mailto:rowkav0809@gmail.com"
                className="btn-gold no-underline text-sm"
              >
                Send an Enquiry →
              </a>
              {/* Secondary: direct email visible */}
              <span className="text-muted text-sm font-mono">
                rowkav0809@gmail.com
              </span>
            </div>

            {/* What to expect grid */}
            <div className="reveal mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/[0.07]">
              {[
                ['24 hr response',  'We reply to every enquiry within one business day.'],
                ['Tailored quote',  'Pricing based on your location, shoot type, and deliverables.'],
                ['Fast turnaround', 'Standard edits ready within 48 hours of the shoot.'],
              ].map(([title, desc]) => (
                <div key={title} className="space-y-2">
                  <p className="text-sm font-semibold text-gold">{title}</p>
                  <p className="text-xs text-muted leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* ── Mobile sticky CTA ──────────────────────────────────────────── */}
      <a
        href="#contact"
        className="btn-gold fixed bottom-5 left-1/2 -translate-x-1/2 z-30 shadow-lg md:hidden no-underline text-xs px-6 py-3"
        style={{ boxShadow: '0 8px 32px rgba(200,165,106,0.35)' }}
      >
        Book a Shoot →
      </a>
    </>
  );
}
