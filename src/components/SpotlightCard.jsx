import React, { useRef } from "react";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(230, 212, 53, 0.81)",
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
      {/* Spotlight layer */}
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

export default SpotlightCard;
