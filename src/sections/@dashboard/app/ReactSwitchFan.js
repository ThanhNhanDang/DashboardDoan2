import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { SwitchFan } from "../../../components/SwitchFan";

const divicesFan = [
  { pin: 5, deviceName: "Phòng Khách", idtp: 5 },
  { pin: 6, deviceName: "Nhà Tắm", idtp: 5 },
  { pin: 7, deviceName: "Nhà Bếp", idtp: 5 },
  { pin: 8, deviceName: "Phòng Ngủ", idtp: 5 },
  { pin: 0, deviceName: "Mở Tất Cả Đèn", idtp: 6 },
];
const ReactSwitchFan = () => {
  return (
    <Card style={{ boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Quạt
        </Typography>
        <Grid container item={true} xs={12} sm={12}>
          {divicesFan.map((value, index) => (
            <SwitchFan value={value} index={index} key={index} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReactSwitchFan;
