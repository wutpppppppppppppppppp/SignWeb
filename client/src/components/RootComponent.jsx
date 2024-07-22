import React, { useEffect, useState } from "react"

const RootComponent = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...")
        const response = await fetch("/api", { method: "GET" })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        console.log("Response:", result)
        setData(result)
      } catch (error) {
        console.error("Error fetching data", error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <p>Root: {data.root.toString()}</p>
    </div>
  )
}

export default RootComponent
