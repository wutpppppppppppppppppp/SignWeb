// src/hooks/useFormInput.js
/**
 * A custom React hook for managing form inputs.
 *
 * @param {Object} initialValues - Initial values for the form inputs.
 * @returns {Object} An object containing the current values, a function to handle input changes, and a function to update the values.
 */
import { useState } from "react";

const useFormInput = (initialValues) => {
  /**
   * The current values of the form inputs.
   *
   * @type {Object}
   */
  const [values, setValues] = useState(initialValues);

  /**
   * Handles input changes.
   *
   * @param {Object} e - The event object containing the target element.
   */
  const handleChange = (e) => {
    const { name, value } = e.target; // return the element where the event occured.
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    handleChange,
    setValues,
  };
};

export default useFormInput;
