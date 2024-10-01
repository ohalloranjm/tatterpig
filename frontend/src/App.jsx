import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/SessionForms/LoginFormPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Landing page</h1>
  },
  {
    path: '/login',
    element: <LoginForm />
  }
])

export default function App() {
  return <RouterProvider router={router} />;
}
