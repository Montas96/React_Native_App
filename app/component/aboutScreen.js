/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native';

const AboutScreen = ({ navigation }) => {
  return (
    <View
      style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: '500', margin: 10 }}>About React Native </Text>
      <Button
        title="Navigate to Home screen"
        onPress={() => navigation.navigate('Home')}
        color={'green'}
        style={styles.button}
      />
      <Button
        title="Go back "
        onPress={() => navigation.goBack()}
        color={'gray'}
        style={styles.button}
      />
      <Button
        title="Go to the first Screen "
        onPress={() => navigation.popToTop()}
        color={'blue'}
        style={styles.button}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 42,
    width: Dimensions.get('screen').width * 0.5,
    margin: 10,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  }
})
export default AboutScreen;
