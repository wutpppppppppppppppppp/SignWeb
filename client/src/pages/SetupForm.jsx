import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import useFormInput from "../hooks/useFormInput"
import useFormSubmit from "../hooks/useFormSubmit"
import Navbar2 from "../components/Navbar2"
import { Link } from "react-router-dom"

const SetupForm = () => {
  const navigate = useNavigate()

  const [initialConfig] = useState({
    ip_address: "255.255.255.255",
    port: "14053",
    api_key: "1234",
  });

  const { values: config, handleChange } = useFormInput(initialConfig);

  const { isSubmitted, handleSubmit } = useFormSubmit(() => {
    console.log("Form submitted with config:", config);
    navigate("/control-buttons", { state: { config } });
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between  bg-primary">
      <Navbar2 title="SignPose3D" />
      <div className="h-0.5 bg-secondary-content w-full"></div>
      <div className="flex-grow flex items-center justify-center w-2/3 place-self-center  my-20 rounded-lg">
      
        <div className="p-4 flex flex-col ">
          <h1 className="text-primary-content text-center">เชื่อมต่ออุปกรณ์</h1>
          {!isSubmitted ? (
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
                <input
                  type="text"
                  placeholder="11.111.111.11"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">หมายเลขช่องทาง (Port)</span>
                </div>
                <input
                  type="text"
                  placeholder="14053"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              {/* <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">กุญแจ API (API key)</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label> */}
              {/* <button type="submit">ตั้งค่าสำเร็จ</button> */}
            </form>
          ) : null}
          <Link to="/categoryad" className="place-self-center">
            <button className="btn btn-wide mt-6 btn-secondary text-secondary-content ">
              ยืนยัน
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SetupForm;
