// // Import kết nối tới react-redux
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// routes
import { Connector } from "mqtt-react-hooks";
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import BackToTop from "./components/BackToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";

// Import action dùng để dispatch
// import {
//   actGetAllDataDHT,
//   actGetAllDataRelay1,
//   actGetAllDataRelay2,
//   actGetDataDHTChart,
//   actGetEmail,
//   actGetMessage,
//   actGetUserAuth
// } from './actions/index';

function App(props) {
  /*
   * idtp = 1: doan2/status
   * idtp = 2: doan2/onOff/led
   * idtp = 3: doan2/onOff/door
   */
  const options = {
    hostname: process.env.REACT_APP_MQTT_URL,
    username: process.env.REACT_APP_MQTT_USERNAME,
    password: process.env.REACT_APP_MQTT_PASSWORD,
    port: process.env.REACT_APP_MQTT_PORT,
    protocol: "ws",
  };
  /*
  const [, setMessages] = useState({});
  const [, setDataRelay1] = useState([]);
  const [, setDataRelay2] = useState([]);
  const [, setDataDht] = useState([]);
  const [, setDataDhtChart] = useState([]);
  const dispatch = useDispatch();

  const handleOnOff1 = (onOff1) => {
    if (!onOff1) {
      client.publish('doan1/relay', `{"idgw":1,"iddv":1,"idrl":14,"state":"on"}`);
    } else {
      client.publish('doan1/relay', `{"idgw":1,"iddv":1,"idrl":14,"state":"off"}`);
    }
    // client.publish('doan1', `{"idgw":1,"iddv":1,"idrl":14,"state":"off"}`);
  };
  const handleOnOff2 = (onOff2) => {
    if (!onOff2) {
      client.publish('doan1/relay', `{"idgw":1,"iddv":1,"idrl":12,"state":"on"}`);
    } else {
      client.publish('doan1/relay', `{"idgw":1,"iddv":1,"idrl":12,"state":"off"}`);
    }
  };

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem('user'));

    dispatch(actGetUserAuth(JSON.parse(localStorage.getItem('user'))));

    const getAllDataRelay1 = async () => {
      await axios.get(`${process.env.REACT_APP_URL}/doan1/relay1/get-all`).then((response) => {
        const newArray = [];
        response.data.forEach((obj) => {
          newArray.push({
            ...obj,
            id: obj._id,
            thietbi: `Device ${obj.iddv} - GPIO ${obj.idrl}`,
            time: new Date(Number(obj.time)).toLocaleString('vi-VN'),
            timestamp: obj.time
          });
        });
        dispatch(actGetAllDataRelay1(newArray));
        setDataRelay1(newArray);
      });
    };

    const getAllDataRelay2 = async () => {
      await axios.get(`${process.env.REACT_APP_URL}/doan1/relay2/get-all`).then((response) => {
        const newArray = [];
        response.data.forEach((obj) => {
          newArray.push({
            ...obj,
            id: obj._id,
            thietbi: `Device ${obj.iddv} - GPIO ${obj.idrl}`,
            time: new Date(Number(obj.time)).toLocaleString('vi-VN'),
            timestamp: obj.time
          });
        });
        dispatch(actGetAllDataRelay2(newArray));
        setDataRelay2(newArray);
      });
    };

    const getAllDataDht = async () => {
      await axios.get(`${process.env.REACT_APP_URL}/doan1/dht11/get-all`).then((response) => {
        const newArray = [];
        response.data.forEach((obj) => {
          newArray.push({
            ...obj,
            id: obj._id,
            thietbi: 'DHT11',
            time: new Date(Number(obj.time)).toLocaleString('vi-VN'),
            timestamp: obj.time
          });
        });
        dispatch(actGetAllDataDHT(newArray));
        setDataDht(newArray);
      });
    };

    const getDataDhtChart = async () => {
      await axios.get(`${process.env.REACT_APP_URL}/doan1/dht11/get-all/chart`).then((response) => {
        const newArray = [];
        response.data.forEach((obj) => {
          newArray.push({
            ...obj,
            id: obj._id,
            thietbi: 'DHT11',
            time: new Date(Number(obj.time)).toLocaleString('vi-VN'),
            timestamp: obj.time
          });
        });
        dispatch(actGetDataDHTChart(newArray));
        setDataDhtChart(newArray);
      });
    };

    const getAllEmailByUser = async () => {
      await axios
        .post(`${process.env.REACT_APP_URL}/doan1/email/find-email`, { reAddress: userAuth.email })
        .then((response) => {
          dispatch(actGetEmail(response.data));
        });
    };
    client.on('connect', () => {
      client.subscribe(
        ['doan1/dht11', 'doan1/relay1/state', 'doan1/relay2/state', 'doan1/warning'],
        (err) => {
          if (!err) {
            console.error(err);
          }
        }
      );
    });
    client.on('message', (topic, payload) => {
      const jsonPayload = JSON.parse(payload.toString());
      console.log('Hello');
      dispatch(actGetMessage({ ...jsonPayload, tp: topic }));
      setMessages({ ...jsonPayload, tp: topic });
      getAllDataRelay1();
      getAllDataRelay2();
      getAllDataDht();
      getDataDhtChart();
      getAllEmailByUser();
    });
    getAllDataRelay1();
    getAllDataRelay2();
    getAllDataDht();
    getDataDhtChart();
    getAllEmailByUser();
  }, [dispatch]);
 */
  return (
    <ThemeConfig>
      <BackToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Connector options={options} parserMethod={(msg) => msg}>
        <Router />
      </Connector>
    </ThemeConfig>
  );
}

export default App;
