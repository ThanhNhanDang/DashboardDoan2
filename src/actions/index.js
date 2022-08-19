import {
  GET_ALL_DATA_RELAY1,
  MESSAGE_MQTT,
  GET_ALL_DATA_RELAY2,
  GET_ALL_DATA_DHT,
  RELAY2_ON_OFF,
  GET_DATA_DHT_CHART,
  USER_AUTH,
  EMAILS,
  MQTT_SWITCH,
} from "../const/index";

export function actGetAllDataRelay1(dataRelay1) {
  return {
    type: GET_ALL_DATA_RELAY1,
    dataRelay1,
  };
}

export function actGetAllDataRelay2(dataRelay2) {
  return {
    type: GET_ALL_DATA_RELAY2,
    dataRelay2,
  };
}

export function actOnOffRelay2(onOff2) {
  return {
    type: RELAY2_ON_OFF,
    onOff2,
  };
}

export function actGetAllDataDHT(dataDHT) {
  return {
    type: GET_ALL_DATA_DHT,
    dataDHT,
  };
}

export function actGetDataDHTChart(dataDHTChart) {
  return {
    type: GET_DATA_DHT_CHART,
    dataDHTChart,
  };
}

export function actGetMQTTSwitch(messageSwitch) {
  return {
    type: MQTT_SWITCH,
    messageSwitch,
  };
}

export function actGetMessage(message) {
  return {
    type: MESSAGE_MQTT,
    message,
  };
}

export function actGetUserAuth(userAuth) {
  return {
    type: USER_AUTH,
    userAuth,
  };
}

export function actGetEmail(emails) {
  return {
    type: EMAILS,
    emails,
  };
}
