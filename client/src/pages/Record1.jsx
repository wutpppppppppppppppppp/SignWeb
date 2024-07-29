import React, { useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar3 from "../components/Navbar3"
import PathConstants from "../routes/pathConstants"
import RecordButton from "../components/RecordBtn"
import { VscSettings } from "react-icons/vsc"
import axios from "../../node_modules/axios/index"
// import { calibrate } from "../services/recordServices";

// Uncomment the imports for the recording services
// import {
//   startRecording,
//   stopRecording,
//   calibrate,
// } from "../services/recordServices";

const Record = () => {
  const { categoryad, vocabularyad } = useParams()
  console.log(categoryad, vocabularyad)
  const navigate = useNavigate()
  const [isRecording, setIsRecording] = React.useState(false)
  const [isCalibrating, setIsCalibrating] = React.useState(false)
  const vdo_3d = useRef(null)
  const vdo_cam = useRef(null)

  const handleCalibrate = () => {
    setIsCalibrating(true)
    // Call the calibrate function
    // calibrate()

    setTimeout(() => {
      setIsCalibrating(false)
    }, 3000) // Disable the button for 3 seconds
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    // Call the startRecording function
    // startRecording()
    if (vdo_3d.current) {
      vdo_3d.current.play()
    }
    if (vdo_cam.current) {
      vdo_cam.current.play()
    } //after call start function the video of 3D and camera will play
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    console.log("stoprecord")
    // Call the stopRecording function
    // stopRecording()
    navigate(`/categoryad/${categoryad}/${vocabularyad}`) // Programmatically navigate after stopping recording
    if (vdo_3d.current) {
      vdo_3d.current.pause()
    }
    if (vdo_cam.current) {
      vdo_cam.current.pause()
    } //pause the vdo then go to the stop record
  }
  const vdoSrc = {
    // function to play video in user view
    ปลาช่อน:
      "https://res.cloudinary.com/dein37xju/video/upload/v1722157789/%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B8%8A%E0%B9%88%E0%B8%AD%E0%B8%99_rci4dc.mov",
    สวัสดี:
      "https://res.cloudinary.com/dein37xju/video/upload/v1722157790/%E0%B8%AA%E0%B8%A7%E0%B8%B1%E0%B8%AA%E0%B8%94%E0%B8%B5_wouilq.mov",
    ก้น: "https://res.cloudinary.com/dein37xju/video/upload/v1722254897/ajgidwj5kjcib1hkbf6t.mov",
    พ่อ: "https://res.cloudinary.com/dein37xju/video/upload/v1722253104/dad.mov",
    สีฟ้า:
      "https://res.cloudinary.com/dein37xju/video/upload/v1722254419/mshd9w9bq1cqlbgsxgdc.mov",
    หนึ่่งร้อย: "https://res.cloudinary.com/dein37xju/video/upload/v1722254128/cfsww6wnjiowoecm9hpn.mov",
  }
  const vdo3D = {
    // function to play video in louise view
    "ปลาช่อน" : "https://res.cloudinary.com/dein37xju/video/upload/v1722243341/pjswe5saazzdvvjvhn9o.mov"
    ,"สวัสดี" : "https://res.cloudinary.com/dein37xju/video/upload/v1722243341/pjswe5saazzdvvjvhn9o.mov"
    ,"ก้น" : "https://res.cloudinary.com/dein37xju/video/upload/v1722254886/joee8magbfodkopv8bqk.mov"
    ,"พ่อ" : "https://res.cloudinary.com/dein37xju/video/upload/v1722253104/vg26hia3ra3u2yjkf3lh.mov"
    ,"สีฟ้า" : "https://res.cloudinary.com/dein37xju/video/upload/v1722254422/yxvon8g1d49a4zbaexam.mov"
    ,"หนึ่่งร้อย" : "https://res.cloudinary.com/dein37xju/video/upload/v1722253893/bj2i6vtnchgibs7blatb.mov"
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar3 title={`บันทึกท่าคำศัพท์: ${vocabularyad}`} />
      <div className="flex flex-col items-center justify-center flex-grow pt-8">
        <div className="grid grid-cols-2 gap-10 w-full max-w-7xl">
          {/* clip 3D */}
          <div className="flex justify-center">
            <video ref={vdo_3d} controls className="video-player shadow-2xl">
              <source src={vdoSrc[vocabularyad]} type="video/mp4" />
            </video>
          </div>
          {/* clip from camera */}
          <div className="flex justify-center">
            <video ref={vdo_cam} controls className="video-player shadow-2xl">
              <source src={vdo3D[vocabularyad]} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="flex gap-x-5 m-5">
          <button
            className={`btn ${isRecording ? "btn-disabled" : "btn-primary-content"} text-primary-content`}
            onClick={handleCalibrate}
            disabled={isCalibrating}
          >
            <VscSettings />
            ปรับท่า​
          </button>
        </div>
        <div className="flex-1 text-center mb-4">
          <RecordButton
            isRecording={isRecording}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
          />
        </div>
        <div className="bg-primary-content text-primary text-sm py-2 text-center justify-self-end self-stretch">
          <p>เลขที่พอร์ตปัจจุบัน (Port): 14053</p>
          <p>เลขที่ไอพีปัจจุบัน (IP Address): 172.20.10.3</p>
        </div>
      </div>
    </div>
  )
}

export default Record
