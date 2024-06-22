import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { useNavigate } from "react-router-dom"

const ThreeScene = () => {
  const mountRef = useRef(null)
  // const bodyParts = useRef(new Map())
  const wsRef = useRef(null)
  const navigate = useNavigate()

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

    camera.position.set(0, 1, 3)
    controls.update()

    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 10, 7.5)
    scene.add(directionalLight)

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

    // WebSocket connection setup
    wsRef.current = new WebSocket("ws://localhost:8080")
    wsRef.current.onmessage = (event) => {
      // Convert Blob to text and then parse as JSON
      event.data
        .text()
        .then((text) => {
          try {
            let jsonData = JSON.parse(text)
            // Process the received JSON data
            /*  */
          } catch (error) {
            console.error("Error parsing JSON from Blob:", error)
          }
        })
        .catch((err) => {
          console.error("Error reading Blob as text:", err)
        })
    }

    return () => {
      mountRef.current.removeChild(renderer.domElement)
      window.removeEventListener("resize", handleResize)
      controls.dispose()
      renderer.dispose()
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return (
    <div>
      <button onClick={() => navigate("/")}>Go Back</button>
      <div ref={mountRef} />
    </div>
  )
}

export default ThreeScene
