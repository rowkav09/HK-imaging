import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

export default function Hero() {
  return (
    <header className="relative flex h-screen w-full items-end justify-start overflow-hidden bg-black">
      {/* ── Video background ─────────────────────────── */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover scale-[1.04]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/cloudy.JPG"
        >
          <source src="/videos/hero_compressed.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay — heavy at bottom for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)',
          }}
        />
      </div>

      {/* ── Content ──────────────────────────────────── */}
      <div className="relative z-10 w-full px-6 pb-14 md:px-12 lg:px-20 md:pb-20">
        <div className="max-w-4xl">
          {/* Kicker */}
          <p
            className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em]"
            style={{ color: '#c8a56a' }}
          >
            Aerial Cinematography · UK
          </p>

          {/* Headline */}
          <h1
            className={`${spaceGrotesk.className} font-bold leading-[0.9] tracking-tight text-white`}
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}
          >
            <span className="block">HK</span>
            <span className="block" style={{ color: '#c8a56a' }}>
              IMAGING
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="mt-6 max-w-lg text-sm md:text-base font-medium leading-relaxed"
            style={{ color: 'rgba(240, 236, 229, 0.75)' }}
          >
            Cinematic drone coverage for real estate, automotive, tourism,
            construction, events, and marine.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#portfolio" className="btn-gold no-underline">
              See Our Work
            </a>
            <a href="#contact" className="btn-ghost no-underline">
              Book a Shoot →
            </a>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <div className="absolute bottom-7 right-8 hidden md:flex flex-col items-center gap-2">
        <span
          className="font-mono text-[9px] uppercase tracking-[0.3em] rotate-90 origin-center"
          style={{ color: 'rgba(200, 165, 106, 0.6)' }}
        >
          Scroll
        </span>
        <div className="w-px h-10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="w-full"
            style={{
              height: '40%',
              background: '#c8a56a',
              animation: 'scrollDot 2s ease-in-out infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes scrollDot {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(250%); }
          }
        `}</style>
      </div>
    </header>
  );
}
