// src/hooks/useFormInput.js
import { useState } from 'react'

const useFormInput = (initialValues) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return {
    values,
    handleChange,
  }
}

export default useFormInput
