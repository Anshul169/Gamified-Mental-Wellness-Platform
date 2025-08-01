import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import Games from "./Games";
import Joke from "./Joke";
import { Button, Modal } from "flowbite-react";

export default function LandingPage() {
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const navigate = useNavigate();
  const [mood, setMood] = useState("How you're feeling today?");
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal state
  const moods = ["Sleepy", "Peaceful", "Stressed", "Anxiety"];

  const moodThemes = {
    Sleepy: {
      bg: "bg-gradient-to-b from-purple-50 to-purple-200",
      text: "text-purple-900",
      button: "bg-purple-500 hover:bg-purple-600",
    },
    Peaceful: {
      bg: "bg-gradient-to-b from-green-50 to-green-200",
      text: "text-green-900",
      button: "bg-green-500 hover:bg-green-600",
    },
    Stressed: {
      bg: "bg-gradient-to-b from-yellow-50 to-yellow-200",
      text: "text-yellow-900",
      button: "bg-yellow-500 hover:bg-yellow-600",
    },
    Anxiety: {
      bg: "bg-gradient-to-b from-blue-50 to-blue-200",
      text: "text-blue-900",
      button: "bg-blue-500 hover:bg-blue-600",
    },
  };

  const theme = moodThemes[mood] || moodThemes["Peaceful"];

  useEffect(() => {
    // This hook ensures the modal is shown only once when the user first lands on the page
    if (currentUser && !localStorage.getItem("moodSelected")) {
      setIsModalOpen(true);
    }
  }, [currentUser]);

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    localStorage.setItem("moodSelected", "true"); // Store mood selection in localStorage
    setIsModalOpen(false); // Close modal after mood selection
  };

  return (
    <main className={`min-h-screen ${theme.bg} ${theme.text} pb-16`}>
      <section
        className={`relative h-[80vh] flex items-center justify-center text-center ${theme.bg} ${theme.text} bg-gradient-to-tl`}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center">
          <img src="/homeImage2.png" className="h-28 w-28 mb-8 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl">
            Your Path to Inner Peace
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Discover resources, games, and meditations to nurture your mental
            well-being
          </p>
          {currentUser ? (
            // Mood is selected via the modal, no dropdown here
            ""
          ) : (
            <Button
              className={`mt-8 ${theme.button} text-white font-medium py-2 px-6 rounded-md transition duration-300`}
              onClick={() => {
                navigate("/user/authenticate");
              }}
            >
              Start Your Journey
            </Button>
          )}
        </div>
      </section>
      <Joke />
      <section className="py-16 lg:px-10">
        <div className="container mx-auto px-10 shadow-lg py-6 rounded-2xl bg-white">
          <h2 className={`text-5xl font-bold text-center mb-12 ${theme.text}`}>
            Understanding Mental Wellness
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="mb-6 text-lg text-gray-700 leading-relaxed">
                Mental wellness is a crucial aspect of overall health. It
                influences our thoughts, feelings, and actions. Prioritizing
                mental health can significantly improve your quality of life and
                resilience.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-700 text-lg">
                  <svg
                    className="mr-3 h-5 w-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7m8-4l-3 3m2-2l3 3m2-2l-3 3"
                    />
                  </svg>
                  1 in 5 adults experience mental illness each year
                </li>
                <li className="flex items-start text-gray-700 text-lg">
                  <svg
                    className="mr-3 h-5 w-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7m8-4l-3 3m2-2l3 3m2-2l-3 3"
                    />
                  </svg>
                  50% of all lifetime mental illness begins by age 14
                </li>
                <li className="flex items-start text-gray-700 text-lg">
                  <svg
                    className="mr-3 h-5 w-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7m8-4l-3 3m2-2l3 3m2-2l-3 3"
                    />
                  </svg>
                  Suicide is the 2nd leading cause of death among people aged
                  10-34
                </li>
              </ul>
              <Button
                className={`mt-8 ${theme.button} text-white font-medium py-2 px-6 rounded-md transition duration-300`}
                onClick={() => {
                  if (currentUser) navigate("/about");
                  else navigate("user/authenticate");
                }}
              >
                Discover More
              </Button>
            </div>
            <div className="flex justify-center">
              <Brain className="h-40 w-40 text-blue-700" />
            </div>
          </div>
        </div>
      </section>
      <div className="my-24"></div>
      <div
        className={`text-6xl my-10 flex justify-center text-center items-center font-bold ${theme.text}`}
      >
        Mindful Games
      </div>
      <Games />

      {/* Mood Selection Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>How's Your Mood 👀</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {moods.map((moodOption, index) => (
              <Button
                key={index}
                className="w-full py-4"
                onClick={() => handleMoodSelect(moodOption)}
              >
                {moodOption}
              </Button>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
}
