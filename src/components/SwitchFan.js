import React, { useMemo } from "react";
import { alpha, styled, createTheme } from "@mui/material/styles";
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

const Theme = createTheme();
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

const Android12Switch = styled(SwitchMaterial)(({ theme }) => ({
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

export const SwitchFan = ({ value, index }) => {
  const messageSwitch = useSelector((state) => state.message);
  const onOff = useMemo(() => {
    return messageSwitch.data.fan[index] ? true : false;
  }, [index, messageSwitch.data.fan]);

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
    if (json.idtp === 5)
      return client.publish("doan2/onOff/fan", JSON.stringify(json));
    if (json.idtp === 6)
      return client.publish("doan2/onOff/fan/all", JSON.stringify(json));
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
              icon="bi:fan"
              style={
                onOff
                  ? {
                      animation: "rotating 2s linear infinite",
                      color: Theme.palette.success.light,
                    }
                  : ""
              }
              width="80%"
              height="80%"
            />
            <style>
              {`
                @keyframes rotating {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
              }`}
            </style>
          </IconWrapperStyle>
          <Android12Switch sx={{ m: 1 }} checked={onOff} />
        </RootStyle>
      </CardContent>
    </CardActionArea>
  );
});
