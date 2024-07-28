import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import api from "../hooks/api"
import Navbar3 from "../components/Navbar3"
import Model from "../components/Model"
import PathConstants from "../routes/pathConstants.js"

const DisplayVocabAdmin = () => {
  const { categoryad, vocabularyad } = useParams()
  console.log(categoryad, vocabularyad)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await api.get(`/api/vocabularies/${vocabularyad}`)
        setData(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching vocabularies:", err) // Corrected error handling
        setError("Error fetching vocabularies. Please try again later.")
      }
    }

    if (categoryad) {
      fetchVocabularies()
    }
  }, [categoryad, vocabularyad, error])

  const modelUrl = `/models/${vocabularyad}.glb` // Assuming the model URL follows this pattern

  // const downloadJSON = (gltfData) => {
  //   const jsonContent = JSON.stringify(gltfData)
  //   const blob = new Blob([jsonContent], { type: "application/json" })
  //   const url = URL.createObjectURL(blob)
  //   const link = document.createElement("a")
  //   link.href = url
  //   link.download = "scene.gltf"
  //   document.body.appendChild(link)
  //   link.click()
  //   document.body.removeChild(link)
  // }

  // const handleExport = () => {
  //   const exporter = new GLTFExporter()
  //   if (scene) {
  //     exporter.parse(
  //       scene,
  //       (gltf) => {
  //         console.log(gltf)
  //         downloadJSON(gltf)
  //       },
  //       (error) => {
  //         console.error("An error happened:", error)
  //       },
  //       { animations }
  //     )
  //   } else {
  //     console.error("Scene is undefined or null")
  //   }
  // }

  // const setSceneAndAnimations = (scene, animations) => {
  //   setScene(scene);
  //   setAnimations(animations);
  // };

  const rerecord = () => {
    console.log("Rerecord")
    navigate(`/record/${categoryad}/${vocabularyad}`)
  }

  const doneRecord = () => {
    console.log("DoneRecord")
    navigate(PathConstants.DONE)
  }

  // useEffect(() => {
  //   console.log("Current animationName:", animationName)
  // }, [animationName])

  return (
    <div className="h-screen flex flex-col">
      <Navbar3 title={`วิดีโอภาษามือ : ${vocabularyad}`} />
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
              enableRotate={false}
              enableZoom={false}
              enablePan={false}
              target={[0, 1, 0]}
            />
          </Canvas>
        </figure>
        <div className="w-1/2 p-10 rounded-lg flex flex-col">
          <h1 className="font-bold text-4xl">{vocabularyad}</h1>
          <div className="divider"></div>
          <div className="flex flex-col gap-3">
            <a className="text-xl font-semibold">
              ความหมาย : <a className="font-normal">{data.description}</a>
            </a>
            <a className="text-xl font-semibold">
              หมวดหมู่ : <a className="font-normal">{categoryad}</a>
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
              onClick={rerecord}
            >
              บันทึกท่าใหม่
            </button>
            <button
              className="btn btn-info w-1/2 text-center"
              onClick={doneRecord}
            >
              ยืนยันและส่งข้อมูล
            </button>
          </div>
        </div>
      </div>
      <div className="bg-primary-content text-primary text-sm py-2 text-center">
        <p>เลขที่พอร์ตปัจจุบัน (Port): 14053</p>
        <p>เลขที่ไอพีปัจจุบัน (IP Address): 172.20.10.3</p>
      </div>
    </div>
  )
}

export default DisplayVocabAdmin
