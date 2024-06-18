// src/utils/fetchJson.js
/* https://axios-http.com/docs/example */
import axios from "axios"

export const fetchJson = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error("Error fetching JSON data:", error)
    throw error
  }
}
