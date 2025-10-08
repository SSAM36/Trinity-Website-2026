import { useMemo } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import MediaCarousel from "../common/MediaCarousel";
import PanelsSection from "./PanelsSection";
// Use global background from App; no local background here

const VideoSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  // Load all shortlisted images from the specified folder and randomize order
  const eventImages = useMemo(() => {
    const modules = import.meta.glob(
      "/src/images/Shortlisted pics/*.{png,jpg,jpeg,webp,JPG,JPEG,PNG,WEBP}",
      { eager: true, import: "default" }
    );
    const list = Object.values(modules);
    // Shuffle
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, []);

  return (
    <section
      ref={ref}
      className={`w-full transition-all duration-1000 ${isIntersecting ? 'opacity-100' : 'opacity-0'} pt-16 sm:pt-0`}
    >
      <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-2 sm:py-4">
        <div className="relative rounded-none sm:rounded-2xl shadow-none sm:shadow-2xl p-0 sm:p-4 md:p-6 flex flex-col justify-center items-center bg-transparent sm:bg-black/20">
          <MediaCarousel
            items={eventImages}
            // mobileAfter={
            //   // <div className="mt-2">
            //   //   <PanelsSection compact />
            //   // </div>
            // }
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;