import * as React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar3 from "../components/Navbar3"
import RecordButton from "../components/RecordBtn"
import { VscSettings } from "react-icons/vsc"
// Uncomment the imports for the recording services
// import {
//   startRecording,
//   stopRecording,
//   calibrate,
// } from "../services/recordServices";

const Record = () => {
  const { categoryName, vocabName } = useParams()
  const [isRecording, setIsRecording] = React.useState(false)
  const [isCalibrating, setIsCalibrating] = React.useState(false)
  const navigate = useNavigate()

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
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    console.log("stoprecord")
    // Call the stopRecording function
    // stopRecording()
    navigate(`/categoryad/${categoryName}/${vocabName}`) // Programmatically navigate after stopping recording
  }

  return (
    <div className="w-screen h-screen">
      <Navbar3 title={`บันทึกท่าคำศัพท์: ${vocabName}`} />
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-x-5 items-center">
          <button
            className={`btn ${
              isCalibrating
                ? "btn-disabled"
                : "btn-primary-content text-primary-content"
            } text-primary`}
            onClick={handleCalibrate}
            disabled={isCalibrating}
          >
            <VscSettings
              className={`${isCalibrating ? "animate-pulse" : ""}`}
            />
            ปรับท่า​
          </button>
          <RecordButton
            className="h-10 w-10"
            isRecording={isRecording}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
          />
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
