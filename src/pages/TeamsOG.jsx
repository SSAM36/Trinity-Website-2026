import { useState, useRef, useEffect } from "react";
import photo1 from "/teams/profimg.png";


const TeamsOG = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState("Top Four"); // 🔹 default to Top Four
  const containerRef = useRef(null);
  const [sceneHeight, setSceneHeight] = useState(window.innerHeight);

  const departments = [
    // {
    //   name: "Mentors",
    //   images: { array: [photo1, photo1, photo1], scale: "110" },
    //   title: "Mentors",
    // },
    // {
    //   name: "Conveners",
    //   images: { array: [photo1, photo1, photo1], scale: "110" },
    //   title: "Mentors",
    // },
    // {
    //   name: "Technical Conveners",
    //   images: { array: [photo1, photo1, photo1], scale: "110" },
    //   title: "Mentors",
    // },
    // {
    //   name: "Cultural Conveners",
    //   images: { array: [photo1, photo1, photo1], scale: "110" },
    //   title: "Mentors",
    // },
    // {
    //   name: "Sports Conveners",
    //   images: { array: [photo1, photo1, photo1], scale: "110" },
    //   title: "Mentors",
    // },
    {
      name: "Chairperson",
      images: { array: ["/teams/TeamsImg/47.png"], scale: "105" },
      title: "Top Four",
    },
    {
      name: "Joint Chairperson",
      images: {
        array: [
          "/teams/TeamsImg/44.png",
          "/teams/TeamsImg/45.png",
          "/teams/TeamsImg/46.png",
        ],
        scale: "105",
      },
      title: "Top Four",
    },
    {
      name: "Technical Secretary",
      images: {
        array: [
          "/teams/TeamsImg/12.png",
          "/teams/TeamsImg/13.png",
          "/teams/TeamsImg/14.png",
        ],
        scale: "105",
      },
      title: "Secretary",
    },
    {
      name: "Cultural Secretary",
      images: {
        array: [
          "/teams/TeamsImg/37.png",
          "/teams/TeamsImg/38.png",
          "/teams/TeamsImg/39.png",
        ],
        scale: "105",
      },
      title: "Secretary",
    },
    {
      name: "Sports Secretary",
      images: {
        array: [
          "/teams/TeamsImg/9.png",
          "/teams/TeamsImg/10.png",
          "/teams/TeamsImg/11.png",
        ],
        scale: "105",
      },
      title: "Secretary",
    },
    {
      name: "Secretary",
      images: {
        array: ["/teams/TeamsImg/40.png", "/teams/TeamsImg/41.png"],
        scale: "105",
      },
      title: "Secretary",
    },
    {
      name: "Treasurer",
      images: {
        array: ["/teams/TeamsImg/42.png", "/teams/TeamsImg/43.png"],
        scale: "105",
      },
      title: "Secretary",
    },

    {
      name: "Sports Head of Department",
      images: {
        array: [
          "/teams/TeamsImg/6.png",
          "/teams/TeamsImg/7.png",
          "/teams/TeamsImg/8.png",
        ],
        scale: "105",
      },
      title: "HOD",
    },
    {
      name: "Events Vice Chairperson",
      images: {
        array: [
          "/teams/TeamsImg/15.png",
          "/teams/TeamsImg/16.png",
          "/teams/TeamsImg/17.png",
        ],
        scale: "105",
      },
      title: "VCP",
    },
    {
      name: "Marketing Vice Chairperson",
      images: {
        array: [
          "/teams/TeamsImg/32.png",
          "/teams/TeamsImg/33.png",
          "/teams/TeamsImg/34.png",
        ],
        scale: "105",
      },
      title: "VCP",
    },
    {
      name: "Marketing Head of Department",
      images: {
        array: ["/teams/TeamsImg/35.png", "/teams/TeamsImg/36.png"],
        scale: "105",
      },
      title: "HOD",
    },
    {
      name: "Creatives Vice Chairperson ",
      images: {
        array: ["/teams/TeamsImg/1.png", "/teams/TeamsImg/2.png"],
        scale: "105",
      },
      title: "VCP",
    },
    {
      name: "Creatives Head of Department",
      images: {
        array: [
          "/teams/TeamsImg/3.png",
          "/teams/TeamsImg/4.png",
          "/teams/TeamsImg/5.png",
        ],
        scale: "105",
      },
      title: "HOD",
    },
    {
      name: "Editorial Vice Chairperson",
      images: {
        array: ["/teams/TeamsImg/23.png", "/teams/TeamsImg/24.png"],
        scale: "105",
      },
      title: "VCP",
    },
    {
      name: "Publicity Vice Chairperson",
      images: {
        array: [
          "/teams/TeamsImg/18.png",
          "/teams/TeamsImg/19.png",
          "/teams/TeamsImg/20.png",
        ],
        scale: "105",
      },
      title: "VCP",
    },
    {
      name: "Hospitality AR Vice Chairperson",
      images: {
        array: ["/teams/TeamsImg/25.png", "/teams/TeamsImg/26.png"],
        scale: "105",
      },
      title: "VCP",
    },
    {
      name: "Hospitality AR Head of Department",
      images: {
        array: ["/teams/TeamsImg/27.png", "/teams/TeamsImg/28.png"],
        scale: "105",
      },
      title: "HOD",
    },
    {
      name: "Operations Vice Chairperson",
      images: {
        array: [
          "/teams/TeamsImg/29.png",
          "/teams/TeamsImg/30.png",
          "/teams/TeamsImg/31.png",
        ],
        scale: "105",
      },
      title: "VCP",
    },
    {
      name: "Security Vice Chairperson",
      images: {
        array: ["/teams/TeamsImg/21.png", "/teams/TeamsImg/22.png"],
        scale: "105",
      },
      title: "VCP",
    },
  ];

  // 🔹 filter departments
  const filteredDepartments =
    filter === "All"
      ? departments
      : departments.filter((d) => d.title === filter);

  // 🔹 update scene height and index according to filtered data
  useEffect(() => {
    const scrollSpeedFactor = 5; // increase total scroll distance per section
    const updateScene = () => {
      // Add extra buffer so footer only shows after final card finishes
      setSceneHeight(window.innerHeight * (filteredDepartments.length + 2) * scrollSpeedFactor);
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
        className="sticky top-0 left-0 w-full h-screen flex items-center justify-center p-1 md:p-2 bg-cover bg-center bg-no-repeat z-40"
        style={{ backgroundImage: "url('../images/website bg for all pages.png')" }}
      >
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      {/* 🔹 Horizontal Navbar */}
      <div
        className="absolute left-0 w-full z-50 overflow-x-auto"
        style={{ top: 0 }}
      >
        <div
          className="flex justify-center overflow-x-auto px-6 py-3 gap-6 
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
              className={`whitespace-nowrap px-4 py-1 rounded-full transition ${
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
            <h2
              className="text-3xl md:text-5xl text-[#dbab6a] text-center 
                 transition-transform duration-500 hover:scale-105 mb-6 flex-shrink-0"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {dept.name}
            </h2>

            {/* 🔹 Scrollable Row */}
            <div
              className={`flex flex-row gap-6 overflow-x-auto px-4 lg:justify-center
    ${dept.images.array.length > 2 ? "md:justify-start" : "md:justify-center"}`}
              style={{ maxHeight: "60vh" }}
            >
              {dept.images.array.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Photo"
                  className={`flex-shrink-0 object-contain 
                      w-44 h-68 sm:w-56 sm:h-60 md:w-64 md:h-64 
                      lg:w-72 lg:h-72 xl:w-80 xl:h-80
                      rounded-lg transform transition duration-700 ease-in-out
                      hover:scale-${dept.images.scale} hover:shadow-2xl hover:-translate-y-2 
                      hover:brightness-110 hover:contrast-110`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* close sticky viewport */}
      </div>
      {/* spacer so footer only appears after the entire sticky scene */}
      <div className="h-[100vh]" aria-hidden></div>
    </div>
  );
};

export default TeamsOG; 