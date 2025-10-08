import React from "react";
import backgroundImage from "../images/backgroundImage.png";
import sponsorBackground from "../images/sponsorBackground.png";
import s5paisa from "../images/sponsors/5paisa.png";
import asmi from "../images/sponsors/Asmi.jpg";
import cakesAndCrumbs from "../images/sponsors/CakesAndCrumbs.jpg";
import cokeStudioBharat from "../images/sponsors/Coke_Studio_Bharat.png";
import idlish from "../images/sponsors/Idlish.jpg";
import kpop from "../images/sponsors/Kpop.jpg";
import pinItUp from "../images/sponsors/PinItUp.jpg";
import redBull from "../images/sponsors/Red-Bull-Logo.png";
import shfHealth from "../images/sponsors/SHF_health.jpg";
import calorieMinus from "../images/sponsors/calorie_minus.jpg";
import cocaCola from "../images/sponsors/coco-cola.png";
import foodAdda from "../images/sponsors/food_Adda.jpg";
import greenMonk from "../images/sponsors/greenMonk.jpeg";
import houseOfBramhma from "../images/sponsors/houseOfBramhma.png";
import khadiIndia from "../images/sponsors/khadiIndia.png";
import moonThrifts from "../images/sponsors/moon_thrifts.png";
import nuewFinesse from "../images/sponsors/nuew_finesse.png";
import prasuma from "../images/sponsors/prasuma.png";
import sana from "../images/sponsors/sana.png";
import simplyGaming from "../images/sponsors/simplygaming.png";
import yocket from "../images/sponsors/yocket.png";

const sponsors = [
  { id: 1, name: "5paisa", url: s5paisa },
  { id: 2, name: "Asmi", url: asmi },
  { id: 3, name: "Cakes And Crumbs", url: cakesAndCrumbs },
  { id: 4, name: "Coke Studio Bharat", url: cokeStudioBharat },
  { id: 5, name: "Idlish", url: idlish },
  { id: 6, name: "Kpop", url: kpop },
  { id: 7, name: "Pin It Up", url: pinItUp },
  { id: 8, name: "Red Bull", url: redBull },
  { id: 9, name: "SHF Health", url: shfHealth },
  { id: 10, name: "Calorie Minus", url: calorieMinus },
  { id: 11, name: "Coca Cola", url: cocaCola },
  { id: 12, name: "Food Adda", url: foodAdda },
  { id: 13, name: "Green Monk", url: greenMonk },
  { id: 14, name: "House of Bramhma", url: houseOfBramhma },
  { id: 15, name: "Khadi India", url: khadiIndia },
  { id: 16, name: "Moon Thrifts", url: moonThrifts },
  { id: 17, name: "Nuew Finesse", url: nuewFinesse },
  { id: 18, name: "Prasuma", url: prasuma },
  { id: 19, name: "Sana", url: sana },
  { id: 20, name: "Simply Gaming", url: simplyGaming },
  { id: 21, name: "Yocket", url: yocket },
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
                src={sponsor.url}
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
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square bg-[#3c2a1e] rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center cursor-pointer group w-full h-full"
              >
                {/* Sponsor Logo */}
                <img
                  src={sponsor.url}
                  alt={sponsor.name}
                  className="h-4/5 w-4/5 transition-all duration-300 group-hover:blur-lg rounded-2xl md:rounded-3xl object-contain"
                />

                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-amber">
                  <p className="text-2xl font-bold">{sponsor.name}</p>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom spacing for better proportions */}
        <div className="mt-8 md:mt-12 lg:mt-16"></div>
      </div>
    </div>
  );
}