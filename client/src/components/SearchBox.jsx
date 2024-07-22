// src/components/SearchBox.jsx
import React from "react"
import { FaSearch } from "react-icons/fa"

const SearchBox = ({ placeholder }) => {
  return (
    <label className="input input-bordered flex items-center bg-base-100 text-base-content">
      <input type="text" className="grow" placeholder={placeholder} />
      <button className="btn btn-circle btn-ghost btn-sm">
        <FaSearch />
      </button>
    </label>
  )
}

export default SearchBox
