import * as React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar3 from "../components/Navbar3"
import PathConstants from "../routes/pathConstants"
// Uncomment the imports for the recording services
// import {
//   startRecording,
//   stopRecording,
//   calibrate,
// } from "../services/recordServices";

const Record = () => {
  const { categoryName, vocabName } = useParams()
  const [isRecording, setIsRecording] = React.useState(false)
  const navigate = useNavigate()

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
    console.log("stoprecord")
    navigate(PathConstants.DISPLAY_VOCAB_ADMIN) // Programmatically navigate after stopping recording
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-between bg-primary">
      <Navbar3 title={`บันทึกท่าคำศัพท์: ${vocabName}`} />
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="mockup-phone">
          <div className="camera"></div>
          <div className="display">
            <div className="artboard artboard-demo phone-1">
              <img
                src="/Screenshot 2567-07-12 at 23.50.09.png"
                alt="Rokoko Studio Model"
                className="w-full h-full"
              />
            </div>
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
      </div>
      <div className="mt-auto">
        <div className="bg-primary-content text-primary text-sm py-2 text-center absolute bottom-0 inset-x-0">
          <p>เลขที่พอร์ตปัจจุบัน (Port): 14053</p>
          <p>เลขที่ไอพีปัจจุบัน (IP Address): 172.20.10.3</p>
        </div>
      </div>
    </div>
  )
}

export default Record
