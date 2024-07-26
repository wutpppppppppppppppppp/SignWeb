import React, { useState, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import api from "../hooks/api"
import { useNavigate } from "react-router-dom" // useNavigate for React Router v6

const SearchBox = ({ placeholder }) => {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate() // for React Router v6

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await api.get(`/api/search`, {
          params: { find: inputValue },
        })
        setSuggestions(response.data.suggestions)
        setError(null)
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setError("Error fetching suggestions. Please try again later.")
      }
    }

    if (inputValue) {
      fetchSuggestions()
    } else {
      setSuggestions([])
    }
  }, [inputValue])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSelect = (suggestion) => {
    setInputValue(suggestion.name)
    console.log(suggestion.name)
    if (suggestion.type === "category") {
      navigate(`/category/${suggestion.name}`)
    } else if (suggestion.type === "vocabulary" && suggestion.category) {
      navigate(`/category/${suggestion.name}/${suggestion.name}`)
    }
  }

  return (
    <div className="relative">
      <label className="input flex items-center bg-primary text-primary-content border-b-2 border-b-primary-content">
        <button className="btn btn-circle btn-ghost btn-sm">
          <FaSearch />
        </button>
        <input
          type="text"
          className="grow pl-1"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
        />
      </label>
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-primary text-primary-content border border-gray-300 rounded-md shadow-lg z-50">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-base-100 text-primary-content cursor-pointer"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  )
}

export default SearchBox
