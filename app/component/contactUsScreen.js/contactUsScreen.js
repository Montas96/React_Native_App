/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, Image, Linking, ScrollView} from 'react-native';
import {Styles} from '../../assets/styles';
import Images from '../../assets/images';
import Metrics from '../../assets/Metrics';
import {Colors} from '../../assets/colors';

class ContactUsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={Images.email} style={{width: 100, height: 100}} />
          <Text style={Styles.title} onPress={() => Linking.openURL('mailto:support@example.com') }>
              Contact us{'\n'}
              <Text style={[{fontSize: 15, color: Colors.white_gray}]} onPress={() => Linking.openURL('mailto:support@example.com') }>
            support@example.com
          </Text>
          </Text>
          
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={Images.location} style={{width: 30, height: 30}} />
          <Text style={styles.title}>
            {' 254 Julien Motorway \n Tennesse, 845212-2321'}
          </Text>
          <Text
            style={styles.title}
            onPress={() => this.props.navigation.navigate('FindUs')}>
            {' '}
            Find Us
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={Images.phone} style={{width: 30, height: 30}} />
          <Text
            style={styles.title}
            onPress={() => Linking.openURL(`tel:${20221215222}`)}>
            {' (202) 215 215 222'}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={Images.clock} style={{width: 30, height: 30}} />
          <Text
            style={styles.title}
            onPress={() => Linking.openURL(`tel:${20221215222}`)}>
            {'Monday - Friday\n9am-00am\nSaturday - Sunday\n9am - 6pm'}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text
            style={[styles.title, {textAlign: 'center'}]}
            onPress={() => this.props.navigation.push('AboutUs')}>
            About us
          </Text>
          <View>
            <Text style={styles.title}>
              You can cunsult our
              <Text
                style={[styles.title, {textDecorationLine: 'underline'}]}
                onPress={() => this.props.navigation.push('TermsOfUse')}>
                {' Terms.'}
              </Text>
              Learn how we process your data in our
              <Text
                style={[styles.title, {textDecorationLine: 'underline'}]}
                onPress={() => this.props.navigation.push('PrivacyPolicies')}>
                {' Private policy '}
              </Text>
              and
              <Text
                style={[styles.title, {textDecorationLine: 'underline'}]}
                onPress={() => this.props.navigation.push('CookiesPolicy')}>
                {' Cookies policy.'}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default ContactUsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: Metrics.width_full,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#62c2e4',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center'
  },
  footer: {
    justifyContent: 'flex-start',
    //alignItems: 'flex-start',
    alignSelf: 'center',
    backgroundColor: Colors.white_gray,
    padding: 10,
    marginTop: 5,
  },
});
