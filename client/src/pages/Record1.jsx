import React, { useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar3 from "../components/Navbar3"
import PathConstants from "../routes/pathConstants"
import RecordButton from "../components/RecordBtn"
import { VscSettings } from "react-icons/vsc"
import axios from "../../node_modules/axios/index"
// import { calibrate } from "../services/recordServices" 

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
  const vdoSrc ={
    "ปลาช่อน" : "https://res.cloudinary.com/dein37xju/video/upload/v1722157789/%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B8%8A%E0%B9%88%E0%B8%AD%E0%B8%99_rci4dc.mov"
    ,"สวัสดี" : "https://res.cloudinary.com/dein37xju/video/upload/v1722157790/%E0%B8%AA%E0%B8%A7%E0%B8%B1%E0%B8%AA%E0%B8%94%E0%B8%B5_wouilq.mov"
    ,"ก้น" : "https://res.cloudinary.com/dein37xju/video/upload/v1722157787/%E0%B8%81%E0%B9%89%E0%B8%99_rbnyqj.mov"
    ,"พ่อ" : "https://res.cloudinary.com/dein37xju/video/upload/v1722157606/dad_uxpzti.mov"
    ,"สีฟ้า" : "https://res.cloudinary.com/dein37xju/video/upload/v1722157606/blue_gctsdr.mov"
    ,"100" : "https://res.cloudinary.com/dein37xju/video/upload/v1722157604/100_iznlve.mov"
  }

  return (
    <div className="w-screen h-screen">
      <Navbar3 title={`บันทึกท่าคำศัพท์: ${vocabularyad}`} />

      {/* <div class="grid grid-cols-2 gap-2">
        <div class="col-start-1"></div>
        <div class="grid grid-cols-subgrid gap-4 col-span-3"></div>
      </div> */}

      {/* <h1 className="text-primary-content text-center">บันทึกท่าคำศัพท์</h1> */}
      <div className="flex flex-col items-center justify-center flex-grow ">
        {" "}
        {/* + c*/}
        <div className="grid grid-cols-2 gap-10 w-full p-6">
          {" "}
          {/* flex gap-x-5 items-center *}
          {/* clip 3D */}
          <div className="item1">
            <video ref={vdo_3d} controls className="w-full h-auto">
              <source
                src={vdoSrc[vocabularyad]}  
                // src="https://vod-progressive.akamaized.net/exp=1721963401~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F13%2F19%2F475068701%2F2119168947.mp4~hmac=376794e2b0349072e918363f1e6a039bdbb88107126a636af1967a7367c9866c/vimeo-prod-skyfire-std-us/01/13/19/475068701/2119168947.mp4?download=1&filename=sample_video.mp4+%28240p%29.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          {/* clip from camera */}
          <div className="item2">
            <video ref={vdo_cam} controls className="w-full h-auto">
              <source
                src="https://vod-progressive.akamaized.net/exp=1721963401~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F13%2F19%2F475068701%2F2119168947.mp4~hmac=376794e2b0349072e918363f1e6a039bdbb88107126a636af1967a7367c9866c/vimeo-prod-skyfire-std-us/01/13/19/475068701/2119168947.mp4?download=1&filename=sample_video.mp4+%28240p%29.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        {/* <div className="flex flex-col items-center justify-center"> */}
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
        <div className="flex-1 text-center">
          <RecordButton
            isRecording={isRecording}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
          />
        </div>
        </div>
        <div className="bg-primary-content text-primary text-sm py-2 text-center">
          <p>เลขที่พอร์ตปัจจุบัน (Port): 14053</p>
          <p>เลขที่ไอพีปัจจุบัน (IP Address): 172.20.10.3</p>
        </div>
      </div>
    // </div>
  )
}

export default Record
