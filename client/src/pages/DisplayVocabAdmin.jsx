import React, { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Canvas, useLoader, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import api from "../hooks/api"
import Navbar3 from "../components/Navbar3"
import Model from "../components/Model"

const DisplayVocabAdmin = () => {
  const { categoryad, vocabularyad } = useParams()
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
    navigate(PathConstants.RECORD1)
  }

  const doneRecord = () => {
    console.log("DoneRecord")
    navigate(PathConstants.DONE)
  }

  // useEffect(() => {
  //   console.log("Current animationName:", animationName)
  // }, [animationName])

  return (
    <div className="w-screen h-screen flex flex-col bg-primary">
      <Navbar3 title={`วิดีโอภาษามือ : ไข่เจียว `} />
      <div className="p-4 flex justify-center items-center flex-1">
        <div className="flex justify-center items-center w-full h-full">
          <div className="card lg:card-side bg-base-100 shadow-xl w-full h-full">
            <figure className="flex justify-center w-2/4 h-auto bg-blue-500">
              <Canvas camera={{ position: [0, 1, 1.2], fov: 45 }}>
                <ambientLight intensity={4} />
                <directionalLight position={[5, 10, 7.5]} intensity={1} />
                {/* <axesHelper args={[5]} />
                <gridHelper args={[10, 10]} /> */}
                <Model
                  modelUrl={modelUrl}
                  // animationName={animationName}
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
            <div className="card-body relative">
              <h3 className="card-title font-bold text-2xl">{vocabularyad}</h3>
              <div className="flex flex-col gap-1">
                <a className="category text-xl">ประเภทคำ : {categoryad}</a>
                <a className="explanation text-xl">{data.description}</a>
                {/* <a className="approve text-xl">รับรองโดย : คุณไอติม</a> */}
              </div>
              {data.picture && (
                <img
                  src={data.picture}
                  alt={data.name}
                  className="w-40 mx-auto"
                />
              )}

              <div className="absolute inset-x-0 bottom-0 p-4 bg-white shadow-lg flex justify-between">
                <button
                  className="btn bg-others text-white w-1/2 text-center"
                  onClick={rerecord}
                >
                  บันทึกท่าใหม่
                </button>
                <button
                  className="btn bg-confirm text-white w-1/2 text-center"
                  onClick={doneRecord}
                >
                  ยืนยันและส่งข้อมูล
                </button>
              </div>
            </div>
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
