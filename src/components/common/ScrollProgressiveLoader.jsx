import { useState, useEffect, useRef, useCallback } from "react";

const ScrollProgressiveLoader = ({ 
  imageSrc, 
  children, 
  onLoadComplete, 
  onProgressUpdate,
  className = "",
  startScale = 0.2,
  endScale = 1.0 
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageScale, setImageScale] = useState(startScale);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isLoadingRef = useRef(false);

  // Calculate scroll progress based on entire page scroll (slower, smoother)
  const calculateScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Calculate progress based on total page scroll (0 to 100%)
    let progress = 0;
    
    if (documentHeight > 0) {
      progress = (scrollTop / documentHeight) * 100;
      // Clamp progress between 0 and 100
      progress = Math.max(0, Math.min(100, progress));
      
      // Apply multiple layers of smooth easing for ultra-smooth animation
      const easedProgress = progress / 100;
      // Use cubic bezier-like easing for slower, more natural feel
      const smoothed = easedProgress * easedProgress * easedProgress * (easedProgress * (easedProgress * 6 - 15) + 10);
      progress = smoothed * 100;
    }
    
    // Temple fully reveals at 70% scroll (slower progression)
    if (progress >= 70) {
      progress = 100;
    }
    
    return progress;
  }, []);

  // Handle scroll events with throttling for smoothness
  const handleScroll = useCallback(() => {
    // Don't update if already loaded (temple locked in place)
    if (isLoaded) return;
    
    const progress = calculateScrollProgress();
    setScrollProgress(progress);
    
    // Call progress update callback for parent sync
    onProgressUpdate?.(progress);
    
    // Calculate scale based on progress (ensure it stops at endScale)
    const scale = startScale + (endScale - startScale) * (progress / 100);
    setImageScale(Math.min(scale, endScale)); // Ensure scale doesn't exceed endScale
    
    // Mark as loaded when progress reaches 100% (at 50% scroll)
    if (progress >= 100 && !isLoadingRef.current) {
      isLoadingRef.current = true;
      setIsLoaded(true);
      // Immediately trigger content loading
      onLoadComplete?.();
    }
  }, [calculateScrollProgress, startScale, endScale, onLoadComplete, onProgressUpdate, isLoaded]);

  // Set up scroll event listeners with throttling
  useEffect(() => {
    let ticking = false;
    
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Main image with scale animation - ultra smooth and slower */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-1000 ease-out"
        style={{
          transform: `scale(${imageScale})`,
          opacity: scrollProgress > 0 ? 1 : 0,
        }}
      >
        <img
          ref={imageRef}
          src={imageSrc}
          alt="Majestic Stone Archway"
          className="w-full h-full object-contain"
          style={{
            maxWidth: '60rem',
            maxHeight: '60rem',
          }}
        />
      </div>

      {/* Children content that appears after loading */}
      <div 
        className={`relative z-20 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 animate-temple-pop' : 'opacity-0 scale-50'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollProgressiveLoader;