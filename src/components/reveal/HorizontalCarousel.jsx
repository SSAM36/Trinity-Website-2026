import { useState, useEffect, useRef } from "react";

export default function HorizontalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const fadeTimeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(260); // horizontal offset for side items
  
  // Images with descriptions
  const images = [
    {
      src: "https://res.cloudinary.com/dn5nlfdeu/image/upload/1_exg0r4.png",
      title: "GARUDA",
      desc: "The sworn enemy of serpents, yet driven not by hatred but by purpose. Garuda’s story is one of defiance, loyalty, and liberation - the freedom fighter in the skies, reminding us that flight must always serve something greater."
    },
    {
      src: "https://res.cloudinary.com/dn5nlfdeu/image/upload/2_bukdxs.png",
      title: "SIMHA",
      desc: "A figure of dharmic rage and protective power. Simha teaches that true strength lies in protecting what is right, and that courage is quiet but unwavering when faced with injustice."
    },
    {
      src: "https://res.cloudinary.com/dn5nlfdeu/image/upload/3_yriivz.png",
      title: "DEVDATTA",
      desc: "Devdutta is no ordinary steed - he represents unstoppable momentum and the arrival of change. A symbol of time in motion, he embodies progress, purpose, and the forward force that drives transformation."
    },
    {
      src: "https://res.cloudinary.com/dn5nlfdeu/image/upload/4_xuhy5f.png",
      title: "AIRAVATA",
      desc: "Born from the cosmic churn of Samudra Manthan, Airavata is the rain-bringer, the cloud-carrier. A symbol of wisdom, grace, and balance, he reminds us that strength can be nurturing and gentle - a force that sustains rather than destroys.."
    },
    {
      src: "https://res.cloudinary.com/dn5nlfdeu/image/upload/5_cduhmw.png",
      title: "MAYURA",
      desc: "Graceful yet fierce, the Mayura is elegance forged in fi re. Feeding on venom but remaining pure, the peacock is a symbol of selfless courage, spiritual resilience, and the rare beauty of remaining untainted."
    },
    {
      src: "https://res.cloudinary.com/dn5nlfdeu/image/upload/6_zvhwq0.png",
      title: "VASUKI",
      desc: "Wrapped around the universe as the great churning rope, Vasuki is the unsung hero of sacrifice. He represents patience in chaos, resilience under pressure, and the transformative nature of disciplined power."
    },
  ];

  // Auto-rotation effect with smooth fade out/in syncing image and description
  useEffect(() => {
    if (isPaused) return; // don't auto-rotate while paused/hovered
    const interval = setInterval(() => {
      setIsFading(true);
      // After fade-out, switch to next and fade-in
      fadeTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsFading(false);
      }, 300); // match CSS transition duration
    }, 6000); // Change slide every 6 seconds

    return () => {
      clearInterval(interval);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [images.length, isPaused]);

  // Responsive horizontal offset based on container width
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const newOffset = Math.max(130, Math.min(Math.floor(w * 0.28), 360));
      setOffset(newOffset);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const goNext = () => {
    setIsFading(true);
    fadeTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsFading(false);
    }, 200);
  };

  const goPrev = () => {
    setIsFading(true);
    fadeTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsFading(false);
    }, 200);
  };

  // Helper to get positional styles
  const getPos = (idx) => {
    const diff = (idx - currentIndex + images.length) % images.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === images.length - 1) return 'left';
    return 'hidden';
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2 py-12">
      <div
        className="relative pb-8"
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') goNext();
          if (e.key === 'ArrowLeft') goPrev();
        }}
      >
        {/* Visual stage */}
        <div className="relative h-[24rem] sm:h-[26rem] md:h-[30rem] lg:h-[34rem]">
          {images.map((item, idx) => {
            const pos = getPos(idx);
            const isCenter = pos === 'center';
            const scale = isCenter ? 1 : 0.88;
            const opacity = pos === 'hidden' ? 0 : isCenter ? 1 : 0.25;
            const blur = isCenter ? 0 : 1;
            const translateX = pos === 'left' ? -offset : pos === 'right' ? offset : 0;
            return (
              <div
                key={idx}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                  transition: 'transform 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms cubic-bezier(0.4,0,0.2,1), filter 500ms cubic-bezier(0.4,0,0.2,1)',
                  opacity,
                  filter: `blur(${blur}px)`,
                  zIndex: isCenter ? 3 : 2,
                  pointerEvents: isCenter ? 'auto' : 'none',
                }}
              >
                <img
                  src={item.src}
                  alt={item.title || `Slide ${idx + 1}`}
                  style={{ height: isCenter ? '75%' : '58%' }}
                  className="rounded-full object-contain drop-shadow-2xl"
                />
              </div>
            );
          })}
        </div>

        {/* Center description card */}
        <div className={`relative -mt-12 max-w-2xl mx-auto px-5 py-3 text-[17px] sm:text-[18px] leading-relaxed font-semibold text-stone-900 text-center rounded-[22px] shadow-2xl ring-1 ring-amber-900/25 ${isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
             style={{
               background: 'radial-gradient(circle at 30% 20%, rgba(255,237,213,0.95), rgba(253,230,138,0.92) 60%, rgba(180,130,60,0.28))',
               transition: 'all 300ms cubic-bezier(0.4,0,0.2,1)'
             }}>
          <div className="text-2xl font-extrabold mb-1">{images[currentIndex].title}</div>
          <div>{images[currentIndex].desc}</div>
        </div>

        {/* Controls */}
        <div className="mt-3 flex items-center justify-center gap-5 z-50 relative">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous"
            className="h-11 w-11 rounded-full bg-amber-200/95 text-stone-900 font-bold shadow-md ring-1 ring-amber-900/30 hover:bg-amber-200 transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next"
            className="h-11 w-11 rounded-full bg-amber-200/95 text-stone-900 font-bold shadow-md ring-1 ring-amber-900/30 hover:bg-amber-200 transition-colors"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
