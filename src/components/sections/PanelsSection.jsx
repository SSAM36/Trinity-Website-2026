import React, { useState } from 'react';
import deptBg from '../../images/dept description bg.png';
import hmpgbg from '../../images/hmpgbg.png';

const PanelsSection = () => {
  const [hoveredPanel, setHoveredPanel] = useState(null);
  
  const panelData = [
    {
      title: "Simha",
      content: "A figure of charismatic rage and protective power, Simha teaches that true strength lies in protecting what is right, and that courage is quiet but unwavering when faced with injustice."
    },
    {
      title: "Vasuki",
      content: "Wrapped around the universe as the great churning rope, Vasuki is the unique help of sacrifice. He represents patience in chaos, resilience under pressure, and the transformative nature of disciplined power."
    },
    {
      title: "Airavat",
      content: "Born from the cosmic churn of Samudra Manthan, Airavata is the rain-bringer, the cloud-carrier. A symbol of wisdom, grace, and balance, he reminds us that strength can be nurturing and gentle - a force that sustains rather than destroys."
    },
    {
      title: "Garuda",
      content: "The sworn enemy of serpents, yet driven not by hatred but by purpose. Garuda's story is one of defiance, loyalty, and liberation - the freedom fighter in the skies, reminding us that fight must always serve something greater."
    },
    {
      title: "Devdutta",
      content: "Devdutta is no ordinary steed - he represents anticipation, momentum and the arrival of change. A symbol of time in motion, he embodies progress, purpose, and the forward force that drives transformation."
    },
    {
      title: "Mayura",
      content: "Graceful yet fierce, the Mayura is elegance forged in fire. Feeding on venom but remaining pure, the peacock is a symbol of selfless courage, spiritual resilience, and the rare beauty of remaining untainted."
    }
  ];

  const aboutUsContent = "Trinity embodies the spirit of D.J. Sanghvi as the most anticipated and cherished annual socio-cultural, sports and technical festival. Trinity is a coalescence of innovation and technology, festivities and social responsibilities, and the competitive streak of sports. The grandeur of Trinity is sure to attract students not only from Mumbai but from colleges all around the world.";

  return (
    <div className="w-full">
      {/* Panels Section with Department Background */}
      {/* <div 
        className="w-full py-8 px-4 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${deptBg})`,
          backgroundSize: 'contain',
        }}
      >
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {panelData.map((panel, index) => (
              <div 
                key={index}
                className="bg-[#D4A574] rounded-lg p-3 shadow-md border border-[#B8956A] max-w-[220px] mx-auto transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group"
                style={{
                  backgroundColor: '#D4A574',
                  fontFamily: 'serif'
                }}
                onMouseEnter={() => setHoveredPanel(index)}
                onMouseLeave={() => setHoveredPanel(null)}
              >
                {/* Glow effect *//*}
                
                <h3 className="text-base font-bold text-[#2D1810] mb-2 text-center transition-all duration-300 group-hover:text-[#1A0F08] group-hover:scale-110" style={{ fontFamily: 'serif' }}>
                  {panel.title}
                </h3>
                <p className="text-[#2D1810] text-xs leading-snug text-justify transition-all duration-300 group-hover:text-[#1A0F08]" style={{ fontFamily: 'serif' }}>
                  {panel.content}
                </p>
                {/* Decorative corner elements *//*}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* About Us Section - Separate from background */}
      <section className="w-full py-16 px-4 ">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Plaque heading */}
          <div className="relative mb-6">
            <div className="px-8 py-3 rounded-md bg-[#1A0F08] border border-[#8C6A3E] shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
              <h2
                className="text-[28px] md:text-[32px] leading-none text-[#E7B565]"
                style={{ fontFamily: "'Reggae One', cursive" }}
              >
                About Us
              </h2>
            </div>
          </div>

          {/* Parchment card */}
          <div className="relative sm:w-[70%] w-[100%] px-4">
            {/* subtle inner vignette */}
            <div className="absolute inset-0 rounded-[28px]  pointer-events-none" />
            <div
              className="relative rounded-[58px] p-8 md:p-10 overflow-hidden border-2 border-[#B98F5C]"
              style={{
                backgroundImage: `url(${hmpgbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* parchment tint overlay for readability */}
              <div className="absolute inset-0 bg-[#D4A574]/80" />
              {/* decorative parchment pattern */}
              <div
                className="absolute inset-0 rounded-[36px] pointer-events-none"
                style={{
                  backgroundImage: `url(${hmpgbg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <p
                className="relative z-10 text-[#2D1810] text-[18px] md:text-[22px] text-center"
                style={{ fontFamily: 'serif' }}
              >
                {aboutUsContent}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
export default PanelsSection;
