import React, { useState } from "react";
import Navbar2 from "../components/Navbar2";

const Agreement = () => {
  const [isThai, setIsThai] = useState(true);

  const handleThaiEng = (bool) => {
    setIsThai(bool);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar2 title="ข้อตกลงในการใช้ซอฟต์แวร์" />
      <label className="swap">
        <input 
          type="checkbox" 
          onChange={(e) => handleThaiEng(e.target.checked)} 
        />
        <div className="swap-on">
          {isThai && (
            <div className="cta flex-grow flex place-self-end">
              ซอฟต์แวร์นี้เป็นผลงานที่พัฒนาขึ้นโดย นาย ปัญญาวุฒิ ปิยะศิรินานันทร์, นางสาว ภรณ์ชนก พิณนุวัตร, นางสาว นาน เอ เมี่ยน จิ จาก มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
              ภายใต้การดูแลของ ดร.จาตุรนต์ หารสมบูรณ์ ภายใต้โครงการ เว็บไซต์เก็บท่าทางสามมิติผู้ใช้ภาษามือ 
              คลังคำศัพท์ภาษามือไทยแบบสามมิติ 
              ซึ่งสนับสนุนโดย สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ โดยมี
              วัตถุประสงค์เพื่อส่งเสริมให้นักเรียนและนักศึกษาได้เรียนรู้และฝึกทักษะในการพัฒนา
              ซอฟต์แวร์ ลิขสิทธิ์ของซอฟต์แวร์นี้จึงเป็นของผู้พัฒนา ซึ่งผู้พัฒนาได้อนุญาตให้ส านักงาน
              พัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ เผยแพร่ซอฟต์แวร์นี้ตาม “ต้นฉบับ” โดยไม่มี
              การแก้ไขดัดแปลงใด ๆ ทั้งสิ้น ให้แก่บุคคลทั่วไปได้ใช้เพื่อประโยชน์ส่วนบุคคลหรือ
              ประโยชน์ทางการศึกษาที่ไม่มีวัตถุประสงค์ในเชิงพาณิชย์ โดยไม่คิดค่าตอบแทนการใช้
              ซอฟต์แวร์ ดังนั้น ส านักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ จึงไม่มีหน้าที่ใน
              การดูแล บ ารุงรักษา จัดการอบรมการใช้งาน หรือพัฒนาประสิทธิภาพซอฟต์แวร์ รวมทั้ง
              ไม่รับรองความถูกต้องหรือประสิทธิภาพการท างานของซอฟต์แวร์ ตลอดจนไม่รับประกัน
              ความเสียหายต่าง ๆ อันเกิดจากการใช้ซอฟต์แวร์นี้ทั้งสิ้น 
            </div>
          )}
        </div>
        <div className="swap-off">
          {!isThai && (
            <div className="cta flex-grow flex place-self-end">
              This software is a work developed by Panyawut Piyasirinanan, Pornchanok Pinnuwat, Nan Aye Myint Kyi from King Mongkut's University of Technology Thonburi under the provision of Jaturon Harnsomburana under Thai Sign Language 3D Gesture Repository, which has been supported by the National Science and Technology
              Development Agency (NSTDA), in order to encourage pupils and students to
              learn and practice their skills in developing software. Therefore, the intellectual
              property of this software shall belong to the developer and the developer gives
              NSTDA a permission to distribute this software as an “as is” and non-modified
              software for a temporary and non-exclusive use without remuneration to anyone
              for his or her own purpose or academic purpose, which are not commercial
              purposes. In this connection, NSTDA shall not be responsible to the user for
              taking care, maintaining, training, or developing the efficiency of this software.
              Moreover, NSTDA shall not be liable for any error, software efficiency and
              damages in connection with or arising out of the use of the software.
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default Agreement;
