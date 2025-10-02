import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const gold = "#f3cf9b";
  const linkColor = "#dc9d4a";

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div
          className="mx-auto mb-6 w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
          style={{
            backgroundColor: "rgba(243,207,155,0.12)",
            border: `1px solid ${gold}`,
            color: linkColor,
          }}
        >
          <span className="text-3xl font-bold">404</span>
        </div>

        <h1
          className="text-3xl md:text-4xl font-extrabold mb-3"
          style={{ color: gold, fontFamily: "'Reggae One', cursive" }}
        >
          Page not found
        </h1>

        <p className="mb-8 text-sm md:text-base" style={{ color: gold }}>
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-5 py-3 rounded-lg font-semibold transition-all duration-200"
            style={{
              color: linkColor,
              backgroundColor: "rgba(243, 207, 155, 0.15)",
              border: `1px solid ${gold}`,
            }}
          >
            Go to Home
          </Link>

          <Link
            to="/events"
            className="px-5 py-3 rounded-lg font-semibold transition-all duration-200"
            style={{
              color: linkColor,
              backgroundColor: "rgba(243, 207, 155, 0.08)",
              border: `1px solid rgba(243,207,155,0.3)`,
            }}
          >
            Explore Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
