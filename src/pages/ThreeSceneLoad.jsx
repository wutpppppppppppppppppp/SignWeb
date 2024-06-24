// src/pages/ThreeScene.jsx
import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const ThreeScene = () => {
  const mountRef = useRef(null)

  useEffect(() => {
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
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      mountRef.current.removeChild(renderer.domElement)
      window.removeEventListener("resize", handleResize)
      controls.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} />
}

export default ThreeScene
