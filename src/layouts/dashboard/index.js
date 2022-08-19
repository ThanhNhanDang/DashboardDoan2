import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
//
import { useMqttState, useSubscription } from "mqtt-react-hooks";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { actGetMessage } from "../../actions";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

/*
 * idtp = 1: doan2/status
 * idtp = 2: doan2/onOff/led
 * idtp = 3: doan2/onOff/door
 */
export default function DashboardLayout() {
  const [checkPub, setCheckPub] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { message } = useSubscription(["doan2/status", "doan2/onOff/feedback"]);
  const { client } = useMqttState();

  useEffect(() => {
    if (message) {
      const json = JSON.parse(message.message);
      if (!checkPub) {
        client.publish("doan2/getState", `{"idtp: 7"}`);
        setCheckPub(true);
      }
      switch (message.topic) {
        case "doan2/status":
          dispatch(
            actGetMessage({
              ...json,
              tp: message.topic,
              data: {
                led: [json.l[0], json.l[1], json.l[2], json.l[3], json.al],
                fan: [json.f[0], json.f[1], json.f[2], json.f[3], json.af],
              },
              d: json.d,
            })
          );
          break;
        default:
          break;
      }
    }
  }, [message, dispatch, client, checkPub]);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
