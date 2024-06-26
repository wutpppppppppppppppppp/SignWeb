import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useFormInput from "../hooks/useFormInput"
import useFormSubmit from "../hooks/useFormSubmit"

const SetupForm = () => {
  const navigate = useNavigate()

  const [initialConfig] = useState({
    ip_address: "192.168.1.35",
    port: "14053",
    api_key: "1234",
  })

  const { values: config, handleChange } = useFormInput(initialConfig)

  const { isSubmitted, handleSubmit } = useFormSubmit(() => {
    console.log("Form submitted with config:", config)
    navigate("/control-buttons", { state: { config } })
  })

  const handleFormSubmit = (event) => {
    event.preventDefault()
    handleSubmit()
  }

  const handleNewPageNavigation = () => {
    navigate("/Three-Scene")
  }
  return (
    <div>
      {!isSubmitted ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>เลขที่อยู่ IP (IP address): </label>
            <input
              type="text"
              name="ip_address"
              value={config.ip_address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>หมายเลขช่องทาง (Port):</label>
            <input
              type="text"
              name="port"
              value={config.port}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>กุญแจ API (API key):</label>
            <input
              type="text"
              name="api_key"
              value={config.api_key}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">ตั้งค่าสำเร็จ</button>
        </form>
      ) : null}
      <button onClick={handleNewPageNavigation}>หน้าแสดงสามมิติ</button>
    </div>
  )
}

export default SetupForm
