import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormInput from "../hooks/useFormInput";
import useFormSubmit from "../hooks/useFormSubmit";
import { fetchJson } from "../utils/fetchJson";

const SetupForm = () => {
  const navigate = useNavigate();
  const [initialConfig, setInitialConfig] = useState({
    ip_address: "123.456.78.9",
    port: "14051",
    api_key: "1234",
  });

  const {
    values: config,
    handleChange,
    setValues,
  } = useFormInput(initialConfig);

  const { isSubmitted, handleSubmit } = useFormSubmit(() => {
    console.log("Form submitted with config:", config);
    navigate("/control-buttons", { state: { config } }); // react-router-dom navigation to /control-buttons path
  });

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const configData = await fetchJson("/config/ipconfig.json");
        setInitialConfig(configData);
        setValues(configData);
      } catch (error) {
        console.error("Error loading initial config:", error);
      }
    };

    loadConfig();
  }, [setValues]);

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
