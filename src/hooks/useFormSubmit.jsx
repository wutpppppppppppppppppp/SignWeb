// src/hooks/useFormSubmit.js
import { useState } from 'react'

const useFormSubmit = (callback) => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    callback()
  }

  return {
    isSubmitted,
    handleSubmit,
  }
}

export default useFormSubmit
