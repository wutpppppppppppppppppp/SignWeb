import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormInput from "../hooks/useFormInput";
import useFormSubmit from "../hooks/useFormSubmit";
import Navbar2 from "../components/Navbar2";
import { Link } from "react-router-dom";

const SetupForm = () => {

  const navigate = useNavigate()

  const [initialConfig] = useState({
    ip_address: "255.255.255.255",
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

    <div className="w-screen h-screen flex flex-col justify-between">
      <Navbar2 title="เชื่อมต่ออุปกรณ์" />
      <div className="flex-grow flex items-center justify-center">
      <div>{!isSubmitted ? (
          <form onSubmit={handleFormSubmit}>

            {/* <div>
              <label>เลขที่อยู่ IP (IP address): </label>
              <input type="text" name="ip_address" value={config.ip_address} onChange={handleChange} required/>
            </div> 
            <div>
              <label>หมายเลขช่องทาง (Port):</label>
              <input type="text" name="port"value={config.port} onChange={handleChange} required/>
            </div> 
            <div>
              <label>กุญแจ API (API key):</label>
              <input type="text" ame="api_key" value={config.api_key} onChange={handleChange} required/>
            </div> */}

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">เลขที่อยู่ IP (IP address)</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">หมายเลขช่องทาง (Port)</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">กุญแจ API (API key)</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
            </label>
            {/* <button type="submit">ตั้งค่าสำเร็จ</button> */}
          </form>
        ) : null}
        <button className="btn btn-wide">
          <Link to="/category"  className="btn btn-wide btn-lg btn-primary text-primary-content">
            ตั้งค่าสำเร็จ
          </Link>
        </button>
        {/* <button onClick={handleNewPageNavigation}>หน้าแสดงสามมิติ</button> */}
      </div>
      </div>
    </div>
  )
}

export default SetupForm
