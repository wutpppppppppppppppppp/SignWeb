import React, { useState } from "react"
import { Link } from "react-router-dom"
import Navbar2 from "../components/Navbar2"
import { IoMdMail } from "react-icons/io"
import { FaKey } from "react-icons/fa"
const Login = () => {
  const [password, setPassword] = useState("")

  return (
    <div className="w-screen h-screen flex flex-col justify-between bg-primary">
      <Navbar2 title="SignPose3D" />
      <div className="h-0.5 bg-secondary-content w-full"></div>
      <div className="flex-grow flex items-center justify-center w-2/3 place-self-center my-20">
        <div className="p-4 flex flex-col justify-center item-center">
          <div className="flex flex-col gap-2 mb-4">
            {/* email */}
            <h1 className="text-primary-content text-center">เข้าสู่ระบบ</h1>
            <div className="divider"></div>
            <span className="label-text">อีเมล</span>
            <label className="input input-bordered flex items-center gap-2">
              <IoMdMail />
              <input
                type="text"
                className="input-sm"
                placeholder="example@gmail.com"
              />
            </label>
            {/*password*/}
            <span className="label-text">รหัสผ่าน</span>
            <label className="input input-bordered flex items-center gap-2">
              <FaKey className="text-current" />
              <input
                type="password"
                className="input-sm"
                placeholder="***********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col gap-3">
            {/*login*/}
            <Link to="/setup-form">
              <button className="btn btn-wide btn-secondary text-secondary-content ">
                ยืนยัน
              </button>
            </Link>
            <div className="flex-grow flex items-center justify-center">
              ลืมรหัสผ่านใช่หรือไม่?
            </div>
            {/*signin*/}
            <Link to="/sign-in" className="place-self-center">
              <div className="flex-grow flex items-center justify-center text-primary-content">
                สร้างบัญชี
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
