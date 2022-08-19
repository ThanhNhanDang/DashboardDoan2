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
  return (
    <ThemeConfig>
      <BackToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}

export default App;
