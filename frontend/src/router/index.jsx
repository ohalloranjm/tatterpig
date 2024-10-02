import LoginForm from "../components/SessionForms/LoginFormPage";
import SignupForm from "../components/SessionForms/SignupFormPage";
import {createBrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import SheetsIndex from "../components/SheetsIndex";

const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <h1>Landing page</h1>
        },
        {
          path: '/login',
          element: <LoginForm />
        },
        {
          path: '/signup',
          element: <SignupForm />
        },
        {
            path: '/sheets',
            element: <SheetsIndex />
        }
      ]
    }
  ])

export default router;