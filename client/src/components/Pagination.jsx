import React, { useState } from "react"

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Function to generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  return (
    <div className="join">
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`join-item btn btn-secondary ${pageNumber === currentPage ? "btn-active" : ""}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  )
}

export default Pagination
