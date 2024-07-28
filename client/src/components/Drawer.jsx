// src/components/Drawer.jsx
import { VscThreeBars } from "react-icons/vsc"
import { Link } from "react-router-dom"

const Drawer = () => {
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
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <Link to="/category">
              <a>ลิสต์คำศัพท์</a>
            </Link>
          </li>
          <li>
            <a></a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Drawer
