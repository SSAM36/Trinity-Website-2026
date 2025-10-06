import React, { useRef, useState } from 'react';

const isVideo = (src) => /(\.(mp4|webm|ogg)$|youtube\.com|youtu\.be)/i.test(src);

const MediaCarousel = ({ items = [], mobileAfter = null }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const [interacting, setInteracting] = useState(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const onMouseDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    setInteracting(true);
    startX.current = e.pageX - el.offsetLeft;
    scrollStart.current = el.scrollLeft;
  };
  const endDrag = () => { isDragging.current = false; setInteracting(false); };
  const onMouseMove = (e) => {
    const el = scrollRef.current;
    if (!el || !isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current);
    el.scrollLeft = scrollStart.current - walk;
  };

  // Touch support
  const onTouchStart = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    setInteracting(true);
    startX.current = e.touches[0].pageX - el.offsetLeft;
    scrollStart.current = el.scrollLeft;
  };
  const onTouchMove = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startX.current);
    el.scrollLeft = scrollStart.current - walk;
  };
  const onTouchEnd = () => setInteracting(false);

  if (items.length === 0) {
    return null;
  }

  const carouselItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full">
      {/* Mobile backdrop panel to avoid page background bleed */}
      <div className="block sm:hidden w-screen relative left-1/2 -translate-x-1/2 rounded-none bg-black/20 backdrop-blur-[2px] px-0 pt-2 pb-2">
        <div className="px-3">
          <div
            ref={scrollRef}
            className={`relative w-full overflow-x-auto overflow-y-hidden no-scrollbar touch-scroll pause-on-hover ${interacting ? 'paused' : ''} cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory`}
            onMouseDown={onMouseDown}
            onMouseLeave={endDrag}
            onMouseUp={endDrag}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative w-full">
              <div className="flex w-max mx-auto animate-infinite-scroll group">
                {carouselItems.map((item, index) => (
                  <div
                    key={`single-${index}`}
                    className="relative mr-2 first:ml-0 last:mr-0 flex-shrink-0 rounded-xl overflow-hidden shadow-xl transition-all duration-200 hover:scale-105 hover:rotate-1 hover:!brightness-110 snap-center"
                    onMouseEnter={() => setHoveredIndex(`single-${index}`)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ width: 'calc(100vw - 24px)', maxWidth: '560px', aspectRatio: '16 / 9' }}
                  >
                    {isVideo(item) ? (
                      <video
                        className="w-full h-full object-cover transition-transform duration-200"
                        src={item}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={item}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-200"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 hover:opacity-30 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Optional content below carousel (mobile only) */}
          {mobileAfter}
          {/* Bottom gradient fade inside panel to blend into page background if no content */}
          {!mobileAfter && (
            <div className="pointer-events-none mt-2 h-10 w-full rounded-b-xl bg-gradient-to-b from-transparent to-black/25" />
          )}
        </div>
      </div>

      {/* Mobile-only filler below to smooth the transition and fill space */}
      {!mobileAfter && (
        <div className="block sm:hidden w-screen relative left-1/2 -translate-x-1/2 -mt-4 h-20 bg-black/20 backdrop-blur-[2px]" />
      )}

      {/* Desktop / tablet original layout */}
      <div
        ref={scrollRef}
        className={`hidden sm:block relative w-full overflow-x-auto overflow-y-hidden py-1 no-scrollbar touch-scroll pause-on-hover ${interacting ? 'paused' : ''} cursor-grab active:cursor-grabbing select-none`}
        onMouseDown={onMouseDown}
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-full">
          <div className="flex w-max animate-infinite-scroll group">
            {carouselItems.map((item, index) => (
              <div 
                key={`single-desktop-${index}`} 
                className="relative w-[520px] h-[360px] md:w-[640px] md:h-[400px] mx-4 rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 hover:scale-105 hover:rotate-1 flex-shrink-0 group-hover:blur-sm hover:!blur-none hover:!brightness-110"
                onMouseEnter={() => setHoveredIndex(`single-desktop-${index}`)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {isVideo(item) ? (
                  <video 
                    className="w-full h-full object-cover transition-transform duration-200"
                    src={item}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img 
                    src={item} 
                    alt="" 
                    className="w-full h-full object-cover transition-transform duration-200"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 hover:opacity-30 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaCarousel;
