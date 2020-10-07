/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text,  Button,  StyleSheet, Dimensions } from 'react-native';


class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.constainer}>
        <Text style={styles.title}> Food </Text>
        <View style={styles.button}>
          <Button
            title="Search Food"
            onPress={() => this.props.navigation.navigate('Food')}
            color={'green'}
            style={styles.button}
          />
          <View style={{ padding: 10 }} />
          <View style={styles.button} >
            <Button
              title="My Favorite"
              onPress={() => this.props.navigation.navigate('Favorite')}
              color={'green'}
              style={styles.button}
            />
          </View>

        </View>
      </View>
    );
  }
}


export default (HomeScreen);

const styles = StyleSheet.create({
  constainer: {
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
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  list: {
    alignSelf: 'center',
    borderWidth: 2,
    padding: 20,
    margin: 20,
    borderColor: '#30aa',
  },
  listItem: {
    fontSize: 15,
    fontWeight: '800',
    color: 'gray',
    textAlign: 'left',
  },
  button: {
    borderRadius: 42,
    width: Dimensions.get('screen').width * 0.5,
    margin: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
