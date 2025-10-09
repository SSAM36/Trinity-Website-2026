import { useState, useRef, useEffect } from "react";
import {
  getCloudinaryUrl,
  getResponsiveUrls,
  getPlaceholderUrl,
} from "../utils/cloudinary";
import { teamImagesMap } from "../data/teamImages";
import OptimizedImage from "../components/OptimizedImage";

const TeamsOG = (compact=false) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState("Top Four"); // 🔹 default to Top Four
  const containerRef = useRef(null);
  const [sceneHeight, setSceneHeight] = useState(window.innerHeight);

  const departments = [
    {
      name: "Chairperson",
      images: { array: teamImagesMap.chairperson, scale: "105" },
      title: "Top Four",
      key: "chairperson",
    },
    {
      name: "Joint Chairperson",
      images: { array: teamImagesMap.jointChairperson, scale: "105" },
      title: "Top Four",
      key: "jointChairperson",
    },
    {
      name: "Technical Secretary",
      images: { array: teamImagesMap.technicalSecretary, scale: "105" },
      title: "Secretary",
      key: "technicalSecretary",
    },
    {
      name: "Cultural Secretary",
      images: { array: teamImagesMap.culturalSecretary, scale: "105" },
      title: "Secretary",
      key: "culturalSecretary",
    },
    {
      name: "Sports Secretary",
      images: { array: teamImagesMap.sportsSecretary, scale: "105" },
      title: "Secretary",
      key: "sportsSecretary",
    },
    {
      name: "Secretary",
      images: { array: teamImagesMap.secretary, scale: "105" },
      title: "Secretary",
      key: "secretary",
    },
    {
      name: "Treasurer",
      images: { array: teamImagesMap.treasurer, scale: "105" },
      title: "Secretary",
      key: "treasurer",
    },
    {
      name: "Sports Head of Department",
      images: { array: teamImagesMap.sportsHOD, scale: "105" },
      title: "HOD",
      key: "sportsHOD",
    },
    {
      name: "Events Vice Chairperson",
      images: { array: teamImagesMap.eventsVCP, scale: "105" },
      title: "VCP",
      key: "eventsVCP",
    },
    {
      name: "Marketing Vice Chairperson",
      images: { array: teamImagesMap.marketingVCP, scale: "105" },
      title: "VCP",
      key: "marketingVCP",
    },
    {
      name: "Marketing Head of Department",
      images: { array: teamImagesMap.marketingHOD, scale: "105" },
      title: "HOD",
      key: "marketingHOD",
    },
    {
      name: "Creatives Vice Chairperson",
      images: { array: teamImagesMap.creativesVCP, scale: "105" },
      title: "VCP",
      key: "creativesVCP",
    },
    {
      name: "Creatives Head of Department",
      images: { array: teamImagesMap.creativesHOD, scale: "105" },
      title: "HOD",
      key: "creativesHOD",
    },
    {
      name: "Editorial Vice Chairperson",
      images: { array: teamImagesMap.editorialVCP, scale: "105" },
      title: "VCP",
      key: "editorialVCP",
    },
    {
      name: "Publicity Vice Chairperson",
      images: { array: teamImagesMap.publicityVCP, scale: "105" },
      title: "VCP",
      key: "publicityVCP",
    },
    {
      name: "Hospitality AR Vice Chairperson",
      images: { array: teamImagesMap.hospitalityVCP, scale: "105" },
      title: "VCP",
      key: "hospitalityVCP",
    },
    {
      name: "Hospitality AR Head of Department",
      images: { array: teamImagesMap.hospitalityHOD, scale: "105" },
      title: "HOD",
      key: "hospitalityHOD",
    },
    {
      name: "Operations Vice Chairperson",
      images: { array: teamImagesMap.operationsVCP, scale: "105" },
      title: "VCP",
      key: "operationsVCP",
    },
    {
      name: "Security Vice Chairperson",
      images: { array: teamImagesMap.securityVCP, scale: "105" },
      title: "VCP",
      key: "securityVCP",
    },
  ];

  // 🔹 filter departments
  const filteredDepartments =
    filter === "All"
      ? departments
      : departments.filter((d) => d.title === filter);

  // 🔹 update scene height and index according to filtered data
  useEffect(() => {
    const scrollSpeedFactor = 1.5; // Much faster scrolling - reduced from 5 to 1.5
    const updateScene = () => {
      // Reduced buffer for faster completion
      setSceneHeight(
        window.innerHeight *
          (filteredDepartments.length + 0.5) *
          scrollSpeedFactor
      );
    };
    updateScene();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = sceneHeight - window.innerHeight;
      const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const index = Math.min(
        filteredDepartments.length - 1,
        Math.floor(scrollFraction * filteredDepartments.length)
      );
      setCurrentIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateScene);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScene);
    };
  }, [filteredDepartments.length, sceneHeight]);

  const getCardStyle = (index) => {
    const position = index - currentIndex;
    if (position === 1) {
      return {
        transform:
          window.innerWidth < 640
            ? "translateY(74vh) scale(0.9)"
            : window.innerWidth < 1024
            ? "translateY(53vh) scale(0.9)"
            : "translateY(60vh) scale(0.9)",
        opacity: 0.4,
        zIndex: 50,
        pointerEvents: "none",
        transition: "transform 1.2s ease-in-out, opacity 1.2s ease-in-out",
      };
    }
    if (position > 1) {
      return {
        transform: "translateY(100vh) scale(0.85)",
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none",
        transition: "transform 1.2s ease-in-out, opacity 1.2s ease-in-out",
      };
    }
    if (position < -3) {
      return {
        transform: "translateY(60px) scale(0.9)",
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none",
        transition: "transform 1.2s ease-in-out, opacity 1.2s ease-in-out",
      };
    }
    const translateY = Math.abs(position) * 25;
    const scale = 1 - Math.abs(position) * 0.05;
    const opacity = 1 - Math.abs(position) * 0.15;
    const zIndex = 100 + position;
    const pointerEvents = position === 0 ? "auto" : "none";
    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex,
      pointerEvents,
      transition: "transform 1.2s ease-in-out, opacity 1.2s ease-in-out",
    };
  };

  return (
    <div className="relative w-full" style={{ height: `${sceneHeight}px` }}>
      <div
        className="sticky top-0 left-0 w-full h-screen flex items-center justify-center p-1 md:p-2 bg-cover bg-center bg-no-repeat z-10"
        style={{
          backgroundImage: "url('../images/website bg for all pages.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        {/* 🔹 Horizontal Navbar */}
        <div className="absolute left-0 w-full z-20 overflow-x-auto top-16 sm:top-0">
          <div
            className="flex justify-center overflow-x-auto px-2 xl:px-6 py-3 gap-6 
                  text-white font-semibold text-lg 
                  bg-black/20 backdrop-blur-md rounded-full w-fit mx-auto"
          >
            {["Top Four", "Secretary", "VCP", "HOD"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setCurrentIndex(0);
                  window.scrollTo(0, 0);
                }}
                className={`whitespace-nowrap px-3 md:px-4 py-1 rounded-full transition ${
                  filter === cat
                    ? "drop-shadow-[0_0_10px_#dbab6a] text-[#dbab6a]"
                    : "hover:text-[#dbab6a] hover:drop-shadow-[0_0_10px_#dbab6a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          className="text-center w-full relative sm:mt-6 mt-4 lg:mt-10"
          ref={containerRef}
        >
          {filteredDepartments.map((dept, index) => (
            <div
              key={index}
              className="absolute w-[80%] sm:w-[85%] md:w-[98%] lg:w-[100%] 
               max-h-[80vh] sm:max-h-[90vh] min-h-[45vh] 
               top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
               rounded-2xl shadow-2xl text-white p-6 sm:p-10
               transition-all duration-700 ease-in-out
               backdrop-blur-lg border border-white/10 bg-gray-800/30 
               flex flex-col"
              style={getCardStyle(index)}
            >
              {/* 🔹 Fixed Heading */}
              {/* ===== Title Section ===== */}
              <div
                className={`relative flex justify-center ${
                  compact ? "mb-5" : "mb-8"
                }`}
              >
                <div
                  className={`inline-block text-center ${
                    compact ? "px-4 py-2" : "px-7 py-3"
                  } rounded-md bg-[#1A0F08] border border-[#8C6A3E] shadow-[0_10px_25px_rgba(0,0,0,0.5)]`}
                >
                  <h2
                    className={`${
                      compact ? "text-[16px]" : "text-[28px]"
                    } md:text-[30px] leading-none text-[#E7B565]`}
                    style={{ fontFamily: "'Reggae One', cursive" }}
                  >
                    {dept.name}
                  </h2>
                </div>
              </div>

              {/* 🔹 Scrollable Row */}
              <div
                className={`flex flex-row gap-6 px-4 lg:justify-center
    ${
      dept.images.array.length === 1
        ? "justify-center overflow-x-hidden"
        : "overflow-x-auto"
    }
    ${dept.images.array.length > 2 ? "md:justify-start" : "md:justify-center"}`}
                style={{ maxHeight: "60vh" }}
              >
                {dept.images.array.map((publicId, i) => (
                  <OptimizedImage
                    key={`${dept.key}-${i}`}
                    publicId={publicId}
                    alt={`${dept.name} - Member ${i + 1}`}
                    className={`flex-shrink-0  object-contain
                    w-44 h-68 sm:w-56 sm:h-60 md:w-64 md:h-64 
                    lg:w-70 lg:h-72 xl:w-80 xl:h-80
                    rounded-lg transform transition duration-700 ease-in-out
                    hover:scale-${
                      dept.images.scale
                    } hover:shadow-2xl hover:-translate-y-2 
                    hover:brightness-110 hover:contrast-110
                    ${dept.images.array.length === 1 ? "mx-auto block" : ""}`}
                    loading={index === currentIndex ? "eager" : "lazy"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* close sticky viewport */}
      </div>
      <div className="h-[100vh]" aria-hidden></div>
    </div>
  );
};

export default TeamsOG;
