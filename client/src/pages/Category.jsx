import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../hooks/api"
import CatCard from "../components/CatCard"
import Pagination from "../components/Pagination"
import Navbar from "../components/Navbar"

const itemsPerPage = 15

const Category = () => {
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

  return (
    <div className="h-screen flex flex-col">
      <Navbar title="ประเภท" />
      <div className="pt-4 px-6 flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4 py-4">
            {currentCategories.map((category, index) => (
              <Link key={index} to={`/category/${category.category}`}>
                <CatCard image={category.image} title={category.category} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mb-20 self-center">
        <Pagination
          totalItems={categories.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default Category
