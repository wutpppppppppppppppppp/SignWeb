import * as React from "react";
import { useParams, useLocation, useNavigate , Link} from "react-router-dom";
import Navbar3 from "../components/Navbar3";
import PathConstants from "../routes/pathConstants";

// import { startRecording, stopRecording, calibrate } from "../services/recordServices"; // Assuming these services are already defined

const Record = () => {
  const { categoryName, vocabName } = useParams();
  const [isRecording, setIsRecording] = React.useState(false);
  const Navigate = useNavigate();
  const handleCalibrate = () => {
    calibrate();
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    console.log("Recording stopped");
    Navigate(PathConstants.DISPLAY_VOCAB_ADMIN);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar3 title={`บันทึกท่าคำศัพท์: ${vocabName}`} />
      
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="mockup-phone">
          <div className="camera"></div>
          <div className="display">
            <div className="artboard artboard-demo phone-1">
              มองหน้าไปตรงที่โทรศัพท์ของคุณ
            </div>
          </div>
        </div>
        <div className="space-y-4 space-x-4">
          <button className="btn btn-active btn-primary" onClick={handleCalibrate}>
            ปรับท่า
          </button>
          {!isRecording ? (
            <button className="btn btn-active btn-primary" onClick={handleStartRecording}>
              เริ่มการบันทึก
            </button>
          ) : (
            <button className="btn btn-active btn-neutral" onClick={handleStopRecording}>
              สิ้นสุดการบันทึก
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
  );
};

export default Record;