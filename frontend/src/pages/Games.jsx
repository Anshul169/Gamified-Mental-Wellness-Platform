// // import LeaderboardWin from "../components/LeaderboardWin"

// export default function Games() {
//   // const data = [
//   //   {
//   //     username: "ABC",
//   //     streak_count: 2,
//   //     score: 4,
//   //     createdAt: "10-03-2024"
//   //   },
//   //   {
//   //     username: "ABC",
//   //     streak_count: 2,
//   //     score: 4,
//   //     createdAt: "10-03-2024"
//   //   },
//   //   {
//   //     username: "ABC",
//   //     streak_count: 2,
//   //     score: 4,
//   //     createdAt: "10-03-2024"
//   //   },
//   //   {
//   //     username: "ABC",
//   //     streak_count: 2,
//   //     score: 4,
//   //     createdAt: "10-03-2024"
//   //   }
//   // ]
//   const games = [
//     {name: 'Wordle', desc: "", imgSrc:""},
//     {name: 'Game2', desc: "Engage in fun activities designed to improve your mental well-being and cognitive skills.", imgSrc:""},
//     {name: 'Game3', desc: "", imgSrc:""}
//   ]
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-6">
//         <h2 className="text-5xl font-bold text-center mb-12 text-[rgb(16,20,61)]">Mental Wellness Games</h2>
//         <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {games.map((game,index) => (
//                 <div key={index} className="bg-white shadow-md hover:shadow-lg transition-all hover:scale-105 duration-300 rounded-xl p-6 flex flex-col items-center justify-between border border-gray-200">
//                     <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{game.name}</h3>
//                     <p className="text-gray-600 text-center mb-6 text-base">
//                         {game.desc}
//                     </p>
//                     <button className="w-full bg-gray-800 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300">
//                         Play Now
//                     </button>
//                 </div>
//             ))}
//         </div>
//       </div>
//       {/* <LeaderboardWin data={data} /> */}
//     </section>
//   )
// }

import React from 'react';

const games = [
  {
    name: 'Wordle',
    details: 'A fun puzzle game to improve your brain power and logic.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU8utVUpqhnpX6tS5NxbSM_8GGa_SIR-DKMw&s', // Replace with actual game image URL
    themeColor: 'from-red-600 to-red-400', // Sudoku gradient theme
    url: "http://localhost:5173/game/wordle"
  },
  {
    name: 'Memory leak',
    details: 'Classic strategy game to challenge your mind and skills.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3POkpavwlEXMtAHXzSten2yEYo1aSRhIEMQ&s', // Replace with actual game image URL
    themeColor: 'from-green-600 to-green-400', // Chess gradient theme
    url: "http://localhost:5173/game/simon"
  },
];

// {
//   name: 'Word Search',
//   details: 'Find hidden words in a grid to exercise your vocabulary.',
//   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSToPiOl1_3ncneEfBtsT95ESEQiQavOkZ0mQ&s', // Replace with actual game image URL
//   themeColor: 'from-blue-400 to-blue-200', // Word Search gradient theme
//   url: "http://localhost:5173/game/simon"
// },
const Games = () => {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-center gap-8">
        {games.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Games;

export const GameCard = ({ game }) => {
  return (
    <div className={`border border-black max-w-sm mx-auto bg-gradient-to-r ${game.themeColor} rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl my-8`}>
      <img 
        src={game.image} 
        alt={game.name} 
        className="w-full h-48 object-cover object-center"
      />
      <div className="px-6 py-2">
        <h3 className="text-2xl font-semibold text-white mb-1">{game.name}</h3>
        <p className="text-white text-sm">{game.details}</p>
      </div>
      <div className="pl-2 py-4 bg-gray-100 flex justify-center items-center">
        <button className="bg-[rgb(16,20,61)] hover:bg-blue-700 rounded-md text-white px-4 py-2 shadow-md  transition-colors">
          <a href={`${game.url}`}>Play Now</a>
        </button>
      </div>
    </div>
  );
};