import { useState, useEffect } from "react";

const CountdownTimer = ({ showContent }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 12,
    minutes: 22,
    seconds: 50
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
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