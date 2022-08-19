// material
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useSelector } from "react-redux";

// components
import Page from "../components/Page";
import {
  ChartDht,
  Humid,
  ReactSwitchFan,
  ReactSwitchLed,
  Temp,
} from "../sections/@dashboard/app";

// ----------------------------------------------------------------------

// const RootStyle = styled(Card)(({ theme }) => ({
//   boxShadow: "none",
//   textAlign: "center",
//   padding: theme.spacing(1, 0),
//   color: theme.palette.info.darker,
//   "&:hover": {
//     boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//   },
// }));
function DashboardApp() {
  const messageMQTT = useSelector((state) => state.message);

  return (
    <Page title="Dashboard | Đồ án 2">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography style={{ textAlign: "center" }} variant="h4">
            Đồ án 2: Thành Nhân, Vĩ Tường
          </Typography>
          <Typography style={{ textAlign: "center" }} variant="h4">
            HỆ THỐNG IoT ĐIỀU KHIỂN VÀ GIÁM SÁT NGÔI NHÀ
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            {/* <Card style={{ boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Trong Nhà
                </Typography>
                <Grid container item={true} xs={12} lg={12}>
                  <Grid item xs={12} sm={6}>
                    <Temp series={[messageMQTT.t]} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Humid series={[messageMQTT.h]} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card> */}
          </Grid>
          <Grid item xs={12} lg={12}>
            {/* <Card style={{ boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ngoài Vườn
                </Typography>
                <Grid container item={true} xs={12} lg={12}>
                  <Grid item xs={12} sm={6}>
                    <Temp series={[messageMQTT.t1]} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Humid series={[messageMQTT.h1]} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card> */}
          </Grid>
          <Grid item xs={12} lg={6}>
            <ReactSwitchLed />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ReactSwitchFan />
          </Grid>

          <Grid item xs={12} xs={12} lg={12}>
            <ChartDht />
          </Grid>
          {/*
          <Grid item xs={12} sm={12} md={6}>
            <ChartRelay2 />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <TableDHT />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <TableRelay1 />
          </Grid>
          <Grid item xs={12} md={6} lg={12}>
            <TableRelay2 />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

export default DashboardApp;
