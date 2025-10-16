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

    // Ensure 3D context only (no inner ScrollTrigger)
    gsap.set(el, { transformStyle: 'preserve-3d' });
    gsap.set(content, { transformStyle: 'preserve-3d' });

    return () => {
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