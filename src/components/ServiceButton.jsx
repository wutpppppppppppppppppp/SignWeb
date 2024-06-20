// src/components/ControlButton.jsx
import React, { useState } from "react"

const ControlButton = ({ service, config, buttonText }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  const handleClick = async () => {
    // Clear previous response and error
    setResponse(null)
    setError(null)

    try {
      const result = await service(config)
      setResponse(result)
    } catch (error) {
      setError({
        message: error.message,
        status: error.response ? error.response.status : "N/A",
        data: error.response ? error.response.data : "No response data",
      })
    }
  }

  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
      {response && <ResponseDisplay response={response} />}
      {error && <ErrorDisplay error={error} />}
    </div>
  )
}

const ResponseDisplay = ({ response }) => (
  <div>
    <h3>Response</h3>
    <pre>{JSON.stringify(response, null, 2)}</pre>
  </div>
)

const ErrorDisplay = ({ error }) => (
  <div>
    <h3>Error</h3>
    <p>Message: {error.message}</p>
    <p>Status: {error.status}</p>
    <p>Data: {JSON.stringify(error.data, null, 2)}</p>
  </div>
)

export default ControlButton
