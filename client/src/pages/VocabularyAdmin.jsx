import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../hooks/api"
import Navbar from "../components/Navbar"
import SearchBox from "../components/SearchBox"

const VocabAdmin = () => {
  const { categoryad } = useParams()
  const [vocabulariesad, setVocabularies] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await api.get(`/api/vocabularies/`, {
          params: { category: categoryad },
        })
        setVocabularies(response.data)
        setError(null)
      } catch (error) {
        console.error("Error fetching vocabularies:", error)
        setError("Error fetching vocabularies. Please try again later.")
      }
    }

    if (categoryad) {
      fetchVocabularies()
    }
  }, [categoryad, vocabulariesad, error])

  return (
    <div className="w-screen h-screen relative">
      <Navbar title={`คำศัพท์${categoryad}`} />
      <div className="hero w-screen">
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md mx-auto">
            <h1 className="mb-5 text-5xl font-bold">{categoryad}</h1>
            <SearchBox placeholder={"ค้นหาคำศัพท์ ..."} />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4 justify-center">
          {vocabulariesad.map((vocab, index) => (
            <Link key={index} to={`/record/${categoryad}/${vocab.name}`}>
              <div className="border p-4 flex flex-col items-center">
                <b>{vocab.name}</b>
                {/* <div className="bg-cover bg-center" style="background-image: url(&)"></div> */}
                <img src={vocab.picture} alt={vocab.name} className="" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-primary-content text-primary text-sm py-2 text-center absolute bottom-0 inset-x-0">
        <p>เลขที่พอร์ตปัจจุบัน (Port): 14053</p>
        <p>เลขที่ไอพีปัจจุบัน (IP Address): 172.20.10.3</p>
      </div>
    </div>
  )
}

export default VocabAdmin
