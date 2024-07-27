import React from "react"

const RecordButton = ({
  isRecording,
  handleStartRecording,
  handleStopRecording,
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
    className={`flex justify-center items-center w-20 h-20 cursor-pointer transition-all duration-300 ease-in-out ${
      isRecording ? "bg-white" : ""
    }`}
      onClick={handleToggle}
    >
      <div
        className={`flex justify-center items-center w-full h-full border-4 ${
          isRecording ? "border-white" : "border-red-600"
        } rounded-full bg-white transition-all duration-300 ease-in-out`}
      >
        <div
          className={`${
            isRecording ? "w-10 h-10 rounded-md" : "w-14 h-14 rounded-full"
          } bg-red-600 transition-all duration-300 ease-in-out`}
        ></div>
      </div>
    </div>
  )
}

export default RecordButton