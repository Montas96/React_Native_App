/* eslint-disable prettier/prettier */
// Components/Avatar.js

import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import Images from '../assets/images';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: Images.user_icon,
    };
  }
  _setUserImageAction = () => {
    const action = { type: 'SET_USER_IMAGE', image: this.state.avatar };// create action type 'SET_USER_IMAGE'
    this.props.dispatch(action);
  }

  _setImage = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let requireSource = {uri: response.uri};
        this.setState({
          avatar: requireSource,
        },() => this._setUserImageAction());
      }
    });
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._setImage}>
        <Image style={styles.avatar} source={ this.props.image ? this.props.image : this.state.avatar} />
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        image: state.user.image,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action); },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 25,
    width: 100, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2,
  },
});