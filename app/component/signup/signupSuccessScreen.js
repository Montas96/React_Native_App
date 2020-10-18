/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import CustomButton from '../../shared/component/customButton';
import Images from '../../assets/images';
import { styles } from './signupScreenStyle';

class SignUpSuccessScreen extends React.Component {
    render() {
        return <ScrollView style={{}}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <View style={styles.container} >
                <Image
                    source={Images.fastfood}
                    style={styles.image}
                    resizeMode={'cover'} />
                <View
                    style={styles.inputContainer}>
                    <Text style={styles.title}> 'Your account has been created ' </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title={'Next'}
                        onPress={() => this.props.navigation.replace('Home')}
                    />
                </View>
            </View>
        </ScrollView>;
    }
}

export default (SignUpSuccessScreen);
