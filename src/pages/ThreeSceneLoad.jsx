/* eslint-disable react/no-unknown-property */
// ThreeSceneLoad.jsx
import React, { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Model from "../models/rokoko_straight/Untitled"
import { updateBoneData } from "../libs/updateBoneDataLoad"

const ModelWithUpdates = ({ innerRef }) => {
  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current && innerRef.current) {
      // console.log("jsonDataRef:", innerRef.current)
      // console.log("modelRef:", modelRef.current)
      updateBoneData(innerRef.current, modelRef.current)
    } else {
      if (!modelRef.current) {
        console.log("modelRef is not set")
      }
      if (!innerRef.current) {
        console.log("jsonDataRef is not set")
      }
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
            // console.log("Received JSON Data:", jsonData)
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
