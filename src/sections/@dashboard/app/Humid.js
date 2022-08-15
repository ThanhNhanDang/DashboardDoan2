import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useSubscription } from "mqtt-react-hooks";

function Humid({ check }) {
  const { message } = useSubscription(["doan2/status"]);
  const [series, setSeries] = useState([0]);
  useEffect(() => {
    if (message) {
      const json = JSON.parse(message.message);
      if (check) {
        if (json.h1 == null) return;
        setSeries([json.h1]);
      } else {
        if (json.h == null) return;
        setSeries([json.h]);
      }
    }
  }, [message]);
  const options = {
    chart: {
      height: 350,
      type: "radialBar",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "17px",
          },
          value: {
            color: "#111",
            fontSize: "36px",
            formatter: function (val) {
              return val;
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Độ ẩm (%)"],
  };
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height={350}
    />
  );
}

export default Humid;
