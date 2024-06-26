/* eslint-disable react/no-unknown-property */
// ThreeScene.jsx
import React, { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { updateBoneData } from "../libs/updateBoneDataLoad"
import { Model } from "../models/rokoko_straight/Untitled"

const ModelWithUpdates = ({ innerRef }) => {
  console.log(JSON.stringify(innerRef))
  const modelRef = useRef()
  useFrame(() => {
    if (modelRef.current && innerRef.current) {
      console.log(`Updating Bone Data`)
      updateBoneData(innerRef.current, modelRef.current)
    }
  })
  return <Model ref={modelRef} />
}

const ThreeSceneLoad = () => {
  const wsRef = useRef(null)
  const jsonDataRef = useRef(null)

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8080")
    wsRef.current.onmessage = (event) => {
      event.data
        .text()
        .then((text) => {
          try {
            let jsonData = JSON.parse(text)
            jsonDataRef.current = jsonData
            // console.log(jsonData)
          } catch (error) {
            console.error("Error parsing JSON from Blob:", error)
          }
        })
        .catch((err) => {
          console.error("Error reading Blob as text:", err)
        })
    }
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return (
    <Canvas camera={{ position: [0, 2, 4], fov: 45 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <OrbitControls enableDamping />
      <ModelWithUpdates innerRef={jsonDataRef} />
    </Canvas>
  )
}

export default ThreeSceneLoad
