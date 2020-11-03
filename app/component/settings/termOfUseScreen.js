import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Styles} from '../../assets/styles';

const TermOfUseScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={Styles.title}> Privacy Policies </Text>
    </View>
  );
};
export default TermOfUseScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
