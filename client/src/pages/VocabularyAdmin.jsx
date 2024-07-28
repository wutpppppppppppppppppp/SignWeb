import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../hooks/api"
import Navbar from "../components/Navbar"
import CatCard from "../components/CatCard"
import Pagination from "../components/Pagination"

const itemsPerPage = 15

const Vocabulary = () => {
  const { categoryad } = useParams()
  const [vocabularies, setVocabularies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentVocabularies, setCurrentVocabularies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await api.get(`/api/vocabularies/`, {
          params: { category: categoryad },
        })
        setVocabularies(response.data)
        setError(null)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching vocabularies:", error)
        setError("Error fetching vocabularies. Please try again later.")
        setLoading(false)
      }
    }

    if (categoryad) {
      fetchVocabularies()
    }
  }, [categoryad])

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    setCurrentVocabularies(
      vocabularies.slice(indexOfFirstItem, indexOfLastItem)
    )
  }, [vocabularies, currentPage])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar title={`${categoryad}`} />
      <div className="p-4 flex-grow">
        {error && <div className="text-red-600">{error}</div>}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4 py-4">
            {currentVocabularies.map((vocab, index) => (
              <Link key={index} to={`/record/${categoryad}/${vocab.name}`}>
                <CatCard image={vocab.image} title={vocab.name} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="self-stretch justify-self-center flex flex-col items-center gap-10">
        <Pagination
          totalItems={vocabularies.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
        <div className="bg-primary-content text-primary text-sm py-2 text-center w-full">
          <p>เลขที่พอร์ตปัจจุบัน (Port): 14053</p>
          <p>เลขที่ไอพีปัจจุบัน (IP Address): 172.20.10.3</p>
        </div>
      </div>
    </div>
  )
}

export default Vocabulary
