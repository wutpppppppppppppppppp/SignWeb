import React, { useState } from "react"
import { Link } from "react-router-dom"
import PathConstants from "../routes/pathConstants"
import { FaUser } from "react-icons/fa6"
import { MdOutlineInfo } from "react-icons/md"
import { TbWorld } from "react-icons/tb"
const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Function to toggle the visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="hero min-h-screen">
      <div className="navbar self-start">
        <div className="flex-1">
          <Link to={PathConstants.LANDING} className="btn btn-ghost text-xl">
            บลูมบีท
          </Link>
        </div>
        <div className="flex-none">
          <Link
            to={PathConstants.LOGIN}
            className="btn btn-outline btn-ghost text-primary"
          >
            <FaUser />
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>

      <div className="hero-content text-center">
        <div className="max-w-fit">
          <h1 className="text-8xl mb-10">คลังเก็บภาษามือไทย</h1>
          <Link
            to={PathConstants.CATEGORY}
            className="btn btn-wide btn-lg btn-primary text-primary-content"
          >
            ค้นหาภาษามือ
          </Link>
        </div>
      </div>

      <div className="place-self-end size-20">
        <MdOutlineInfo
          className="size-8 cursor-pointer hover:text-info"
          title="ข้อตกลงการให้บริการ"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        />
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:text-error">
              ✕
            </button>
          </form>
          {/* <h3 className="font-bold text-lg">ข้อตกลงการให้บริการ</h3>
          <p className="py-5">
          <p>กรุณาอ่านและทำความเข้าใจกฎและข้อตกลงการให้บริการดังต่อไปนี้เพื่อให้การใช้งานเว็บไซต์เป็นไปอย่างราบรื่นและปลอดภัย</p>

          <p>ข้อกำหนดการใช้งาน</p>
          
          <p>1. การยอมรับข้อตกลง</p>
          <p>เมื่อคุณเข้าใช้งานเว็บไซต์นี้ แสดงว่าคุณยอมรับที่จะปฏิบัติตามกฎและข้อตกลงที่ระบุไว้ในที่นี้ หากคุณไม่ยอมรับข้อตกลงนี้ กรุณาอย่าเข้าใช้งานเว็บไซต์</p>

          <p>2. การลงทะเบียนและบัญชีผู้ใช้</p>
          <p>2.1 คุณต้องลงทะเบียนเพื่อสร้างบัญชีผู้ใช้ก่อนจึงจะสามารถเข้าถึงและดาวน์โหลดไฟล์ท่าภาษามือในรูปแบบ 3D ได้</p>
          <p>2.2 ข้อมูลที่คุณให้มาต้องเป็นข้อมูลที่ถูกต้องและเป็นความจริง</p>
          <p>2.3 คุณมีความรับผิดชอบในการรักษาความปลอดภัยของบัญชีและรหัสผ่านของคุณ</p>

          <p>3. การใช้งานเนื้อหา</p>
          <p>3.1 คุณสามารถเข้าถึงและดูท่าภาษามือในรูปแบบ 3D บนเว็บไซต์นี้ได้โดยไม่เสียค่าบริการ</p>
          <p>3.2 หากคุณต้องการดาวน์โหลดไฟล์ท่าภาษามือในรูปแบบ 3D ไปใช้งาน คุณต้องชำระค่าบริการที่กำหนด</p>
          <p>3.3 ห้ามนำไฟล์ที่ดาวน์โหลดไปใช้ในทางที่ละเมิดกฎหมายหรือขัดต่อศีลธรรม</p>

          <p>4. การชำระค่าบริการ</p>
          <p>4.1 ค่าบริการสำหรับการดาวน์โหลดไฟล์ท่าภาษามือในรูปแบบ 3D จะระบุไว้ในเว็บไซต์</p>
          <p>4.2 การชำระเงินสามารถทำได้ผ่านช่องทางที่เว็บไซต์กำหนด</p>
          <p>4.3 ค่าบริการที่ชำระแล้วจะไม่สามารถขอคืนได้</p>

          <p>5. สิทธิ์ในทรัพย์สินทางปัญญา</p>
          <p>5.1 ไฟล์ท่าภาษามือในรูปแบบ 3D ที่ให้บริการบนเว็บไซต์นี้เป็นทรัพย์สินทางปัญญาของเว็บไซต์</p>
          <p>5.2 คุณไม่ได้รับสิทธิ์ในการขาย แจกจ่าย หรือทำซ้ำไฟล์โดยไม่ได้รับอนุญาต</p>

          <p>6. ความรับผิดชอบ</p>
          <p>6.1 เว็บไซต์ไม่รับผิดชอบต่อความเสียหายหรือความสูญเสียใด ๆ ที่เกิดขึ้นจากการใช้งานเว็บไซต์หรือไฟล์ที่ดาวน์โหลด</p>
          <p>6.2 คุณมีความรับผิดชอบในการใช้งานไฟล์ที่ดาวน์โหลดอย่างถูกต้องตามกฎหมายและจริยธรรม</p>

          <p>7. การแก้ไขข้อตกลง</p>
          <p>เว็บไซต์มีสิทธิ์ในการแก้ไขข้อตกลงนี้ได้ทุกเมื่อโดยไม่ต้องแจ้งให้ทราบล่วงหน้า ข้อตกลงที่แก้ไขจะมีผลบังคับใช้ทันทีที่เผยแพร่บนเว็บไซต์</p>

          <p>8. ข้อกำหนดทั่วไป</p>
          <p>8.1 ข้อตกลงนี้ถูกกำกับด้วยกฎหมายที่เกี่ยวข้องในประเทศไทย</p>
          <p>8.2 หากข้อตกลงใดในนี้เป็นโมฆะหรือไม่สามารถบังคับใช้ได้ ส่วนที่เหลือของข้อตกลงจะยังคงมีผลบังคับใช้ต่อไป</p>

          <p>การติดต่อ</p>
          <p>หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับกฎและข้อตกลงการให้บริการ กรุณาติดต่อทีมงานของเราผ่านทางช่องทางที่ระบุไว้ในเว็บไซต์</p>

          <p>ขอบคุณที่ใช้บริการเว็บไซต์ของเรา</p>
          </p> */}
          <div className="relative flex justify-between">
            <div className="flex flex-col">
              {isVisible ? (
                <div>
                  <h3 className="pb-2">License Agreement</h3>
                  <p>
                    This software is a work developed by Panyawut Piyasirinanan,
                    Pornchanok Pinnuwat, Nan Aye Myint Kyi from King Mongkut's
                    University of Technology Thonburi under the provision of
                    Jaturon Harnsomburana under Thai Sign Language 3D Gesture
                    Repository, which has been supported by the National Science
                    and Technology Development Agency (NSTDA), in order to
                    encourage pupils and students to learn and practice their
                    skills in developing software.
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
                    In this connection, NSTDA shall not be responsible to the
                    user for taking care, maintaining, training, or developing
                    the efficiency of this software. Moreover, NSTDA shall not
                    be liable for any error, software efficiency and damages in
                    connection with or arising out of the use of the software.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="pb-2">ข้อตกลงในการใช้ซอฟต์แวร์</h3>
                  <p>
                    ซอฟต์แวร์นี้เป็นผลงานที่พัฒนาขึ้นโดย นาย ปัญญาวุฒิ
                    ปิยะศิรินานันทร์, นางสาว ภรณ์ชนก พิณนุวัตร, นางสาว นาน เอ
                    เมี่ยน จิ จาก มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
                    ภายใต้การดูแลของ ดร.จาตุรนต์ หารสมบูรณ์ ภายใต้โครงการ
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
                </div>
              )}
              <label className="swap text-neutral-content self-end hover:text-accent">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={toggleVisibility}
                />
                <div className="swap-on flex gap-1">
                  <span className="flex-1 text-end">ไทย</span>
                  <TbWorld className="h-full" />
                </div>
                <div className="swap-off flex gap-1 hover:text-info">
                  <span>English</span>
                  <TbWorld className="h-full" />
                </div>
              </label>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default LandingPage
