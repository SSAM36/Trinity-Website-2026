import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../images/trinity_logo.png"; // ✅ import your logo
// Using global app background instead of setting one here for seamless look

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Home removed since landing loads directly
  const navLinks = [
    { title: "Events", path: "/events" },
    { title: "Teams", path: "/teams" },
    { title: "Gallery", path: "/gallery" },
    { title: "Sponsors", path: "/sponsors" },
    { title: "Leaderboard", path: "/leaderboard" },
    { title: "Registrations", path: "/registrations" },
    { title: "Contact Us", path: "/contact" },
  ];

  // Left side: 4 links (Events, Teams, Gallery, Sponsors)
  const leftLinks = navLinks.slice(0, 4);
  // Right side: remaining 3 (Leaderboard, Registrations, Contact Us)
  const rightLinks = navLinks.slice(4);

  const linkColor = "#dc9d4a"; // gold color

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`hidden lg:flex fixed top-0 left-0 w-full z-50 items-center justify-between transition-all duration-300 px-10 ${
          scrolled
            ? "bg-[#0b1a3b]/40 py-2.5 backdrop-blur-md border-b border-white/10"
            : "bg-gradient-to-b from-[#0b1a3b]/30 to-transparent py-4 border-b border-transparent"
        }`}
        style={{
          fontFamily: "'Reggae One', cursive",
        }}
      >
        {/* Desktop layout: left links, centered logo, right links using 3-column grid to avoid overlap */}
        <div className="w-full grid grid-cols-3 items-center">
          {/* Left group (4) */}
          <nav className="flex space-x-4 xl:space-x-8 items-center justify-start relative z-10">
            {leftLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="px-3 py-2 font-semibold rounded-lg transition-all duration-200 whitespace-nowrap"
                style={({ isActive }) => ({
                  color: linkColor,
                  backgroundColor: isActive ? "rgba(243, 207, 155, 0.2)" : "transparent",
                  border: isActive ? "1px solid rgba(243,207,155,0.3)" : "1px solid transparent",
                })}
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          {/* Center logo */}
          <div className="flex items-center justify-center pointer-events-none">
            <Link to="/" className="flex items-center space-x-2 pointer-events-auto">
              <img src={logo} alt="Trinity Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Right group (3) */}
          <nav className="flex space-x-4 xl:space-x-8 items-center justify-end relative z-10">
            {rightLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="px-3 py-2 font-semibold rounded-lg transition-all duration-200 whitespace-nowrap"
                style={({ isActive }) => ({
                  color: linkColor,
                  backgroundColor: isActive ? "rgba(243, 207, 155, 0.2)" : "transparent",
                  border: isActive ? "1px solid rgba(243,207,155,0.3)" : "1px solid transparent",
                })}
              >
                {link.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Navbar */}
      <div className="lg:hidden" style={{ fontFamily: "'Reggae One', cursive" }}>
        {/* Mobile Top Bar: Centered Logo + Right Hamburger */}
        <div className="fixed top-0 left-0 w-full h-14 z-60 flex items-center justify-center bg-transparent backdrop-blur-sm border-b border-white/10">
          <Link to="/" className="pointer-events-auto">
            <img src={logo} alt="Trinity Logo" className="h-10 w-auto" />
          </Link>
          {/* Hamburger Button (right) */}
          <button
            className="absolute right-4 p-2.5 rounded-full shadow-[0_0_20px_rgba(219,171,106,0.25)] ring-1 ring-[#dbab6a]/50 bg-black/20 backdrop-blur-md hover:ring-[#dbab6a] hover:shadow-[0_0_28px_rgba(219,171,106,0.45)] transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: linkColor }}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
          style={{
            background: "radial-gradient(1200px 600px at 50% -10%, rgba(219,171,106,0.20), rgba(11,26,59,0.92) 35%, rgba(6,12,28,0.98) 100%)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* ✅ Logo at top of mobile menu */}
          <div className="mt-20 mb-6">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logo} alt="Trinity Logo" className="h-16 w-auto drop-shadow-[0_8px_24px_rgba(219,171,106,0.35)]" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center px-6 w-full">
            <div className="flex flex-col w-full max-w-sm space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="w-full text-center px-6 py-3 rounded-md font-semibold transition-all duration-200 border border-[#8C6A3E]/60 bg-[rgba(20,14,9,0.55)] hover:bg-[rgba(26,15,8,0.75)] shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
                  style={({ isActive }) => ({
                    color: linkColor,
                    boxShadow: isActive ? "0 0 18px rgba(219,171,106,0.35)" : "0 6px 18px rgba(0,0,0,0.35)",
                    borderColor: isActive ? "rgba(219,171,106,0.9)" : "rgba(140,106,62,0.6)",
                    background: isActive ? "linear-gradient(180deg, rgba(30,20,12,0.85), rgba(20,13,8,0.85))" : "rgba(20,14,9,0.55)",
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </NavLink>
              ))}
            </div>

            {/* Decorative bottom ridge */}
            <div className="w-full max-w-sm mt-8 h-[1px] bg-gradient-to-r from-transparent via-[#dbab6a] to-transparent opacity-60" />
            <div className="mt-3 text-xs tracking-widest text-[#dbab6a]/70" style={{fontFamily: "'Fondamento', serif"}}>TRINITY • 2026</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
