// src/pages/ControlButtons.jsx
import React from "react"
import { useLocation } from "react-router-dom"
import ControlButton from "../components/ServiceButton"
import { startRecording } from "../services/startRecordServiceReplacement"
import { stopRecording } from "../services/stopRecordServiceReplacement"
import { calibrate } from "../services/calibrateServiceReplacement"
// import { infoRequest } from "../services/infoService"
// import { liveStream } from "../services/livestreamService"
// import { changePlaybackState } from "../services/playbackService"
// import { pose } from "../services/poseService"
// import { resetActor } from "../services/resetActorService"
// import { tracker } from "../services/trackerService"

const ControlButtons = () => {
  const location = useLocation()
  const { config } = location.state || {}

  const [activeId, setActiveId] = React.useState(null)

  if (!config) {
    return <div>No configuration found. Please go back to the setup form.</div>
  }

  return (
    <div>
      <pre>{JSON.stringify(config, null, 0)}</pre>
      <ControlButton
        id="startRecording"
        service={startRecording}
        config={config}
        buttonText="Start Recording"
        activeId={activeId}
        setActiveId={setActiveId}
      />
      <ControlButton
        id="stopRecording"
        service={stopRecording}
        config={config}
        buttonText="Stop Recording"
        activeId={activeId}
        setActiveId={setActiveId}
      />
      <ControlButton
        id="calibrate"
        service={calibrate}
        config={config}
        buttonText="Calibrate"
        activeId={activeId}
        setActiveId={setActiveId}
      />
      {/* <ControlButton
        id="infoRequest"
        service={infoRequest}
        config={config}
        buttonText="Info Request"
        activeId={activeId}
        setActiveId={setActiveId}
      />
      <ControlButton
        id="liveStream"
        service={liveStream}
        config={config}
        buttonText="Live Stream"
        activeId={activeId}
        setActiveId={setActiveId}
      />
      <ControlButton
        id="changePlaybackState"
        service={changePlaybackState}
        config={config}
        buttonText="Change Playback State"
        activeId={activeId}
        setActiveId={setActiveId}
      />
      <ControlButton
        id="pose"
        service={pose}
        config={config}
        buttonText="Pose"
        activeId={activeId}
        setActiveId={setActiveId}
      />
      <ControlButton
        id="resetActor"
        service={resetActor}
        config={config}
        buttonText="Reset Actor"
        activeId={activeId}
        setActiveId={setActiveId}
      />
      <ControlButton
        id="tracker"
        service={tracker}
        config={config}
        buttonText="Tracker"
        activeId={activeId}
        setActiveId={setActiveId}
      /> */}
    </div>
  )
}

export default ControlButtons
