// src/pages/DisplayVocab.jsx
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const DisplayVocab = () => {
  const { categoryName, vocabName } = useParams();

  // Fetch data or use context/state to get details for the vocabulary
  // For simplicity, this example just displays the category and vocab names
  return (
    <div className="w-screen h-screen flex flex-col relative">
      <Navbar title={`วิดีโอภาษามือ : ${vocabName}`} />
      <div className="p-4 flex justify-center items-center flex-grow">
        <div className="flex justify-center items-center w-full h-full">
          <div className="card lg:card-side bg-base-100 shadow-xl w-full h-full">
            <figure className="flex justify-center w-2/4">
              <img src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album" />
            </figure>
            <div className="card-body relative">
              <h3 className="card-title">แอปเปิ้ล</h3>
              <img src="https://static.libertyprim.com/files/familles/pomme-large.jpg?1569271834" alt="Apple" className="flex mx-auto w-2/4" />
              <a className="category">ประเภทคำ : {vocabName}</a>
              <a className="explanation">คำอธิบาย : ลูกกลม มีสีแดง เขียว รสเปรี้ยว</a>
              <a className="approve">รับรองโดย : คุณน่ารัก ครุครุคริคริ</a>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-white shadow-lg flex justify-between">
                <button className="btn bg-others text-white w-1/2 text-center">ดูคำอื่น</button>
                <button className="btn bg-confirm text-white  w-1/2 text-center">ดาวน์โหลด</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
   
};

export default DisplayVocab;
