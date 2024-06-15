// src/components/FormRokoko.jsx
import React, { useState } from 'react'
import RecordingControl from './RecordingControl'

const FormRokoko = () => {
  const [config, setConfig] = useState({
    ip_address: '',
    port: '',
    api_key: '',
    frame_rate: '30',
    back_to_live: false,
  })
  const [isConfigSet, setIsConfigSet] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setConfig({ ...config, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsConfigSet(true)
  }

  return (
    <div>
      {!isConfigSet ? (
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
          <div>
            <label>Frame Rate:</label>
            <input type="text" name="frame_rate" value={config.frame_rate} onChange={handleChange} />
          </div>
          <div>
            <label>Back to Live:</label>
            <input
              type="checkbox"
              name="back_to_live"
              checked={config.back_to_live}
              onChange={(e) => setConfig({ ...config, back_to_live: e.target.checked })}
            />
          </div>
          <button type="submit">Set Configuration</button>
        </form>
      ) : (
        <RecordingControl config={config} />
      )}
    </div>
  )
}

export default FormRokoko
