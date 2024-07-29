import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../hooks/api"
import CatCard from "../components/CatCard"
import Pagination from "../components/Pagination"
import Navbar from "../components/Navbar"

const itemsPerPage = 15

const Categoryad = () => {
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/categories")
        setCategories(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching categories:", err)
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const isPlaceholder = (image) =>
    image === "vocab_placeholder" || image === "category_placeholder"

  return (
    <div className="h-screen flex flex-col">
      <Navbar title="ประเภท" />
      <div className="p-4 flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 py-4">
            {currentCategories.map((category, index) => {
              const card = (
                <CatCard
                  key={index}
                  image={category.image}
                  title={category.category}
                />
              )
              return isPlaceholder(category.image) ? (
                <div key={index}>{card}</div>
              ) : (
                <Link key={index} to={`/categoryad/${category.category}`}>
                  {card}
                </Link>
              )
            })}
          </div>
        )}
      </div>
      <div className="self-stretch justify-self-center flex flex-col items-center gap-10">
        <Pagination
          totalItems={categories.length}
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

export default Categoryad
