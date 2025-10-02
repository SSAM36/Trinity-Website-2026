import React from 'react';
import hmpgbg from '../../images/hmpgbg.png';
import un from "../../images/unnamed.png";

const LeaderMessageSection = ({ imageSrc, title = 'Dr. Hari Vasudevan', children }) => {
  const defaultText = `In a short span of 30 years, Dwarkadas J. Sanghvi College of Engineering (DJSCE), an Autonomous Institution, affiliated to the University of Mumbai and owned by SVKM has come a long way and has made its impact felt not only in the country, but also abroad. Our students have been performing exceedingly well in national and globally competent multinational companies and also in the universities in India and abroad as they pursue their higher education.`;

  return (
    <section className="w-full py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="w-full bg-[#232d41] rounded-2xl p-4 md:p-6 shadow-2xl/70">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left: Image */}
            <div className="w-full">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                {imageSrc ? (
                  <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <div className="aspect-[16/10] w-full bg-neutral-900 flex items-center justify-center text-neutral-400 text-sm " style={{ backgroundImage: `url(${un})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  
                  </div>
                )}
              </div>
            </div>

            {/* Right: Text on textured background (not page background) */}
            <div className="relative rounded-3xl overflow-hidden ">
              {/* texture */}
              <div
                className="absolute inset-0 bg-center bg-fit"
                style={{
                  backgroundImage: `url(${hmpgbg})`,
                }}
              />
              {/* dark overlay for readability */}
              <div className="absolute inset-0  " />

              <div className="relative p-6 md:p-8">
                <h3
                  className="text-amber-800 text-2xl md:text-3xl mb-4"
                  style={{ fontFamily: "'Reggae One', cursive" }}
                >
                  {title}
                </h3>
                <p className="text-lg text-black" style={{ fontFamily: 'serif' }}>
                  {children || defaultText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderMessageSection;
