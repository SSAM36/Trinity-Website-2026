import { useParams } from "react-router-dom";
import EventCard from "./EventCard";
import eventsByCategory from "../data/eventsByCategory";
import websiteBg from "/backgroundImage.png";


const DomainEvents = () => {
  const { domain } = useParams();
  const events = eventsByCategory[domain] || [];

  return (
    <section className="py-16 px-6 md:px-20 w-full min-h-screen"
    style={{
            backgroundImage: `url(${websiteBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#DBAB6A]">
          {domain} Events
        </h2>
        <p className="text-white text-lg">
          {domain === "Cultural" && "Dance, Drama, Music & More"}
          {domain === "Technical" && "Turn Ideas into Reality"}
          {domain === "Sports" && "Dare to Dominate"}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <EventCard key={index} event={event} style={{ backgroundColor: "#3e4a50" }} />
        ))}
      </div>
    </section>
  );
};

export default DomainEvents;