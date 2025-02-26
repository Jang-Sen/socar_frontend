import { createBrowserRouter } from "react-router-dom";
import Login from "./page/Auth/Login";
import Signup from "./page/Auth/Signup";
import UpdatePassword from "./page/Auth/UpdatePassword";
import NewPassword from "./page/Auth/NewPassword";
import Layout from "./component/Layout";
import PublicRoute from "./component/PublicRoute";
import Service from "./page/Service";
import ProtectRoute from "./component/ProtectRoute";
import Profile from "./page/Profile";
import Main from "./page/Main";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
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
            path: "/service",
            element: <Service />,
          },
        ],
      },
      {
        element: <ProtectRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  // {
  //   path: "/",
  //   element: <App />,
  //   errorElement: <Error />,
  //   children: [
  //     {
  //       index: true,
  //       path: "/",
  //       element: <Main />,
  //     },
  //     {
  //       path: "/login",
  //       element: <Login />,
  //     },
  //     {
  //       path: "/signup",
  //       element: <Signup />,
  //     },
  //     {
  //       path: "/update/password",
  //       element: <UpdatePassword />,
  //     },
  //     {
  //       path: "/new/password",
  //       element: <NewPassword />,
  //     },
  //     {
  //       path: "/car",
  //       element: <Car />,
  //     },
  //     {
  //       path: "/carDetail/:id",
  //       element: <CarDetail />,
  //     },
  //     {
  //       path: "/service",
  //       element: <Service />,
  //     },
  //   ],
  // },
]);

export default router;
