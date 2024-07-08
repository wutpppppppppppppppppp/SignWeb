import * as React from "react";
import { useLocation } from "react-router-dom";
// import ControlButton from "../components/serviceBtn";
import { startRecording } from "../services/startRecordService";
import { stopRecording } from "../services/stopRecordService";
import { calibrate } from "../services/calibrateService";
import { Link } from "react-router-dom";
import PathConstants from "../routes/pathConstants";

const ControlButtons = () => {
  const location = useLocation()
  const { config } = location.state || {}

  const [activeId, setActiveId] = React.useState(null)
  if (!config) {
    return <div> No configuration found. Please go back to the setup form. </div>
  }

  return (
    <div>
      <pre>{JSON.stringify(config, null, 2)} </pre>
      <button className="btn btn-active" id="startRecording"service={startRecording} config={config} buttonText="Start Recording" activeId={activeId}setActiveId={setActiveId}>
        <Link to={PathConstants.INFO_POLICY} className="btn btn-ghost text-xl"></Link>
        เริ่มการบันทึก
      </button>

      <button className="btn btn-active btn-neutral" id="stopRecording" service={stopRecording} config={config} buttonText="Stop Recording" activeId={activeId}setActiveId={setActiveId}>
        <Link to={PathConstants.INFO_POLICY} className="btn btn-ghost text-xl"></Link>
        สิ้นสุดการบันทึก
      </button>

      <button className="btn btn-active btn-primary" id="calibrate" service={calibrate} config={config} buttonText="Calibrate" activeId={activeId} setActiveId={setActiveId}>
        <Link to={PathConstants.INFO_POLICY} className="btn btn-ghost text-xl"></Link>
        ปรับท่า
      </button>
    </div>
  )
}

export default ControlButtons