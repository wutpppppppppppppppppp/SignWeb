import React, { useState, useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar3 from "../components/Navbar3"
import PathConstants from "../routes/pathConstants"
import RecordButton from "../components/RecordBtn"
import { VscSettings } from "react-icons/vsc"
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

  return (
    <div className="w-screen h-screen flex flex-col justify-between bg-primary">
      <Navbar3 title={`บันทึกท่าคำศัพท์: ${vocabularyad}`} />

      {/* <div class="grid grid-cols-2 gap-2">
        <div class="col-start-1"></div>
        <div class="grid grid-cols-subgrid gap-4 col-span-3"></div>
      </div> */}

      {/* <h1 className="text-primary-content text-center">บันทึกท่าคำศัพท์</h1> */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="grid grid-cols-2 gap-10 w-full p-6">
          {/* clip 3D */}
          <div className="item1">
            <video ref={vdo_3d} controls className="w-full h-auto">
              <source
                src="https://vod-progressive.akamaized.net/exp=1721963401~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F13%2F19%2F475068701%2F2119168947.mp4~hmac=376794e2b0349072e918363f1e6a039bdbb88107126a636af1967a7367c9866c/vimeo-prod-skyfire-std-us/01/13/19/475068701/2119168947.mp4?download=1&filename=sample_video.mp4+%28240p%29.mp4"
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

        <div className="flex gap-x-5 m-5">
          <button
            className={`btn ${isRecording ? "btn-disabled" : "btn-primary-content"} text-primary-content`}
            onClick={handleCalibrate}
            disabled={isRecording}
          >
            ปรับท่า​ (Calibrate)
          </button>
          {!isRecording ? (
            <button
              className="btn bg-confirm text-white"
              onClick={handleStartRecording}
            >
              เริ่มการบันทึก (Start Recording)
            </button>
          ) : (
            <>
              <button
                className="btn btn-active btn-error text-error-content"
                onClick={handleStopRecording}
              >
                สิ้นสุดการบันทึก (Stop Recording)
              </button>
              <Link to={PathConstants.DONE}></Link>
            </>
          )}
        </div>
        <div className="bg-primary-content text-primary text-sm py-2 text-center absolute bottom-0 inset-x-0">
          <p>เลขที่พอร์ตปัจจุบัน (Port): 14053</p>
          <p>เลขที่ไอพีปัจจุบัน (IP Address): 172.20.10.3</p>
        </div>
      </div>
    </div>
  )
}

export default Record
