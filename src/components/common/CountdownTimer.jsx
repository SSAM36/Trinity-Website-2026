import { useState, useEffect } from "react";

const calculateTimeLeft = () => {
  const targetDate = new Date("2025-10-17T17:00:00+05:30");
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const CountdownTimer = ({ showContent }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center space-y-0.5 sm:space-y-2 md:space-y-3">
      <div className="grid grid-cols-4 gap-1 max-w-[240px] sm:max-w-md mx-auto mb-1 sm:mb-2 md:mb-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="text-center p-1.5 sm:p-2 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300">
          <div className="countdown-digit font-cinzel text-[11px] sm:text-base md:text-lg lg:text-xl drop-shadow-lg" style={{ color: '#E0C98F' }}>{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="text-[10px] sm:text-xs uppercase tracking-wider font-fondamento font-semibold" style={{ color: '#E0C98F' }}>Days</div>
        </div>
        <div className="text-center p-1.5 sm:p-2 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300">
          <div className="countdown-digit font-cinzel text-[11px] sm:text-base md:text-lg lg:text-xl drop-shadow-lg" style={{ color: '#E0C98F' }}>{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-[10px] sm:text-xs uppercase tracking-wider font-fondamento font-semibold" style={{ color: '#E0C98F' }}>Hrs</div>
        </div>
        <div className="text-center p-1.5 sm:p-2 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300">
          <div className="countdown-digit font-cinzel text-[11px] sm:text-base md:text-lg lg:text-xl drop-shadow-lg" style={{ color: '#E0C98F' }}>{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-[10px] sm:text-xs uppercase tracking-wider font-fondamento font-semibold" style={{ color: '#E0C98F' }}>Mins</div>
        </div>
        <div className="text-center p-1.5 sm:p-2 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300">
          <div className="countdown-digit font-cinzel text-[11px] sm:text-base md:text-lg lg:text-xl drop-shadow-lg" style={{ color: '#E0C98F' }}>{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="text-[10px] sm:text-xs uppercase tracking-wider font-fondamento font-semibold" style={{ color: '#E0C98F' }}>Secs</div>
        </div>
      </div>

      <p className={`text-foreground uppercase tracking-widest text-[12px] text-[#ffffff] sm:text-lg md:text-xl lg:text-2xl font-fondamento font-bold drop-shadow-lg transition-all duration-1000 delay-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        STAY TUNED
      </p>
    </div>
  );
};

export default CountdownTimer;