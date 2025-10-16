import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ZoomScrollWrapper from "../common/ZoomScrollWrapper";
import CountdownTimer from "../common/CountdownTimer";
import mandirImage from "../../images/brighttemple.png";
import siteBg from "../../images/coomingsoon.png";

gsap.registerPlugin(ScrollTrigger);

function MandirComponent({ archRef, imageRef, contentRef, openingBgRef }) {
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
            className="w-full h-full object-contain brightness-140"
          />
          
          {/* Content Within the Archway */}
          <div ref={contentRef} className="absolute inset-0 flex items-center justify-center z-20" 
               style={{ paddingTop: '35%' }}>
            <div className="text-center space-y-2">
              {/* Coming Soon Text */}
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-cinzel font-bold drop-shadow-2xl tracking-wide">
                <div className="mb-1 text-amber-600" style={{ color: '#E0C98F' }}>
                  COMING
                </div>
                <div className="text-red-600 drop-shadow-lg">
                  SOON
                </div>
              </h1>
              
              {/* Countdown Timer */}
              <div className="mt-2">
                <CountdownTimer showContent={true} />
              </div>
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

    // Phase 2 timeline: begins only after the temple is fully visible
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "center center", // start when temple is fully revealed on screen
        end: "+=120%",         // one extra scroll-length for the transition
        scrub: 1,
        pin: true,              // hold during the transition
        anticipatePin: 1,
      },
      defaults: { ease: "power2.out" },
    });

    tl
      // Stretch both the mandir and the inner background together
      .to([archImage, openingBg], { scale: 2.7, yPercent: -25 }, 0)
      // Crossfade: bring in page background while fading the inner opening out
      .to(bgFull, { autoAlpha: 1, scale: 1 }, 0.2)
      .to(openingBg, { autoAlpha: 0 }, 0.2)
      // Finally take the mandir image out of view
      .to(archImage, { opacity: 0 }, 0.35)
      // Ensure the existing content stays fully visible on top
      .to(content, { opacity: 1 }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <main ref={sectionRef} className="relative min-h-[calc(100vh-120px)] flex items-center justify-center py-8 px-4 overflow-hidden">
      {/* Full-page background that appears during Phase 2 and remains */}
      <div
        ref={bgFullRef}
        className="absolute inset-0 -z-10 bg-center bg-cover"
        style={{ backgroundImage: `url(${siteBg})` }}
      />

      <div className="w-full max-w-6xl mx-auto">
        <ZoomScrollWrapper>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto">
              <MandirComponent archRef={archRef} imageRef={imageRef} contentRef={contentRef} openingBgRef={openingBgRef} />
            </div>
          </div>
        </ZoomScrollWrapper>
      </div>
    </main>
  );
};

export default ArchwaySection;