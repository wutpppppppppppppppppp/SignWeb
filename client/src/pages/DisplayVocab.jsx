/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import api from "../hooks/api"
import Navbar3 from "../components/Navbar3"
import Model from "../components/Model"

const DisplayVocab = () => {
  const { category, vocabulary } = useParams()
  const [data, setData] = useState({})
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await api.get(`/api/vocabularies/${vocabulary}`)
        setData(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching vocabularies:", err)
        setError("Error fetching vocabularies. Please try again later.")
      }
    }

    if (category) {
      fetchVocabularies()
    }
  }, [category, vocabulary, error])

  const modelUrl = `/models/${vocabulary}.glb`

  return (
    <div className="h-screen flex flex-col">
      <Navbar3 title={`วิดีโอภาษามือ : ${vocabulary}`} />
      <div className="m-4 h-full flex">
        <figure className="w-1/2 bg-blue-500 rounded-3xl">
          <Canvas camera={{ position: [0, 1, 1.2], fov: 45 }}>
            <ambientLight intensity={4} />
            <directionalLight position={[5, 10, 7.5]} intensity={1} />
            <Model
              modelUrl={modelUrl}
              position={[0, 0, 0]}
              scale={[0.01, 0.01, 0.01]}
            />
            <OrbitControls
              enableRotate={true}
              enableZoom={false}
              enablePan={false}
              target={[0, 1, 0]}
            />
          </Canvas>
        </figure>
        <div className="w-1/2 p-10 rounded-lg flex flex-col">
          <h1 className="font-bold text-4xl">{vocabulary}</h1>
          <div className="divider"></div>
          <div className="flex flex-col gap-3">
            <a className="text-xl font-semibold">
              ความหมาย : <a className="font-normal">{data.description}</a>
            </a>
            <a className="text-xl font-semibold">
              หมวดหมู่ : <a className="font-normal">{category}</a>
            </a>
            <a className="text-xl font-semibold">
              ชนิดของคำ : <a className="font-normal">{data.parts_of_speech}</a>
            </a>
          </div>
          <div className="divider"></div>
          {data.picture && (
            <img src={data.picture} alt={data.names} className="w-40 mx-auto" />
          )}
          <div className="flex gap-4 p-4">
            <button
              className="btn btn-secondary w-1/2 text-center"
              onClick={() => navigate(`/category/${category}`)}
            >
              ดูคำอื่นๆ
            </button>
            <button className="btn btn-info w-1/2 text-center">
              ดาวน์โหลด
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayVocab
