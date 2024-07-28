import * as React from "react"
import { Link } from "react-router-dom"
import Navbar2 from "../components/Navbar2"

const DoneRecord = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar2 title="เสร็จสิ้นการบันทึก" />

      <div className="flex-grow flex flex-col items-center justify-center gap-7">
        {/* title */}
        <div className="text-7xl text-center">
          เราได้บันทึกท่าของคุณแล้ว ขอบคุณที่ให้ความช่วยเหลือค่ะ
        </div>

        {/* button*/}
        <div className="flex gap-10">
          <Link to="/categoryad">
            <button className="btn btn-width btn-lg bg-confirm text-base-100">
              บันทึกท่าคำศัพท์ใหม่
            </button>
          </Link>
          <Link to="/">
            <button className="btn btn-width btn-lg btn-secondary ">
              กลับหน้าหลัก
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoneRecord
