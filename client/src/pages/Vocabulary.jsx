import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../hooks/api"
import Navbar from "../components/Navbar"
import SearchBox from "../components/SearchBox"
const Vocabulary = () => {
  const { category } = useParams()
  const [vocabularies, setVocabularies] = useState([])
  const [error, setError] = useState(null)
  // console.log(category)
  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await api.get(`/api/vocabularies`, {
          params: { category },
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
  }, [category])

  return (
    <div className="w-screen h-screen">
      <Navbar title={`คำศัพท์${category}`} />
      <div className="hero w-screen bg-[url(`data:image/png;base64,${this.state.image}`)]">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md mx-auto">
            <h1 className="mb-5 text-5xl font-bold">{category}</h1>
            <SearchBox placeholder={"ค้นหาคำศัพท์ ..."} />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-4 justify-center">
          {vocabularies.map((vocab, index) => (
            <Link key={index} to={`/category/${category}/${vocab.name}`}>
              <div className="border p-4 flex flex-col items-center">
                <b>{vocab.name}</b>
                {/* <div className="bg-cover bg-center" style="background-image: url(&)"></div> */}
                <img
                  src={`data:image/jpeg;base64,${vocab.picture}`}
                  alt={vocab.name}
                  className=""
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vocabulary
