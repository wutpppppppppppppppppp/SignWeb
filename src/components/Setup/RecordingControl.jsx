// src\components\Setup\RecordingControl.jsx
import React, { useState } from "react"
import { startRecording } from "../../services/startRecordService"
import { stopRecording } from "../../services/stopRecordService"

const RecordingControl = ({ config }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const handleStartRecording = async () => {
    try {
      const result = await startRecording(config)
      setResponse(result)
      setError(null)
    } catch (error) {
      setResponse(null)
      setError({
        message: error.message,
        status: error.response ? error.response.status : "N/A",
        data: error.response ? error.response.data : "No response data",
      })
    }
  }

  const handleStopRecording = async () => {
    try {
      const result = await stopRecording(config)
      setResponse(result)
      setError(null)
    } catch (error) {
      setResponse(null)
      setError({
        message: error.message,
        status: error.response ? error.response.status : "N/A",
        data: error.response ? error.response.data : "No response data",
      })
    }
  }

  return (
    <div>
      <button onClick={handleStartRecording}>Start Recording</button>
      <button onClick={handleStopRecording}>Stop Recording</button>
      {response && (
        <div>
          <h3>Response</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          {/* https://stackoverflow.com/questions/37847885/formatting-code-with-pre-tag-in-react-and-jsx */}
        </div>
      )}
      {error && (
        <div>
          <h3>Error</h3>
          <p>Message: {error.message}</p>
          <p>Status: {error.status}</p>
          <p>Data: {JSON.stringify(error.data, null, 2)}</p>
        </div>
      )}
    </div>
  )
}

export default RecordingControl
