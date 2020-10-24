/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import Metrics from '../../assets/Metrics';
import { Colors } from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 1,
    margin: 2,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 5,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 5,
  },
  text: {
    flex: 1,
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
  },
  icon: {
    width: Metrics.width_15,
    height: Metrics.width_15,
    borderRadius: 20,
    // borderWidth: 1,
    alignSelf:'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: Metrics.width_5,
    backgroundColor: Colors.yellow,
  },

});
