/* eslint-disable prettier/prettier */
// Animations/EnlargeShrink.js

import React from 'react';
import {Animated} from 'react-native';

class EnlargeShrink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSize: new Animated.Value(this._getSize()),
    };
  }

  _getSize() {
    if (this.props.shouldEnlarge) {
      return 20;
    }
    return 0;
  }
  // La méthode componentDidUpdate est exécuté chaque fois que le component est mise à jour, c'est l'endroit parfait pour lancer / relancer notre animation.
  componentDidUpdate() {
    Animated.spring(this.state.viewSize, {
        toValue: 0,
        speed: 4,
        bounciness: 30
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={{width: this.state.viewSize, height: this.state.viewSize}}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default EnlargeShrink;
