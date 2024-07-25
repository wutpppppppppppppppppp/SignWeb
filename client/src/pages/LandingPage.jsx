import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa6"
import { MdOutlineInfo } from "react-icons/md"
import { TbWorld } from "react-icons/tb"
import PathConstants from "../routes/pathConstants"

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((prev) => !prev)

  return (
    <div className="flex flex-col min-h-screen w-full bg-primary">
      {/* Navbar */}
      <nav className="navbar bg-primary p-1 shadow-sm border-b-2 border-b-secondary-content">
        <Link
          to={PathConstants.LANDING}
          className="text-purple-900 font-bold text-xl hover:text-purple-600 navbar-start pl-3"
        >
          SignPose 3D
        </Link>
        <div className="navbar-end"></div>
        <Link
          to={PathConstants.LOGIN}
          className="btn btn-primary"
          aria-label="เข้าสู่ระบบ"
        >
          <FaUser />
          <span>เข้าสู่ระบบ</span>
        </Link>
      </nav>
      {/* <div className="h-0.5 bg-secondary-content w-full"></div> */}

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center w-full px-4">
        <div className="text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-10">
            คลังเก็บภาษามือไทย
          </h1>
          <Link
            to={PathConstants.CATEGORY}
            className="btn btn-lg btn-secondary text-secondary-content px-8"
            aria-label="ค้นหาภาษามือ"
          >
            ค้นหาภาษามือ
          </Link>
        </div>
      </main>

      {/* Terms and Conditions */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => document.getElementById("terms_modal").showModal()}
          className="btn btn-circle btn-lg bg-primary border-primary"
          aria-label="ข้อตกลงการให้บริการ"
        >
          <MdOutlineInfo className="text-2xl" />
        </button>
      </div>

      {/* Modal */}
      <dialog id="terms_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">ข้อตกลงการให้บริการ</h3>
          <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
            {isVisible ? (
              <p className="text-sm">
                ซอฟต์แวร์นี้เป็นผลงานที่พัฒนาขึ้นโดย นาย ปัญญาวุฒิ
                ปิยะศิรินานันทร์, นางสาว ภรณ์ชนก พิณนุวัตร, นางสาว นาน เอ เมี่ยน
                จิ จาก มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี ภายใต้การดูแลของ
                ดร.จาตุรนต์ หารสมบูรณ์ ภายใต้โครงการ
                เว็บไซต์เก็บท่าทางสามมิติผู้ใช้ภาษามือ
                คลังคำศัพท์ภาษามือไทยแบบสามมิติ ซึ่งสนับสนุนโดย
                สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ โดยมี
                <br />
                <br />
                วัตถุประสงค์เพื่อส่งเสริมให้นักเรียนและนักศึกษาได้เรียนรู้และฝึกทักษะในการพัฒนา
                ซอฟต์แวร์ ลิขสิทธิ์ของซอฟต์แวร์นี้จึงเป็นของผู้พัฒนา
                ซึ่งผู้พัฒนาได้อนุญาตให้สำนักงาน
                พัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ เผยแพร่ซอฟต์แวร์นี้ตาม
                “ต้นฉบับ” โดยไม่มี การแก้ไขดัดแปลงใด ๆ ทั้งสิ้น
                ให้แก่บุคคลทั่วไปได้ใช้เพื่อประโยชน์ส่วนบุคคลหรือ
                ประโยชน์ทางการศึกษาที่ไม่มีวัตถุประสงค์ในเชิงพาณิชย์
                โดยไม่คิดค่าตอบแทนการใช้ ซอฟต์แวร์
                <br />
                <br />
                ดังนั้น สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ
                จึงไม่มีหน้าที่ใน การดูแลบำรุงรักษา จัดการอบรมการใช้งาน
                หรือพัฒนาประสิทธิภาพซอฟต์แวร์ รวมทั้ง
                ไม่รับรองความถูกต้องหรือประสิทธิภาพการทำงานของซอฟต์แวร์
                ตลอดจนไม่รับประกัน ความเสียหายต่าง ๆ
                อันเกิดจากการใช้ซอฟต์แวร์นี้ทั้งสิ้น
              </p>
            ) : (
              <p className="text-sm">
                This software is a work developed by Panyawut Piyasirinanan,
                Pornchanok Pinnuwat, Nan Aye Myint Kyi from King Mongkut's
                University of Technology Thonburi under the provision of Jaturon
                Harnsomburana under Thai Sign Language 3D Gesture Repository,
                which has been supported by the National Science and Technology
                Development Agency (NSTDA), in order to encourage pupils and
                students to learn and practice their skills in developing
                software.
                <br />
                <br />
                Therefore, the intellectual property of this software shall
                belong to the developer and the developer gives NSTDA a
                permission to distribute this software as an “as is” and
                non-modified software for a temporary and non-exclusive use
                without remuneration to anyone for his or her own purpose or
                academic purpose, which are not commercial purposes.
                <br />
                <br />
                In this connection, NSTDA shall not be responsible to the user
                for taking care, maintaining, training, or developing the
                efficiency of this software. Moreover, NSTDA shall not be liable
                for any error, software efficiency and damages in connection
                with or arising out of the use of the software.
              </p>
            )}
            <label className="swap text-neutral-content self-end hover:text-secondary">
              <input
                type="checkbox"
                checked={isVisible}
                onChange={toggleVisibility}
              />
              <div className="swap-on flex gap-1">
                <span className="flex-1 text-end">ไทย</span>
                <TbWorld className="h-full" />
              </div>
              <div className="swap-off flex gap-1">
                <span>English</span>
                <TbWorld className="h-full" />
              </div>
            </label>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default LandingPage
