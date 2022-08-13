// import { useSelector } from 'react-redux';
// material
import { alpha, styled, createTheme } from "@mui/material/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { useMqttState, useSubscription } from "mqtt-react-hooks";
import PropTypes from "prop-types";
// component
import Iconify from "../../../components/Iconify";
import { useEffect, useState } from "react";

const Theme = createTheme();
// ----------------------------------------------------------------------

const RootStyleCard = styled(Card)(({ theme }) => ({
  boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  alignItems: "center",
  display: "flex",
  textAlign: "center",
  margin: theme.spacing(0, 2, 2, 0),
}));

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
}));

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: theme.spacing(1),
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(4),
  height: theme.spacing(4),
  justifyContent: "center",
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.success.light,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: theme.spacing(4),
    height: theme.spacing(4),
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

// ----------------------------------------------------------------------
// ic:baseline-mode-fan-off
export default function ReactSwitch({ divices, groupName }) {
  // const messageMQTT = useSelector((state) => state.message);

  const [, setCheckAll] = useState(false);
  const [checks, setChecks] = useState([false, false, false, false, false]);
  const { message } = useSubscription(["doan2/onOff/feedback", "doan2/status"]);
  const { client } = useMqttState();
  const json = { onOff: 1, iddv: 0, idtp: 2 };

  useEffect(() => {
    if (message) {
      const json = JSON.parse(message.message);
      setChecks([
        json.l1 ? true : false,
        json.l2 ? true : false,
        json.l3 ? true : false,
        json.l4 ? true : false,
        json.d ? true : false,
      ]);
      setCheckAll(json.al ? true : false);
    }
  }, [message]);

  function handleClick(message) {
    if (json.idtp === 2) return client.publish("doan2/onOff/led", message);
    if (json.idtp === 3) return client.publish("doan2/onOff/door", message);
    if (json.idtp === 4) return client.publish("doan2/onOff/led/all", message);
    return null;
  }

  function handleChange(checked, value, idtp) {
    handleChange.prototype = {
      checked: PropTypes.bool,
    };
    if (idtp === undefined)
      if (value === 5) json.idtp = 3;
      else json.idtp = 2;
    else json.idtp = idtp;
    if (value === undefined) json.iddv = 0;
    else json.iddv = value;
    if (checked) json.onOff = 1;
    else json.onOff = 0;
    handleClick(JSON.stringify(json));
  }
  return (
    <Card style={{ boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {groupName}
        </Typography>
        <Grid container item={true} xs={12} sm={12}>
          {divices.map((value, index) => (
            <Grid key={index} item={true} xs={12} sm={index === 4 ? 12 : 6}>
              <RootStyleCard>
                <CardActionArea
                  onClick={() =>
                    handleChange(checks[index], value.pin, value.idtp)
                  }
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {value.deviceName}
                    </Typography>
                    <RootStyle>
                      <IconWrapperStyle>
                        <Iconify
                          icon={
                            groupName === "Đèn"
                              ? !checks
                                ? "fluent-emoji-flat:light-bulb"
                                : "fluent-emoji-high-contrast:light-bulb"
                              : "bi:fan"
                          }
                          styled={
                            groupName === "Quạt"
                              ? !checks
                                ? {
                                    backgroundColor:
                                      Theme.palette.success.light,
                                  }
                                : ""
                              : ""
                          }
                          width="80%"
                          height="80%"
                        />
                      </IconWrapperStyle>
                      {groupName === "Đèn" ? (
                        <MaterialUISwitch
                          sx={{ m: 1 }}
                          checked={checks[index]}
                        />
                      ) : (
                        <Android12Switch
                          sx={{ m: 1 }}
                          checked={checks[index]}
                        />
                      )}
                    </RootStyle>
                  </CardContent>
                </CardActionArea>
              </RootStyleCard>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

ReactSwitch.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.number,
  idtp: PropTypes.number,
  deviceName: PropTypes.string,
};
