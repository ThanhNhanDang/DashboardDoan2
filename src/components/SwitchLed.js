import React, { useMemo } from "react";
import { alpha, styled } from "@mui/material/styles";
import Iconify from "./Iconify";
import { default as SwitchMaterial } from "@mui/material/Switch";
import { useMqttState } from "mqtt-react-hooks";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

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

const MaterialUISwitch = styled(SwitchMaterial)(({ theme }) => ({
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

export const SwitchLed = ({ value, index }) => {
  const messageSwitch = useSelector((state) => state.message);
  const onOff = useMemo(() => {
    return messageSwitch.data.led[index] ? true : false;
  }, [index, messageSwitch.data.led]);

  return (
    <Grid item={true} xs={12} sm={value.pin === 0 ? 12 : 6}>
      <RootStyleCard>
        <ChildrenReRender onOff={onOff} value={value} />
      </RootStyleCard>
    </Grid>
  );
};

const ChildrenReRender = React.memo(({ onOff, value }) => {
  const json = { onOff: 1, iddv: 0, idtp: 2 };
  const { client } = useMqttState();
  console.log("vao");
  function handleChange(props, onOff) {
    json.idtp = props.idtp;
    json.iddv = props.pin;
    json.onOff = !onOff;
    if (json.idtp === 2)
      return client.publish("doan2/onOff/led", JSON.stringify(json));
    if (json.idtp === 4)
      return client.publish("doan2/onOff/led/all", JSON.stringify(json));
    else return;
  }
  return (
    <CardActionArea onClick={() => handleChange(value, onOff)}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {value.deviceName}
        </Typography>
        <RootStyle>
          <IconWrapperStyle>
            <Iconify
              icon={
                !onOff
                  ? "fluent-emoji-high-contrast:light-bulb"
                  : "fluent-emoji-flat:light-bulb"
              }
              width="80%"
              height="80%"
            />
          </IconWrapperStyle>
          <MaterialUISwitch sx={{ m: 1 }} checked={onOff} />
        </RootStyle>
      </CardContent>
    </CardActionArea>
  );
});
