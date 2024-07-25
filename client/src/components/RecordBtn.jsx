import React from "react"

const RecordButton = ({
  isRecording,
  handleStartRecording,
  handleStopRecording,
  className,
  style,
}) => {
  const handleToggle = () => {
    if (isRecording) {
      handleStopRecording()
    } else {
      handleStartRecording()
    }
  }

  return (
    <div
      className={`flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out ${
        isRecording ? "bg-white" : ""
      } ${className}`}
      style={style}
      onClick={handleToggle}
    >
      <div
        className={`flex justify-center items-center w-full h-full border-4 ${
          isRecording ? "border-white" : "border-red-600"
        } rounded-full bg-white transition-all duration-300 ease-in-out`}
      >
        <div
          className={`${
            isRecording ? "w-3/5 h-3/5 rounded-md" : "w-4/5 h-4/5 rounded-full"
          } bg-red-600 transition-all duration-300 ease-in-out`}
        ></div>
      </div>
    </div>
  )
}

export default RecordButton
