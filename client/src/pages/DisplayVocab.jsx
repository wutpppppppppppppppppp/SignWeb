import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Navbar3 from "../components/Navbar3"
import {
  vocabularies,
  vocabDescriptions,
  interpreters,
} from "../data/vocabdata.jsx"
import Model from "../components/Model"

const DisplayVocab = () => {
  const { categoryName, vocabName } = useParams()
  const [description, setDescription] = useState("")
  const [interpreter, setInterpreter] = useState("")
  const [image, setImage] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    setDescription(vocabDescriptions[vocabName] || "ไม่พบคำอธิบาย")
    setInterpreter(interpreters[vocabName] || "ไม่พบข้อมูล")
    const vocabItem = vocabularies.find((vocab) => vocab.name === vocabName)
    if (vocabItem) {
      setImage(vocabItem.image)
    } else {
      setImage("")
    }
  }, [vocabName])

  const animationUrl = `https://your-s3-bucket.s3.amazonaws.com/joe/${vocabName}.bin`

  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Navbar3 title={`วิดีโอภาษามือ : ${vocabName}`} />
      <div className="p-4 flex justify-center items-center flex-grow">
        <div className="flex justify-center items-center w-full h-full">
          <div className="card lg:card-side background-white shadow-xl w-full h-full">
            <figure className="flex justify-center w-2/4 h-auto">
              <Canvas
                camera={{
                  position: [0, 1, 5],
                  fov: 95,
                  zoom: 5,
                  filmOffset: -2,
                }}
              >
                <ambientLight intensity={1} />
                <directionalLight position={[5, 10, 7.5]} intensity={1} />
                <Model animationUrl={animationUrl} />
                <OrbitControls enableDamping />
              </Canvas>
            </figure>
            <div className="card-body relative">
              <h3 className="card-title font-bold text-2xl">{vocabName}</h3>
              {image && (
                <img
                  src={image}
                  alt={vocabName}
                  className="flex mx-auto w-2/4"
                />
              )}
              <a className="category text-xl">ประเภทคำ : {categoryName}</a>
              <a className="explanation text-xl">คำอธิบาย : {description}</a>
              <a className="approve text-xl">รับรองโดย : {interpreter}</a>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-white shadow-lg flex justify-between">
                <button
                  className="btn bg-others text-white w-1/2 text-center"
                  onClick={() => navigate(`/category/${categoryName}`)}
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
