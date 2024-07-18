import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"

const Vocabulary = () => {
  const { categoryId } = useParams()
  const [vocabularies, setVocabularies] = useState([])
  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await axios.get(
          `/api/categories/${categoryId}/vocabularies`,
          { params: { categoryId } }
        )
        setVocabularies(response.data)
      } catch (error) {
        console.error("Error fetching vocabularies:", error)
      }
    }

    if (categoryId) {
      fetchVocabularies()
    }
  }, [categoryId])

  return (
    <div className="w-screen">
      <Navbar title={`คำศัพท์`} />
      <div className="p-4">
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
