// src/pages/DisplayVocab.jsx
import { useParams } from "react-router-dom";
import Navbar3 from "../components/Navbar3";
import ThreeScene2 from "../pages/ThreeScene2";

const DisplayVocab = () => {
  const { categoryName, vocabName } = useParams();
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
              <img src="https://static.libertyprim.com/files/familles/pomme-large.jpg?1569271834" alt="Apple" className="flex mx-auto w-2/4" />
              <a className="category text-xl">ประเภทคำ : {vocabName}</a>
              <a className="explanation text-xl">คำอธิบาย : ลูกกลม มีสีแดง เขียว รสเปรี้ยว</a>
              <a className="approve text-xl">รับรองโดย : คุณน่ารัก ครุครุคริคริ</a>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-white shadow-lg flex justify-between">
                <button className="btn bg-others text-white w-1/2 text-center">ดูคำอื่น</button>
                <button className="btn bg-confirm text-white w-1/2 text-center">ดาวน์โหลด</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cta" className="flex-grow flex place-self-end"> 
        เลขที่พอร์ตปัจจุบัน (Port):14053
        เลขที่ไอพีปัจจุบัน (IP Address):172.20.10.3
      </div>
    </div>
  );
};

export default DisplayVocab;
