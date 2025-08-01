import React, { useState, useEffect } from "react";
const colorClasses = {
  blue: "bg-blue-700",
  green: "bg-green-500",
  yellow: "bg-yellow-300",
  red: "bg-red-600",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
};

function Simon() {
  const [gameSequence, setGameSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [level, setLevel] = useState(0);
  const [start, setStart] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [userLevel, setUserLevel] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
  const [currentColor, setCurrentColor] = useState(null);
  const colors = ["blue", "green", "yellow", "red", "orange", "pink"];

  useEffect(() => {
    if (start && gameSequence.length === 0) {
      nextPattern();
    }
  }, [start]);

  const nextPattern = () => {
    setLevel(level + 1);
    setUserLevel(0);
    setUserSequence([]);
    let len = difficulty === "easy" ? 3 : difficulty === "moderate" ? 4 : 6;
    const random = Math.floor(Math.random() * len);
    const newColor = colors[random];
    const newSequence = [...gameSequence, newColor];
    setGameSequence(newSequence);
    setCurrentColor(newColor);
    setTimeout(() => animateButton(newColor), 500);
  };

  const handleUserClick = (color) => {
    const newSequence = [...userSequence, color];
    setUserSequence(newSequence);
    animateButton(color);
    if (newSequence[userLevel] !== gameSequence[userLevel]) {
      resetGame("Game Over! Try Again");
      return;
    }
    setUserLevel(userLevel + 1);

    if (newSequence.length === level) {
      setUserLevel(0);
      nextPattern();
    }
  };

  const playSound = (name) => {
    const audio = new Audio(`../../audio/${name}.mp3`);
    audio.play();
  };

  const animateButton = (color) => {
    const button = document.getElementById(color);
    const blinkClass = `bg-neutral-700`;
    setTimeout(() => {
      button.classList.add(blinkClass);
      setTimeout(() => button.classList.remove(blinkClass), 300);
    }, 50);
    playSound(color);
    setTimeout(() => setCurrentColor(null), 500);
  };

  const resetGame = (message = "Game Over!") => {
    setLevel(0);
    setGameSequence([]);
    setUserSequence([]);
    setStart(false);
    setDifficulty(null);
    alert(message);
  };

  const startGame = (difficultyLevel) => {
    setDifficulty(difficultyLevel);
    setStart(true);
    setLevel(0);
    setGameSequence([]);
    setUserSequence([]);
    setUserLevel(0);
  };

  const getColorButtons = () => {
    const numberOfColors =
      difficulty === "easy" ? 3 : difficulty === "moderate" ? 4 : 6;
    return colors
      .slice(0, numberOfColors)
      .map((color, index) => (
        <button
          key={index}
          id={color}
          className={`w-20 h-20 rounded-full active:bg-white ${getColorClass(color)}`}
          onClick={() => handleUserClick(color)}
        ></button>
      ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">
        {start ? `Level: ${level}` : "Choose Difficulty"}
      </h1>

      <div className="relative w-full max-w-lg">
        {showRules && (
          <div className="absolute inset-0 bg-gray-800 p-4 rounded-lg shadow-lg z-10 text-left">
            <button
              className="text-red-500 text-xl absolute top-4 right-4"
              onClick={() => setShowRules(false)}
            >
              x
            </button>
            <h3 className="text-2xl mb-4">Rules</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>The game consists of a series of lights and sounds.</li>
              <li>
                The game unit will randomly generate a sequence of lights by
                lighting up different colored pads.
              </li>
              <li>
                The player's objective is to repeat the sequence by pressing the
                colored pads in the same order.
              </li>
              <li>
                With each success, an additional light is added to the sequence.
              </li>
              <li>Reproduce the sequence correctly to advance.</li>
              <li>If you make a mistake, the game ends.</li>
            </ul>
          </div>
        )}

        {!start && (
          <div className="grid grid-cols-3 gap-4 mt-8">
            <button
              className="bg-green-600 p-4 rounded"
              onClick={() => startGame("easy")}
            >
              Easy
            </button>
            <button
              className="bg-yellow-600 p-4 rounded"
              onClick={() => startGame("moderate")}
            >
              Moderate
            </button>
            <button
              className="bg-red-600 p-4 rounded"
              onClick={() => startGame("hard")}
            >
              Hard
            </button>
          </div>
        )}
      </div>

      {start && (
        <div
          className={`grid gap-4 mt-8 ${
            difficulty === "moderate" ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {getColorButtons()}
        </div>
      )}

      {currentColor && (
        <div className="text-2xl mt-4">
          Next Color:{" "}
          <span className={`font-bold ${getColorClass(currentColor)}`}>
            {currentColor}
          </span>
        </div>
      )}

      <footer className="mt-8">
        <button className="underline" onClick={() => setShowRules(!showRules)}>
          How to Play?
        </button>
      </footer>
    </div>
  );
}

function getColorClass(color) {
  return colorClasses[color] || "bg-gray-500";
}

export default Simon;
