import React from "react"

const Spinner = () => {
  return (
    <div className="w-72 h-72 flex justify-center items-center bg-transparent relative">
      <div className="w-[115px] h-[115px] p-[3px] absolute flex justify-center items-center border-4 border-secondary animate-clockwise">
        <div className="w-full h-full"></div>
      </div>
      <div className="w-[115px] h-[115px] p-[3px] absolute flex justify-center items-center border-4 border-primary-content animate-xclockwise">
        <div className="w-full h-full"></div>
      </div>
    </div>
  )
}

export default Spinner
