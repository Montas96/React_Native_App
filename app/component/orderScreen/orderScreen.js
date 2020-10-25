/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView, Text, StyleSheet, FlatList, View} from 'react-native';
import {connect} from 'react-redux';
import {Styles} from '../../assets/styles';
import OrderLine from './orderLine';
import IconButton from '../../shared/component/iconButton';
import Images from '../../assets/images';
import Metrics from '../../assets/Metrics';
import { Colors } from '../../assets/colors';

class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  _passOrder = () => {
      console.log('pass Order')
  }
  _renderEmpty = () => {
    return (
      <View>
        <Text> no order found </Text>
      </View>
    );
  };
  _renderFooter = (orderLines) => {
      let total = 0;
      orderLines.forEach(item => {
          total += item.quantity * item.foodType.price;
      });
      if (!orderLines.length){
        return null;
      }
    return (
      <View style={styles.footer}>
        <Text style={styles.title1}> {'Total: ' + total} </Text>
        <IconButton
            style={styles.icon}
            iconStyle={{ width: 30, height: 30 }}
            onPress={this._passOrder}
            icon={Images.checklist}
            shadowActive={true}
            text={'Order now'} />
      </View>
    );
  };

  render() {
    const {order} = this.props;
    const orderLines = order ? order.orderLines : [];
    return (
      <View style={styles.constainer}>
        <Text style={Styles.title}> Order </Text>
        <Text style={styles.title1}> Order Lines </Text>
        <FlatList
          data={orderLines}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => <OrderLine order={item} /> }
          ListEmptyComponent={this._renderEmpty}
          ListFooterComponent={() => this._renderFooter(orderLines)}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    order: state.order.order,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  title1: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    marginLeft: 10,
  },
  footer: {
      flex :1,
      marginVertical: 10,
  },
  icon: {
    flex: 1,
    // width: Metrics.width_15,
    height: Metrics.width_15,
    borderRadius: 5,
    margin:15,
    // borderWidth: 1,
    alignSelf:'center',
    justifyContent: 'center',
    width: Metrics.width_full - 30,
    backgroundColor: Colors.yellow,
  },
});
