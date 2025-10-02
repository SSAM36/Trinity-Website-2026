import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ZoomScrollWrapper({ children }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    // Reset any existing animations
    gsap.killTweensOf(content);

    // Ensure 3D context
    gsap.set(el, { transformStyle: 'preserve-3d' });
    gsap.set(content, { transformStyle: 'preserve-3d' });

    // Smooth 3D perspective scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top bottom-=80',
        end: 'center center',
        scrub: 1.2,
        ease: 'power3.out',
      }
    });

    // From slightly away and tilted to natural position
    tl.fromTo(content,
      { 
        z: -180, 
        scale: 0.9, 
        opacity: 0.6, 
        y: 80, 
        rotateX: 6, 
        filter: 'blur(2px)'
      },
      { 
        z: 0, 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        filter: 'blur(0px)'
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(content);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center min-h-screen px-4"
      style={{ perspective: '1000px' }}
    >
      <div ref={contentRef} className="w-full">
        {children}
      </div>
    </div>
  );
}