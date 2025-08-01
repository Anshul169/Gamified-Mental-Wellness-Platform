import React from 'react'
import { HeartPulseIcon } from 'lucide-react/dist/cjs/lucide-react'
import { useParams } from 'react-router-dom'

export default function MeditationDetail() {
  const data = new Map()
  data.set(1, {
    title: "Mindful Breathing",
    subtitle: "Take the pure air in",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVhlnibd8HAa0l9DVRem4ag9EZVZKBxzkcpQ&s",
    content: "Mindful breathing is a simple but powerful technique that helps us tune into the present moment, calm the mind, and promote relaxation. At its core, mindful breathing is about paying attention to each breath as it flows in and out of the body. Unlike regular breathing, which we often do automatically without noticing, mindful breathing involves a focused awareness on the experience of breathing. This practice, commonly used in mindfulness meditation, can be beneficial for managing stress, enhancing concentration, and improving emotional resilience."
  });
  data.set(2, {
    title: "Laughter Session",
    subtitle: "The Joyful Power of Laughter Exercises: Boosting Health and Happiness Through Playful Laughter",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1rPMlS8_FhnYxhQy1LsUQ1iKOngPnUv4Fgw&s",
    content: "Laughter exercises are a playful and effective way to boost mood, reduce stress, and enhance overall well-being. Often incorporated into laughter yoga sessions, these exercises encourage voluntary laughter, which, even when simulated, can quickly become genuine and contagious. Typical laughter exercises include clapping, chanting, playful movements, and deep belly laughs that are practiced in a group setting, fostering a sense of connection and joy. The physical act of laughing releases endorphins, the body's natural feel-good hormones, and lowers stress hormones like cortisol. It also stimulates circulation and improves muscle relaxation, which can help relieve some of the physical symptoms of stress. Studies show that regular laughter exercises can improve cardiovascular health, boost the immune system, and promote a positive outlook on life. Simple, fun, and highly effective, laughter exercises provide a lighthearted approach to cultivating joy and resilience in daily life."
  });
  data.set(3, {
    title: "Guided Visualization",
    subtitle: "A Journey of the Mind for Relaxation and Focus",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNZl3zTskLhCQP4SZTcuqtRi88Z2QGddTapw&s",
    content: "This 20-minute Guided Visualization session takes you on an imaginative journey, allowing your mind to envision peaceful scenes or accomplish personal goals. Visualization is a powerful tool for stress relief and mental clarity, often leaving you feeling recharged and motivated. You’ll be guided through visual exercises that can help you relax, focus, and foster positive feelings."
  });
  data.set(4, {
    title: "Progressive Relaxation",
    subtitle: "Relax Your Body, Calm Your Mind",
    imgSrc: "https://images.squarespace-cdn.com/content/v1/5fa5ec79661ee904d2973ca0/1608218991352-VVQ4O65NM06XBN9F01ML/relaxing_photo_1.jpg?format=1500w",
    content: "Progressive Relaxation is a 30-minute session aimed at relieving physical tension and promoting a deep sense of calm. By focusing on each muscle group, this practice encourages you to consciously relax your body from head to toe, which can help alleviate stress and promote better sleep. This technique is especially useful for releasing accumulated tension and stress in the body."
  });
  data.set(5, {
    title: "Focused Attention",
    subtitle: "Sharpen Your Mind with Intentional Focus",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF_AUbIWk4x_aNHNTZ4j-CGDLHK1IkjSLpZA&sy",
    content: "Focused Attention is a 10-minute meditation that trains the mind to concentrate on a single point, such as the breath or a specific thought. By practicing focused attention, you can enhance concentration, increase mental clarity, and reduce distractions. This technique is ideal for anyone looking to improve their focus and cultivate mindfulness."
  });
  data.set(6, {
    title: "Calming Sounds",
    subtitle: "Immerse Yourself in Soothing Natural Sounds",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJs3sShikiCyiefF80i56MTO8zhgbOqs6AA&s",
    content: "Calming Sounds is a 12-minute auditory journey that immerses you in soothing natural sounds like waves, birdsong, or gentle rain. This session is perfect for winding down or finding relaxation after a busy day, as it helps slow the mind and ease tension. Letting yourself get lost in these sounds can provide a peaceful mental escape, fostering a sense of tranquility."
  });


  const { id } = useParams()
  console.log(id)

  const obj = data.get(Number(id))
  return (
    <div className="min-h-[100vh] my-10 px-2 md:px-16 mx-8 md:mx-28 lg:mx-44">
      {/* Header */}
      <header className="flex flex-col justify-center items-center mb-10">
        <h1 className="text-4xl text-[rgb(16,20,61)] font-bold">{obj?.title}</h1>
        <p className="text-sm text-gray-500">{obj?.subtitle}</p>
      </header>

      {/* Image */}
      <div className="mt-8">
        <img src={obj?.imgSrc} alt="Meditation Image" className="w-full h-auto max-h-[45vh] object-cover rounded-xl" />
      </div>

      {/* Logo */}
      <div className="my-4 px-2 flex justify-center ">
        <HeartPulseIcon />
      </div>

      {/* Content */}
      <p className="my-4 flex flex-col justify-center items-center">
        {obj?.content}
      </p>
    </div>
  )
}