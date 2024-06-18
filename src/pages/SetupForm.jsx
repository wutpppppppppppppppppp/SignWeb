import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormInput from "../hooks/useFormInput";
import useFormSubmit from "../hooks/useFormSubmit";

const SetupForm = () => {
  const navigate = useNavigate();

  const [initialConfig] = useState({
    ip_address: "192.168.1.35",
    port: "14051",
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
    <div>
      {!isSubmitted ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>IP Address:</label>
            <input
              type="text"
              name="ip_address"
              value={config.ip_address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Port:</label>
            <input
              type="text"
              name="port"
              value={config.port}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>API Key:</label>
            <input
              type="text"
              name="api_key"
              value={config.api_key}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Set Configuration</button>
        </form>
      ) : null}
    </div>
  );
};

export default SetupForm;
