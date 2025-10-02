import React from "react";
import { useParams } from "react-router-dom";
import eventsByCategory from "../data/eventsByCategory";
import EventCard from "../components/EventCard";
import websiteBg from "../images/backgroundImage.png";

const EventCategoryPage = () => {
  const { category } = useParams();
  const events = eventsByCategory[category];

  if (!events) {
    return (
      <h2 className="text-center text-white text-2xl mt-20">
        No events found for "{category}"
      </h2>
    );
  }

  return (
    <>
      
      <section className="py-16 px-6 md:px-20"
        style={{
          backgroundImage: `url(${websiteBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >

        <h2 className="text-4xl font-bold text-center text-[#f3cf9b] mb-8 mt-12">
          {category} Events
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-[#2d1e12]">
          {events.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
        </div>
      </section>
    </>
  );
};

export default EventCategoryPage;
