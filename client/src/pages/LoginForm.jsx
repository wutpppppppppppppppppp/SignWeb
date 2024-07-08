import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

const Login = () => {
  
  const [password, setPassword] = useState("");
  
  return (
    <div className="w-screen h-screen flex flex-col justify-between ">
      <Navbar2 title="เข้าสู่ระบบ" />

      <div className="flex-grow flex items-center justify-center">
      <div className="p-4 place-self-center">

        {/* email */}
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="อีเมล" />
        </label>  
        {/*password*/}
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd"/>
          </svg>
          <input type="password" className="grow" placeholder="รหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>

        {/*login*/}
        <button className="btn btn-wide">
        <Link to="/setup-form" className="btn btn-wide btn-lg btn-primary text-primary-content">
            เข้าสู่ระบบ
        </Link>
        </button>

        <div class="acc" className="flex-grow flex items-center justify-center">ยังไม่มีบัญชี?</div>

        {/*signin*/}
        <button className="btn btn-wide">
        <Link to="/sign-in" className="btn btn-wide btn-lg btn-primary text-primary-content ">
            สร้างบัญชี
        </Link>
        </button>

      </div>
      </div>
    </div>
  );
};

export default Login;
