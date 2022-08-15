import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Relay1 from "./pages/Relay1";
import Relay2 from "./pages/Relay2";
import NotFound from "./pages/Page404";
import TempHumid from "./pages/TempHumid";
import LoginMQTT from "./pages/LoginMQTT";
import { actGetUserAuth } from "./actions";
import { Fab, Toolbar } from "@mui/material";
import ScrollToTop from "./components/ScrollToTop";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

export default function Router(props) {
  const userAuth = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetUserAuth(userAuth));
    // eslint-disable-next-line
  }, []);
  return useRoutes([
    {
      path: "/dashboard",
      element:
        userAuth === null || userAuth === undefined || !userAuth.isLoginMqtt ? (
          <Login />
        ) : (
          <>
            <Toolbar id="back-to-top-anchor" />
            <DashboardLayout />
            <ScrollToTop {...props}>
              <Fab color="primary" size="small" aria-label="scroll back to top">
                <Icon
                  icon="ep:arrow-up-bold"
                  width="30"
                  height="30"
                  hFlip={true}
                />
              </Fab>
            </ScrollToTop>
          </>
        ),
      children: [
        {
          path: "app",
          element:
            userAuth === null ||
            userAuth === undefined ||
            !userAuth.isLoginMqtt ? (
              <Login />
            ) : (
              <DashboardApp />
            ),
        },
        {
          path: "relay1",
          element:
            userAuth === null ||
            userAuth === undefined ||
            !userAuth.isLoginMqtt ? (
              <Login />
            ) : (
              <Relay1 />
            ),
        },
        {
          path: "relay2",
          element:
            userAuth === null ||
            userAuth === undefined ||
            !userAuth.isLoginMqtt ? (
              <Login />
            ) : (
              <Relay2 />
            ),
        },
        {
          path: "temp-humid",
          element:
            userAuth === null ||
            userAuth === undefined ||
            !userAuth.isLoginMqtt ? (
              <Login />
            ) : (
              <TempHumid />
            ),
        },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        {
          path: "login",
          element: <Login />,
        },
        { path: "login/mqtt-broker", element: <LoginMQTT /> },
        {
          path: "register",
          element: <Register />,
        },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
