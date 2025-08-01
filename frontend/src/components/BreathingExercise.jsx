import axios from "axios";
import { CirclePause, CirclePlay, Pause, Play } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { mediMusic } from "../assets/index";
const BreathingExercise = () => {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [phase, setPhase] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const currentUser = useSelector((state) => state?.user?.currentUser);
  console.log(currentUser);
  const [isPlaying, setIsPlaying] = useState(false);
  const phases = ["Breath In", "Hold", "Breath Out"];

  useEffect(() => {
    let timer;
    if (isPlaying && cycleCount < 5) {
      if (timeLeft > 0) {
        timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      } else {
        if (phase === "Breath Out") {
          if (cycleCount < 4) {
            setCycleCount((prev) => prev + 1);
          } else {
            setIsSessionActive(false); // End session after 5 cycles
          }
        }
        setPhase(phases[(phases.indexOf(phase) + 1) % phases.length]);
        setTimeLeft(
          getPhaseDuration(phases[(phases.indexOf(phase) + 1) % phases.length])
        );
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, phase, cycleCount]);

  const getPhaseDuration = (phase) => {
    switch (phase) {
      case "Breath In":
        return 4; // 4 seconds for breath in
      case "Hold":
        return 7; // 7 seconds to hold breath
      case "Breath Out":
        return 6; // 6 seconds for breath out
      default:
        return 0;
    }
  };

  const [time, setTime] = useState(0);
  const startSession = () => {
    let temp = new Date();
    setTime(temp);
    setIsSessionActive(true);
    setCycleCount(0);
    setPhase("Breath In");
    setTimeLeft(getPhaseDuration("Breath In"));
  };

  const stopSession = async () => {
    //call
    let timeScore = new Date();
    const t = parseInt((timeScore - time) / 1000);
    setIsSessionActive(false);
    setCycleCount(0);
    await axios.post("/api/v1/user/meditate/create", {
      username: currentUser?._doc?.username,
      time: t,
    });
  };

  const audioSrc = mediMusic;
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-xl border border-white p-4 min-h-[30vh] w-fit mx-auto shadow-xl gap-3">
      <h1 className="text-2xl font-semibold">Breathing Exercise</h1>
      {isSessionActive ? (
        <div className="text-xl">
          <p>{phase}</p>
          <p>{timeLeft} seconds</p>
        </div>
      ) : (
        <div>
          <p>Click to start your breathing session</p>
        </div>
      )}
      <div
        onClick={() => {
          isSessionActive ? stopSession() : startSession();
          togglePlayPause();
        }}
        className="bg-[rgb(16,20,61)] hover:bg-blue-700 text-white py-2 px-4 rounded-xl w-full"
      >
        <div className="flex justify-around">
          <audio
            ref={audioRef}
            src={audioSrc}
            onEnded={() => setIsPlaying(false)}
          />
          <span>
            <button
              onClick={togglePlayPause}
              className={`p-3 rounded-full focus:outline-none transition-transform duration-300
          ${isPlaying ? "bg-white text-black animate-pulse scale-110" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;

export function MusicPlayer() {
  const audioSrc =
    "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3";
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg text-white space-x-4">
      <button
        onClick={togglePlayPause}
        className={`p-3 rounded-full focus:outline-none transition-transform duration-300
          ${isPlaying ? "bg-white text-black animate-pulse scale-110" : "bg-gray-700 hover:bg-gray-600"}`}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </button>
      <span className="text-lg font-semibold">
        {isPlaying ? "Playing" : "Paused"}
      </span>
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}
