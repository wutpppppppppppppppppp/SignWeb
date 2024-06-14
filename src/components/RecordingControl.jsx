// src/components/RecordingControl.js
import React, { useState } from 'react'
import { startRecording } from '../services/startRecordService.js'
import { stopRecording } from '../services/stopRecordService.js'

const RecordingControl = () => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const handleStartRecording = async () => {
    try {
      const result = await startRecording()
      setResponse(result)
      setError(null)
    } catch (error) {
      setResponse(null)
      setError({
        message: error.message,
        status: error.response ? error.response.status : 'N/A',
        data: error.response ? error.response.data : 'No response data',
      })
    }
  }

  const handleStopRecording = async () => {
    try {
      const result = await stopRecording()
      setResponse(result)
      setError(null)
    } catch (error) {
      setResponse(null)
      setError({
        message: error.message,
        status: error.response ? error.response.status : 'N/A',
        data: error.response ? error.response.data : 'No response data',
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
