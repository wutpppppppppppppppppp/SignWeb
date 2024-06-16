// src/components/ControlButton.jsx
import React, { useState, useEffect } from 'react'

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

const ControlButton = ({ id, service, config, buttonText, activeId, setActiveId }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (activeId !== id) {
      setResponse(null)
      setError(null)
    }
  }, [activeId, id])

  const handleClick = async () => {
    setActiveId(id)
    try {
      const result = await service(config)
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
      <button onClick={handleClick}>{buttonText}</button>
      {activeId === id && response && <ResponseDisplay response={response} />}
      {activeId === id && error && <ErrorDisplay error={error} />}
    </div>
  )
}

export default ControlButton
