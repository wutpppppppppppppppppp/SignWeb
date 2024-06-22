import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const ThreeScene = () => {
  const mountRef = useRef(null)
  const bodyParts = useRef(new Map())
  const wsRef = useRef(null)

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

    // const createBodyPart = (name, color) => {
    //   const geometry = new THREE.SphereGeometry(0.05, 32, 32)
    //   const material = new THREE.MeshStandardMaterial({ color })
    //   const sphere = new THREE.Mesh(geometry, material)
    //   sphere.name = name
    //   return sphere
    // }

    // const addBodyParts = (actor) => {
    //   const actorColor = new THREE.Color(
    //     `rgb(${actor.color[0]}, ${actor.color[1]}, ${actor.color[2]})`
    //   )
    //   for (const part in actor.body) {
    //     const bodyPart = createBodyPart(part, actorColor)
    //     scene.add(bodyPart)
    //     bodyParts.current.set(part, bodyPart)
    //   }
    // }

    // const updateBodyParts = (actor) => {
    //   for (const part in actor.body) {
    //     const bodyPartData = actor.body[part]
    //     const bodyPartMesh = bodyParts.current.get(part)
    //     if (bodyPartMesh) {
    //       bodyPartMesh.position.set(
    //         bodyPartData.position.x,
    //         bodyPartData.position.y,
    //         bodyPartData.position.z
    //       )
    //       bodyPartMesh.quaternion.set(
    //         bodyPartData.rotation.x,
    //         bodyPartData.rotation.y,
    //         bodyPartData.rotation.z,
    //         bodyPartData.rotation.w
    //       )
    //     }
    //   }
    // }

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
      // console.log("Received Blob data:", event.data)
      // Convert Blob to text and then parse as JSON
      event.data
        .text()
        .then((text) => {
          try {
            let jsonData = JSON.parse(text)
            // console.log(jsonData.scene.actors)

            // Process the received JSON data
            jsonData.scene.actors.forEach((actor) => {
              console.log(actor)
              // color OK
              const color = new THREE.Color(
                `rgb(${actor.color[0]},${actor.color[1]},${actor.color[2]})`
              )
              const geometry = new THREE.BoxGeometry(
                1,
                actor.dimensions.totalHeight,
                1
              )
              const material = new THREE.MeshBasicMaterial({ color: color })
              const mesh = new THREE.Mesh(geometry, material)

              mesh.position.set(
                actor.body.hip.position.x,
                actor.body.hip.position.y,
                actor.body.hip.position.z
              )
              mesh.quaternion.set(
                actor.body.hip.rotation.x,
                actor.body.hip.rotation.y,
                actor.body.hip.rotation.z,
                actor.body.hip.rotation.w
              )

              scene.add(mesh)
            })
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

  return <div ref={mountRef} />
}

export default ThreeScene
