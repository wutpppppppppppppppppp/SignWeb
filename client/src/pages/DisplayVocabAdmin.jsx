import React, { useEffect, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Canvas, useLoader, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js"
import Navbar3 from "../components/Navbar3"
import {
  vocabularies,
  vocabDescriptions,
  interpreters,
} from "../data/vocabdata.jsx"
import PathConstants from "../routes/pathConstants.js"

const Model = ({ animationName }) => {
  const gltf = useLoader(GLTFLoader, "/models/NonglouiseModel/Louisecenter.glb")
  const mixer = useRef()
  useEffect(() => {
    // Log all animation names
    console.log("All animations:")
    gltf.animations.forEach((animation, index) => {
      console.log(`${index}: ${animation.name}`)
    })

    if (gltf.animations.length) {
      mixer.current = new THREE.AnimationMixer(gltf.scene)
      let clip = THREE.AnimationClip.findByName(gltf.animations, animationName)
      if (!clip && !isNaN(parseInt(animationName))) {
        const index = parseInt(animationName)
        if (index >= 0 && index < gltf.animations.length) {
          clip = gltf.animations[index]
        }
      }

      if (clip) {
        const action = mixer.current.clipAction(clip)
        action.play()
        console.log(`Playing animation: ${clip.name}`)
      } else {
        console.log(`Animation not found: ${animationName}`)
      }
    }

    return () => {
      mixer.current?.stopAllAction()
    }
  }, [gltf, animationName])

  useFrame((state, delta) => {
    mixer.current?.update(delta)
  })
  return <primitive object={gltf.scene} scale={1} />
}

const DisplayVocabAdmin = () => {
  const { categoryad, vocabularyad } = useParams()
  const [description, setDescription] = useState("")
  const [interpreter, setInterpreter] = useState("")
  const [image, setImage] = useState("")
  const [scene, setScene] = useState(null)
  const [animations, setAnimations] = useState([])
  const navigate = useNavigate()
  const [animationName, setAnimationName] = useState(
    "Root|clip|Base_Layer Retarget.001"
  )

  useEffect(() => {
    setDescription(vocabDescriptions[vocabularyad] || "ไม่พบคำอธิบาย")
    setInterpreter(interpreters[vocabularyad] || "ไม่พบข้อมูล")
    const vocabItem = vocabularies.find((vocab) => vocab.name === vocabularyad)
    if (vocabItem) {
      setImage(vocabItem.image)
    } else {
      setImage("")
    }
  }, [vocabularyad])

  const downloadJSON = (gltfData) => {
    const jsonContent = JSON.stringify(gltfData)
    const blob = new Blob([jsonContent], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "scene.gltf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExport = () => {
    const exporter = new GLTFExporter()
    if (scene) {
      exporter.parse(
        scene,
        (gltf) => {
          console.log(gltf)
          downloadJSON(gltf)
        },
        (error) => {
          console.error("An error happened:", error)
        },
        { animations }
      )
    } else {
      console.error("Scene is undefined or null")
    }
  }

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

  useEffect(() => {
    console.log("Current animationName:", animationName)
  }, [animationName])

  return (
    <div className="w-screen h-screen flex flex-col relative bg-primary">
      <Navbar3 title={`วิดีโอภาษามือ : ไข่เจียว `} />
      <div className="p-4 flex justify-center items-center flex-grow">
        <div className="flex justify-center items-center w-full h-full">
          <div className="card lg:card-side bg-base-100 shadow-xl w-full h-full">
            <figure className="flex justify-center w-2/4 h-auto">
              <Canvas camera={{ position: [0, 1, 1], fov: 75 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 10, 7.5]} intensity={1} />
                <color attach="background" args={["#ffffff"]} />
                {/* <axesHelper args={[5]} />
                <gridHelper args={[10, 10]} /> */}
                <Model animationName={animationName} 
                position={[0, 0, 0]} 
                scale={[0.01, 0.01, 0.01]}
                />
                <OrbitControls enableDampingDamping target={[0, 1, 0]} />
              </Canvas>
              
            </figure>
            <div className="card-body relative">
              <h3 className="card-title font-bold text-2xl">ไข่เจียว</h3>
              {image && (
                <img
                  src={image}
                  alt={vocabularyad}
                  className="flex mx-auto w-2/4"
                />
              )}
              <a className="category text-xl">ประเภทคำ : อาหาร</a>
              <a className="explanation text-xl">
                คำอธิบาย : ไข่ไก่ที่ตีให้เข้ากันก่อนทอด
              </a>
              <a className="approve text-xl">รับรองโดย : คุณไอติม</a>
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

      {/* <div className="flex-grow flex place-self-end">
        เลขที่พอร์ตปัจจุบัน (Port):14053 เลขที่ไอพีปัจจุบัน
        (IPAddress):172.20.10.3
      </div> */}
    </div>
  )
}

export default DisplayVocabAdmin
