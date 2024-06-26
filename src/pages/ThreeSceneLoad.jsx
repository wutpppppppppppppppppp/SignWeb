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
<<<<<<< HEAD
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    mountRef.current.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.update()

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    //directionalLight.position.set(5, 10, 7.5)
    scene.add(directionalLight)

    // Load 3D model
    const loader = new GLTFLoader()
    loader.load(
      "src/models/mixamo/mixamo.gltf",
      (gltf) => {
        // onLoad
        scene.add(gltf.scene)
        console.log(gltf.scene)
      },
      (xhr) => {
        // onProgress
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`)
      },
      undefined,
      (error) => {
        // onError
        console.error("An error happened", error)
      }
    )

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
=======
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
>>>>>>> 15d71de372740fec828986dcccfe3f79c62fb5aa
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
