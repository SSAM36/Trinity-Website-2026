import React from "react";
import backgroundImage from "../images/backgroundImage.png";
import sponsorBackground from "../images/sponsorBackground.png";
import { sponsors, sponsorImagesMap } from "../data/sponsorImages";
import { getCloudinaryUrl } from "../utils/cloudinary";

export default function Sponsor(compact = false) {
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
          {/* ===== Title Section ===== */}
          <div
            className={`relative flex justify-center ${
              compact ? "mb-3" : "mb-6"
            }`}
          >
            <div
              className={`inline-block text-center ${
                compact ? "px-5 py-2" : "px-8 py-3"
              } rounded-md bg-[#1A0F08] border border-[#8C6A3E] shadow-[0_10px_25px_rgba(0,0,0,0.5)]`}
            >
              <h2
                className={`${
                  compact ? "text-[22px]" : "text-[32px]"
                } md:text-[52px] leading-none text-[#E7B565]`}
                style={{ fontFamily: "'Reggae One', cursive" }}
              >
                OUR SPONSORS
              </h2>
            </div>
          </div>
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
          {sponsors.map((sponsor) => {
            const publicId = sponsorImagesMap[sponsor.key];
            const imageUrl = getCloudinaryUrl(publicId, { width: 300, quality: 75 });
            
            return (
              <div
                key={sponsor.id}
                className="aspect-square bg-stone-900 rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group cursor-pointer hover:scale-105"
                style={{
                  backgroundColor: "#3c2a1e",
                  boxShadow:
                    "inset 0 2px 4px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)",
                }}
              >
                <div className="relative aspect-square bg-[#3c2a1e] rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center cursor-pointer group w-full h-full">
                  {/* Sponsor Logo */}
                  <img
                    src={imageUrl}
                    alt={sponsor.name}
                    className="h-4/5 w-4/5 transition-all duration-300 group-hover:blur-lg rounded-2xl md:rounded-3xl object-contain"
                  />

                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-amber">
                    <p className="text-2xl font-bold">{sponsor.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom spacing for better proportions */}
        <div className="mt-8 md:mt-12 lg:mt-16"></div>
      </div>
    </div>
  );
}
