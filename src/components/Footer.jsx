import React from "react";
import { useLocation } from "react-router-dom";
import { Instagram, Linkedin, Heart, Youtube } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const gold = "#f3cf9b";
  const linkColor = "#dc9d4a";

  const socialLinks = [
    {
      icon: Instagram,
      link: "https://www.instagram.com/djsce.trinity/",
      label: "Instagram",
    },
    {
      icon: Youtube,
      link: "https://www.youtube.com/@DJSCETRINITY24",
      label: "YouTube",
    },
    {
      icon: Linkedin,
      link: "https://www.linkedin.com/company/djsce-trinity/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer
      className={"w-full border-t backdrop-blur-md relative"}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.97)",
        fontFamily: "'Reggae One', cursive",
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-4 gap-4">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <p className="text-sm" style={{ color: gold }}>
            © {new Date().getFullYear()} DJS Trinity. All rights reserved.
          </p>
        </div>

        {/* Center Section: Social Icons */}
        <div className="flex items-center space-x-4 justify-center">
          {socialLinks.map(({ icon: Icon, link, label }, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-transform hover:scale-110"
              style={{
                backgroundColor: "rgba(243,207,155,0.15)",
                color: linkColor,
                border: `1px solid ${gold}`,
              }}
              aria-label={label}
            >
              <Icon size={22} />
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="text-center md:text-right text-sm flex items-center" style={{ color: gold }}>
          <span>Made with</span>
          <Heart size={16} className="mx-1" style={{ color: gold }} />
          <span>by DJS Trinity</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
