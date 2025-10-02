import React from "react";
import { Link } from "react-router-dom";
import parchmentBg from "../images/sponsorBackground.png";
import eventsByCategory from "../data/eventsByCategory";

const Events = () => {
  return (
    <section
      className="w-full min-h-screen flex items-center justify-center px-6 md:px-20 pb-24 md:pb-32"
    >
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        {Object.keys(eventsByCategory).map((category) => (
          <Link
            key={category}
            to={`/events/${category}`}
            className="parchment-card text-center p-6 rounded-lg relative hover:scale-105 transition-transform"
            style={{
              backgroundImage: `url(${parchmentBg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3
              className="text-3xl md:text-5xl font-bold mb-2"
              style={{
                fontFamily: "Circe Contrast",
                fontSize: "43.5px",
                color: "#f3cf9b",
              }}
            >
              {category} Events
            </h3>
            <p
              className="text-sm"
              style={{
                fontFamily: "Circe Contrast",
                fontSize: "16.1px",
                color: "#f3cf9b",
              }}
            >
              {category === "Cultural" && "Dance, Drama, Music & More"}
              {category === "Technical" && "Turn Ideas into Reality"}
              {category === "Sports" && "Dare to Dominate"}
            </p>
          </Link>
        ))}
      </div>
      {/* spacer so footer appears only after cards */}
      <div className="h-12 md:h-20" aria-hidden />
    </section>
  );
};

export default Events;
