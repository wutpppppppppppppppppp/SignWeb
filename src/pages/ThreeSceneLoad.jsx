// ThreeScene.jsx
import React, { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { updateBoneData } from "../libs/updateBoneDataLoad"
import { Model } from "../models/rokoko_straight/Untitled" // Adjust this import to match your file structure

const ModelWithUpdates = ({ jsonDataRef }) => {
  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current && jsonDataRef.current) {
      updateBoneData(jsonDataRef.current, modelRef.current)
    }
  })

  return <Model ref={modelRef} />
}

const ThreeSceneLoad = () => {
  const wsRef = useRef(null)
  const jsonDataRef = useRef(null)

  useEffect(() => {
    // WebSocket connection setup
    wsRef.current = new WebSocket("ws://localhost:8080")

    wsRef.current.onmessage = (event) => {
      // If the event data is a Blob, convert it to text
      if (event.data instanceof Blob) {
        event.data
          .text()
          .then((text) => {
            try {
              let jsonData = JSON.parse(text)
              jsonDataRef.current = jsonData
            } catch (error) {
              console.error("Error parsing JSON from Blob:", error)
            }
          })
          .catch((err) => {
            console.error("Error reading Blob as text:", err)
          })
      } else {
        // If the event data is already text
        try {
          let jsonData = JSON.parse(event.data)
          jsonDataRef.current = jsonData
        } catch (error) {
          console.error("Error parsing JSON:", error)
        }
      }
    }

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 75 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 7.5]} intensity={1} />
      <OrbitControls enableDamping />
      <ModelWithUpdates jsonDataRef={jsonDataRef} />
    </Canvas>
  )
}

export default ThreeSceneLoad
