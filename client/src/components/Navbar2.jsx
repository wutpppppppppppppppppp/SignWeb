import React from "react"
import PropTypes from "prop-types"
import { IoIosArrowBack } from "react-icons/io"
import { Link } from "react-router-dom"

function Navbar({ title }) {
  return (
    <div className="navbar bg-primary text-primary-content p-1">
      <div>
        <Link to="/categoryad" className="btn btn-ghost">
          <IoIosArrowBack className="size-6" title="กลับไปหน้าก่อน" />
        </Link>
      </div>

      <div className="navbar-end">
        <span className="text-xl font-bold">{title}</span>
      </div>

      <div className="navbar-end w-1/3"></div>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
