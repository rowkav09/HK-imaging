import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import { Component as EtheralShadow } from "../../components/ui/etheral-shadow";

// List of drones/cameras and their images/portfolio anchors
const team = [
  {
    name: "FPV Drone",
    img: "/photos/DRONE1_1.1.1.jpg",
    description: "High-speed FPV platform for dynamic chase shots and fly-throughs. Perfect for automotive, action, and architectural work.",
    portfolioAnchor: "#fpv"
  },
  {
    name: "Indoor Drone",
    img: "/photos/DRONE4_1.1.6.jpg",
    description: "Ultra-stable, lightweight drone for safe indoor flight and slow tracking. Ideal for interiors, hospitality, and behind-the-scenes.",
    portfolioAnchor: "#indoor"
  },
  {
    name: "Camera Work",
    img: "/photos/CONTROLLER2_1.1.3.jpg",
    description: "DSLR and ground camera systems for portraits, products, and event coverage.",
    portfolioAnchor: "#camera"
  }
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Green base background */}
        <div className="absolute inset-0 -z-20 bg-[#355C3A] w-full h-full" />
        {/* Animated etheral-shadow overlay */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <EtheralShadow
            color="rgba(34, 66, 42, 0.55)"
            animation={{ scale: 80, speed: 80 }}
            noise={{ opacity: 0.4, scale: 1.2 }}
            sizing="fill"
            style={{ width: '100vw', height: '100vh', mixBlendMode: 'soft-light' }}
          />
        </div>
        <main className="min-h-screen text-white py-20 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 tracking-tight">Meet the Team</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {team.map((member) => (
              <Link href={`/portfolio/${member.portfolioAnchor}`} key={member.name} className="group flex flex-col bg-[#181f25] rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-[#232b32] hover:border-[#7a9aa8]">
                <div className="relative w-full aspect-[4/3] bg-[#232b32] overflow-hidden flex items-center justify-center">
                  <Image 
                    src={member.img} 
                    alt={member.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    style={{objectPosition: 'center'}} 
                    sizes="(max-width: 768px) 100vw, 33vw" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between p-6 text-center">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-white transition">{member.name}</h2>
                  <p className="text-base text-white/80 mb-4 min-h-[60px]">{member.description}</p>
                  <span className="inline-block mt-auto text-white font-semibold text-sm group-hover:underline">View Portfolio →</span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
