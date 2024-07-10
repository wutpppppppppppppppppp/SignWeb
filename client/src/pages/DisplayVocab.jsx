// src/pages/DisplayVocab.jsx
import {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import Navbar3 from "../components/Navbar3";
import ThreeScene2 from "../pages/ThreeScene2";
import { Link } from "react-router-dom";
import { vocabularies,vocabDescriptions } from "../data/vocabdata.jsx";

const DisplayVocab = () => {
  const { categoryName, vocabName } = useParams();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    console.log(vocabName)
    setDescription(vocabDescriptions[vocabName] || "ไม่พบคำอธิบาย");

    // Find the vocabulary item by name and set the image
    const vocabItem = vocabularies.find((vocab) => vocab.name === vocabName);
    if (vocabItem) {
      setImage(vocabItem.image);
    } else {
      setImage("");
    }
  },[vocabName]);
  
  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Navbar3 title={`วิดีโอภาษามือ : ${vocabName}`} />
      <div className="p-4 flex justify-center items-center flex-grow">
        <div className="flex justify-center items-center w-full h-full">
          <div className="card lg:card-side bg-base-100 shadow-xl w-full h-full">
            <figure className="flex justify-center w-2/4">
              <ThreeScene2 />
            </figure>
            <div className="card-body relative">
              <h3 className="card-title font-bold text-2xl">{vocabName}</h3>
              {image && <img src={image} alt={vocabName} className="flex mx-auto w-2/4" />}
              <a className="category text-xl">ประเภทคำ : {categoryName}</a>
              <a className="explanation text-xl">คำอธิบาย : {description}</a>
              <a className="approve text-xl">รับรองโดย : คุณน่ารัก ครุครุคริคริ</a>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-white shadow-lg flex justify-between">
                <button className="btn bg-others text-white w-1/2 text-center">
                  <Link to="/category">
                    ดูคำอื่น
                  </Link>
                </button>
                <button className="btn bg-confirm text-white w-1/2 text-center">ดาวน์โหลด</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayVocab;
