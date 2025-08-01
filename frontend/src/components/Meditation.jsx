import { useState, useEffect } from 'react'
import { Moon, Heart, Zap, Wind } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import BreathingExercise from '../components/BreathingExercise'
import axios from 'axios'

const categories = [
  { name: 'Sleep', icon: Moon, theme: { bgColor: 'bg-blue-100', textColor: 'text-blue-900', gradient: 'from-blue-300 via-blue-100 to-blue-50' } },
  { name: 'Inner Peace', icon: Heart, theme: { bgColor: 'bg-pink-100', textColor: 'text-pink-900', gradient: 'from-pink-200 via-pink-100 to-white' } },
  { name: 'Stress', icon: Zap, theme: { bgColor: 'bg-yellow-100', textColor: 'text-yellow-900', gradient: 'from-yellow-200 via-yellow-100 to-yellow-50' } },
  { name: 'Anxiety', icon: Wind, theme: { bgColor: 'bg-green-100', textColor: 'text-green-900', gradient: 'from-green-200 via-green-100 to-green-50' } },
]

const meditations = [
  {
    id: 1,
    title: 'Mindful Breathing',
    duration: '10 min',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNB-DiOLHIyMAQSXs3U1mrBWhn4Ga2-ubaqQ&s',
    bgColor: 'rgb(255,154,118)', // Vibrant Orange
  },
  {
    id: 2,
    title: 'Laughter time',
    duration: '15 min',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1rPMlS8_FhnYxhQy1LsUQ1iKOngPnUv4Fgw&s',
    bgColor: 'rgb(255,209,220)', // Pastel Pink
  },
  {
    id: 3,
    title: 'Guided Visualization',
    duration: '20 min',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNZl3zTskLhCQP4SZTcuqtRi88Z2QGddTapw&s',
    bgColor: 'rgb(174,225,225)', // Pastel Blue
  },
  {
    id: 4,
    title: 'Progressive Relaxation',
    duration: '30 min',
    image: 'https://images.squarespace-cdn.com/content/v1/5fa5ec79661ee904d2973ca0/1608218991352-VVQ4O65NM06XBN9F01ML/relaxing_photo_1.jpg?format=1500w',
    bgColor: 'rgb(224,224,224)', // Light Gray
  },
  {
    id: 5,
    title: 'Focused Attention',
    duration: '10 min',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF_AUbIWk4x_aNHNTZ4j-CGDLHK1IkjSLpZA&sy',
    bgColor: 'rgb(193,225,193)', // Pastel Green
  },
  {
    id: 6,
    title: 'Calming Sounds',
    duration: '12 min',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJs3sShikiCyiefF80i56MTO8zhgbOqs6AA&s',
    bgColor: 'rgb(255,235,59)', // Sunny Yellow
  },
]

export default function Meditation() {
  const [meditationData, setMeditationData] = useState([])

  const currentUser = useSelector(state => state?.user?.currentUser)
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const getMeditate = async () => {
    try {
      console.log(data)
      setMeditationData(data?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    axios.post("/api/v1/user/meditate/get", {
        username:  currentUser?._doc?.username,
    })
    .then(response => setMeditationData(response.data?.data))
    .catch(error => console.error(error.message))
  })

  const navigate = useNavigate()
  // if (!currentUser)
  //   return navigate("/")
  return (
    <main className={`min-h-screen ${selectedCategory.theme.bgColor} ${selectedCategory.theme.textColor} p-8 md:px-16 pb-20`}>
      {/* Header Section */}
      <header className="mb-12">
        <nav className="flex flex-wrap gap-4 justify-between items-center bg-slate-400 p-2 pl-6 rounded-2xl">
          <div className="text-3xl font-semibold">Hello, <span className='uppercase'>{currentUser?._doc?.username || "User"}</span></div>
          <ul className="flex flex-wrap space-x-6">
            {categories.map((category) => (
              <li key={category.name}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${selectedCategory.name === category.name
                    ? 'bg-gray-200 text-gray-800'
                    : 'hover:bg-gray-100'
                    }`}
                >
                  <category.icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section className={`shadow-sm border border-white rounded-2xl my-4 py-16 bg-gradient-to-r ${selectedCategory.theme.gradient}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div className="order-2 md:order-1 text-center md:text-left">
              <h2 className="text-4xl font-semibold mb-6">
                Discover the Power of Meditation
              </h2>
              <p className="text-lg leading-relaxed">
                Meditation is a powerful tool for reducing stress, improving focus, and promoting overall well-being. Our guided meditations are designed to help you cultivate mindfulness and inner peace in your daily life.
              </p>
            </div>

            <BreathingExercise />
          </div>
        </div>
      </section>

      <section className='mb-8'>
        <h2 className="text-3xl mt-8 font-semibold mb-6">Get Relaxed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {meditations.map((meditation) => (
            <div
              key={meditation.title}
              style={{ backgroundColor: meditation.bgColor }} // Set background color inline
              className="rounded-xl border border-white cursor-pointer shadow-md overflow-hidden transition-transform hover:scale-105"
              onClick={() => navigate(`/meditation/${meditation.id}`)}
            >
              <img
                src={meditation.image}
                alt={meditation.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{meditation.title}</h3>
                <p className="text-gray-600">{meditation.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-16 mb-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Analyse Your Meditation Sessions</h2>
        <p className="text-lg text-gray-600">Review your past sessions and track your progress over time.</p>
      </div>

      <div className="max-h-[40vh] overflow-auto rounded-lg bg-white shadow-inner p-6">
        <div className="flex justify-start items-center gap-6 overflow-x-auto py-4">
          {meditationData?.reverse().map((session, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-800">Session {index + 1}</p>
                <p className="text-gray-600">Duration: {session.time} seconds</p>
                <p className="text-sm text-gray-500">Date: {new Date(session.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}