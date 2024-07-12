import * as React from "react";
import { Link } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import PathConstants from "../routes/pathConstants";


const DoneRecord =() =>{

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar2 title="เสร็จสิ้นการบันทึก" />

      <div className="flex-grow flex items-center justify-center">
        {/* title */}
        <div class="acc" className="flex-grow flex item-center justify-center">
          เราได้บันทึกท่าของคุณแล้ว ขอบคุณค่ะ
        </div>

        {/* button*/}
        <button className="btn btn-wide">
          <Link to="/record1" className="btn btn-width btn-lg btn-primary text-primary-content">
            บันทึกท่าคำศัพท์ใหม่
          </Link>
        </button>
        <button className="btn btn-wide">
          <Link to="/category" className="btn btn-width btn-lg btn-primary text-primary-content">
            กลับหน้าหลัก
          </Link>
        </button>
      </div>
    </div>
  )
}

export default DoneRecord;