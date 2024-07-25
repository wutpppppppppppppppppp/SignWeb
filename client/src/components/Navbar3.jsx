import React from "react"
import PropTypes from "prop-types"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Drawer from "./Drawer"

function Navbar({ title }) {
  const navigate = useNavigate()
  return (
    <div className="navbar bg-primary text-primary-content p-1">
      <div className="navbar-start">
        <button onClick={() => navigate(-1)} className="btn btn-ghost">
          <IoIosArrowBack className="size-6" title="กลับไปหน้าแรก" />
        </button>
      </div>
      <div className="navbar-center">
        <span className="text-xl font-bold">{title}</span>
      </div>
      <div className="navbar-end">
        <Drawer />
      </div>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
