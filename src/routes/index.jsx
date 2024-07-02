import * as React from "react"
import { createBrowserRouter } from "react-router-dom"

const SetupForm = React.lazy(() => import("../pages/SetupForm"))
const ControlButtons = React.lazy(() => import("../pages/ControlButtons"))
const ThreeScene = React.lazy(() => import("../pages/ThreeSceneAsh"))

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <SetupForm />
      </React.Suspense>
    ),
  },
  {
    path: "/control-buttons",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <ControlButtons />
      </React.Suspense>
    ),
  },
  {
    path: "/Three-Scene",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <ThreeScene />
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
])

export default routes
