/* eslint-disable prettier/prettier */

import Metrics from '../../assets/Metrics';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    marginTop: Metrics.width_10,
    marginHorizontal: Metrics.width_5,
    marginBottom: Metrics.width_10,
  },
  image: {
    flex: 1,
    alignSelf: 'center',
    width: Metrics.width_third,
    height: Metrics.width_third,
  },
  textConstainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    paddingVertical: Metrics.width_5,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
