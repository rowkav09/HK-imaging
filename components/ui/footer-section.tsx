"use client";

const LINKS = [
  {
    label: "Services",
    links: [
      { title: "Real Estate",   href: "/#drone-services" },
      { title: "Automotive",    href: "/#drone-services" },
      { title: "Tourism",       href: "/#drone-services" },
      { title: "Construction",  href: "/#drone-services" },
      { title: "Events",        href: "/#drone-services" },
      { title: "Marine",        href: "/#drone-services" },
    ],
  },
  {
    label: "Navigate",
    links: [
      { title: "Home",          href: "/" },
      { title: "Portfolio",     href: "/portfolio" },
      { title: "Meet the Team", href: "/team" },
      { title: "Packages",      href: "/#packages" },
      { title: "Contact",       href: "/#contact" },
    ],
  },
  {
    label: "Social",
    links: [
      { title: "Instagram",  href: "https://www.instagram.com/hk_imaging/" },
      { title: "YouTube",    href: "#" },
      { title: "LinkedIn",   href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background:  "#09100c",
        borderTop:   "1px solid rgba(100,155,110,0.1)",
      }}
      className="w-full px-6 py-14 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="font-display font-bold text-2xl tracking-tight text-ink">
              HK<span style={{ color: "#c8a56a" }}>.</span>
            </span>
            <p className="mt-3 text-xs text-muted leading-relaxed">
              Professional aerial cinematography across the UK. Real estate,
              automotive, tourism, events, and marine.
            </p>
            <a
              href="mailto:rowkav0809@gmail.com"
              className="mt-4 inline-block text-xs font-mono text-gold no-underline hover:underline"
            >
              hello@hkimaging.co.uk
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-3 gap-8 sm:gap-14">
            {LINKS.map((section) => (
              <div key={section.label}>
                <h3
                  className="mb-4 font-mono text-[9px] uppercase tracking-[0.35em]"
                  style={{ color: "#c8a56a" }}
                >
                  {section.label}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="text-xs text-muted no-underline transition-colors duration-200"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#f0ece5")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "")
                        }
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Gold hairline */}
        <div
          className="w-full h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(200,165,106,0.3) 50%, transparent 100%)",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted font-mono">
          <span>© {new Date().getFullYear()} HK Imaging. All rights reserved.</span>
          <span>Aerial Cinematography · UK</span>
        </div>
      </div>
    </footer>
  );
}
