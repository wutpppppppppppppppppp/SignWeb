import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"

const Vocabulary = () => {
  const { category_name } = useParams()
  const [vocabularies, setVocabularies] = useState([])
  const [error, setError] = useState(null)
  // console.log(category_name)
  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await axios.get(`/api/vocabularies`, {
          params: { category_name },
        })
        // console.log(response)
        setVocabularies(response.data)
        setError(null)
      } catch (error) {
        console.error("Error fetching vocabularies:", error)
        setError("Error fetching vocabularies. Please try again later.")
      }
    }

    if (category_name) {
      fetchVocabularies()
    }
  }, [category_name])

  return (
    <div className="w-screen">
      <Navbar title={`คำศัพท์`} />
      <div className="p-4">
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-3 gap-4">
          {vocabularies.map((vocab, index) => (
            <div key={index} className="border p-4">
              {vocab.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vocabulary
