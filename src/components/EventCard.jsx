import React from "react";
import parchmentBg from "../images/sponsorBackground.png";

const EventCard = ({ event }) => {
  return (
    <div
      className="bg-gray-900 rounded-xl p-6"
      style={{
        backgroundImage: `url(${parchmentBg})`,
        backgroundSize: "cover",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3
        className="text-2xl font-seasons font-bold mb-2 text-grey-orange"
        style={{ fontSize: "41.1px" }}
      >
        {event.title}
      </h3>
      <p className="text-gray-400 mb-4">{event.description}</p>
      <div className="text-left text-sm">
        <p
          className="font-arapey text-light-grey mb-1"
          style={{ fontSize: "20.1px" }}
        >
          Date: {event.date}
        </p>
        <p
          className="font-arapey text-light-grey"
          style={{ fontSize: "20.1px" }}
        >
          Venue: {event.venue}
        </p>
      </div>
    </div>
  );
};

export default EventCard;