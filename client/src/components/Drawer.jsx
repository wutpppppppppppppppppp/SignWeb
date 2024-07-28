import React from "react"
import { VscThreeBars } from "react-icons/vsc"
import { Link, useLocation } from "react-router-dom"

const Drawer = () => {
  const location = useLocation()
  const isAdminPage = location.pathname.includes("/categoryad")

  return (
    <div className="drawer drawer-end w-fit relative z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          <VscThreeBars className="size-6" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-primary text-primary-content min-h-full w-80 p-4">
          <li>
            <Link to="/">หน้าหลัก</Link>
          </li>
          {isAdminPage && (
            <li>
              <Link to="/categoryad">ลิสต์คำอัด</Link>
            </li>
          )}
          <li>
            <Link to="/category">ลิสต์คำศัพท์</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Drawer
