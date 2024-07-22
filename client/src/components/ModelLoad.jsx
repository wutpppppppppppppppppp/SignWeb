import React, { useEffect, useRef,forwardRef } from "react"
import { Canvas, useFrame, useLoader ,useThree } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneWrapper from "/src/pages/SceneWrapper.jsx";

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/src/models/Rokoko_model/scene.gltf');
  const mixer = useRef();

  useEffect(() => {
    if (gltf.animations.length) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        mixer.current.clipAction(clip).play();
      });
    }
  }, [gltf]);

  useFrame((state, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={gltf.scene} scale={1} />;
};

export default Model;