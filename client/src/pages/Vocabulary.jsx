// src/pages/Vocabulary.jsx
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
import SearchBox from "../components/SearchBox"

const Vocabulary = () => {
  const { categoryId } = useParams() // Assuming categoryId is passed via URL params
  const [vocabularies, setVocabularies] = useState([])

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await axios.get(
          `/api/categories/${categoryId}/vocabularies`
        )
        setVocabularies(response.data)
      } catch (error) {
        console.error("Error fetching vocabularies:", error)
      }
    }

    fetchVocabularies()
  }, [categoryId])

  return (
    <div className="w-screen">
      <Navbar title={`คำศัพท์`} />
      <div className="hero w-screen bg-[url('/src/assets/placeholder.png')]">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{categoryId}</h1>
            <SearchBox placeholder={"ค้นหาคำศัพท์ ..."} />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {vocabularies.map((vocab, index) => (
            <Link key={index} to={`/category/${categoryId}/${vocab._id}`}>
              <div className="border p-4">{vocab.name}</div>{" "}
              {/* Assuming 'name' field in vocabulary object */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vocabulary
