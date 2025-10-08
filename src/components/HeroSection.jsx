import React from "react";
import siteBg from "/website bg for all pages.png"; // ✅ rename file (no spaces)
import TrinityLogo from "/trinity_logo.png";
import SplashCursor from "./SplashCursor";

const HeroSection = () => {
  return (
    <main className="relative min-h-[calc(100vh-120px)] flex items-center justify-center overflow-hidden">
      {/* Full-page background */}
        <SplashCursor />
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${siteBg})` }}
      ></div>

      {/* Centered Trinity logo */}
      <div className="relative flex items-center justify-center h-full w-full">
        <img
          src={TrinityLogo}
          alt="Trinity Logo"
          className="w-64 h-auto md:w-96 lg:w-[28rem]"
        />
      </div>
    </main>
  );
};

export default HeroSection;