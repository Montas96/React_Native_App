/* eslint-disable prettier/prettier */

import Metrics from '../../assets/Metrics';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    marginTop: Metrics.width_half_screen,
    marginHorizontal: Metrics.width_10,
    marginBottom: 100,
  },
  textConstainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputConstainer: {
    flex: 1,
    paddingVertical: Metrics.width_5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: Metrics.width_10,
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#3D1706',
    height: 50,
    width: Metrics.width_full - Metrics.width_30,
    marginHorizontal: Metrics.width_22,
    padding: 15,
    marginVertical: Metrics.width_5,
    fontWeight: '600',
    fontSize: 20,
    backgroundColor: '#e7d798',
    color: '#3D1706',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 0,
    top: 0,
    width: Metrics.width_full,
    height: Metrics.height_full,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: Metrics.width_5,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    borderRadius: 42,
    width: Dimensions.get('screen').width * 0.5,
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
