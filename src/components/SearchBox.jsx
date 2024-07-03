// src/components/SearchBox.jsx
import React from "react"
import { FaSearch } from "react-icons/fa"
const SearchBox = () => {
  return (
    <label className="input input-bordered flex items-center bg-base-200 text-primary rounded-badge">
      <input type="text" className="grow" placeholder="หาคำภาษามือไทย" />
      <button className="btn btn-circle btn-ghost btn-sm">
        <FaSearch />
      </button>
    </label>
  )
}

export default SearchBox
