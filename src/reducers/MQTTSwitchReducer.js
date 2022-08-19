import { MQTT_SWITCH } from "../const/index";

const stateMQTTSwitchReducer = {
  data: {
    led: [0, 0, 0, 0, 0],
    fan: [0, 0, 0, 0, 0],
  },
  d: 0,
};

const MQTTSwitchReducer = (state = stateMQTTSwitchReducer, action) => {
  switch (action.type) {
    case MQTT_SWITCH:
      return action.messageSwitch;
    default:
      return state;
  }
};

export default MQTTSwitchReducer;
