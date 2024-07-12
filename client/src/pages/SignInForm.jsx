import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

const SignIn = () => {

  const [password, setPassword] = useState("");

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar2 title="สร้างบัญชี" />

      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Section 1: Personal Information */}
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold mb-2">ข้อมูลส่วนตัว</div>
          <div className="flex flex-wrap justify-start gap-2 max-w-l">
            <label className="input input-bordered flex items-center gap-2">
              ชื่อ
              <input type="text" className="input w-full" placeholder="รณจักร" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              นามสกุล
              <input type="text" className="input w-full" placeholder="จุฑาเทพ" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              อายุ
              <input type="number" className="input w-full" placeholder="20" />
            </label>
            <select className="select select-bordered flex items-center gap-2">
              <option disabled selected>ระดับการได้ยิน</option>
              <option>หูดี</option>
              <option>หูตึง</option>
              <option>หูหนวก</option>
            </select>
            <select className="select select-bordered flex items-center gap-2">
              <option disabled selected>กลุ่มล่าม</option>
              <option>ล่ามชุมชน</option>
              <option>ล่ามภาษาอังกฤษ</option>
              <option>ล่ามทีวี</option>
              <option>ล่ามวิชาอาชีพ</option>
            </select>
          </div>
        </div>

        {/* Section 2: Training */}
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold mb-2">การฝึกอบรม</div>
          <div className="flex flex-wrap justify-center gap-2 max-w-l">
            <select className="select select-bordered flex items-center gap-2">
              <option disabled selected>หลักสูตรล่ามภาษามือ</option>
              <option>หลักสูตร1</option>
              <option>หลักสูตร2</option>
            </select>
            <select className="select select-bordered flex items-center gap-2">
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
          </div>
        </div>

        {/* Section 3: Registration */}
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold mb-2">การลงทะเบียน</div>
          <div className="flex flex-wrap gap-2 max-w-s">
            <label className="input input-bordered flex items-center gap-2">
              <span className="whitespace-nowrap">อีเมล</span>
              <input type="text" className="grow" placeholder="test@gmail.com" />
            </label>
            <div className="flex flex-wrap gap-2 max-w-xs w-full">
              <label className="input input-bordered flex items-center gap-2 w-full">
                <span className="whitespace-nowrap">สร้างรหัสผ่าน</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                  <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd"/>
                </svg>
                <input type="password" className="input w-full" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
            </div>
            <div className="flex flex-wrap gap-2 max-w-xs w-full">
              <label className="input input-bordered flex items-center gap-2">
                <span className="whitespace-nowrap">ยืนยันรหัสผ่าน</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                  <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd"/>
                </svg>
                <input type="password" className="input w-full" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Identity Confirmation */}
        <div className="flex flex-col items-center">
          <div className="text-lg font-bold mb-2">การยืนยันตัวตน</div>
          <div className="flex justify-center gap-2 max-w-l w-full px-4">
            อัปโหลดบัตรประจำตัวคนพิการหรือบัตรประจำตัวล่าม
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
          </div>
        </div>
      </div>
      {/* Section 5: Submit Button */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-8">
        <div className="max-w-fit">
          <div className="flex justify-center gap-2 max-w-l w-full px-4">
              <Link to="/login" className="btn btn-primary btn-lg btn-wide text-primary-content">
              สร้างบัญชี
              </Link>
          </div>
          </div>
        </div>
      </div>
      </div>
  );
};





export default SignIn;
