import VideoSection from "../components/sections/VideoSection";
import ArchwaySection from "../components/sections/ArchwaySection";
import LeaderMessageSection from "../components/sections/LeaderMessageSection";
import Anoucenment from "../components/Anoucenment";
import PanelsSection from "../components/sections/PanelsSection";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <VideoSection />

      <ArchwaySection />
      <Anoucenment />
      {/* Inserted leader message section between temple and panels */}
      <LeaderMessageSection />
      <PanelsSection />
    </div>
  );
};

export default Home;
