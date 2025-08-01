const features = [
  {
    title: 'Brain Games',
    description: 'Enhance your cognitive skills with interactive, science-backed brain games.',
    icon: '🧠',
  },
  {
    title: 'Mindful Meditations',
    description: 'Practice guided mindfulness meditation to calm your mind and relieve stress.',
    icon: '🌱',
  },
  {
    title: 'Daily Affirmations',
    description: 'Receive daily positive affirmations to boost your self-esteem and outlook.',
    icon: '✨',
  },
  {
    title: 'Sleep Stories',
    description: 'Wind down with peaceful sleep stories designed to help you relax and sleep better.',
    icon: '🌙',
  },
]

const About = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-20 text-gray-700">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">About Us</h2>
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          Welcome to our mental wellness platform, dedicated to helping you achieve a balanced mind and body. Our tools and resources are thoughtfully designed to support your mental well-being, one step at a time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center transition-transform transform hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="text-5xl mb-4 text-blue-500">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
