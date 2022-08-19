import { Card, CardContent, Grid, Typography } from "@mui/material";
import { SwitchLed } from "../../../components/SwitchLed";

const divicesLed = [
  { pin: 1, deviceName: "Phòng Khách", idtp: 2 },
  { pin: 2, deviceName: "Nhà Tắm", idtp: 2 },
  { pin: 3, deviceName: "Nhà Bếp", idtp: 2 },
  { pin: 4, deviceName: "Phòng Ngủ", idtp: 2 },
  { pin: 0, deviceName: "Mở Tất Cả Đèn", idtp: 4 },
];
const ReactSwitchLed = () => {
  return (
    <Card style={{ boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Đèn
        </Typography>
        <Grid container item={true} xs={12} sm={12}>
          {divicesLed.map((value, index) => (
            <SwitchLed value={value} index={index} key={index} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReactSwitchLed;
