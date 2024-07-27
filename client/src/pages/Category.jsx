import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../hooks/api"
import CatCard from "../components/CatCard"
import Pagination from "../components/Pagination"
import Navbar from "../components/Navbar"
import Spinner from "../components/Fetching"

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
    <div className="w-screen h-screen flex flex-col justify-between bg-primary">
      <Navbar title="ประเภท" />
      <div className="flex-grow grid grid-cols-5 gap-4 py-4">
        {loading ? (
          <div className="col-span-5 flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          currentCategories.map((category) => (
            <div key={category._id} className="flex flex-col items-center">
              <Link to={`/categoryad/${category.category}`}>
                <CatCard image={category.image} title={category.category} />
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="pb-4 self-center">
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
