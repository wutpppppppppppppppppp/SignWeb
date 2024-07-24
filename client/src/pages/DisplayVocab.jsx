/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import api from "../hooks/api"
import Navbar3 from "../components/Navbar3"
// import {
//   vocabularies,
//   vocabDescriptions,
//   interpreters,
// } from "../data/vocabdata.jsx";
import Model from "../components/Model"

const DisplayVocab = () => {
  const { category, vocabulary } = useParams()
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await api.get(`/api/vocabularies/${vocabulary}`)
        setData(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching vocabularies:", err) // Corrected error handling
        setError("Error fetching vocabularies. Please try again later.")
      }
    }

    if (category) {
      fetchVocabularies()
    }
  }, [category, vocabulary])

  const modelUrl = `/models/${vocabulary}.glb` // Assuming the model URL follows this pattern

  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar3 title={`วิดีโอภาษามือ : ${vocabulary}`} />
      <div className="p-4 flex justify-center items-center flex-grow">
        <div className="flex justify-center items-center w-full h-full">
          <div className="card lg:card-side w-full h-full">
            <figure className="w-2/4 h-auto">
              <Canvas
                camera={{
                  position: [0, 2, 4],
                  fov: 70,
                  zoom: 2,
                  filmOffset: 0,
                }}
              >
                <ambientLight intensity={1} />
                <directionalLight position={[5, 10, 7.5]} intensity={1} />
                <Model modelUrl={modelUrl} />
                <OrbitControls enableDamping />
              </Canvas>
            </figure>
            <div className="card-body relative">
              <h3 className="card-title font-bold text-2xl">{vocabulary}</h3>
              {data.picture && (
                <img
                  src={data.picture}
                  alt={data.names}
                  className="flex mx-auto w-2/4"
                />
              )}
              <a className="text-xl">ประเภทคำ : {category}</a>
              <a className="text-xl">คำอธิบาย : {data.description}</a>
              {/* <a className="approve text-xl">รับรองโดย : {interpreter}</a> */}
              <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between">
                <button
                  className="btn bg-others text-white w-1/2 text-center"
                  onClick={() => navigate(`/category/${category}`)}
                >
                  ดูคำอื่นๆ
                </button>
                <button className="btn bg-confirm text-white w-1/2 text-center">
                  ดาวน์โหลด
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayVocab
