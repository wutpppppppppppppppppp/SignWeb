import { createBrowserRouter } from "react-router-dom"
import SetupForm from "../pages/SetupForm"
import ControlButtons from "../pages/ControlButtons"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SetupForm />,
  },
  {
    path: "/control-buttons",
    element: <ControlButtons />,
  },
])

export default router
