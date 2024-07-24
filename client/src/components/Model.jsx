import React, { useEffect, useRef } from "react"
import { useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import * as THREE from "three"

const Model = ({ animationUrl }) => {
  const gltf = useLoader(GLTFLoader, "/models/joe/joe.gltf")
  const mixer = useRef()
  const animationsRef = useRef([])

  useEffect(() => {
    const loadAnimation = async () => {
      const loader = new THREE.FileLoader()
      loader.setResponseType("arraybuffer")
      loader.load(animationUrl, (data) => {
        const animation = JSON.parse(
          new TextDecoder().decode(new Uint8Array(data))
        )
        const animLoader = new THREE.AnimationLoader()
        animationsRef.current = animLoader.parse(animation).animations

        if (animationsRef.current.length) {
          mixer.current = new THREE.AnimationMixer(gltf.scene)
          animationsRef.current.forEach((clip) => {
            mixer.current.clipAction(clip).play()
          })
        }
      })
    }

    loadAnimation()

    return () => {
      if (mixer.current) {
        animationsRef.current.forEach((clip) => {
          mixer.current.clipAction(clip).stop()
        })
        mixer.current = null
      }
    }
  }, [animationUrl, gltf])

  useFrame((state, delta) => {
    mixer.current?.update(delta)
  })

  return <primitive object={gltf.scene} scale={1} />
}

export default Model
