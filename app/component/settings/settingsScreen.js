/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, Text, StyleSheet, View, TextInput, RefreshControl, FlatList } from 'react-native';
import { Styles } from '../../assets/styles';
import { connect } from 'react-redux';
import { Colors } from '../../assets/colors';
import Metrics from '../../assets/Metrics';
import { UserAction } from '../../actions/user.action';
import CustomButton from '../../shared/component/customButton';
import IconButton from '../../shared/component/iconButton';
import Images from '../../assets/images';
class SettingsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            zipCode: '',
            firstName: '',
            lastName: '',
            email: '',
            login: '',
            addressTitle: '',
            phone: '',
            addresses: [{
                addressTitle: '',
                address: '',
                zipCode: '',
                phone: '',
            }],
        };
        props.getUser();
    }
    componentDidUpdate(prevProps) {
        if ((prevProps.fetch && !this.props.fetch && this.props.error === null) || (prevProps.updating && !this.props.updating && this.props.updateUserError === null) && this.props.user !== null) {
            this.setUserFromProps();
        }
    }

    setUserFromProps = () => {
        const {addresses} = this.props.user;
        const { firstName, lastName, login, email} = this.props.user.userDTO;
        console.log(addresses)
        this.setState({
            login: login,
            firstName,
            lastName,
            email,
            addresses: addresses && addresses.address !== null ? addresses : this.state.addresses ,
        });
    }

    _refresh = () => {
        this.props.getUser();
    }
    addAddress = () => {
        let addresses = [...this.state.addresses];
        addresses.push({
            addressTitle: '',
            address: '',
            zipCode: '',
            phone: '',
        });
        this.setState({addresses})
    }

    _updateUser = () => {
        const { firstName, lastName, login, email,addresses, addressTitle, address, zipCode, phone } = this.state;

        const user = {
            ...this.props.user,
            userDTO: {
                login: login,
                firstName,
                lastName,
                email,
            },
            addresses
            // : [{
            //     addressTitle,
            //     address,
            //     zipCode,
            //     phone,
            // }],
        };
        this.props.updateUser(user);
    }

    _setAdresseTitle = (text, index) => {
        let addresses = [...this.state.addresses];
        addresses[index].addressTitle = text;
        this.setState({addresses});
    }
    _setAddress = (text, index) => {
        let addresses = [...this.state.addresses];
        addresses[index].address = text;
        this.setState({addresses});
    }
    _setZipCode = (text, index) => {
        let addresses = [...this.state.addresses];
        addresses[index].zipCode = text;
        this.setState({addresses});
    }
    _setPhone = (text, index) => {
        let addresses = [...this.state.addresses];
        addresses[index].phone = text;
        this.setState({addresses});
    }

    _renderItem = ({item, index}) => {
        console.log(item.zipCode)
        return (
            <View style={{ flex: 1, borderWidth: 1, borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={styles.title1}>Address</Text>
                            <TextInput
                                value={item.addressTitle}
                                placeholder={'Title'}
                                onChangeText={(text) => this._setAdresseTitle(text, index)}
                                style={[styles.textInput, { width: Metrics.width_70 -8 }]}
                            />
                        </View>
                        <TextInput
                            value={item.address}
                            placeholder={'Address'}
                            onChangeText={(text) => this._setAddress(text, index)}
                            multiline={true}
                            numberOfLines={4}
                            style={styles.textInput}
                        />
                        <TextInput
                            value={item.zipCode.toString()}
                            placeholder={'Zip code'}
                            textContentType={'postalCode'}
                            keyboardType={'numeric'}
                            onChangeText={(text) => this._setZipCode(text, index)}
                            style={styles.textInput}
                        />
                        <TextInput
                            value={item.phone}
                            placeholder={'Phone'}
                            textContentType={'telephoneNumber'}
                            keyboardType={'numeric'}
                            onChangeText={(text) =>  this._setPhone(text, index)}
                            style={styles.textInput}
                        />
                        <IconButton
                                icon={Images.plus}
                                shadowActive={false}
                                onPress={this.addAddress}
                                style={{flexDirection: 'row-reverse',wigth: 30, height: 30,borderWidth: 1, alignSelf: 'flex-end',borderRadius: 5,margin: 10}}
                                iconStyle={{wigth: 20, height: 20}}
                                text={'Add new  address'}
                                textStyle={{fontSize: 15}}
                            />
                    </View>
        );
    }

    render() {
        const { updating, fetch } = this.props;
        const { firstName, lastName, login, email, addresses} = this.state;
        return (
            <ScrollView style={styles.container}
                refreshControl={<RefreshControl refreshing={updating || fetch} onRefresh={this._refresh} />}>
                <Text style={Styles.title}> Settings screen</Text>
                <View style={styles.userInfo}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={[styles.title1, { width: 100 }]}>{'First name: '}</Text>
                        <TextInput
                            value={firstName}
                            onChangeText={(text) => this.setState({ firstName: text })}
                            style={[styles.textInput, { width: Metrics.width_50 }]}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={[styles.title1, { width: 100 }]}>{'last name: '}</Text>
                        <TextInput
                            value={lastName}
                            onChangeText={(text) => this.setState({ lastName: text })}
                            style={[styles.textInput, { width: Metrics.width_50 }]}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={[styles.title1, { width: 100 }]}>{'Login: '}</Text>
                        <TextInput
                            value={login}
                            onChangeText={(text) => this.setState({ login: text })}
                            style={[styles.textInput, { width: Metrics.width_50 }]}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={[styles.title1, { width: 100 }]}>{'Mail: '}</Text>
                        <TextInput
                            value={email}
                            onChangeText={(text) => this.setState({ email: text })}
                            style={[styles.textInput, { width: Metrics.width_50 }]}
                        />
                    </View>
                </View>
                <View style={styles.address}>
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={addresses}
                        renderItem={(item) =>  this._renderItem(item)}
                        horizontal={true}
                    />
                </View>
                <CustomButton
                    title={'Save'}
                    onPress={this._updateUser}
                    style={{ padding: 2, width: 'auto', margin: 15 }}
                />
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
        updating: state.user.updating,
        errorUpdate: state.user.updateUserError,
        fetch: state.user.fetching,
        error: state.user.error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch({ type: UserAction.getUserRequest }),
        updateUser: (user) => dispatch({ type: UserAction.updateUserRequest, user }),
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
    spinner: {
        justifyContent: 'center',
        alignContent: 'center',
        height: 40,
    },
});
