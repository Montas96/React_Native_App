/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Styles} from '../../assets/styles';
import MapView, {Marker} from 'react-native-maps';

class FindUsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}>
          <Marker
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
            title="this is our place"
            description="this is a marker example"
          />
        </MapView>
        <Text style={[Styles.title, styles.title]}>Find US </Text>
      </View>
    );
  }
}
export default FindUsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
  },
});
