import { createBrowserRouter } from "react-router-dom"
import SetupForm from "../pages/SetupForm"
import ControlButtons from "../pages/ControlButtons"
import ThreeScene from "../pages/ThreeSceneLoad"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SetupForm />,
  },
  {
    path: "/control-buttons",
    element: <ControlButtons />,
  },
  {
    path: "/Three-Scene",
    element: <ThreeScene />,
  },
])

export default router
