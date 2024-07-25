import React, { useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar3 from "../components/Navbar3";
import PathConstants from "../routes/pathConstants";
// Uncomment the imports for the recording services
// import {
//   startRecording,
//   stopRecording,
//   calibrate,
// } from "../services/recordServices";

const Record = () => {
  const { categoryName, vocabName } = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  const vdo_3d = useRef(null);
  const vdo_cam = useRef(null);

  const handleCalibrate = () => {
    // Call the calibrate function
    // calibrate()
  };

  const handleStartRecording = () => {
    
    setIsRecording(true);
    // Call the startRecording function
    // startRecording()
    if (vdo_3d.current) {
      vdo_3d.current.play();
    }
    if (vdo_cam.current) {
      vdo_cam.current.play();
    }
    //after call start function the video of 3D and camera will play 
  };

  const handleStopRecording = () => {

    setIsRecording(false);
    console.log("stoprecord");
    //the start record is false then will stop record
    navigate(PathConstants.DISPLAY_VOCAB_ADMIN); 
    //navigate after stopping recording
    if (vdo_3d.current) {
      vdo_3d.current.pause();
    }
    if (vdo_cam.current) {
      vdo_cam.current.pause();
    }
    //pause the vdo then go to the stop record
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between bg-primary">
      <Navbar3 title={`บันทึกท่าคำศัพท์: ${vocabName}`} />

      {/* <div class="grid grid-cols-2 gap-2">
        <div class="col-start-1"></div>
        <div class="grid grid-cols-subgrid gap-4 col-span-3"></div>
      </div> */}
      
      <h1 className="text-primary-content text-center">บันทึกท่าคำศัพท์</h1>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="grid grid-cols-2 gap-10 w-full max-w-7xl p-6">
          {/* clip 3D */}
          <div className="item1"> 
            <video ref={vdo_3d} controls className="w-full h-auto">
              <source src="/Users/kwinyarutpoungsangthanakul/Catch me if you can/Library/PackageCache/com.unity.timeline@1.6.4/Samples~/Customization/Demo/Videos/M30-1422.mp4" type="video/mp4" />
            </video>
          </div>
          {/* clip from camera */}
          <div className="item2">
            <video ref={vdo_cam} controls className="w-full h-auto">
              <source src="/Users/kwinyarutpoungsangthanakul/Catch me if you can/Library/PackageCache/com.unity.timeline@1.6.4/Samples~/Customization/Demo/Videos/M30-1422.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="flex gap-x-5 m-5">
          <button className={`btn ${isRecording ? "btn-disabled" : "btn-primary-content"} text-primary-content`} onClick={handleCalibrate} disabled={isRecording}>
            ปรับท่า​ (Calibrate)
          </button>
          {!isRecording ? (
            <button className="btn bg-confirm text-white" onClick={handleStartRecording}>
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
  );
};

export default Record;
