import React, { useRef, useState } from 'react';

const isVideo = (src) => /(\.(mp4|webm|ogg)$|youtube\.com|youtu\.be)/i.test(src);

const MediaCarousel = ({ items = [] }) => {
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

  // Duplicate items for seamless infinite scroll
  const carouselItems = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={scrollRef}
      className={`relative w-full overflow-x-auto overflow-y-hidden py-1 no-scrollbar touch-scroll pause-on-hover ${interacting ? 'paused' : ''} cursor-grab active:cursor-grabbing select-none`}
      onMouseDown={onMouseDown}
      onMouseLeave={endDrag}
      onMouseUp={endDrag}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full">
        {/* Single row - larger tiles */}
        <div className="flex w-max animate-infinite-scroll group">
          {carouselItems.map((item, index) => (
            <div 
              key={`single-${index}`} 
              className="relative w-[520px] h-[360px] md:w-[640px] md:h-[400px] mx-4 rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 hover:scale-105 hover:rotate-1 flex-shrink-0 group-hover:blur-sm hover:!blur-none hover:!brightness-110"
              onMouseEnter={() => setHoveredIndex(`single-${index}`)}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 hover:opacity-30 transition-opacity duration-300" />
              <div className="absolute inset-0  opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              {/* Glow effect */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaCarousel;
