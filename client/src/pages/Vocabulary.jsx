import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../hooks/api"
import Navbar from "../components/Navbar"
import CatCard from "../components/CatCard"
import Pagination from "../components/Pagination"

const itemsPerPage = 15

const Vocabulary = () => {
  const { category } = useParams()
  const [vocabularies, setVocabularies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentVocabularies, setCurrentVocabularies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await api.get(`/api/vocabularies/`, {
          params: { category: category },
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

    if (category) {
      fetchVocabularies()
    }
  }, [category])

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

  const isPlaceholder = (image) =>
    image === "vocab_placeholder" || image === "category_placeholder"

  return (
    <div className="h-screen flex flex-col">
      <Navbar title={`${category}`} />
      <div className="pt-4 px-6 flex-grow">
        {error && <div className="text-red-600">{error}</div>}
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4 py-4">
            {currentVocabularies.map((vocab, index) => {
              const card = (
                <CatCard key={index} image={vocab.image} title={vocab.name} />
              )
              return isPlaceholder(vocab.image) ? (
                <div key={index}>{card}</div>
              ) : (
                <Link key={index} to={`/category/${category}/${vocab.name}`}>
                  {card}
                </Link>
              )
            })}
          </div>
        )}
      </div>
      <div className="mb-20 self-center">
        <Pagination
          totalItems={vocabularies.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default Vocabulary
