import { Box, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import moment from "moment";

// https://dev.to/derick1530/chart-real-time-data-using-apexcharts-json-api-12id
function ChartDht() {
  // const data = useSelector((state) => state.dhtChart);
  // let arrayTemp = [];
  // let arrayHumid = [];
  // const arrayDate = [];
  // data.forEach((item) => {
  //   arrayTemp.push(item.temp);
  //   arrayHumid.push(item.humid);
  //   arrayDate.push(new Date(Number(item.timestamp)).toISOString());
  // });
  // arrayTemp = Array.from(arrayTemp);
  // arrayHumid = Array.from(arrayHumid);

  const data = useSelector((state) => state.message);
  const currentDate = new Date();
  const showDate = moment(currentDate).format("HH:mm:ss");
  const doc = {
    time: showDate,
    bid: data.t,
  };

  const [series, setSeries] = useState([
    {
      name: "Nhiệt Độ",
      data: [],
    },
    {
      name: "Độ Ẩm",
      data: [],
    },
  ]);

  useEffect(() => {
    const time = new Date();
    setSeries([
      { ...series[0], data: [...series[0].data, [time, data.t]] },
      { ...series[1], data: [...series[1].data, [time, data.h]] },
    ]);
  }, [data]);

  const options = {
    options: {
      chart: {
        height: 450,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm:ss",
        },
      },

      annotations: {
        yaxis: [
          {
            y: 32,
            borderColor: "red",
            label: {
              show: true,
              text: "Ngưỡng nhiệt độ báo động",
              style: {
                color: "#fff",
                background: "#364cf4",
              },
            },
          },
          {
            y: 70,
            borderColor: "yellow",
            label: {
              show: true,
              text: "Ngưỡng độ ẩm báo động",
              style: {
                color: "#fff",
                background: "#364cf4",
              },
            },
          },
        ],
      },
    },
  };

  return (
    <Card>
      <CardHeader
        title="Biểu Đồ Nhiệt Độ Và Độ Ẩm"
        subheader="Thời gian thực"
      />
      <Box sx={{ p: 2, pb: 1 }} dir="ltr">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={450}
        />
      </Box>
    </Card>
  );
}

export default ChartDht;
