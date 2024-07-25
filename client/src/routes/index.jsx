/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { createBrowserRouter } from "react-router-dom"
import PathConstants from "./pathConstants"
import  LoadingDots  from "../components/Loading.jsx"

const SetupForm = React.lazy(() => import("../pages/SetupForm"))
const ControlButtons = React.lazy(() => import("../pages/ControlButtons"))
const ThreeScene = React.lazy(() => import("../pages/ThreeScene"))
const LandingPage = React.lazy(() => import("../pages/LandingPage"))
const Login = React.lazy(() => import("../pages/LoginForm"))
const SignIn = React.lazy(() => import("../pages/SignInForm"))

const Category = React.lazy(() => import("../pages/Category"))
const CategoryAdmin = React.lazy(() => import("../pages/CategoryAdmin"))
const Vocab = React.lazy(() => import("../pages/Vocabulary"))
const VocabAdmin = React.lazy(() => import("../pages/VocabularyAdmin"))
const DisplayVocab = React.lazy(() => import("../pages/DisplayVocab"))
const DisplayVocabAdmin = React.lazy(() => import("../pages/DisplayVocabAdmin"))

const Record = React.lazy(() => import("../pages/Record1"))
const DoneRecord = React.lazy(() => import("../pages/DoneRecord"))

const routes = createBrowserRouter([
  {
    path: PathConstants.LANDING,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
      <LandingPage />
    </React.Suspense>
    ),
  },
  // {
  //   path: PathConstants.INFO_POLICY,
  //   element: (
  //     <React.Suspense fallback={<LoadingDots />}>
  //       <InfoPolicy />
  //     </React.Suspense>
  //   ),
  // },
  {
    path: PathConstants.LOGIN,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <Login />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.SIGN_IN,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <SignIn />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.CATEGORY,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <Category />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.CATEGORY_ADMIN,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <CategoryAdmin />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.VOCABULARY,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <Vocab />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.VOCABULARY_ADMIN,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <VocabAdmin />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.DISPLAY_VOCAB,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <DisplayVocab />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.DISPLAY_VOCAB_ADMIN,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <DisplayVocabAdmin />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.SETUP_FORM,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <SetupForm />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.CONTROL_BUTTONS,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <ControlButtons />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.THREE_SCENE,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <ThreeScene />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.RECORD,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <Record />
      </React.Suspense>
    ),
  },
  {
    path: PathConstants.DONE,
    element: (
      <React.Suspense fallback={<LoadingDots />}>
        <DoneRecord />
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
])

export default routes

