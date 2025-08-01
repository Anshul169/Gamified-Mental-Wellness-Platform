import React, { useState, useEffect } from 'react'
import { Smile, RefreshCw } from 'lucide-react'

const Joke = () => {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchJoke = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke')
      const data = await response.json()
      setJoke(data)
    } catch (error) {
      console.error("Error fetching joke:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJoke()
  }, [])

  return (
    <div className="container mx-auto max-w-lg mt-12 my-8 md:w-[80%] p-8 bg-white rounded-2xl shadow-md text-center">
      <div className="flex justify-center items-center mb-6 text-indigo-500">
        {/* <Smile size={32} /> */}
        <h2 className="text-3xl font-semibold text-gray-800 ml-2">😆Need a Laugh?</h2>
      </div>

      {loading ? (
        <p className="text-gray-500 mb-4">Loading...</p>
      ) : (
        joke && (
          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-2 font-medium">{joke.setup}</p>
            <p className="text-lg text-indigo-600 font-semibold">{joke.punchline}</p>
          </div>
        )
      )}

      <button
        onClick={fetchJoke}
        className="inline-flex items-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        <RefreshCw size={20} className="mr-2" />
        Get Another Joke
      </button>
    </div>
  )
}

export default Joke