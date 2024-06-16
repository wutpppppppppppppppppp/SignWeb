// src/components/FormRokoko.jsx
import React from 'react'
import useFormInput from '../hooks/useFormInput'
import useFormSubmit from '../hooks/useFormSubmit'
import RecordingControl from './setup/RecordingControl'

const FormRokoko = () => {
  const { values: config, handleChange } = useFormInput({
    ip_address: '',
    port: '',
    api_key: '',
    // frame_rate: '60',
    // back_to_live: false,
  })

  const { isSubmitted, handleSubmit } = useFormSubmit(() => {
    console.log('Form submitted with config:', config)
  })

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
          {/* <div>
            <label>Frame Rate:</label>
            <input type="text" name="frame_rate" value={config.frame_rate} onChange={handleChange} />
          </div> */}
          {/* <div>
            <label>Back to Live:</label>
            <input
              type="checkbox"
              name="back_to_live"
              checked={config.back_to_live}
              onChange={(e) => handleChange({ target: { name: 'back_to_live', value: e.target.checked } })}
            />
          </div> */}
          <button type="submit">Set Configuration</button>
        </form>
      ) : (
        <RecordingControl config={config} />
      )}
    </div>
  )
}

export default FormRokoko
