import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../hooks/api"
import Navbar from "../components/Navbar"
import CatCard from "../components/CatCard"

const Vocabulary = () => {
  const { category } = useParams()
  const [vocabularies, setVocabularies] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await api.get(`/api/vocabularies/`, {
          params: { category: category },
        })
        setVocabularies(response.data)
        setError(null)
      } catch (error) {
        console.error("Error fetching vocabularies:", error)
        setError("Error fetching vocabularies. Please try again later.")
      }
    }

    if (category) {
      fetchVocabularies()
    }
  }, [category, vocabularies, error])

  return (
    <div className="w-screen h-screen">
      <Navbar title={`${category}`} />
      <div className="p-4">
        <div className="grid grid-cols-5 gap-4 py-4">
          {vocabularies.map((vocab, index) => (
            <Link key={index} to={`/category/${category}/${vocab.name}`}>
              <CatCard image={vocab.picture} title={vocab.name} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vocabulary
