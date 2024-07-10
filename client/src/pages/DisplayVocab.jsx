// src/pages/DisplayVocab.jsx
import {useRef} from "react";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import {useState,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar3 from "../components/Navbar3";
import ThreeScene2 from "../pages/ThreeScene2";
import { Link } from "react-router-dom";
import { vocabularies,vocabDescriptions,interpreter} from "../data/vocabdata.jsx";

const DisplayVocab = () => {
  const { categoryName, vocabName } = useParams();
  const [description, setDescription] = useState("");
  const [interpreter, setInterpreter] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const sceneRef = useRef();

  //Begin mapping vocabname and image to the corresponding description and interpreter
  useEffect(() => {
    console.log(vocabName)
    setDescription(vocabDescriptions[vocabName] || "ไม่พบคำอธิบาย");
    setInterpreter(interpreter[vocabName] || "ไม่พบข้อมูล");
    // Find the vocabulary item by name and set the image
    const vocabItem = vocabularies.find((vocab) => vocab.name === vocabName);
    if (vocabItem) {
      setImage(vocabItem.image);
    } else {
      setImage("");
    }
  },[vocabName]);
  
  const downloadJSON = (gltfData) => {
    const jsonContent = JSON.stringify(gltfData);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scene.gltf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const handleExport = () => {
    const exporter = new GLTFExporter();
    // Parse the input and generate the glTF output
    exporter.parse(
      sceneRef,
      // called when the gltf has been generated
      function ( gltf ) {

        console.log( gltf );
        downloadJSON( gltf );

      },
      // called when there is an error in the generation
      function ( error ) {

        console.log( 'An error happened' );

      },
    );
  };





  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Navbar3 title={`วิดีโอภาษามือ : ${vocabName}`} />
      <div className="p-4 flex justify-center items-center flex-grow">
        <div className="flex justify-center items-center w-full h-full">
          <div className="card lg:card-side bg-base-100 shadow-xl w-full h-full">
            <figure className="flex justify-center w-2/4 h-auto">
              <ThreeScene2 />
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

export default DisplayVocab;
