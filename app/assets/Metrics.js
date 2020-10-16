import { Dimensions } from "react-native";

/* eslint-disable prettier/prettier */
const Metrics = {
    width_half_screen: Dimensions.get('screen').width / 2,
    width_full: Dimensions.get('screen').width,
    width_10: Dimensions.get('screen').width * 0.1,
    width_7: Dimensions.get('screen').width * 0.07,
    width_5: Dimensions.get('screen').width * 0.05,
    width_third: Dimensions.get('screen').width / 3,
    width_20: Dimensions.get('screen').width * 0.2,
    width_22: Dimensions.get('screen').width * 0.22,
    width_30: Dimensions.get('screen').width * 0.3,
    height_full: Dimensions.get('screen').height,
  };
  export default Metrics;