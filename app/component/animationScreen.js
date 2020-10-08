/* eslint-disable prettier/prettier */
// Components/Test.js

import React from 'react';
import { StyleSheet, View, Animated, Easing  } from 'react-native';

class AnimationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        topPosition: new Animated.Value(0),
      };
  }

  componentDidMount() {
    Animated.decay(
        this.state.topPosition,
        {
          velocity: 0.8,
          deceleration: 0.997,
        }
      ).start();
}

  render() {
    return (
      <View style={styles.main_container}>
        <Animated.View style={[styles.animation_view, { top: this.state.topPosition }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
});

export default AnimationScreen;
