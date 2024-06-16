// src\components\Setup\CalibrateControl.jsx
import React, { useState } from 'react'
import { calibrate } from '../../services/calibrateService.js'

const CalibrateControl = () => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const handleCalibrate = async () => {
    try {
      const result = await calibrate()
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
      <button onClick={handleCalibrate}>Calibrate</button>
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

export default CalibrateControl
