'use client';

import { useEffect } from "react";

import Header from './components/Header';
import Hero from './components/home/Hero';
import { Footer } from '../components/ui/footer-section';

export default function Home() {

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleParallax = () => {
      const parallaxBgs = document.querySelectorAll<HTMLElement>(".parallax-bg");
      parallaxBgs.forEach((el) => {
        const parentCase = el.closest(".portfolio-case") as HTMLElement;
        if (!parentCase) return;
        const rate = parseFloat(parentCase.getAttribute("data-parallax-rate") || "0.3");
        const rect = el.getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) * rate;
        el.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener("scroll", handleParallax, { passive: true });
    handleParallax();
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  // Three.js Animation for Footer
  useEffect(() => {
    const loadThreeJS = async () => {
      const THREE = await import('three');
      const { FontLoader } = await import('three/examples/jsm/loaders/FontLoader.js');
      const { TextGeometry } = await import('three/examples/jsm/geometries/TextGeometry.js');

      const canvas = document.querySelector('.webgl-footer') as HTMLCanvasElement;
      if (!canvas) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.offsetWidth / canvas.offsetHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
      });
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

      // Font
      const fontLoader = new FontLoader();
      fontLoader.load(
        'https://raw.githubusercontent.com/danielyl123/person/refs/heads/main/fonts/helvetiker_regular.typeface.json',
        (font) => {
          const textGeometry = new TextGeometry("LET'S FLY", {
            font,
            size: 1,
            depth: 0,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 4,
          });
          textGeometry.computeBoundingBox();
          textGeometry.center();

          const textMaterial = new THREE.MeshBasicMaterial();
          textMaterial.wireframe = false;
          const text = new THREE.Mesh(textGeometry, textMaterial);
          scene.add(text);
        }
      );

      const torusGeometry = new THREE.TorusGeometry(0.7, 0.4, 100, 60);
      const torusMaterial = new THREE.MeshPhysicalMaterial();
      torusMaterial.metalness = 0;
      torusMaterial.roughness = 0;
      torusMaterial.iridescence = 1;
      torusMaterial.iridescenceIOR = 1.5;
      torusMaterial.iridescenceThicknessRange = [100, 324];
      torusMaterial.transmission = 1;
      torusMaterial.ior = 1.2;
      torusMaterial.thickness = 0.8;
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      torus.position.z = 1;
      scene.add(torus);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 10);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 10);
      pointLight.position.set(-1, 2, 0);
      scene.add(pointLight);

      const pointLight2 = new THREE.PointLight(0xffffff, 10);
      pointLight2.position.set(-1, -2, 0);
      scene.add(pointLight2);

      const pointLight3 = new THREE.PointLight(0xffffff, 10);
      pointLight3.position.set(1, -2, 0);
      scene.add(pointLight3);

      const pointLight4 = new THREE.PointLight(0xffffff, 10);
      pointLight4.position.set(1, 2, 0);
      scene.add(pointLight4);

      const clock = new THREE.Clock();
      const tick = () => {
        const elapsedTime = clock.getElapsedTime();
        renderer.render(scene, camera);
        torus.rotation.x = elapsedTime * 0.5;
        torus.rotation.y = elapsedTime * 0.1;
        requestAnimationFrame(tick);
      };
      tick();

      const handleResize = () => {
        if (!canvas) return;
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
      };
    };

    loadThreeJS();
  }, []);
  const projects = [
              {
                title: "Highland Trail",
                tag: "Landscape",
                location: "UK",
                video: "/videos/mountain_walk.mp4",
              },
              {
                title: "Forest Path",
                tag: "Lifestyle",
                location: "UK",
                video: "/videos/walk.MP4",
              },
              {
                title: "Still Waters",
                tag: "Waterscape",
                location: "UK",
                video: "/videos/water.MP4",
              },
              {
                title: "Yacht Glide",
                tag: "Marine",
                location: "UK",
                video: "/videos/yacht.mp4",
              },
              {
                title: "Yacht Rainbow Run",
                tag: "Marine",
                location: "UK",
                video: "/videos/yacht_rainbow.MP4",
              },
            ];

            const services = [
              {
                title: "Aerial Cinematography",
                copy: "Heavy-lift platforms carrying Arri and Red systems with stabilized, jib-like motion up to 400ft.",
                bullets: ["Dual operator crews", "25kg payload class"],
                tone: "light",
              },
              {
                title: "Interior FPV Flight",
                copy: "One-shot fly-throughs that stitch exterior context to interior atmosphere with cine-whoops and gyro-stabilized optics.",
                bullets: ["Sub-500g cine-whoops", "4K 10-bit capture"],
                tone: "muted",
              },
              {
                title: "Photogrammetry & 3D",
                copy: "Digital twins with orthomosaics and point clouds for architectural visualization and planning.",
                bullets: ["1cm/px accuracy", "Thermal mapping"],
                tone: "dark",
              },
            ];

            const gallery = [
              "/videos/mountain_walk.mp4",
              "/videos/walk.MP4",
              "/videos/water.MP4",
              "/videos/yacht.mp4",
            ];

  return (
    <>
      <Header />
      <Hero />
      <div className="relative min-h-screen bg-bg text-primary">
        <main className="wrapper relative z-10 bg-bg">
                  <section className="px-6 py-20 md:py-24 md:px-12 lg:px-24 bg-primary">
                    <div className="max-w-7xl mx-auto">
                      <div className="mb-10 md:mb-12">
                        <span className="font-mono text-xs uppercase tracking-[0.35em] text-accent">01 — Manifesto</span>
                        <h2 className="mt-4 font-display text-3xl leading-[1.1] tracking-tight text-text md:text-5xl lg:text-6xl">Our Vision</h2>
                      </div>
                      <div className="space-y-8">
                        <p className="font-display text-xl leading-[1.3] text-text/90 md:text-2xl lg:text-3xl max-w-4xl">
                          We create aerial stories across real estate, automotive, tourism, construction, events, and marine.
                          <span className="italic text-accent"> Cinematic drone coverage </span>
                          that makes every project feel intentional and premium.
                        </p>
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-8 pt-6 border-t border-border/20">
                          <div className="space-y-1">
                            <span className="text-sm font-medium text-text">Real Estate</span>
                            <p className="text-xs text-text/60">Interiors, exteriors, neighbourhood context, and luxury listings.</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-sm font-medium text-text">Automotive</span>
                            <p className="text-xs text-text/60">FPV chase sequences, rolling shots, and hero passes.</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-sm font-medium text-text">Tourism & Hospitality</span>
                            <p className="text-xs text-text/60">Resorts, interiors, venues, and destination highlights.</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-sm font-medium text-text">Construction</span>
                            <p className="text-xs text-text/60">Progress tracking, site context, and project timelines.</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-sm font-medium text-text">Events</span>
                            <p className="text-xs text-text/60">Cinematic event films and highlight edits.</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-sm font-medium text-text">Marine</span>
                            <p className="text-xs text-text/60">Yachts, marinas, and coastal visuals.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Featured Work - moved up */}
                  <section id="portfolio" className="relative px-6 py-20 md:py-24 md:px-12 lg:px-24 overflow-hidden bg-surface w-full">
                    <div className="relative mx-auto max-w-7xl">
                      <div className="mb-10 md:mb-12">
                        <span className="font-mono text-xs uppercase tracking-[0.35em] text-neutral-500">02 — Portfolio</span>
                        <h2 className="mt-4 font-display text-3xl tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">Featured Work</h2>
                        <p className="mt-4 max-w-2xl text-sm text-neutral-700 leading-relaxed">From serene landscapes to towering structures, each project showcases our mastery of aerial cinematography.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {projects.map((project, idx) => (
                          <div 
                            key={project.title} 
                            className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
                          >
                            <div className="absolute inset-0 bg-surface">
                              <video
                                className="h-full w-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                              >
                                <source src={project.video} type="video/mp4" />
                              </video>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/30 to-transparent" />
                            
                            <div className="absolute inset-0 p-5 flex flex-col justify-end">
                              <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-primary text-neutral-100 uppercase tracking-wide w-fit mb-2">{project.tag}</span>
                              <h3 className="text-lg font-medium text-neutral-900 tracking-tight">{project.title}</h3>
                              <p className="text-xs text-neutral-700 mt-1">{project.location}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="py-10 bg-primary overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary to-transparent z-10"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary to-transparent z-10"></div>
                    
                    <div className="flex w-max animate-marquee items-center">
                      <div className="flex gap-20 px-10 text-text/60 font-medium tracking-widest text-sm uppercase">
                        <span>Real Estate</span>
                        <span>Automotive</span>
                        <span>Tourism</span>
                        <span>Construction</span>
                        <span>Events</span>
                        <span>Marine</span>
                        <span>Real Estate</span>
                        <span>Automotive</span>
                        <span>Tourism</span>
                        <span>Construction</span>
                      </div>
                      <div className="flex gap-20 px-10 text-white/60 font-medium tracking-widest text-sm uppercase">
                        <span>Events</span>
                        <span>Marine</span>
                        <span>Real Estate</span>
                        <span>Automotive</span>
                        <span>Tourism</span>
                        <span>Construction</span>
                        <span>Events</span>
                        <span>Marine</span>
                        <span>Real Estate</span>
                        <span>Automotive</span>
                      </div>
                    </div>
                  </section>

                  <section id="drone-services" className="relative px-6 py-20 md:py-24 md:px-12 lg:px-24 bg-[#e8eef3]">
                    <div className="mb-10 md:mb-14 max-w-7xl mx-auto">
                      <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#5a6d78]">03 — Fleet</span>
                      <h2 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl tracking-tight text-[#3d5a66]">Our Equipment</h2>
                      <p className="mt-4 text-sm text-[#5a6d78] leading-relaxed max-w-2xl">Clear hourly pricing for the right platform.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
                      {/* Mini Drone - Cinematic */}
                      <div className="rounded-2xl border border-neutral-200 bg-card p-6 hover:border-[#5a6d78] hover:shadow-lg transition-all duration-300">
                        <div className="mb-1">
                          <span className="text-[10px] font-medium text-[#5a6d78] uppercase tracking-wider">Cinematic</span>
                        </div>
                        <div className="mb-5">
                          <h3 className="text-lg font-medium tracking-tight text-primary">DJI Mini 2 Pro</h3>
                          <p className="text-xs text-secondary mt-1">Compact aerial platform</p>
                        </div>

                        <div className="mb-5">
                          <p className="text-sm text-secondary mb-2">Lightweight, portable cinematography</p>
                          <p className="text-xs text-neutral-400">Real Estate • Automotive • Events</p>
                        </div>

                        <div className="mb-5 pb-5 border-b border-neutral-100">
                          <span className="text-2xl font-semibold tracking-tight text-[#5a6d78]">£130</span>
                          <span className="text-sm text-secondary">/hr</span>
                        </div>

                        <ul className="space-y-2 text-sm text-secondary">
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>1/1.3″ CMOS Camera Module</li>
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>4K/60fps HDR video</li>
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>Sub-249g, no CAA restrictions</li>
                        </ul>
                      </div>

                      {/* Mavic Drone - Cinematic */}
                      <div className="rounded-2xl border border-neutral-200 bg-card p-6 hover:border-[#5a6d78] hover:shadow-lg transition-all duration-300">
                        <div className="mb-1">
                          <span className="text-[10px] font-medium text-[#5a6d78] uppercase tracking-wider">Cinematic</span>
                        </div>
                        <div className="mb-5">
                          <h3 className="text-lg font-medium tracking-tight text-primary">DJI Mavic 2 Pro</h3>
                          <p className="text-xs text-secondary mt-1">Professional aerial platform</p>
                        </div>

                        <div className="mb-5">
                          <p className="text-sm text-secondary mb-2">Premium establishing shots & orbits</p>
                          <p className="text-xs text-neutral-400">Real Estate • Tourism • Marine</p>
                        </div>

                        <div className="mb-5 pb-5 border-b border-neutral-100">
                          <span className="text-2xl font-semibold tracking-tight text-[#5a6d78]">£180</span>
                          <span className="text-sm text-secondary">/hr</span>
                        </div>

                        <ul className="space-y-2 text-sm text-secondary">
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>Hasselblad L1D-20c (1″ CMOS)</li>
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>10-bit D-Log M color</li>
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>3-axis mechanical gimbal</li>
                        </ul>
                      </div>

                      {/* FPV Drone */}
                      <div className="rounded-2xl border border-neutral-200 bg-card p-6 hover:border-[#5a6d78] hover:shadow-lg transition-all duration-300">
                        <div className="mb-1">
                          <span className="text-[10px] font-medium text-[#3d5a66] uppercase tracking-wider">FPV Specialist</span>
                        </div>
                        <div className="mb-5">
                          <h3 className="text-lg font-medium tracking-tight text-primary">DJI O4 Air Unit Pro</h3>
                          <p className="text-xs text-secondary mt-1">High-speed FPV platform</p>
                        </div>

                        <div className="mb-5">
                          <p className="text-sm text-secondary mb-2">Dynamic chase shots & fly-throughs</p>
                          <p className="text-xs text-neutral-400">Automotive • Action • Architecture</p>
                        </div>

                        <div className="mb-5 pb-5 border-b border-neutral-100">
                          <span className="text-2xl font-semibold tracking-tight text-[#5a6d78]">£150</span>
                          <span className="text-sm text-secondary">/hr</span>
                        </div>

                        <ul className="space-y-2 text-sm text-secondary">
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>O4 FPV Camera (1/1.3″ CMOS)</li>
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>4K/120fps slow motion</li>
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>Acrobatic & proximity capable</li>
                        </ul>
                      </div>

                      {/* NEO Drone - Indoor */}
                      <div className="rounded-2xl border border-neutral-200 bg-card p-6 hover:border-[#5a6d78] hover:shadow-lg transition-all duration-300">
                        <div className="mb-1">
                          <span className="text-[10px] font-medium text-[#7a9aa8] uppercase tracking-wider">Indoor / Slow Follow</span>
                        </div>
                        <div className="mb-5">
                          <h3 className="text-lg font-medium tracking-tight text-primary">DJI NEO</h3>
                          <p className="text-xs text-secondary mt-1">Indoor & follow specialist</p>
                        </div>

                        <div className="mb-5">
                          <p className="text-sm text-secondary mb-2">Safe indoor flight & slow tracking</p>
                          <p className="text-xs text-neutral-400">Interiors • Hospitality • BTS</p>
                        </div>

                        <div className="mb-5 pb-5 border-b border-neutral-100">
                          <span className="text-2xl font-semibold tracking-tight text-[#5a6d78]">£80</span>
                          <span className="text-sm text-secondary">/hr</span>
                        </div>

                        <ul className="space-y-2 text-sm text-secondary">
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>NEO wide-angle CMOS</li>
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>135g ultra-lightweight</li>
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>Prop guards, indoor-safe</li>
                        </ul>
                      </div>

                      {/* Camera Equipment */}
                      <div className="rounded-2xl border border-neutral-200 bg-card p-6 hover:border-[#5a6d78] hover:shadow-lg transition-all duration-300">
                        <div className="mb-1">
                          <span className="text-[10px] font-medium text-[#8a6d58] uppercase tracking-wider">Ground Camera</span>
                        </div>
                        <div className="mb-5">
                          <h3 className="text-lg font-medium tracking-tight text-primary">Canon 750D</h3>
                          <p className="text-xs text-secondary mt-1">DSLR camera system</p>
                        </div>

                        <div className="mb-5">
                          <p className="text-sm text-secondary mb-2">Professional photo & video</p>
                          <p className="text-xs text-neutral-400">Portraits • Products • Events</p>
                        </div>

                        <div className="mb-5 pb-5 border-b border-neutral-100">
                          <span className="text-2xl font-semibold tracking-tight text-[#5a6d78]">£100</span>
                          <span className="text-sm text-secondary">/hr</span>
                        </div>

                        <ul className="space-y-2 text-sm text-secondary">
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>Canon EF-S 18-55mm IS (0.25m)</li>
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>Canon RF 75-300mm F4-5.6</li>
                          <li className="flex items-start gap-2"><span className="text-[#5a6d78] mt-0.5">•</span>Macro lens capability</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section className="px-6 py-20 md:py-24 md:px-12 lg:px-24 bg-[#f4f2ef]">
                    <div className="max-w-7xl mx-auto">
                      <div className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#5a6d78]">04 — Packages</span>
                          <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-tight text-[#3d5a66]">Project Pricing</h2>
                        </div>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => {
                              const container = document.getElementById('packages-carousel');
                              if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                            }}
                            className="w-11 h-11 rounded-full bg-[#5a6d78] flex items-center justify-center hover:bg-[#4a5c66] transition-colors"
                          >
                            <span className="text-white text-lg">←</span>
                          </button>
                          <button 
                            onClick={() => {
                              const container = document.getElementById('packages-carousel');
                              if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                            }}
                            className="w-11 h-11 rounded-full bg-[#5a6d78] flex items-center justify-center hover:bg-[#4a5c66] transition-colors"
                          >
                            <span className="text-white text-lg">→</span>
                          </button>
                        </div>
                      </div>

                    <div id="packages-carousel" className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar">
                      {[
                        {
                          id: "pkg-real-estate",
                          title: "Real Estate",
                          price: "£450",
                          subtitle: "Property aerials",
                          lines: ["Exterior aerials", "Property context", "Edit: Basic or Premium"],
                        },
                        {
                          id: "pkg-automotive-cinematic",
                          title: "Automotive - Cinematic",
                          price: "£650",
                          subtitle: "Rolling & hero shots",
                          lines: ["Rolling shots", "Hero passes", "Edit: Basic or Premium"],
                        },
                        {
                          id: "pkg-automotive-fpv",
                          title: "Automotive - FPV",
                          price: "£900",
                          subtitle: "Chase sequences",
                          lines: ["Close-proximity FPV chase", "Dynamic passes", "Edit: Basic or Premium"],
                        },
                        {
                          id: "pkg-tourism",
                          title: "Tourism & Hospitality",
                          price: "£600",
                          subtitle: "Destination coverage",
                          lines: ["Exterior flyovers", "Location context", "Edit: Basic or Premium"],
                        },
                        {
                          id: "pkg-construction",
                          title: "Construction",
                          price: "£450",
                          subtitle: "Site documentation",
                          lines: ["Site overview", "Progress documentation", "Edit: Basic or Premium"],
                        },
                        {
                          id: "pkg-construction-addons",
                          title: "Construction Add-ons",
                          price: "Add-on",
                          subtitle: "Extra services",
                          lines: ["Scheduled repeat visits", "Annotated footage", "Raw archive delivery"],
                        },
                        {
                          id: "pkg-events",
                          title: "Events (Non-live)",
                          price: "£550",
                          subtitle: "Venue coverage",
                          lines: ["Planned venue coverage", "Edit: Basic or Premium"],
                        },
                        {
                          id: "pkg-marine",
                          title: "Marine",
                          price: "£700",
                          subtitle: "Yacht & marina",
                          lines: ["Yacht / marina flyarounds", "Edit: Basic or Premium"],
                        },
                      ].map((item) => (
                        <div
                          key={item.title}
                          id={item.id}
                          className="rounded-2xl border border-neutral-200 bg-card p-5 min-w-[260px] snap-center flex-shrink-0 hover:border-[#5a6d78] hover:shadow-md transition-all duration-300"
                        >
                          <div className="mb-3">
                            <h4 className="text-base font-medium tracking-tight text-primary">{item.title}</h4>
                            <p className="text-xs text-neutral-400">{item.subtitle}</p>
                          </div>

                          <div className="mb-3 pb-3 border-b border-neutral-100">
                            <span className="text-lg font-semibold tracking-tight text-[#5a6d78]">{item.price}</span>
                            <span className="text-xs text-secondary ml-1">starting</span>
                          </div>

                          <ul className="space-y-1.5 text-sm text-secondary">
                            {item.lines.map((line) => (
                              <li key={line} className="flex items-start gap-2">
                                <span className="text-[#5a6d78] mt-0.5">•</span>{line}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-neutral-200 bg-card p-4 hover:border-[#5a6d78] hover:shadow-md transition-all duration-300">
                        <h4 className="text-base font-medium text-primary">Edit Options</h4>
                        <div className="mt-3 space-y-2 text-sm">
                          <div>
                            <p className="font-medium text-primary">Basic Edit — included</p>
                            <p className="text-secondary text-xs">Clean cut, music, colour correction</p>
                          </div>
                          <div>
                            <p className="font-medium text-primary">Premium Edit — <span className="text-[#5a6d78]">+£200</span></p>
                            <p className="text-secondary text-xs">Cinematic pacing, advanced colour grade, sound design, social-ready master</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-neutral-200 bg-card p-4 hover:border-[#5a6d78] hover:shadow-md transition-all duration-300">
                        <h4 className="text-base font-medium text-primary">Global Add-ons</h4>
                        <ul className="mt-3 space-y-1 text-sm text-secondary list-disc pl-4">
                          <li>Interior drone footage — <span className="text-[#5a6d78] font-medium">+£120</span></li>
                          <li>FPV sequences (non-automotive) — <span className="text-[#5a6d78] font-medium">+£250</span></li>
                          <li>Sunrise / sunset shoot — <span className="text-[#5a6d78] font-medium">+£150</span></li>
                          <li>Multiple locations — <span className="text-[#5a6d78] font-medium">+£100 per location</span></li>
                          <li>Extended shoot time — <span className="text-[#5a6d78] font-medium">hourly rates</span></li>
                          <li>Raw footage delivery — <span className="text-[#5a6d78] font-medium">+£100</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl border border-neutral-200 bg-card p-4 hover:border-[#5a6d78] hover:shadow-md transition-all duration-300">
                      <h4 className="text-base font-medium text-primary">Multi-drone setups</h4>
                      <p className="mt-1 text-sm text-secondary">Quoted per job.</p>
                    </div>
                    </div>
                  </section>

                  <section className="px-6 py-20 md:py-24 md:px-12 lg:px-24 bg-primary text-text">
                    <div className="max-w-7xl mx-auto">
                      <div className="mb-10 md:mb-14">
                        <span className="font-mono text-xs uppercase tracking-[0.35em] text-accent">05 — Gallery</span>
                        <h2 className="mt-4 font-display text-3xl md:text-5xl lg:text-6xl text-text">Recent Flights</h2>
                        <p className="mt-4 text-sm text-text/70">Client-ready selects from our cinematic drone work.</p>
                      </div>
                      <div className="grid h-[35vh] md:h-[45vh] grid-cols-2 gap-3 md:gap-4 md:grid-cols-4">
                      {gallery.map((videoSrc, idx) => (
                        <div
                          key={videoSrc}
                          className="relative overflow-hidden rounded-xl h-full"
                        >
                          <video
                            className="h-full w-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                          >
                            <source src={videoSrc} type="video/mp4" />
                          </video>
                          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
                          <span className="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text font-medium">
                            {idx === 0 ? "Highland Trail" : idx === 1 ? "Forest Path" : idx === 2 ? "Still Waters" : "Yacht Glide"}
                          </span>
                        </div>
                      ))}
                      </div>
                    </div>
                  </section>

                  {/* Footer */}
                  <Footer />
                </main>
              </div>
        </>
      );
}
