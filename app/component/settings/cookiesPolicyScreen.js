import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Styles} from '../../assets/styles';

const CookiesPolicyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={Styles.title}> About us </Text>
    </View>
  );
};
export default CookiesPolicyScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
