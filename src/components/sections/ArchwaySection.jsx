import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ZoomScrollWrapper from "../common/ZoomScrollWrapper";
import CountdownTimer, { hasEventStarted } from "../common/CountdownTimer";
import HorizontalCarousel from "../reveal/HorizontalCarousel";
import mandirImage from "../../images/brighttemple.png";
import siteBg from "../../images/coomingsoon.png";

gsap.registerPlugin(ScrollTrigger);

function MandirComponent({ archRef, imageRef, contentRef, openingBgRef, onTimerComplete }) {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Main Archway */}
      <div className="relative z-10 flex items-center justify-center">
        <div ref={archRef} className="w-[30rem] h-[30rem] sm:w-[34rem] sm:h-[34rem] md:w-[40rem] md:h-[40rem] lg:w-[46rem] lg:h-[46rem] xl:w-[52rem] xl:h-[52rem] 2xl:w-[60rem] 2xl:h-[60rem] relative">
          {/* Inner opening background clipped to the arch aperture */}
          <div
            ref={openingBgRef}
            className="absolute rounded-md overflow-hidden"
            style={{
              // Approximate the inner rectangle of the arch opening
              top: '34%',
              left: '28%',
              right: '28%',
              bottom: '12%'
            }}
          >
            <img
              src={siteBg}
              alt="Coming Soon Backdrop"
              className="w-full h-full object-cover"
            />
          </div>
          <img 
            ref={imageRef}
            src={mandirImage} 
            alt="Majestic Archway" 
            className="w-full h-full object-contain brightness-140 z-100"
          />
          
          {/* Content Within the Archway */}
          <div ref={contentRef} className="absolute inset-0 flex items-center justify-center z-20" 
               style={{ paddingTop: '20%' }}>
            <div className="text-center space-y-2">
              <HorizontalCarousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ArchwaySection = () => {
  const sectionRef = useRef(null);
  const bgFullRef = useRef(null);
  const archRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const openingBgRef = useRef(null);
  const carouselContainerRef = useRef(null);
  
  // State to track if timer has completed
  const [timerCompleted, setTimerCompleted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const bgFull = bgFullRef.current;
    const arch = archRef.current;
    const archImage = imageRef.current;
    const content = contentRef.current;
    const openingBg = openingBgRef.current;
    if (!section || !bgFull || !arch || !archImage || !content || !openingBg) return;

    // Initial states
    gsap.set(bgFull, { autoAlpha: 0, scale: 1.02 });
    gsap.set(arch, { transformOrigin: "50% 50% 0" });
    gsap.set(archImage, { transformOrigin: "50% 50% 0" });
    gsap.set(openingBg, { transformOrigin: "50% 50% 0" });

    // Main timeline: temple zoom animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: "+=150%", // Extended for temple animation
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
      defaults: { ease: "power2.out" },
    });

    tl
      // Phase 1: Stretch the temple and inner background (0 - 40%)
      .to([archImage, openingBg], { scale: 2.7, yPercent: -25, duration: 0.4 }, 0)
      // Phase 2: Crossfade backgrounds (20% - 50%)
      .to(bgFull, { autoAlpha: 1, scale: 1, duration: 0.3 }, 0.2)
      .to(openingBg, { autoAlpha: 0, duration: 0.3 }, 0.2)
      // Phase 3: Fade out temple image (35% - 60%)
      .to(archImage, { opacity: 0, duration: 0.25 }, 0.35)
      // Phase 4: Fade out "Coming Soon" content (50% - 70%)
      .to(content, { autoAlpha: 0, duration: 0.2 }, 0.5);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <main ref={sectionRef} className="relative min-h-[calc(100vh-px)] flex items-center justify-center py-8 px-4 overflow-hidden ">
      {/* Full-page background that appears during Phase 2 and remains */}
      <div
        ref={bgFullRef}
        className="absolute inset-0 -z-10 bg-center bg-cover "
        style={{ backgroundImage: `url(${siteBg})` }}
      />

      <div className="w-full max-w-6xl mx-auto ">
        <ZoomScrollWrapper>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto ">
              <MandirComponent 
                archRef={archRef} 
                imageRef={imageRef} 
                contentRef={contentRef} 
                openingBgRef={openingBgRef}
                onTimerComplete={() => setTimerCompleted(true)}
              />
            </div>
          </div>
        </ZoomScrollWrapper>
      </div>
      
      {/* Carousel container that appears at the end of scroll animation */}
      {/* <div 
        ref={carouselContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-auto "
        style={{ opacity: 1, transition: 'opacity 0.5s' }}
      >
        <HorizontalCarousel />
      </div> */}
    </main>
  );
};

export default ArchwaySection;