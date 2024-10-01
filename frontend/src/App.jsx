import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginForm from "./components/SessionForms/LoginFormPage";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { restoreUser } from "./store/session";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <div>
      {isLoaded && <Outlet />}
    </div>
  );
}

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
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />;
}
