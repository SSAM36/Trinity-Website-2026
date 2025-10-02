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
        className={`hidden md:flex fixed top-0 left-0 w-full z-50 items-center justify-between transition-all duration-300 px-10 ${
          scrolled
            ? "bg-[#0b1a3b]/30 py-3 backdrop-blur-md"
            : "bg-transparent py-6"
        }`}
        style={{
          fontFamily: "'Reggae One', cursive",
        }}
      >
        {/* Desktop layout: left links, centered logo, right links using 3-column grid to avoid overlap */}
        <div className="w-full grid grid-cols-3 items-center">
          {/* Left group (4) */}
          <nav className="flex space-x-8 items-center justify-start">
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
          <div className="flex items-center justify-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Trinity Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Right group (3) */}
          <nav className="flex space-x-8 items-center justify-end">
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
      <div className="md:hidden" style={{ fontFamily: "'Reggae One', cursive" }}>
        {/* Hamburger Button */}
        <button
          className="fixed top-4 right-4 z-50 p-3 rounded-full bg-[#0b1a3b]/90 shadow-lg backdrop-blur-sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          style={{ color: linkColor, border: `1px solid ${linkColor}` }}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 backdrop-blur-md flex flex-col items-center z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
          style={{
            backgroundColor: "rgba(11, 26, 59, 0.9)",
          }}
        >
          {/* ✅ Logo at top of mobile menu */}
          <div className="mt-10 mb-8">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logo} alt="Trinity Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center px-6 w-full">
            <div className="flex flex-col w-full max-w-sm space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                  style={({ isActive }) => ({
                    color: linkColor,
                    backgroundColor: isActive
                      ? "rgba(243, 207, 155, 0.2)"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(243,207,155,0.3)"
                      : "1px solid transparent",
                  })}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
