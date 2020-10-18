/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native';
import ResponsiveFontSize from '../responsiveFrontSize';
import PropTypes from 'prop-types';
// import Dialog from 'react-native-dialog';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    ScaleAnimation,
} from 'react-native-popup-dialog';
const Screenwidth = Dimensions.get('window').width;
const Screenheight = Dimensions.get('window').height;

class Alertfunction extends Component {


    _onDissmissAction = () => {
        this.props.OkButtonAction();
    }
    _onCancel = () => {
        this.props.CancelButtonAction();
    }
    _onOk = () => {
        this.props.OkButtonAction();
    }
    _getHeaderStyle = () => {
        switch (this.props.Type) {
            case 'ERROR':
                return Screenwidth > Screenheight ? styles.landscapAlertheaderClass : styles.AlertheaderClass;
            case 'SUCCESS':
                return Screenwidth > Screenheight ? styles.SuccesslandscapAlertheaderClass : styles.SuccessAlertheaderClass;
            default:
                return Screenwidth > Screenheight ? styles.WarnlandscapAlertheaderClass : styles.WarnAlertheaderClass;
        }
    }

    render() {

        const headerStyle = this._getHeaderStyle();

        return (
            <Dialog
                onTouchOutside={this._onDissmissAction}
                visible={this.props.Visible}
                width={parseInt(ResponsiveFontSize(200))}
                dialogAnimation={new ScaleAnimation()}
                onDismiss={() => {
                    if (this.props.onDismissAction != null) {
                        this._onDissmissAction();
                    }
                }}
                onHardwareBackPress={() => {
                    this._onCancel();
                    return true;
                }}
                dialogTitle={
                    <DialogTitle
                        title={this.props.Title}
                        align="center"
                        textStyle={{ fontSize: parseInt(ResponsiveFontSize(14)) }}
                        style={headerStyle}
                        hasTitleBar={false}
                    />
                }
                footer={
                    <DialogFooter>
                        {this.props.CancelButtonAction != null ? (
                            <DialogButton
                                text="CANCEL"
                                bordered
                                textStyle={{
                                    color: 'black',
                                    fontSize: parseInt(ResponsiveFontSize(14)),
                                }}
                                onPress={this._onCancel}
                            />
                        ) : (
                                <Text />
                            )}
                        {this.props.OkButtonAction != null ? (
                            <DialogButton
                                text="OK"
                                bordered
                                textStyle={{
                                    color: 'black',
                                    fontSize: parseInt(ResponsiveFontSize(14)),
                                }}
                                onPress={this._onOk}
                                key="button-2"
                            />
                        ) : (
                                <Text />
                            )}
                    </DialogFooter>
                }>
                <DialogContent style={styles.ModalContainer}>
                    <View>
                        <ScrollView>
                            <Text style={Screenwidth > Screenheight ? styles.LandscapAlertbodyClass : styles.AlertbodyClass}>{this.props.Body} </Text>
                        </ScrollView>
                    </View>
                </DialogContent>
            </Dialog>
        );
    }
}
export default Alertfunction;
Alertfunction.propTypes = {
    Title: PropTypes.string,
    Body: PropTypes.string,
    Visible: PropTypes.bool,
    Type: PropTypes.string,
    OkButtonAction: PropTypes.func,
    CancelButtonAction: PropTypes.func,
    onDismissAction: PropTypes.func,
    headerClass: PropTypes.object,
    bodyClass: PropTypes.object,
    btnClass: PropTypes.object,
};

Alertfunction.defaultProps = {
    Title: ' ',
    Type: 'ERROR' || 'SUCCESS' || 'WARNING',
    Body: ' ',
    Visible: false,
    headerClass: null,
    bodyClass: null,
    btnClass: null,
    onDismissAction: null,
};

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ModalContainer: {},
    landScapModalContainer: {
        height: parseInt(ResponsiveFontSize(50)),
    },

    TextContainer:
    {
        alignItems: 'flex-start',
        paddingTop: 10,
        color: 'rgb(0,142,234)',
        paddingLeft: 10,
    },
    container1:
    {
        margin: 8,
        marginTop: 24,
    },
    SuccessAlertheaderClass:
    {
        paddingTop: 10,
        fontSize: parseInt(ResponsiveFontSize(18)),
        height: parseInt(ResponsiveFontSize(12)),
        backgroundColor: '#90ee90',
    },
    SuccesslandscapAlertheaderClass:
    {
        paddingTop: 10,
        fontSize: parseInt(ResponsiveFontSize(18)),
        height: parseInt(ResponsiveFontSize(22)),
        backgroundColor: '#90ee90',
    },
    AlertheaderClass:
    {
        paddingTop: 10,
        fontSize: parseInt(ResponsiveFontSize(18)),
        height: parseInt(ResponsiveFontSize(12)),
        backgroundColor: 'red',
    },
    landscapAlertheaderClass:
    {
        fontSize: parseInt(ResponsiveFontSize(18)),
        height: parseInt(ResponsiveFontSize(22)),
        backgroundColor: 'red',
    },
    AlertbodyClass:
    {
        fontSize: parseInt(ResponsiveFontSize(14)),
        paddingTop: parseInt(ResponsiveFontSize(18)),
    },
    LandscapAlertbodyClass:
    {
        fontSize: parseInt(ResponsiveFontSize(10)),
        paddingTop: parseInt(ResponsiveFontSize(18)),
    },
    AlertbtnClass:
    {
        fontSize: parseInt(ResponsiveFontSize(14)),
    },
    FPA_AlertheaderClass:
    {
        paddingTop: 10,
        fontSize: parseInt(ResponsiveFontSize(18)),
        height: parseInt(ResponsiveFontSize(12)),
        backgroundColor: '#90ee90',
    },
    FPA_landscapAlertheaderClass:
    {
        paddingTop: 10,
        fontSize: parseInt(ResponsiveFontSize(18)),
        height: parseInt(ResponsiveFontSize(22)),
        backgroundColor: '#90ee90',
    },
    WarnAlertheaderClass:
    {
        paddingTop: 10,
        fontSize: parseInt(ResponsiveFontSize(18)),
        height: parseInt(ResponsiveFontSize(12)),
        backgroundColor: '#FFCC00',
    },
    WarnlandscapAlertheaderClass:
    {
        paddingTop: 10,
        fontSize: parseInt(ResponsiveFontSize(18)),
        height: parseInt(ResponsiveFontSize(22)),
        backgroundColor: '#FFCC00',
    },
});
