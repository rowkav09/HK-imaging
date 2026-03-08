'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Header component: sticky nav and full-screen overlay menu
export default function Header() {
  const [showNav, setShowNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isPortfolioOrTeam = pathname === '/portfolio' || pathname === '/team';
  const isHomePage = pathname === '/';

  // Show nav on scroll, or always on portfolio or team page
  useEffect(() => {
    if (isPortfolioOrTeam) {
      setShowNav(true);
      return;
    }
    const handleScroll = () => {
      setShowNav(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPortfolioOrTeam]);

  return (
    <>
      {/* Full-screen Menu Overlay: slides in when menuOpen */}
      <div
        className={`fixed inset-0 z-[100] flex transition-all duration-700 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="w-full h-full flex">
          {[
            { name: 'Home', href: '/', color: 'bg-[#0f1a14]' },
            { name: 'Services', href: '/#drone-services', color: 'bg-[#172a1f]' },
            { name: 'Portfolio', href: '/portfolio', color: 'bg-[#1f3628]' },
            { name: 'Meet the Team', href: '/team', color: 'bg-[#172a1f]' },
            { name: 'Contact', href: '/#contact', color: 'bg-[#274533]' },
          ].map((item, idx) => (
            <div
              key={item.name}
              className={`flex-1 ${item.color} flex items-center justify-center transition-all duration-500 ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
              }`}
              style={{
                transitionDelay: menuOpen ? `${idx * 100}ms` : '0ms',
              }}
            >
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl md:text-3xl font-light hover:text-[#7a9aa8] transition-colors no-underline"
                style={{ textDecoration: 'none' }}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

        {/* Menu Close Button - Always accessible */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-[96px] right-5 z-[102] w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
          aria-label="Close menu"
        >
          <div className="relative w-6 h-6">
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-white transform -rotate-45 -translate-y-1/2"></span>
            <span className="absolute top-1/2 left-0 w-full h-0.5 bg-white transform rotate-45 -translate-y-1/2"></span>
          </div>
        </button>
      </div>

      {/* Sticky Navigation Header: appears after scroll or on portfolio page */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 ${(isPortfolioOrTeam) ? 'bg-transparent border-none' : 'bg-[#23422a] border-b border-green-900/30'} transition-all duration-300 ease-out ${
          showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}
        aria-hidden={!showNav}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand: HK imaging logo and text */}
          <Link href="/" className="flex items-center gap-3 no-underline" style={{ textDecoration: 'none' }}>
            <img
              src="/HK imaging logo png.png"
              alt="HK imaging logo"
              className="h-10 w-auto object-contain"
              style={{ boxShadow: 'none', background: 'none', borderRadius: 0, padding: 0 }}
            />
          </Link>

          <div className="flex items-center gap-4">
            {/* Hamburger menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative w-8 h-6 flex flex-col justify-between cursor-pointer group z-[101]"
            >
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </button>
            {/* Inquire button (desktop only) */}
            <a
              href="/#contact"
              className="group hidden md:flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-[#7a9aa8] no-underline"
              style={{ textDecoration: 'none' }}
            >
              Inquire
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
