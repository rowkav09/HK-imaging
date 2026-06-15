'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { name: 'Home',          href: '/' },
  { name: 'Services',      href: '/#drone-services' },
  { name: 'Portfolio',     href: '/portfolio' },
  { name: 'Meet the Team', href: '/team' },
  { name: 'Contact',       href: '/#contact' },
];

export default function Header() {
  const [showNav, setShowNav]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isSubPage = pathname === '/portfolio' || pathname === '/team' || pathname === '/drones';

  useEffect(() => {
    if (isSubPage) { setShowNav(true); return; }
    const onScroll = () => setShowNav(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isSubPage]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Full-screen overlay menu ─────────────────── */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ background: '#0d1410' }}
      >
        {/* Gold hairline at top */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #c8a56a 50%, transparent 100%)' }}
        />

        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/30 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Links */}
        <nav className="flex flex-col items-center gap-1 w-full px-8">
          {NAV_LINKS.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="group relative py-3 text-center font-display font-bold transition-colors duration-200 no-underline select-none"
              style={{
                fontSize: 'clamp(2rem, 6vw, 4.5rem)',
                color: 'rgba(240, 236, 229, 0.18)',
                opacity:   menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.45s ease ${idx * 70}ms, transform 0.45s ease ${idx * 70}ms, color 0.2s ease`,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c8a56a')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240, 236, 229, 0.18)')}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Inquire CTA inside menu (mobile) */}
        <a
          href="/#contact"
          onClick={() => setMenuOpen(false)}
          className="btn-gold mt-10 no-underline"
        >
          Book a Shoot
        </a>
      </div>

      {/* ── Sticky navbar ────────────────────────────── */}
      <nav
        aria-hidden={!showNav}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{
          background:     'rgba(13, 20, 16, 0.92)',
          backdropFilter: 'blur(14px)',
          borderBottom:   '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Text logo */}
          <Link href="/" className="no-underline">
            <span className="font-display font-bold text-xl tracking-tight text-ink">
              HK<span style={{ color: '#c8a56a' }}>.</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Inquire — desktop */}
            <a
              href="/#contact"
              className="btn-gold hidden md:inline-flex no-underline text-[11px]"
            >
              Book a Shoot
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] cursor-pointer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span
                className="block w-6 h-px bg-white/80 transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }}
              />
              <span
                className="block w-6 h-px bg-white/80 transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }}
              />
              <span
                className="block w-6 h-px bg-white/80 transition-all duration-300 origin-center"
                style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
