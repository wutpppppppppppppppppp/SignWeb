import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import CatCard from "../components/CatCard"
import Pagination from "../components/Pagination"
import Navbar from "../components/Navbar"
import placeHolder from "../assets/placeholder.png"

const itemsPerPage = 15

const Category = () => {
  const [categories, setCategories] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  console.log(categories)
  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories")
        setCategories(response.data)
      } catch (error) {
        console.error("Error fetching categories:", error)
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
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar title="ประเภท" />
      <div className="flex-grow grid grid-cols-5 gap-4 py-4">
        {currentCategories.map((category) => (
          <div key={category._id} className="flex flex-col items-center">
            <Link to={`/category/${category._id}`}>
              <CatCard image={placeHolder} title={category.name} />
            </Link>
          </div>
        ))}
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
