import React, { useState, useEffect } from 'react';
// import parchmentBg from '../assets/images/20250727_1941_Vintage Parchment Design.png';

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 5, hours: 0, minutes: 0, seconds: 0 // Static for demo, adjust as needed
  });

  useEffect(() => {
    const targetDate = new Date("2025-12-15T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative">
      <div className="parchment-card w-full max-w-4xl mx-auto">
        <h1 className="font-copperplate font-bold text-gold mb-4" style={{ fontSize: '24.6px' }}>
          THE ULTIMATE LINEUP OF 2025 AWAITS YOU
        </h1>
        <p className="font-coldiac text-white mb-6" style={{ fontSize: '13.3px' }}>
          COMPETE CREATE CELEBRATE !!!
        </p>
        <h2 className="font-copperplate font-bold mb-8 tracking-widest" style={{ fontSize: '37.6px', color: '#e1f7ff' }}>
          COMING EVENT
        </h2>
        <div className="flex justify-center space-x-6 text-center mb-6">
          {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, idx) => {
            const val = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][idx];
            return (
              <div key={label} className="bg-black/40 rounded-lg px-4 py-2">
                <div className="font-arapey font-bold text-white" style={{ fontSize: '36.1px' }}>{val}</div>
                <div className="text-sm text-gray-400 font-arapey">{label}</div>
              </div>
            );
          })}
        </div>
        <p className="font-arapey" style={{ fontSize: '20.1px', color: '#d9d9d9' }}>
          Fashion Show, IDPT Bands, IDPT Dance Battle
        </p>
      </div>
    </section>
  );
};

export default Hero;