import { lazy, Suspense } from "react";
import HeroSection from "../components/HeroSection";

// Lazy load sections that are below the fold
const VideoSection = lazy(() => import("../components/sections/VideoSection"));
const ArchwaySection = lazy(() => import("../components/sections/ArchwaySection"));
const LeaderMessageSection = lazy(() => import("../components/sections/LeaderMessageSection"));
const Anoucenment = lazy(() => import("../components/Anoucenment"));
const PanelsSection = lazy(() => import("../components/sections/PanelsSection"));

// Simple loader for sections
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-[#DBAB6A] border-dashed rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <Suspense fallback={<SectionLoader />}>
        <VideoSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ArchwaySection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Anoucenment />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        {/* Inserted leader message section between temple and panels */}
        <LeaderMessageSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <PanelsSection />
      </Suspense>
    </div>
  );
};

export default Home;
