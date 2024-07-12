import * as React from "react"
import { useParams } from "react-router-dom"
import Navbar3 from "../components/Navbar3"
// Uncomment the imports for the recording services
// import {
//   startRecording,
//   stopRecording,
//   calibrate,
// } from "../services/recordServices"

const Record = () => {
  const { categoryName, vocabName } = useParams()
  const [isRecording, setIsRecording] = React.useState(false)

  const handleCalibrate = () => {
    // Call the calibrate function
    // calibrate()
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    // Call the startRecording function
    // startRecording()
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    // Call the stopRecording function
    // stopRecording()
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar3 title={`บันทึกท่าคำศัพท์: ${vocabName}`} />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-2xl">มองหน้าตรงที่กล้อง</h1>
        <div className="flex gap-x-5 m-5">
          {!isRecording ? (
            <button
              className="btn btn-accent text-accent-content"
              onClick={handleCalibrate}
            >
              ปรับท่า​ (Calibrate)
            </button>
          ) : (
            <button
              className="btn btn-disabled btn-accent text-accent-content"
              onClick={handleCalibrate}
            >
              ปรับท่า​ (Calibrate)
            </button>
          )}

          {!isRecording ? (
            <button
              className="btn btn-success text-success-content"
              onClick={handleStartRecording}
            >
              เริ่มการบันทึก (Start Recording)
            </button>
          ) : (
            <button
              className="btn btn-active btn-error text-error-content"
              onClick={handleStopRecording}
            >
              สิ้นสุดการบันทึก (Stop Recording)
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="px-4 py-2 bg-black text-white text-center">
          เลขที่พอร์ตปัจจุบัน (Port): 14053
          เลขที่ไอพีปัจจุบัน (IP Address): 172.20.10.3
        </div>
      </div>
    </div>
  )
}

export default Record
