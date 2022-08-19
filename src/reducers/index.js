import { combineReducers } from 'redux';
import UserAuthReducer from './UserAuthReducer';
import MessageMQTTReducer from './MessageMQTTReducer';
import MQTTSwitchReducer from './MQTTSwitchReducer';
import EmailsReducer from './EmailsReducer';

export default combineReducers({
  // relay1: Relay1Reducer,
  // relay2: Relay2Reducer,
  // onOffRelay2: OnOffRelay2Reducer,
  // dht: DhtReducer,
  message: MessageMQTTReducer,
  messageSwitch: MQTTSwitchReducer,
  // dhtChart: DhtChartReducer,
  userAuth: UserAuthReducer,
  emails: EmailsReducer
});
