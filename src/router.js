import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./page/Error";
import Main from "./page/Main";
import Car from "./page/Car";
import Login from "./page/Auth/Login";
import Signup from "./page/Auth/Signup";
import Service from "./page/Service";
import CarDetail from "./page/CarDetail";
import UpdatePassword from "./page/Auth/UpdatePassword";
import NewPassword from "./page/Auth/NewPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "/",
        element: <Main />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/update/password",
        element: <UpdatePassword />,
      },
      {
        path: "/new/password",
        element: <NewPassword />,
      },
      {
        path: "/car",
        element: <Car />,
      },
      {
        path: "/carDetail/:id",
        element: <CarDetail />,
      },
      {
        path: "/service",
        element: <Service />,
      },
    ],
  },
]);

export default router;
