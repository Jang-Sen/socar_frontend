import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error from "./page/Error";
import Main from "./page/Main";
import Car from "./page/Car";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Service from "./page/Service";

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
        path: "/car",
        element: <Car />,
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
        path: "/service",
        element: <Service />,
      },
    ],
  },
]);

export default router;
