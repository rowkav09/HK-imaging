'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import Header from '../components/Header';

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loader after brief delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Section handlers
    const setupSectionHandlers = () => {
      const fpvBtn = document.querySelector(".fpv");
      const cinematicBtn = document.querySelector(".cinematic");
      const neo1Btn = document.querySelector(".neo1");
      const cameraBtn = document.querySelector(".camera");

      const fpvClose = document.querySelector(".fpv-close");
      const cinematicClose = document.querySelector(".cinematic-close");
      const neo1Close = document.querySelector(".neo1-close");
      const cameraClose = document.querySelector(".camera-close");

      fpvBtn?.addEventListener("click", () => document.body.classList.add("fpv-on"));
      fpvClose?.addEventListener("click", () => document.body.classList.remove("fpv-on"));

      cinematicBtn?.addEventListener("click", () => document.body.classList.add("cinematic-on"));
      cinematicClose?.addEventListener("click", () => document.body.classList.remove("cinematic-on"));

      neo1Btn?.addEventListener("click", () => document.body.classList.add("neo1-on"));
      neo1Close?.addEventListener("click", () => document.body.classList.remove("neo1-on"));

      cameraBtn?.addEventListener("click", () => document.body.classList.add("camera-on"));
      cameraClose?.addEventListener("click", () => document.body.classList.remove("camera-on"));
    };

    setupSectionHandlers();

    // Hide header on scroll in overlay sections
    const handleSectionScroll = () => {
      const scrollContainers = document.querySelectorAll('.section-content');
      scrollContainers.forEach((container) => {
        container.addEventListener('scroll', () => {
          const scrolled = (container as HTMLElement).scrollTop > 50;
          const header = document.querySelector('nav');
          if (header && (document.body.classList.contains('fpv-on') || 
                        document.body.classList.contains('cinematic-on') || 
                        document.body.classList.contains('neo1-on') || 
                        document.body.classList.contains('camera-on'))) {
            if (scrolled) {
              header.style.opacity = '0';
              header.style.transform = 'translateY(-100%)';
            } else {
              header.style.opacity = '1';
              header.style.transform = 'translateY(0)';
            }
          }
        });
      });
    };

    handleSectionScroll();

    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      <div className={`page-loader ${!isLoading ? 'loaded' : ''}`}>
        <div className="loader-spinner"></div>
      </div>

      <Header />
      <style jsx global>{`
        .page-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(120% 120% at 20% 0%, rgba(98, 180, 135, 0.45) 0%, rgba(12, 22, 16, 0.98) 45%),
            radial-gradient(140% 140% at 80% 10%, rgba(60, 120, 95, 0.55) 0%, rgba(12, 22, 16, 0.98) 55%),
            linear-gradient(135deg, rgba(24, 44, 32, 0.7), rgba(10, 20, 14, 0.9));
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
        }

        .page-loader.loaded {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .loader-spinner {
          width: 32px;
          height: 32px;
          border: 2px solid rgba(98, 180, 135, 0.2);
          border-top-color: rgba(98, 180, 135, 0.8);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');

        body {
          font-family: 'Poppins', sans-serif;
          font-weight: 300;
          font-size: 15px;
          line-height: 1.6;
          color: #e9f7ef;
          height: 100vh;
          margin: 0;
          background: radial-gradient(120% 120% at 20% 0%, rgba(98, 180, 135, 0.45) 0%, rgba(12, 22, 16, 0.98) 45%),
            radial-gradient(140% 140% at 80% 10%, rgba(60, 120, 95, 0.55) 0%, rgba(12, 22, 16, 0.98) 55%),
            linear-gradient(135deg, rgba(24, 44, 32, 0.7), rgba(10, 20, 14, 0.9));
          background-size: 160% 160%;
          animation: ambientShift 18s ease-in-out infinite;
          overflow: hidden;
          transition: all 300ms linear;
          perspective: 800px;
        }

        @keyframes ambientShift {
          0% {
            background-position: 0% 0%, 100% 0%, 0% 0%;
          }
          50% {
            background-position: 80% 40%, 20% 60%, 0% 0%;
          }
          100% {
            background-position: 0% 0%, 100% 0%, 0% 0%;
          }
        }

        body.fpv-on {
          background: radial-gradient(140% 120% at 15% 10%, rgba(120, 190, 145, 0.6) 0%, rgba(10, 20, 14, 0.98) 45%),
            radial-gradient(140% 120% at 85% 20%, rgba(60, 140, 105, 0.55) 0%, rgba(10, 20, 14, 0.98) 55%),
            linear-gradient(135deg, rgba(22, 42, 30, 0.75), rgba(10, 20, 14, 0.9));
          background-size: 160% 160%;
          animation: ambientShift 14s ease-in-out infinite;
        }

        body.cinematic-on {
          background: radial-gradient(140% 120% at 20% 0%, rgba(110, 185, 140, 0.6) 0%, rgba(9, 18, 13, 0.98) 45%),
            radial-gradient(140% 120% at 90% 20%, rgba(55, 125, 95, 0.6) 0%, rgba(9, 18, 13, 0.98) 55%),
            linear-gradient(135deg, rgba(18, 36, 26, 0.75), rgba(9, 18, 13, 0.9));
          background-size: 160% 160%;
          animation: ambientShift 16s ease-in-out infinite;
        }

        body.neo1-on {
          background: radial-gradient(140% 120% at 20% 0%, rgba(125, 200, 150, 0.55) 0%, rgba(10, 22, 16, 0.98) 45%),
            radial-gradient(120% 120% at 80% 30%, rgba(70, 140, 110, 0.55) 0%, rgba(10, 22, 16, 0.98) 55%),
            linear-gradient(135deg, rgba(20, 40, 30, 0.75), rgba(10, 22, 16, 0.9));
          background-size: 160% 160%;
          animation: ambientShift 18s ease-in-out infinite;
        }

        body.camera-on {
          background: radial-gradient(140% 120% at 25% 0%, rgba(110, 185, 145, 0.55) 0%, rgba(9, 19, 14, 0.98) 45%),
            radial-gradient(140% 120% at 85% 25%, rgba(55, 130, 100, 0.55) 0%, rgba(9, 19, 14, 0.98) 55%),
            linear-gradient(135deg, rgba(18, 36, 26, 0.75), rgba(9, 19, 14, 0.9));
          background-size: 160% 160%;
          animation: ambientShift 16s ease-in-out infinite;
        }


        .hero-section {
          position: relative;
          width: 100%;
          display: block;
          overflow: hidden;
          height: 100vh;
          background: transparent;
          transform: scale(1) rotateX(0);
          box-shadow: 0 0 40px rgba(0,0,0,0.2);
          transition: all 300ms linear;
          transition-delay: 400ms;
          transform-origin: center top;
        }

        .hero-section h1 {
          color: #fff;
          font-size: 8vw;
          line-height: 1;
          font-weight: 900;
        }

        .hero-section .dancing {
          letter-spacing: 1px;
          color: #c9f2dc;
          font-size: 25px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          transform: translateY(-175px) rotate(-45deg);
          z-index: 2;
        }

        .hero-section .dancing span {
          padding: 8px 15px;
          padding-right: 10px;
          display: inline-block;
          border-radius: 5px;
          background-color: #234233;
        }

        .hero-section p {
          font-size: 20px;
          line-height: 1;
          font-weight: 700;
          color: #c9f2dc;
        }

        .fpv-section p,
        .cinematic-section p,
        .neo1-section p,
        .camera-section p {
          color: #e9f7ef;
        }

        .hero-section p span {
          margin-left: 15px;
          margin-right: 15px;
          position: relative;
          display: inline-block;
          cursor: pointer;
        }

        body.fpv-on .hero-section,
        body.cinematic-on .hero-section,
        body.neo1-on .hero-section,
        body.camera-on .hero-section {
          transform: rotateX(-10deg);
          transition-delay: 0ms;
        }

        body.fpv-on .hero-section,
        body.cinematic-on .hero-section,
        body.neo1-on .hero-section,
        body.camera-on .hero-section {
          opacity: 0;
          pointer-events: none;
        }

        .fpv-section,
        .cinematic-section,
        .neo1-section,
        .camera-section {
          position: fixed;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100vh;
          display: block;
          overflow: hidden;
          background-color: transparent;
          backdrop-filter: blur(0.5px);
          transition: all 300ms linear;
          z-index: 10;
        }

        .section-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 100px 0;
          overflow-x: hidden;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .section-content::-webkit-scrollbar {
          width: 0;
          height: 0;
        }

        .fpv-close,
        .cinematic-close,
        .neo1-close,
        .camera-close {
          position: fixed;
          top: 96px;
          right: 20px;
          width: 30px;
          display: block;
          overflow: hidden;
          height: 30px;
          transition: all 200ms linear;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 36px 36px;
          background-image: url('http://www.ivang-design.com/svg-load/portfolio/close.svg');
          cursor: pointer;
          z-index: 11;
          opacity: 0;
          visibility: hidden;
        }

        .fpv-close:hover,
        .cinematic-close:hover,
        .neo1-close:hover,
        .camera-close:hover {
          transform: rotate(90deg);
        }

        body.fpv-on .fpv-close,
        body.cinematic-on .cinematic-close,
        body.neo1-on .neo1-close,
        body.camera-on .camera-close {
          opacity: 1;
          visibility: visible;
        }

        body.fpv-on .fpv-section,
        body.cinematic-on .cinematic-section,
        body.neo1-on .neo1-section,
        body.camera-on .camera-section {
          top: 0;
          transition-delay: 400ms;
        }

        .fpv-section img,
        .cinematic-section img,
        .neo1-section img,
        .camera-section img,
        .fpv-section video,
        .cinematic-section video,
        .neo1-section video,
        .camera-section video {
          margin-top: 30px;
          width: 100%;
          height: auto;
          display: block;
          border-radius: 4px;
          box-shadow: 0 0 20px rgba(0,0,0,0.4);
          background: transparent;
        }

        .fpv-section h3,
        .cinematic-section h3,
        .neo1-section h3,
        .camera-section h3 {
          font-size: 7vw;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 1px;
          color: #fff;
        }

        .fpv-section p,
        .cinematic-section p,
        .neo1-section p,
        .camera-section p {
          font-size: 14px;
          line-height: 1.7;
          letter-spacing: 1px;
          font-weight: 500;
        }

        .fpv-section p span,
        .cinematic-section p span,
        .neo1-section p span,
        .camera-section p span {
          font-size: 20px;
          line-height: 1.3;
          font-weight: 700;
          color: #c9f2dc;
        }

        .section-center {
          position: absolute;
          width: 100%;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        }

        .back-home {
          position: fixed;
          top: 30px;
          left: 30px;
          z-index: 200000;
          color: #c9f2dc;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 250ms linear;
        }

        .back-home:hover {
          color: #fff;
        }

        @media screen and (max-width: 1200px) {
          .cursor, .cursor2 {
            display: none;
          }
        }

        @media (max-width: 967px) {
          .hero-section h1 {
            font-size: 11vw;
          }
          .hero-section p {
            font-size: 18px;
          }
          .hero-section p span {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
      `}</style>

      {/* Hero section: brand and quick links */}
      <div className="hero-section">
        <div className="section-center">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-12 text-center">
                <h1>HK<br />imaging</h1>
              </div>
              <div className="col-12 text-center mb-2">
                <div className="dancing"><span>portfolio</span></div>
              </div>
              <div className="col-12 text-center">
                <p>
                  <span className="fpv hover-target">FPV</span>
                  <span className="cinematic hover-target">Cinematic</span>
                  <span className="neo1 hover-target">Indoor</span>
                  <span className="camera hover-target">Camera Work</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FPV Section */}
      <div className="fpv-section">
        <div className="fpv-close hover-target"></div>
        <div className="section-content">
          <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h3>FPV</h3>
            </div>
            <div className="col-12 mt-3 text-center">
              <p><span>DJI O4 Air Unit Pro</span></p>
            </div>
            <div className="col-12 text-center">
              <p>
                Camera: O4 FPV Camera (1/1.3″ CMOS)<br />
                Use: Automotive • Action • Architecture
              </p>
            </div>
            <div className="col-12 text-center mt-4">
              <p>There’s nothing here yet.</p>
            </div>
          </div>
        </div>        </div>      </div>

      {/* Cinematic Section */}
      <div className="cinematic-section">
        <div className="cinematic-close hover-target"></div>
        <div className="section-content">
          <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h3>Cinematic</h3>
            </div>
            <div className="col-12 mt-3 text-center">
              <p><span>DJI Mavic 2 Pro & DJI Mini 2 Pro</span></p>
            </div>
            <div className="col-12 text-center">
              <p>
                Cameras: Hasselblad L1D-20c & 1/1.3″ CMOS<br />
                Use: Real Estate • Automotive • Tourism • Marine
              </p>
            </div>
            <div className="col-md-6 col-lg-4">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
                onClick={(event) => {
                  const video = event.currentTarget;
                  if (video.requestFullscreen) {
                    video.requestFullscreen();
                  }
                }}
              >
                <source src="/videos/mountain_walk.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="col-md-6 col-lg-4">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
                onClick={(event) => {
                  const video = event.currentTarget;
                  if (video.requestFullscreen) {
                    video.requestFullscreen();
                  }
                }}
              >
                <source src="/videos/walk.MP4" type="video/mp4" />
              </video>
            </div>
            <div className="col-md-6 col-lg-4">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
                onClick={(event) => {
                  const video = event.currentTarget;
                  if (video.requestFullscreen) {
                    video.requestFullscreen();
                  }
                }}
              >
                <source src="/videos/water.MP4" type="video/mp4" />
              </video>
            </div>
            <div className="col-md-6 col-lg-4">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
                onClick={(event) => {
                  const video = event.currentTarget;
                  if (video.requestFullscreen) {
                    video.requestFullscreen();
                  }
                }}
              >
                <source src="/videos/yacht.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="col-md-6 col-lg-4">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls
                onClick={(event) => {
                  const video = event.currentTarget;
                  if (video.requestFullscreen) {
                    video.requestFullscreen();
                  }
                }}
              >
                <source src="/videos/yacht_rainbow.MP4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Neo1 Section */}
      <div className="neo1-section">
        <div className="neo1-close hover-target"></div>
        <div className="section-content">
          <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h3>Indoor</h3>
            </div>
            <div className="col-12 mt-3 text-center">
              <p><span>DJI NEO</span></p>
            </div>
            <div className="col-12 text-center">
              <p>
                Camera: NEO Camera Module (wide-angle CMOS)<br />
                Use: Interiors • Hospitality • Close Proximity
              </p>
            </div>
            <div className="col-12 text-center mt-4">
              <p>There’s nothing here yet.</p>
            </div>
          </div>
        </div>        </div>      </div>

      {/* Camera Work Section */}
      <div className="camera-section">
        <div className="camera-close hover-target"></div>
        <div className="section-content">
          <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <h3>Camera Work</h3>
            </div>
            <div className="col-12 mt-3 text-center">
              <p><span>Our Camera Equipment</span></p>
            </div>
            <div className="col-12 text-center">
              <p>
                Canon 750D — Camera Body<br />
                Canon EF-S 18-55mm — Image Stabilizer (0.25m)<br />
                Canon RF 75-300mm F4-5.6 — Macro Lens
              </p>
            </div>
            <div className="col-12 mt-4">
              <div className="row g-3">
                <div className="col-6 col-md-4">
                  <img src="/photos/DRONE1_1.1.1.jpg" alt="Drone 1" />
                </div>
                <div className="col-6 col-md-4">
                  <img src="/photos/DRONE2_1.1.2.jpg" alt="Drone 2" />
                </div>
                <div className="col-6 col-md-4">
                  <img src="/photos/CONTROLLER2_1.1.3.jpg" alt="Controller" />
                </div>
                <div className="col-6 col-md-4">
                  <img src="/photos/DRON3_1.1.4.jpg" alt="Drone 3" />
                </div>
                <div className="col-6 col-md-4">
                  <img src="/photos/MAX2_1.1.5.jpg" alt="Max 2" />
                </div>
                <div className="col-6 col-md-4">
                  <img src="/photos/DRONE4_1.1.6.jpg" alt="Drone 4" />
                </div>
                <div className="col-6 col-md-4">
                  <img src="/photos/DRONE5_1.1.7.jpg" alt="Drone 5" />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    </>
  );
}
