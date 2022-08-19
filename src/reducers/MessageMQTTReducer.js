import { MESSAGE_MQTT } from "../const/index";

const stateMessageMqttReducer = {
  id: 1,
  idc: 1,
  idtp: 0,
  t: "0",
  h: "0",
  t1: "0",
  h1: "0",
  data: {
    led: [0, 0, 0, 0, 0],
    fan: [0, 0, 0, 0, 0],
  },
  d: 0,
  tp: "",
};

const MessageMQTTReducer = (state = stateMessageMqttReducer, action) => {
  switch (action.type) {
    case MESSAGE_MQTT:
      return action.message;

    default:
      return state;
  }
};

export default MessageMQTTReducer;
