import React, { useState, useEffect } from "react";
import websiteBg from "../images/website bg for all pages.png";
import { GiSnake, GiEagleHead, GiLion } from "react-icons/gi";
import { FaFeatherAlt, FaHorse, FaStar } from "react-icons/fa";

function Leaderboard() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  const teamDefs = [
    { name: "Devadatta", color: "text-sky-200", icon: <FaStar className="text-sky-200 text-2xl sm:text-3xl md:text-4xl" /> },
    { name: "Vasuki", color: "text-green-400", icon: <GiSnake className="text-green-500 text-2xl sm:text-3xl md:text-4xl" /> },
    { name: "Mayura", color: "text-sky-400", icon: <FaFeatherAlt className="text-blue-400 text-2xl sm:text-3xl md:text-4xl" /> },
    { name: "Airavata", color: "text-gray-200", icon: <FaHorse className="text-gray-100 text-2xl sm:text-3xl md:text-4xl" /> },
    { name: "Garuda", color: "text-yellow-400", icon: <GiEagleHead className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl" /> },
    { name: "Simha", color: "text-orange-500", icon: <GiLion className="text-orange-500 text-2xl sm:text-3xl md:text-4xl" /> },
  ];

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/leaderboard`);
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const payload = await res.json();
        const rows = Array.isArray(payload?.data) ? payload.data : [];

        const scoreKey = "score";
        const nameKey = "teamname";
        const normalize = (s) => (typeof s === "string" ? s.trim().toLowerCase() : "");

        const nameToScore = new Map();
        for (const row of rows) {
          const rawName = row?.[nameKey];
          if (!rawName) continue;
          const scoreVal = row?.[scoreKey];
          const parsedScore = typeof scoreVal === "number"
            ? scoreVal
            : !isNaN(Number(scoreVal)) ? Number(scoreVal) : undefined;
          nameToScore.set(normalize(rawName), parsedScore);
        }

        const composed = teamDefs.map((t) => ({
          ...t,
          score: nameToScore.get(normalize(t.name)),
        }));

        composed.sort((a, b) => {
          const aHas = typeof a.score === "number";
          const bHas = typeof b.score === "number";
          if (aHas && bHas) return b.score - a.score;
          if (aHas) return -1;
          if (bHas) return 1;
          return 0;
        });

        setHouses(composed);
      } catch (err) {
        console.error(err);
        setHouses(teamDefs.map((t) => ({ ...t, score: undefined })));
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-black bg-cover bg-center flex flex-col py-2 sm:py-0"
      style={{ backgroundImage: `url(${websiteBg})` }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center tracking-widest font-[Cinzel_Decorative] bg-gradient-to-b from-[#FFD875] via-[#E6A93E] to-[#8C5A28] text-transparent bg-clip-text drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] mb-8 mt-8">
        LEADERBOARD
      </h1>

      <div className="w-full max-w-5xl mx-auto flex flex-col gap-3 px-4 sm:px-6">
        {loading ? (
          <p className="text-center text-gray-300 py-10">Loading...</p>
        ) : (
          houses.map((house, idx) => (
            <div
              key={idx}
              className="grid grid-cols-3 items-center bg-black/40 rounded-md py-3 px-4 sm:px-6 shadow-md"
            >
              <div className="flex justify-start">{house.icon}</div>
              <div className="text-center">
                <span className={`text-xl sm:text-2xl md:text-3xl font-semibold font-[IM_Fell_English_SC] ${house.color}`}>
                  {house.name}
                </span>
              </div>
              <div className="flex justify-end">
                <span className={`text-lg sm:text-xl md:text-2xl font-semibold font-[IM_Fell_English_SC] ${house.color}`}>
                  {typeof house.score === "number" ? house.score : "NA"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
