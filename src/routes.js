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
import { Connector } from "mqtt-react-hooks";
import { useState } from "react";

// ----------------------------------------------------------------------
export default function Router(props) {
  const options = {
    hostname: process.env.REACT_APP_MQTT_URL,
    username: process.env.REACT_APP_MQTT_USERNAME,
    password: process.env.REACT_APP_MQTT_PASSWORD,
    // port: process.env.REACT_APP_MQTT_PORT,
    protocol: "wss",
  };

  const [userAuth] = useState({
    email: "yesthanhnhan16@gmail.com",
    familyName: "Đặng",
    givenName: "Thành Nhân",
    googleId: "114296082739162407065",
    imageUrl:
      "https://lh3.googleusercontent.com/a-/AFdZucrODv0e5qGYRUNayJz-0Wnfmycp1GixNsiQ3HZhtQ=s96-c",
    isLoginMqtt: true,
    name: "Thành Nhân Đặng",
  });

  // JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actGetUserAuth(userAuth));
  }, [dispatch, userAuth]);
  return useRoutes([
    {
      path: "/dashboard",
      element:
        userAuth === null || userAuth === undefined || !userAuth.isLoginMqtt ? (
          <Login />
        ) : (
          <Connector options={options} parserMethod={(msg) => msg}>
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
          </Connector>
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
