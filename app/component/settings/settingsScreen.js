/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, Text, StyleSheet, View, TextInput } from 'react-native';
import { Styles } from '../../assets/styles';
import { connect } from 'react-redux';
import { Colors } from '../../assets/colors';
import Metrics from '../../assets/Metrics';
import { UserAction } from '../../actions/user.action';

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            zipCode: '',
        }
        props.getUser();
    }

    render() {
        const { account } = this.props;
        return (
            <ScrollView style={styles.container}>
                <Text style={Styles.title}> Settings screen</Text>
                <View style={styles.userInfo}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={[styles.title1, { width: 100 }]}>{'First name: '}</Text>
                        <Text style={styles.title1}>{account.firstName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={[styles.title1, { width: 100 }]}>{'last name: '}</Text>
                        <Text style={styles.title1}>{account.lastName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={[styles.title1, { width: 100 }]}>{'Login: '}</Text>
                        <Text style={styles.title1}>{account.login}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={[styles.title1, { width: 100 }]}>{'Mail: '}</Text>
                        <Text style={styles.title1}>{account.email}</Text>
                    </View>
                </View>
                <View style={styles.address}>
                    <View style={{ flex: 1, borderWidth: 1, borderRadius: 5 }}>
                        <Text style={styles.title1}>Address</Text>
                        <TextInput
                            value={this.state.address}
                            placeholder={'Address'}
                            onChangeText={(text) => this.setState({ address: text })}
                            multiline={true}
                            numberOfLines={4}
                            style={styles.textInput}
                        />
                        <TextInput
                            value={this.state.zipCode}
                            placeholder={'Zip code'}
                            textContentType={'postalCode'}
                            keyboardType={'numeric'}
                            onChangeText={(text) => this.setState({ zipCode: text })}
                            style={styles.textInput}
                        />
                        <TextInput
                            value={this.state.phone}
                            placeholder={'Phone'}
                            textContentType={'telephoneNumber'}
                            keyboardType={'numeric'}
                            onChangeText={(text) => this.setState({ phone: text })}
                            style={styles.textInput}
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text
                        style={[styles.title, { textAlign: 'center' }]}
                        onPress={() => this.props.navigation.push('AboutUs')}>
                        About us
          </Text>
                    <View>
                        <Text style={styles.title}>
                            You can cunsult our
              <Text
                                style={[styles.title, { textDecorationLine: 'underline' }]}
                                onPress={() => this.props.navigation.push('TermsOfUse')}>
                                {' Terms.'}
                            </Text>{' '}
                            Learn how we process your data in our
              <Text
                                style={[styles.title, { textDecorationLine: 'underline' }]}
                                onPress={() => this.props.navigation.push('PrivacyPolicies')}>
                                {' Private policy '}
                            </Text>
                            and
              <Text
                                style={[styles.title, { textDecorationLine: 'underline' }]}
                                onPress={() => this.props.navigation.push('CookiesPolicy')}>
                                {' Cookies policy.'}
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        user: state.user.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: ()=>dispatch({type: UserAction.getUserRequest}),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    userInfo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 10,
    },
    address: {
        flex: 1,
        margin: 10,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-start',
        //alignItems: 'flex-start',
        alignSelf: 'center',
        backgroundColor: Colors.white_gray,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'left',
        margin: 10,
    },
    title1: {
        fontSize: 15,
        fontWeight: '700',
        margin: 10,
    },
    textInput: {
        width: Metrics.width_full - 40,
        margin: 5,
        borderWidth: 1,
        textAlignVertical: 'top',
        justifyContent: 'flex-start',
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
});
