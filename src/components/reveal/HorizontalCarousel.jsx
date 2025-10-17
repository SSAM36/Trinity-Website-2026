import { useState, useEffect } from "react";

export default function HorizontalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Replace with your actual images
  const images = [
    "/1.png",
    "/2.png",
    "/3.png",
    "/4.png",
    "/5.png",
    "/6.png",
  ];

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="min-w-full flex items-center justify-center p-8">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="max-w-md h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
