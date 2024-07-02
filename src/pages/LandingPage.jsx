import * as React from "react"
import Navbar from "../components/navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LandingPage = () => {
  return (
    <>
      <div className="navbar">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost text-primary-content">
            <FontAwesomeIcon icon="fa-solid fa-user" className=""/>
          </button>
        </div>
      </div>
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-fit">
            <p className="text-8xl mb-8">คลังเก็บภาษามือไทย</p>
            <button className="btn btn-primary text-primary-content">
              ค้นหาภาษามือ
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
