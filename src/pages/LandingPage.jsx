import * as React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import PathConstants from "../routes/pathConstants";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="navbar">
        <div className="flex-1">
          <Link to={PathConstants.INFO_POLICY} className="btn btn-ghost text-xl">บลูมบีท</Link>
        </div>
        <div className="flex-none">
          <Link to={PathConstants.LOGIN} className="btn btn-outline btn-ghost text-primary">
            <FaUser />เข้าสู่ระบบ
          </Link>
        </div>
      </div>
      <div className="hero h-screen">
        <div className="hero-content text-center">
          <div className="max-w-fit">
            <p className="text-8xl mb-8">คลังเก็บภาษามือไทย</p>
            <Link to={PathConstants.CATEGORY} className="btn btn-primary text-primary-content">
              ค้นหาภาษามือ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
