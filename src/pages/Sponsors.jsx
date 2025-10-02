import React from "react";
import backgroundImage from "../images/backgroundImage.png";
import sponsorBackground from "../images/sponsorBackground.png";

const sponsors = [
  { id: 1, name: "Google", logo: "/SponsorImages/dicegoogle.png" },
  { id: 2, name: "Coke Studio Bharat", logo: "https://djstrinity.com/sponsors/Coke_Studio_Bharat.png" },
  { id: 3, name: "Sponsor 3", logo: "https://djstrinity.com/sponsors/Coke_Studio_Bharat.png" },
  { id: 4, name: "Sponsor 4", logo: "https://djstrinity.com/sponsors/Coke_Studio_Bharat.png" },
  { id: 5, name: "Sponsor 5", logo: "https://djstrinity.com/sponsors/Coke_Studio_Bharat.png" },
  { id: 6, name: "Sponsor 6", logo: "https://djstrinity.com/sponsors/Coke_Studio_Bharat.png" },
  { id: 7, name: "Sponsor 7", logo: "https://djstrinity.com/sponsors/Coke_Studio_Bharat.png" },
  { id: 8, name: "Sponsor 8", logo: "https://djstrinity.com/sponsors/Coke_Studio_Bharat.png" },
  { id: 9, name: "Sponsor 9", logo: "https://djstrinity.com/sponsors/Coke_Studio_Bharat.png" },
];

export default function Sponsor() {
  return (
    <div
      className="min-h-screen bg-cover bg-center w-full bg-no-repeat flex items-center justify-center p-10 md:px-20"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="w-full max-w-5xl bg-cover bg-center bg-no-repeat rounded-3xl p-8 md:p-20 lg:p-16 xl:p-20 mt-12"
        style={{ backgroundImage: `url(${sponsorBackground})` }}
      >
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-[#2d1e12] mb-2 tracking-wider"
            style={{
              fontFamily:
                '"Copperplate Gothic", "Copperplate", "Trajan Pro", "Times New Roman", serif',
              letterSpacing: "0.1em",
            }}
          >
            OUR
          </h1>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-[#2d1e12] mb-6 md:mb-8 tracking-wider"
            style={{
              fontFamily:
                '"Copperplate Gothic", "Copperplate", "Trajan Pro", "Times New Roman", serif',
              letterSpacing: "0.1em",
            }}
          >
            SPONSORS
          </h1>
          <p
            className="text-lg md:text-xl lg:text-2xl text-black max-w-3xl mx-auto leading-relaxed"
            style={{
              fontFamily:
                '"Copper BT", "Copperplate", "Georgia", "Times New Roman", serif',
            }}
          >
            A heartfelt thank you to our sponsors - the true pillars of Trinity.
          </p>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="aspect-square bg-stone-900 rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group cursor-pointer hover:scale-105"
              style={{
                backgroundColor: "#3c2a1e",
                boxShadow:
                  "inset 0 2px 4px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)",
              }}
            >
              {/* <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain"
              /> */}
              {/* <div className="text-amber-200 opacity-0 group-hover:scale-130 transition-all duration-300 opacity-50">
                <svg 
                  className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p>{sponsor.name}</p>
              </div> */}
              <div
                key={sponsor.id}
                className="relative aspect-square bg-[#3c2a1e] rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center cursor-pointer group"
              >
                {/* Sponsor Logo */}
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-4/5 w-4/5 transition-all duration-300 group-hover:blur-sm rounded-2xl md:rounded-3xl "
                />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-[#002147]">
                  <p className="text-xl font-bold">{sponsor.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom spacing for better proportions */}
        <div className="mt-8 md:mt-12 lg:mt-16"></div>
      </div>
    </div>
  );
}