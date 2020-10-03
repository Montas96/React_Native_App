/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, FlatList, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import Images from '../assets/images';

const data = [
  {
    id: '1',
    value: 'Use of View',
  },
  {
    id: '2',
    value: 'Use of Text',
  },
  {
    id: '3',
    value: 'Use of FlatList',
  },
];
export class HomeScreen extends React.Component {

  _pressButton = () => {
    return this.props.navigation.navigate('About')
  }

  render() {
    return (
      <View style={styles.constainer}>
        <Text style={styles.title}>Home screen </Text>
        <Text style={styles.text}>Welcome to React app </Text>
        <Image
          source={Images.react_logo}
          resizeMode={'contain'}
          style={styles.image}
        />
        <FlatList
        style={styles.list}
          data={data}
          key={(item) => item.id}
          renderItem={(item) => <Text style={styles.listItem}>{item.item.value}</Text>}
        />
        <View style={styles.button}>
          <Button
            title="About React Native"
            onPress={this._pressButton}
            color={'green'}
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center',
    margin: 10
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    margin: 10
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  list: {
    alignSelf: 'center',
    borderWidth: 2,
    padding: 20,
    margin: 20,
    borderColor: '#30aa'
  },
  listItem: {
    fontSize: 15,
    fontWeight: "800",
    color: 'gray',
    textAlign: 'left',
  },
  button :{
    borderRadius: 42,
    width: Dimensions.get('screen').width * 0.5,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: 'yellow',
    alignSelf: 'center'
  }
})
