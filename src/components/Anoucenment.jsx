// import React from "react";
// import hmpgbg from "../images/parch.png";

// const Anoucenment = (compact = false) => {
//   // 🔹 Example announcements object
//   const announcements = [
//     {
//       id: 1,
//       title: "Cultural Night",
//       description: "Explore student innovations and projects.",
//     },
//     {
//       id: 2,
//       title: "Sports Finals",
//       description: "Cheer for your favorite team in the finals.",
//     },
//     {
//       id: 3,
//       title: "Tech Expo",
//       description: "Explore student innovations and projects.",
//     },
//   ];

//   return (
//     <section className="w-full py-12 md:py-16 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div
//           className={`relative flex justify-center ${
//             compact ? "mb-3" : "mb-6"
//           }`}
//         >
//           <div
//             className={`inline-block text-center ${
//               compact ? "px-5 py-2" : "px-8 py-3"
//             } rounded-md bg-[#1A0F08] border border-[#8C6A3E] shadow-[0_10px_25px_rgba(0,0,0,0.5)]`}
//           >
//             <h2
//               className={`${
//                 compact ? "text-[20px]" : "text-[28px]"
//               } md:text-[32px] leading-none text-[#E7B565]`}
//               style={{ fontFamily: "'Reggae One', cursive" }}
//             >
//               Announcements
//             </h2>
//           </div>
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full text-white">
//           {announcements.map((item) => (
//             <div
//               key={item.id}
//               className="p-6 rounded-xl shadow-lg border border-white/10 bg-gray-900/70 
//                        transition-all duration-500 ease-in-out 
//                        hover:text-black hover:shadow-2xl cursor-pointer"
//               style={{
//                 backgroundImage: "none",
//               }}
//               onMouseEnter={(e) =>
//                 (e.currentTarget.style.backgroundImage = `url(${hmpgbg})`)
//               }
//               onMouseLeave={(e) =>
//                 (e.currentTarget.style.backgroundImage = "none")
//               }
//             >
//               <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
//               <p className="text-sm opacity-80">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Anoucenment;

import React from "react";
import hmpgbg from "../images/parch.png";

const Anoucenment = ({ compact = false }) => {
  // 🔹 Example announcements
  const announcements = [
    {
      id: 1,
      title: "Cultural Night",
      description: "An evening filled with music, dance, and performances.",
      date: "October 15, 2025",
      time: "7:00 PM – 10:00 PM",
    },
    {
      id: 2,
      title: "Sports Finals",
      description: "Cheer for your favorite teams as they battle for glory.",
      date: "October 18, 2025",
      time: "9:00 AM – 1:00 PM",
    },
    {
      id: 3,
      title: "Tech Expo",
      description: "Explore innovative student tech projects and prototypes.",
      date: "October 20, 2025",
      time: "11:00 AM – 4:00 PM",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ===== Title Section ===== */}
        <div
          className={`relative flex justify-center ${
            compact ? "mb-3" : "mb-6"
          }`}
        >
          <div
            className={`inline-block text-center ${
              compact ? "px-5 py-2" : "px-8 py-3"
            } rounded-md bg-[#1A0F08] border border-[#8C6A3E] shadow-[0_10px_25px_rgba(0,0,0,0.5)]`}
          >
            <h2
              className={`${
                compact ? "text-[22px]" : "text-[32px]"
              } md:text-[36px] leading-none text-[#E7B565]`}
              style={{ fontFamily: "'Reggae One', cursive" }}
            >
              Announcements
            </h2>
          </div>
        </div>

        {/* ===== Table Section ===== */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-white rounded-xl overflow-hidden shadow-xl text-[17px] md:text-[18px]">
            <thead>
              <tr className="bg-[#1A0F08] border-b border-[#8C6A3E]">
                <th className="py-4 px-6 text-left text-[#E7B565] font-semibold">
                  #
                </th>
                <th className="py-4 px-6 text-left text-[#E7B565] font-semibold">
                  Title
                </th>
                <th className="py-4 px-6 text-left text-[#E7B565] font-semibold">
                  Description
                </th>
                <th className="py-4 px-6 text-left text-[#E7B565] font-semibold">
                  Date
                </th>
                <th className="py-4 px-6 text-left text-[#E7B565] font-semibold">
                  Time
                </th>
              </tr>
            </thead>

            <tbody>
              {announcements.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-gray-900/60 border-b border-[#8C6A3E]/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(231,181,101,0.25)]"
                  style={{
                    backgroundImage: `url(${hmpgbg})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <td className="py-4 px-6 font-medium">{index + 1}</td>
                  <td className="py-4 px-6 font-semibold">{item.title}</td>
                  <td className="py-4 px-6 opacity-90 relative">
                    {item.description}
                    {/* Golden line under description */}
                    <div className="absolute left-0 bottom-0 w-full h-[1px] bg-[#E7B565] opacity-70"></div>
                  </td>
                  <td className="py-4 px-6">{item.date}</td>
                  <td className="py-4 px-6">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Anoucenment;