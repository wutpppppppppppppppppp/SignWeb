import * as React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import PathConstants from "../routes/pathConstants";
// Rokoko API
import { startRecording } from "../services/startRecordService";
import { stopRecording } from "../services/stopRecordService";
import { calibrate } from "../services/calibrateService";

const ControlButtons = () => {

  const location = useLocation();
  const { config } = location.state || {};
  const [activeId, setActiveId] = React.useState(null)

  if (!config) {
    return <div>No configuration found. Please go back to the setup form.</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(config, null, 2)}</pre>
      <div className="App"><h1>มองหน้าตรงที่กล้อง</h1></div>

      <button
        className="btn btn-active"
        id="startRecording"
        onClick={() => startRecording(config)}>
        <Link to={PathConstants.INFO_POLICY} className="btn btn-ghost text-xl"></Link>
        เริ่มการบันทึก
      </button>

      <button
        className="btn btn-active btn-neutral"
        id="stopRecording"
        onClick={() => stopRecording(config)}>
        <Link to={PathConstants.INFO_POLICY} className="btn btn-ghost text-xl"></Link>
        สิ้นสุดการบันทึก
      </button>

      <button
        className="btn btn-active btn-primary"
        id="calibrate"
        onClick={() => calibrate(config)}>
        <Link to={PathConstants.INFO_POLICY} className="btn btn-ghost text-xl"></Link>
        ปรับท่า
      </button>
    </div>
  );
};

export default ControlButtons;
