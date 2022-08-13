// material
import { Box, Grid, Container, Typography } from "@mui/material";

// components
import Page from "../components/Page";
import {
  // Humid,
  // Temp,
  // ChartDht,
  ReactSwitch,
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

function DashboardApp(props) {
  const divicesLed = [
    { pin: 1, deviceName: "Phòng Khách", idtp: 2 },
    { pin: 2, deviceName: "Nhà Tắm", idtp: 2 },
    { pin: 3, deviceName: "Nhà Bếp", idtp: 2 },
    { pin: 4, deviceName: "Phòng Ngủ", idtp: 2 },
    { pin: 0, deviceName: "Mở Tất Cả Đèn", idtp: 4 },
    // { pin: 5, deviceName: "Cửa Chính", idtp: 3 },
  ];

  const divicesFan = [
    { pin: 1, deviceName: "Phòng Khách", idtp: 2 },
    { pin: 2, deviceName: "Nhà Tắm", idtp: 2 },
    { pin: 3, deviceName: "Nhà Bếp", idtp: 2 },
    { pin: 4, deviceName: "Phòng Ngủ", idtp: 2 },
    { pin: 0, deviceName: "Mở Tất Cả Quạt", idtp: 4 },
    // { pin: 5, deviceName: "Cửa Chính", idtp: 3 },
  ];

  return (
    <Page title="Dashboard | Đồ án 2">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography style={{ textAlign: "center" }} variant="h4">
            Đồ án 1: Thành Nhân, Vĩ Tường
          </Typography>
          <Typography style={{ textAlign: "center" }} variant="h4">
            HỆ THỐNG GIÁM SÁT VÀ CẢNH BÁO NHIỆT ĐỘ ĐỘ ẨM
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={6}>
            <Temp />
          </Grid>
          <Grid item xs={12} sm={6} lg={12}>
            <Humid />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <ReactSwitch divices={divicesLed} groupName="Đèn" />
          </Grid>
          <Grid item xs={12} md={6}>
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
