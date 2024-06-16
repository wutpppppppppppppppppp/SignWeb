// src/components/setupForm.jsx
import React, { useEffect, useState } from 'react'
import useFormInput from '../hooks/useFormInput'
import useFormSubmit from '../hooks/useFormSubmit'
import ControlButton from './ControlButton'
import { startRecording } from '../services/startRecordService'
import { stopRecording } from '../services/stopRecordService'
import { calibrate } from '../services/calibrateService'
import { infoRequest } from '../services/infoService'
import { liveStream } from '../services/livestreamService'
import { changePlaybackState } from '../services/playbackService'
import { pose } from '../services/poseService'
import { resetActor } from '../services/resetActorService'
import { tracker } from '../services/trackerService'
import { fetchJson } from '../utils/fetchJson'

const SetupForm = () => {
  const [initialConfig, setInitialConfig] = useState({
    ip_address: '123.456.78.9',
    port: '14051',
    api_key: '1234',
  })

  const { values: config, handleChange, setValues } = useFormInput(initialConfig)

  const { isSubmitted, handleSubmit } = useFormSubmit(() => {
    console.log('Form submitted with config:', config)
  })

  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const configData = await fetchJson('/config/ipconfig.json')
        setInitialConfig(configData)
        setValues(configData)
      } catch (error) {
        console.error('Error loading initial config:', error)
      }
    }

    loadConfig()
  }, [setValues])

  return (
    <div>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>IP Address:</label>
            <input type="text" name="ip_address" value={config.ip_address} onChange={handleChange} required />
          </div>
          <div>
            <label>Port:</label>
            <input type="text" name="port" value={config.port} onChange={handleChange} required />
          </div>
          <div>
            <label>API Key:</label>
            <input type="text" name="api_key" value={config.api_key} onChange={handleChange} required />
          </div>
          <button type="submit">Set Configuration</button>
        </form>
      ) : (
        <div>
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
          <ControlButton
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
          />
        </div>
      )}
    </div>
  )
}

export default SetupForm
