// src/pages/DisplayVocab.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import Navbar3 from "../components/Navbar3";
import { vocabularies, vocabDescriptions, interpreters } from "../data/vocabdata.jsx";

const DisplayVocabAdmin = () => {
  const { categoryName, vocabName } = useParams();
  const [description, setDescription] = useState("");
  const [interpreter, setInterpreter] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [scene, setScene] = useState(null);
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    setDescription(vocabDescriptions[vocabName] || "ไม่พบคำอธิบาย");
    setInterpreter(interpreters[vocabName] || "ไม่พบข้อมูล");
    const vocabItem = vocabularies.find((vocab) => vocab.name === vocabName);
    if (vocabItem) {
      setImage(vocabItem.image);
    } else {
      setImage("");
    }
  }, [vocabName]);

  const downloadJSON = (gltfData) => {
    const jsonContent = JSON.stringify(gltfData);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "scene.gltf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    const exporter = new GLTFExporter();
    if (scene) {
      exporter.parse(
        scene,
        (gltf) => {
          console.log(gltf);
          downloadJSON(gltf);
        },
        (error) => {
          console.error("An error happened:", error);
        },
        { animations }
      );
    } else {
      console.error("Scene is undefined or null");
    }
  };

  const setSceneAndAnimations = (scene, animations) => {
    setScene(scene);
    setAnimations(animations);
  };

  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Navbar3 title={`วิดีโอภาษามือ : ${vocabName}`} />
      <div className="p-4 flex justify-center items-center flex-grow">
        <div className="flex justify-center items-center w-full h-full">
          <div className="card lg:card-side bg-base-100 shadow-xl w-full h-full">
            <figure className="flex justify-center w-2/4 h-auto">
              <Canvas camera={{ position: [0, 2, 4], fov: 45 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 10, 7.5]} intensity={1} />
                <color attach="background" args={["#ffffff"]} />
                <Model setSceneAndAnimations={setSceneAndAnimations} />
                <OrbitControls enableDamping />
              </Canvas>
            </figure>
            <div className="card-body relative">
              <h3 className="card-title font-bold text-2xl">{vocabName}</h3>
              {image && <img src={image} alt={vocabName} className="flex mx-auto w-2/4" />}
              <a className="category text-xl">ประเภทคำ : {categoryName}</a>
              <a className="explanation text-xl">คำอธิบาย : {description}</a>
              <a className="approve text-xl">รับรองโดย : {interpreter}</a>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-white shadow-lg flex justify-between">
                <button className="btn bg-others text-white w-1/2 text-center" onClick={() => navigate(`/category/${categoryName}`)}>
                  ดูคำอื่น
                </button>
                <button className="btn bg-confirm text-white w-1/2 text-center" onClick={handleExport}>
                  ดาวน์โหลด
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayVocabAdmin;
