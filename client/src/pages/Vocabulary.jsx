import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
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
        const response = await axios.get(`/api/vocabularies`, {
          params: { category },
        })
        // console.log(response)
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
      <div className="hero w-screen bg-[url('https://as1.ftcdn.net/v2/jpg/01/92/00/78/1000_F_192007831_OGdxh37OAqmJpoMuWfgbKKYaQgpa9SJN.jpg')]">
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
                <img src={vocab.image} alt={vocab.name} className="" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vocabulary
