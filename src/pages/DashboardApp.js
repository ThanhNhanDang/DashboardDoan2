// material
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";

// components
import Page from "../components/Page";
import {
  Humid,
  // Humid,
  // Temp,
  // ChartDht,
  ReactSwitch,
  Temp,
  // TableDHT,
  // TableRelay1,
  // TableRelay2,
  // ChartRelay1,
  // ChartRelay2
  // AppTasks,
  // AppBugReports,
  // AppItemOrders,
  // AppNewsUpdate,
  // AppOrderTimeline,
  // AppCurrentVisits,
  // AppTrafficBySite,
  // AppCurrentSubject,
  // AppConversionRates
} from "../sections/@dashboard/app";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(1, 0),
  color: theme.palette.info.darker,
  "&:hover": {
    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
}));

function DashboardApp() {
  const divicesLed = [
    { pin: 1, deviceName: "Phòng Khách", idtp: 2 },
    { pin: 2, deviceName: "Nhà Tắm", idtp: 2 },
    { pin: 3, deviceName: "Nhà Bếp", idtp: 2 },
    { pin: 4, deviceName: "Phòng Ngủ", idtp: 2 },
    { pin: 5, deviceName: "Mở Tất Cả Đèn", idtp: 4 },
    // { pin: 5, deviceName: "Cửa Chính", idtp: 3 },
  ];

  const divicesFan = [
    { pin: 6, deviceName: "Phòng Khách", idtp: 5 },
    { pin: 7, deviceName: "Nhà Tắm", idtp: 5 },
    { pin: 8, deviceName: "Nhà Bếp", idtp: 5 },
    { pin: 9, deviceName: "Phòng Ngủ", idtp: 5 },
    { pin: 10, deviceName: "Mở Tất Cả Quạt", idtp: 6 },
    // { pin: 5, deviceName: "Cửa Chính", idtp: 3 },
  ];

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
            <Card style={{ boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Trong Nhà
                </Typography>
                <Grid container item={true} xs={12} lg={12}>
                  <Grid item xs={12} sm={6}>
                    <Temp check={true} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Humid check={true} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Card style={{ boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ngoài Vườn
                </Typography>
                <Grid container item={true} xs={12} lg={12}>
                  <Grid item xs={12} sm={6}>
                    <Temp check={false} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Humid check={false} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <ReactSwitch divices={divicesLed} groupName="Đèn" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <ReactSwitch divices={divicesFan} groupName="Quạt" />
          </Grid>
          {/*
          <Grid item xs={12} sm={12} md={6}>
            <ChartRelay1 />
          </Grid>
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
