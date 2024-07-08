import React from "react";
import PropTypes from "prop-types";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Drawer from "./Drawer";

function Navbar({ title }) {
  return (
    <div className="navbar bg-primary text-primary-content p-1">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost">
          <IoIosArrowBack className="size-6" title="กลับไปหน้าแรก" />
        </Link>
      </div>
      <div className="navbar-center">
        <span className="text-xl font-bold">{title}</span>
      </div>
      <div className="navbar-end">
        <Drawer />
      </div>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
