import * as React from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar3 from "../components/Navbar3";
// import { startRecording, stopRecording, calibrate } from "../services/recordServices"; // Assuming these services are already defined

const Record = () => {
  const { categoryName, vocabName } = useParams();
  const [isRecording, setIsRecording] = React.useState(false);

  const handleCalibrate = () => {
    calibrate();
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    startRecording();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecording();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar3 title={`บันทึกท่าคำศัพท์: ${vocabName}`} />

      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-2xl mb-4">มองหน้าตรงที่กล้อง</h1>
        <div className="space-y-4">

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
    </div>
  );
};

export default Record;
