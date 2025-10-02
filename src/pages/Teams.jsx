import { useState, useRef, useEffect } from "react";
import photo1 from "../images/profimg.png";

const Teams = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const departments = [
    {
      name: "Mentors",
      images: {
        array: [photo1, photo1, photo1],
        scale: "110",
      },
    },
    {
      name: "Conveners",
      images: {
        array: [photo1, photo1, photo1],
        scale: "110",
      },
    },
    {
      name: "Technical Conveners",
      images: {
        array: [photo1, photo1, photo1],
        scale: "110",
      },
    },
    {
      name: "Cultural Conveners",
      images: {
        array: [photo1, photo1, photo1],
        scale: "110",
      },
    },
    {
      name: "Sports Conveners",
      images: {
        array: [photo1, photo1, photo1],
        scale: "110",
      },
    },
    {
      name: "Chairperson",
      images: {
        array: ["/teams/TeamsImg/47.png"],
        scale: "105",
      },
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
    },
    {
      name: "Secretary",
      images: {
        array: ["/teams/TeamsImg/40.png", "/teams/TeamsImg/41.png"],
        scale: "105",
      },
    },
    {
      name: "Treasurer",
      images: {
        array: ["/teams/TeamsImg/42.png", "/teams/TeamsImg/43.png"],
        scale: "105",
      },
    },

    {
      name: "Technical",
      images: {
        array: [
          "/teams/TeamsImg/12.png",
          "/teams/TeamsImg/13.png",
          "/teams/TeamsImg/14.png",
        ],
        scale: "105",
      },
    },
    {
      name: "Cultural",
      images: {
        array: [
          "/teams/TeamsImg/37.png",
          "/teams/TeamsImg/38.png",
          "/teams/TeamsImg/39.png",
        ],
        scale: "105",
      },
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
    },
    {
      name: "Sports HOD",
      images: {
        array: [
          "/teams/TeamsImg/6.png",
          "/teams/TeamsImg/7.png",
          "/teams/TeamsImg/8.png",
        ],
        scale: "105",
      },
    },
    {
      name: "Events",
      images: {
        array: [
          "/teams/TeamsImg/15.png",
          "/teams/TeamsImg/16.png",
          "/teams/TeamsImg/17.png",
        ],
        scale: "105",
      },
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
    },
    {
      name: "Marketing Head of Department",
      images: {
        array: ["/teams/TeamsImg/35.png", "/teams/TeamsImg/36.png"],
        scale: "105",
      },
    },
    {
      name: "Creatives Vice Chairperson ",
      images: {
        array: ["/teams/TeamsImg/1.png", "/teams/TeamsImg/2.png"],
        scale: "105",
      },
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
    },
    {
      name: "Editorial",
      images: {
        array: ["/teams/TeamsImg/23.png", "/teams/TeamsImg/24.png"],
        scale: "105",
      },
    },
    {
      name: "Publicity",
      images: {
        array: [
          "/teams/TeamsImg/18.png",
          "/teams/TeamsImg/19.png",
          "/teams/TeamsImg/20.png",
        ],
        scale: "105",
      },
    },
    {
      name: "Hospitality AR Vice Chairperson",
      images: {
        array: ["/teams/TeamsImg/25.png", "/teams/TeamsImg/26.png"],
        scale: "105",
      },
    },
    {
      name: "Hospitality AR Head of Department",
      images: {
        array: ["/teams/TeamsImg/27.png", "/teams/TeamsImg/28.png"],
        scale: "105",
      },
    },

    {
      name: "Operations",
      images: {
        array: [
          "/teams/TeamsImg/29.png",
          "/teams/TeamsImg/30.png",
          "/teams/TeamsImg/31.png",
        ],
        scale: "105",
      },
    },
    {
      name: "Security",
      images: {
        array: ["/teams/TeamsImg/21.png", "/teams/TeamsImg/22.png"],
        scale: "105",
      },
    },
  ];

  useEffect(() => {
    const scrollSpeedFactor = 2; // higher = slower scroll; still reaches last department
    const updateBodyHeight = () => {
      document.body.style.height = `${
        window.innerHeight * departments.length * scrollSpeedFactor
      }px`;
    };
    updateBodyHeight();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollFraction =
        scrollTop / (document.body.scrollHeight - window.innerHeight);
      const index = Math.min(
        departments.length - 1,
        Math.floor(scrollFraction * departments.length)
      );
      setCurrentIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateBodyHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBodyHeight);
      document.body.style.height = "auto";
    };
  }, [departments.length]);

  const getCardStyle = (index) => {
    const position = index - currentIndex;

    if (position === 1) {
      return {
        transform: `${
          window.innerWidth < 640
            ? "translateY(74vh)" // mobile
            : window.innerWidth < 1024
            ? "translateY(53vh)" // tablet
            : "translateY(60vh)" // desktop
        } scale(0.9)`, // peek next card from bottom, responsive
        opacity: 0.4,
        zIndex: 50,
        pointerEvents: "none",
        transition: "transform 1.2s ease-in-out, opacity 1.2s ease-in-out",
      };
    }

    if (position > 1) {
      return {
        transform: "translateY(100vh) scale(0.85)", // push fully out of view
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
    <div
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/GeminBGImg.png')" }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      <div className="text-center w-full relative" ref={containerRef}>
        {departments.map((dept, index) => (
          <div
            key={index}
            className="
              absolute 
              w-[80%] sm:w-[85%] md:w-[98%] lg:w-[100%] 
              max-h-[80vh] sm:max-h-[70vh] min-h-[40vh] overflow-y-auto
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              rounded-2xl shadow-2xl text-white p-12
              transition-all duration-700 ease-in-out
              backdrop-blur-lg border border-white/10
              bg-gray-800/30 
            "
            style={getCardStyle(index)}
          >
            <h2
              className="text-3xl md:text-5xl text-[#dbab6a] italic mb-6 text-center transition-transform duration-500 hover:scale-105"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {dept.name}
            </h2>

            <div
              className={`
                flex flex-col md:flex-row gap-4 sm:gap-6
                ${
                  dept.images.array.length > 2
                    ? "sm:flex-nowrap sm:overflow-x-auto sm:justify-center"
                    : "sm:justify-center"
                }
                w-[90%] sm:w-[70%] md:w-[100%] lg:w-[100%] xl:w-[90%]
              `}
              style={{ margin: "0 auto" }}
            >
              {dept.images.array.map((img, i) => (
                // <div
                //   key={i}
                //   className={`
                //     w-28 h-28
                //     sm:w-56 sm:h-56
                //     md:w-64 md:h-64
                //     lg:w-72 lg:h-72
                //     xl:w-80 xl:h-80
                //     bg-gray-200 rounded-lg overflow-hidden
                //     flex items-center justify-center
                //     border-2 border-[#dbab6a] border-opacity-50 shadow-md
                //     m-6
                //     transform transition duration-700 ease-in-out
                //     hover:scale-${dept.images.scale} hover:shadow-2xl hover:-translate-y-2 hover:brightness-110 hover:contrast-110
                //   `}
                // >
                <img
                  src={img}
                  alt={`Photo`}
                  className={`
                      w-full h-full object-contain
                       w-28 h-28
                    sm:w-56 sm:h-60
                    md:w-64 md:h-64
                    lg:w-72 lg:h-72
                    xl:w-80 xl:h-80
                     rounded-lg
                      transform transition duration-700 ease-in-out
                      hover:scale-${dept.images.scale} hover:shadow-2xl hover:-translate-y-2 hover:brightness-110 hover:contrast-110 
                    `}
                />
                // </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;