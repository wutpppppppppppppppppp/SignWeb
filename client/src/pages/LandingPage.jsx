import * as React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import PathConstants from "../routes/pathConstants";
import { MdOutlineInfo } from "react-icons/md";

const LandingPage = () => {
  return (
      <div className="hero min-h-screen">

      <div className="navbar self-start">
        <div className="flex-1">
          <Link to={PathConstants.INFO_POLICY} className="btn btn-ghost text-xl">
            บลูมบีท
          </Link>
        </div>
        <div className="flex-none">
          <Link to={PathConstants.LOGIN} className="btn btn-outline btn-ghost text-primary">
            <FaUser/>
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
        
      <div className="hero-content text-center">
        <div className="max-w-fit">
          <p className="text-8xl mb-10">คลังเก็บภาษามือไทย</p>
          <Link to={PathConstants.CATEGORY} className="btn btn-wide btn-lg btn-primary text-primary-content">
            ค้นหาภาษามือ
          </Link>
        </div>
      </div>

      <div class="Term and conditions place-self-end size-20">
        <MdOutlineInfo className="size-8 cursor-pointer" title="ข้อตกลงการให้บริการ" onClick={() => document.getElementById('my_modal_3').showModal()} /> 
      </div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">ข้อตกลงการให้บริการ</h3>
            <p className="py-5">
            ยินดีต้อนรับสู่เว็บไซต์เก็บท่าภาษามือในรูปแบบ 3D ของเรา กรุณาอ่านและทำความเข้าใจกฎและข้อตกลงการให้บริการดังต่อไปนี้เพื่อให้การใช้งานเว็บไซต์เป็นไปอย่างราบรื่นและปลอดภัย
            กฎและข้อตกลงการให้บริการเว็บไซต์เก็บท่าภาษามือในรูปแบบ 3D
            ข้อกำหนดการใช้งาน

            1. การยอมรับข้อตกลง
            เมื่อคุณเข้าใช้งานเว็บไซต์นี้ แสดงว่าคุณยอมรับที่จะปฏิบัติตามกฎและข้อตกลงที่ระบุไว้ในที่นี้ หากคุณไม่ยอมรับข้อตกลงนี้ กรุณาอย่าเข้าใช้งานเว็บไซต์

            2. การลงทะเบียนและบัญชีผู้ใช้
            2.1 คุณต้องลงทะเบียนเพื่อสร้างบัญชีผู้ใช้ก่อนจึงจะสามารถเข้าถึงและดาวน์โหลดไฟล์ท่าภาษามือในรูปแบบ 3D ได้  
            2.2 ข้อมูลที่คุณให้มาต้องเป็นข้อมูลที่ถูกต้องและเป็นความจริง  
            2.3 คุณมีความรับผิดชอบในการรักษาความปลอดภัยของบัญชีและรหัสผ่านของคุณ  

            3. การใช้งานเนื้อหา
            3.1 คุณสามารถเข้าถึงและดูท่าภาษามือในรูปแบบ 3D บนเว็บไซต์นี้ได้โดยไม่เสียค่าบริการ  
            3.2 หากคุณต้องการดาวน์โหลดไฟล์ท่าภาษามือในรูปแบบ 3D ไปใช้งาน คุณต้องชำระค่าบริการที่กำหนด  
            3.3 ห้ามนำไฟล์ที่ดาวน์โหลดไปใช้ในทางที่ละเมิดกฎหมายหรือขัดต่อศีลธรรม

            4. การชำระค่าบริการ
            4.1 ค่าบริการสำหรับการดาวน์โหลดไฟล์ท่าภาษามือในรูปแบบ 3D จะระบุไว้ในเว็บไซต์  
            4.2 การชำระเงินสามารถทำได้ผ่านช่องทางที่เว็บไซต์กำหนด  
            4.3 ค่าบริการที่ชำระแล้วจะไม่สามารถขอคืนได้  

            5. สิทธิ์ในทรัพย์สินทางปัญญา
            5.1 ไฟล์ท่าภาษามือในรูปแบบ 3D ที่ให้บริการบนเว็บไซต์นี้เป็นทรัพย์สินทางปัญญาของเว็บไซต์  
            5.2 คุณไม่ได้รับสิทธิ์ในการขาย แจกจ่าย หรือทำซ้ำไฟล์โดยไม่ได้รับอนุญาต  

            6. ความรับผิดชอบ
            6.1 เว็บไซต์ไม่รับผิดชอบต่อความเสียหายหรือความสูญเสียใด ๆ ที่เกิดขึ้นจากการใช้งานเว็บไซต์หรือไฟล์ที่ดาวน์โหลด  
            6.2 คุณมีความรับผิดชอบในการใช้งานไฟล์ที่ดาวน์โหลดอย่างถูกต้องตามกฎหมายและจริยธรรม  

            7. การแก้ไขข้อตกลง
            เว็บไซต์มีสิทธิ์ในการแก้ไขข้อตกลงนี้ได้ทุกเมื่อโดยไม่ต้องแจ้งให้ทราบล่วงหน้า ข้อตกลงที่แก้ไขจะมีผลบังคับใช้ทันทีที่เผยแพร่บนเว็บไซต์

            8. ข้อกำหนดทั่วไป
            8.1 ข้อตกลงนี้ถูกกำกับด้วยกฎหมายที่เกี่ยวข้องในประเทศไทย  
            8.2 หากข้อตกลงใดในนี้เป็นโมฆะหรือไม่สามารถบังคับใช้ได้ ส่วนที่เหลือของข้อตกลงจะยังคงมีผลบังคับใช้ต่อไป

            การติดต่อ
            หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับกฎและข้อตกลงการให้บริการ กรุณาติดต่อทีมงานของเราผ่านทางช่องทางที่ระบุไว้ในเว็บไซต์

            ขอบคุณที่ใช้บริการเว็บไซต์ของเรา
            </p>
          </div>
        </dialog>
      </div>
      
  );
};

export default LandingPage