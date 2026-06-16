import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';

const platforms = [
  {
    name: 'FPV Drone',
    badge: 'FPV Specialist',
    img: '/photos/DRONE1_1.1.1.jpg',
    description:
      'High-speed platform for dynamic chase shots and fly-throughs. Perfect for automotive, action, and architectural work.',
    portfolioAnchor: '/portfolio',
  },
  {
    name: 'Indoor Drone',
    badge: 'Indoor / Follow',
    img: '/photos/DRONE4_1.1.6.jpg',
    description:
      'Ultra-stable, lightweight drone for safe indoor flight and slow tracking. Ideal for interiors, hospitality, and BTS.',
    portfolioAnchor: '/portfolio',
  },
  {
    name: 'Camera Work',
    badge: 'Ground Camera',
    img: '/photos/CONTROLLER2_1.1.3.jpg',
    description:
      'Canon DSLR system for portraits, products, and event coverage — complementing every aerial shoot.',
    portfolioAnchor: '/portfolio',
  },
];

export default function TeamPage() {
  return (
    <>
      <Header />

      {/* Hero banner */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-28 md:py-36 overflow-hidden"
        style={{ background: '#0d1410' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(90,148,112,0.14) 0%, transparent 60%)',
          }}
        />

        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold mb-5 relative">
          Meet the Team
        </p>
        <h1
          className="font-display font-bold text-ink relative"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', lineHeight: 1, letterSpacing: '-0.02em' }}
        >
          Our Platforms
        </h1>
        <p className="mt-5 max-w-md text-sm text-muted leading-relaxed relative">
          Each aircraft is operated by a trained pilot with the right gear for your shoot.
        </p>
      </section>

      {/* Cards */}
      <section
        className="px-6 py-16 md:py-20 md:px-12 lg:px-24"
        style={{ background: '#141d17' }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {platforms.map((p) => (
            <Link
              key={p.name}
              href={p.portfolioAnchor}
              className="group flex flex-col rounded-2xl overflow-hidden no-underline transition-all duration-300"
              style={{
                background:  '#1b2620',
                border:      '1px solid rgba(100,155,110,0.11)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,164,95,0.38)';
                (e.currentTarget as HTMLElement).style.boxShadow  = '0 20px 48px rgba(0,0,0,0.45)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(100,155,110,0.11)';
                (e.currentTarget as HTMLElement).style.boxShadow  = 'none';
              }}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span
                  className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded"
                  style={{
                    background: 'rgba(201,164,95,0.15)',
                    color:      '#c9a45f',
                    border:     '1px solid rgba(201,164,95,0.25)',
                  }}
                >
                  {p.badge}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <h2 className="font-display text-lg font-semibold text-ink tracking-tight mb-2">
                  {p.name}
                </h2>
                <p className="text-xs text-muted leading-relaxed flex-1">{p.description}</p>
                <span
                  className="mt-5 text-xs font-mono uppercase tracking-widest transition-colors duration-200"
                  style={{ color: '#5a9470' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#c9a45f')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#5a9470')}
                >
                  View Portfolio →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 py-16 text-center"
        style={{ background: '#0d1410', borderTop: '1px solid rgba(100,155,110,0.1)' }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold mb-4">
          Ready to shoot?
        </p>
        <h2 className="font-display font-bold text-ink text-2xl md:text-3xl mb-6">
          Let&apos;s get in the air.
        </h2>
        <a href="/#contact" className="btn-gold no-underline">
          Book a Shoot →
        </a>
      </section>
    </>
  );
}
