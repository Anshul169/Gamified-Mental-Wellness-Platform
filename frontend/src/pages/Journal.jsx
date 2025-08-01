import { useForm } from 'react-hook-form'
import axios from "axios"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { NotebookPenIcon } from 'lucide-react/dist/cjs/lucide-react'

const Journal = () => {
  const currentUser = useSelector(state => state?.user?.currentUser)
  const { register, handleSubmit,setValue } = useForm({
    defaultValues: {
      content: ""
    }
  })
  const navigate = useNavigate()
  const [journals, setJournals] = useState([])
  useEffect(() => {
    axios.post("/api/v1/journal/recent", {
      userId: currentUser?._doc?._id
    }).then(response => {
      console.log(response)
      setJournals(response?.data?.data)
    }).catch(error => console.error(error))
  }, [])

  if (!currentUser)
    return navigate("/")
  return (
    <div className="container mb-8 mx-auto mt-8 max-w-2xl p-6 bg-gradient-to-r from-blue-50 via-teal-100 to-slate-100 rounded-xl shadow-lg">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        <NotebookPenIcon/> 
        Journal Entry</h1>
      <form onSubmit={handleSubmit(formData => {
        axios
          .post("/api/v1/journal/create", {
            userId: currentUser?._doc?._id,
            content: formData.content
          })
          .then(() => {alert("Journal saved successfully"); 
            axios.post("/api/v1/journal/recent", {
              userId: currentUser?._doc?._id
            }).then(response => {
              setJournals(response?.data?.data)
              setValue("content","")
            }).catch(error => console.error(error))
          } )
          .catch(error => console.log(error.message))
      })} className="mb-10">
        <textarea
          {...register("content", { required: true })}
          className="w-full h-48 p-4 text-gray-700 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none placeholder-gray-400 shadow-sm"
          placeholder="Speak up your thoughts..."
        />
        <button
          type="submit"
          className="w-full bg-[rgb(16,20,61)] hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg mt-6 transition duration-200 shadow-md"
        >
          Save Entry
        </button>
      </form>
      <div className="space-y-6">
        {journals.map((journal, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <p className="text-gray-800 text-lg leading-relaxed">{journal.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Journal