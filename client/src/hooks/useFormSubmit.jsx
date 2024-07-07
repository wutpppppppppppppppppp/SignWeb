import { useState } from "react"

const useFormSubmit = (callback) => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitted(true)
    callback()
  }

  return {
    isSubmitted,
    handleSubmit,
  }
}

export default useFormSubmit
