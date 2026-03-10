import { Space_Grotesk } from "next/font/google";
// Use a blocky, modern font for the hero
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], display: "swap", weight: ["700"] });

// Hero section for homepage
// Contains the video background, brand, and location info
export default function Hero() {
  return (
    <header className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 scale-[1.06]">
          {/* Desktop video */}
          <video
            className="hidden md:block h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/water.MP4" type="video/mp4" />
          </video>
          {/* Mobile video - uses same for now, add mobile version later */}
          <video
            className="md:hidden h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/water.MP4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className={`flex flex-col items-center ${spaceGrotesk.className} font-bold text-[13vw] md:text-[8vw] leading-[0.9] tracking-tight drop-shadow-lg`}>
          <span className="uppercase" style={{letterSpacing: "0.05em", textShadow: '0 2px 8px #000'}}>HK</span>
          <span style={{height: '2vw', minHeight: 16, display: 'block'}}></span>
          <span className="uppercase text-primary" style={{
            letterSpacing: "0.05em",
            fontWeight: 700,
            fontSize: "0.9em",
            marginTop: 0,
            textShadow: '0 2px 8px #000'
          }}>IMAGING</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-base md:text-lg text-white/90 font-medium drop-shadow" style={{textShadow: '0 2px 8px #000'}}>
          Aerial cinematography for real estate, automotive, tourism, construction, events, and marine.
        </p>
      </div>
    </header>
  );
}
