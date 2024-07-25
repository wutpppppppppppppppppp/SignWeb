import * as React from "react"
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa6"
import { MdOutlineInfo } from "react-icons/md"
import PathConstants from "../routes/pathConstants"
import { useState } from "react"

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen w-full  bg-primary">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm">
        <div className="w-full px-4 py-3 flex justify-between items-center">
          <Link to={PathConstants.LANDING} className="text-purple-900 font-bold text-xl">
            SignPose 3D
          </Link>
          <Link
            to={PathConstants.LOGIN}
            className="btn  btn-primary"
            aria-label="เข้าสู่ระบบ"
          >
            <FaUser className="mr-2" />
            <span>เข้าสู่ระบบ</span>
          </Link>
        </div>
      </nav>
      <div className="h-0.5 bg-secondary-content w-full"></div>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center w-full px-4">
        <div className="text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-10">คลังเก็บภาษามือไทย</h1>
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
          className="btn btn-circle btn-lg"
          aria-label="ข้อตกลงการให้บริการ"
        >
          <MdOutlineInfo className="text-2xl" />
        </button>
      </div>

      {/* Modal */}
      <dialog id="terms_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">ข้อตกลงการให้บริการ</h3>
          <div className="mb-4">
            <button
              className="btn btn-primary"
              onClick={toggleVisibility}
            >
              {isVisible ? 'English' : 'ภาษาไทย'}
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {isVisible ? (
              <p className="text-sm">
                {/* Thai terms content */}
                ข้อตกลงในการใช้ซอฟต์แวร์ (Thai version)
              </p>
            ) : (
              <p className="text-sm">
                {/* English terms content */}
                Software Usage Agreement (English version)
              </p>
            )}
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default LandingPage