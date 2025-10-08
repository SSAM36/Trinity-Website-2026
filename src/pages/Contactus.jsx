import React, { useEffect, useRef } from "react";
import { MapPin, Phone, Mail, User } from "lucide-react";
import websiteBg from "../images/website bg for all pages.png";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(243, 207, 155, 0.25)", // gold spotlight
}) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`relative group rounded-xl overflow-hidden ${className}`}
    >
      {/* Spotlight effect layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 40%)`,
        }}
      />
      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const Contact = (compact=false) => {
  useEffect(() => {
    document.title = "Contact Us - Trinity";
  }, []);

  const contacts = [
    {
      role: "Joint Chairperson",
      name: "Ratnesh Amrute",
      phone: "+91 9967936703",
      icon: User,
    },
    {
      role: "Joint Chairperson",
      name: "Aaditya Mehta",
      phone: "+91 9820743742",
      icon: User,
    },
  ];

  const gold = "#dc9d4a";

  return (
    <div
      className="relative min-h-screen text-white bg-cover bg-center bg-no-repeat bg-fixed font-body"
      style={{
        backgroundImage: `url(${websiteBg})`,
      }}
    >
      {/* Removed dark overlay to reveal background */}

      <div className="relative z-10 px-6 pt-0 pb-16 md:pt-02 md:pb-02 lg:pt-28 lg:pb-24 max-w-7xl mx-auto">
        <div className="text-center text-foreground mt-8">
          {/* Your other page content */}
        </div>
        {/* Header */}
        <div className="text-center mb-16" style={{ fontFamily: "'Reggae One', cursive" }}>
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
                CONTACT US
              </h2>
            </div>
          </div>
          <p className="font-body text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with the Trinity team to join D.J. Sanghvi’s premier festival of innovation, sports, and culture, attracting students from Mumbai and beyond.
          </p>
        </div>

        {/* Team Section */}
        <h2 className="text-3xl font-bold mb-8 text-center uppercase" style={{ color: gold }}>
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contacts.map((contact, index) => (
            <SpotlightCard
              key={index}
              className="bg-black/20 border p-6 shadow-lg transition"
              spotlightColor="rgba(243, 207, 155, 0.25)"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-[#f3cf9b]/30 p-3 rounded-full">
                  <contact.icon className="text-[#f3cf9b]" size={22} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg" style={{ color: gold }}>
                    {contact.role}
                  </h4>
                  <p className="font-body text-gray-200 font-medium">{contact.name}</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center space-x-2 mt-2 text-sm font-medium"
                    style={{ color: gold }}
                  >
                    <Phone size={14} />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Location */}
          <SpotlightCard className="bg-black/20 border p-6 shadow-lg transition" spotlightColor="rgba(243, 207, 155, 0.25)">
            <div className="flex items-start space-x-4">
              <div className="bg-[#f3cf9b]/30 p-3 rounded-full">
                <MapPin className="text-[#f3cf9b]" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: gold }}>
                  Visit Us
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  DJ Sanghvi College of Engineering
                  <br />
                  Plot No. U-15, Juhu Versova Link Road
                  <br />
                  Vile Parle (West), Mumbai - 400056
                  <br />
                  Maharashtra, India
                </p>
              </div>
            </div>
          </SpotlightCard>

          {/* Quick Contact */}
          <SpotlightCard className="bg-black/20 border p-6 text-center shadow-lg transition" spotlightColor="rgba(243, 207, 155, 0.25)">
            <div className="bg-[#f3cf9b]/30 p-3 rounded-full inline-block mb-4">
              <Mail className="text-[#f3cf9b]" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: gold }}>
              Quick Contact
            </h3>
            <h2 className="text-xl mb-2" style={{ color: gold }}>
              djscetrinityfest@gmail.com
            </h2>
            <p className="text-gray-300 text-sm">
              For immediate queries, reach out to our team leads directly.
            </p>
          </SpotlightCard>
        </div>

        {/* Map Section */}
        <SpotlightCard className="bg-black/20 border overflow-hidden shadow-lg transition" spotlightColor="rgba(243, 207, 155, 0.25)">
          <div className="p-6 pb-4 text-center">
            <h3 className="text-2xl font-bold mb-4" style={{ color: gold }}>
              Find Us
            </h3>
          </div>
          <div className="px-6 pb-6">
            <div className="w-full h-96 rounded-xl overflow-hidden border border-[#f3cf9b]/40">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.0123456789!2d72.8261!3d19.1058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9578066a8d7%3A0x6de440c1d2c9a0c4!2sDJ%20Sanghvi%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DJ Sanghvi College of Engineering Location"
              ></iframe>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Contact;
