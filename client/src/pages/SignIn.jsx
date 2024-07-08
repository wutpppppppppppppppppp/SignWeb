import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

const SignIn = () => {

  const [password, setPassword] = useState("");

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar2 title="สร้างบัญชี" />

      {/* Section 1 */}
      <div className="flex-grow flex items-center justify-center">ข้อมูลส่วนตัว</div>
        <label className="input input-bordered flex items-center gap-2">
          ชื่อ
        <input type="text" className="grow" placeholder="รณจักร" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          นามสกุล
        <input type="text" className="grow" placeholder="จุฑาเทพ" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          อายุ
        <input type="number" className="grow" placeholder="20" />
        </label>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>ระดับการได้ยิน</option>
          <option>หูดี</option>
          <option>หูตึง</option>
          <option>หูหนวก</option>
        </select>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>กลุ่มล่าม</option>
          <option>ล่ามชุมชน</option>
          <option>ล่ามภาษาอังกฤษ</option>
          <option>ล่ามทีวี</option>
          <option>ล่ามวิชาอาชีพ</option>
        </select>

      {/* Section 2 */}
      <div className="flex-grow flex items-center justify-center">การฝึกอบรม</div>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>หลักสูตรล่ามภาษามือ</option>
          <option>หลักสูตร1</option>
          <option>หลักสูตร2</option>
        </select>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>ระยะเวลา</option>
          <option>1 เดือน</option>
          <option>2 เดือน</option>
          <option>6 เดือน</option>
          <option>1 ปี</option>
          <option>2 ปี</option>
          <option>3 ปี</option>
          <option>4 ปี</option>
        </select>
        <label className="input input-bordered flex items-center gap-2">
          หน่วยงาน/สถาบัน
          <input type="text" className="grow" placeholder="มหาวิทยาลัยมหิดล ราชสุดา" />
        </label>

      {/* Section 3 */}
      <div className="flex-grow flex items-center justify-center">การลงทะเบียน</div>
        <label className="input input-bordered flex items-center gap-2">
          อีเมล
          <input type="text" className="grow" placeholder="ronajak@mail.com" />
        </label>
        <div className="flex-grow flex items-center justify-center">
          สร้างรหัสผ่าน
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd"/>
            </svg>
          <input type="password" className="grow" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>

        <div className="flex-grow flex  justify-center">
          ยืนยันรหัสผ่าน
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd"/>
          </svg>
          <input type="password" className="grow" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        </div>

      {/* Section 4 */}
      <div className="flex-grow flex items-center justify-center">การยืนยันตัวตน</div>
        <div className="flex-grow flex items-center justify-center">
          อัปโหลดบัตรประจำตัวคนพิการหรือบัตรประจำตัวล่าม  
          <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
        </div>

      {/* Section 5 */}
      <button className="btn btn-wide">
        <Link to="/Category" className="btn btn-wide btn-lg btn-primary text-primary-content">
            สร้างบัญชี
        </Link>
      </button>
    </div>
  );
};

export default SignIn;
