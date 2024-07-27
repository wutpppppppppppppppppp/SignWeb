import React from "react"

function LoadingDots() {
  return (
    <div
      className="min-h-screen flex place-content-center"
      aria-label="Loading"
    >
      <div className="w-[120px] flex justify-between items-center">
        <div className="w-5 h-5 bg-primary-content rounded-full animate-wave"></div>
        <div className="w-5 h-5 bg-primary-content rounded-full animate-wave animation-delay-200"></div>
        <div className="w-5 h-5 bg-primary-content rounded-full animate-wave animation-delay-400"></div>
      </div>
    </div>
  )
}

export default LoadingDots
