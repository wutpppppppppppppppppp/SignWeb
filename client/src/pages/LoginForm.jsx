import React, { useState } from "react"
import { Link } from "react-router-dom"
import Navbar2 from "../components/Navbar2"
import { IoMdMail } from "react-icons/io"
import { FaKey } from "react-icons/fa"
const Login = () => {
  const [password, setPassword] = useState("")

  return (
    <div className="w-screen h-screen flex flex-col justify-between bg-primary">
      <Navbar2 title="เข้าสู่ระบบ" />
      <div className="h-0.5 bg-secondary-content w-full"></div>
      <div className="flex-grow flex items-center justify-center w-2/3 place-self-center my-20 rounded-lg">
        <div className="p-4 flex flex-col">
          
          <div className="flex flex-col gap-1 mb-4">
            {/*logo*/}
            <div className="text-purple-900 font-bold text-xl pl-14">SignPose 3D</div>
            {/* email */}
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
          <div className="flex flex-col gap-2">
            {/*login*/}
            <Link to="/setup-form">
              <button className="btn btn-wide btn-secondary ">
                เข้าสู่ระบบ
              </button>
            </Link>
            <div className="flex-grow flex items-center justify-center">
              ลืมรหัสผ่านใช่หรือไม่?
            </div>
            {/*signin*/}
            <Link to="/sign-in" className="place-self-center">
              <button className="btn btn-wide btn-secondary text-secondary-content">
                สร้างบัญชี
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
