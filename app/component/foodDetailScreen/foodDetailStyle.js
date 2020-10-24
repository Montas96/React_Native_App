/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import { Colors } from '../../assets/colors';
import Metrics from '../../assets/Metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'row',
    borderRadius: 1,
    padding: 5,
    backgroundColor: '#FEF8EB',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  imageContainer : {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
  },
  image: {
    width: Metrics.width_full - 15,
    height: Metrics.width_full - 15,
    margin: 5,
  },
  icon: {
    width: 50,
    height: 50,
    elevation: 0,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: 5,
  },
  priceList :{
    flex: 1,
  },
  foodType: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontSize: 30,
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
  itemName: {
    fontSize: 15,
    textAlign: 'left',
    fontWeight: '700',
    marginTop: 10,
  }
});
