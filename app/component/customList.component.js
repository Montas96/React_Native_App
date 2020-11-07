/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CustomButton from '../shared/component/customButton';
import Spinner from '../shared/spinner';
import { Colors } from '../assets/colors';
import Metrics from '../assets/Metrics';

export default function CustomList({ list, navigation, fetching, listTitle }) {
    const _onPress = (item) => {
    };

    const _renderItem = ({ item }) => {
        return (
            <View style={styles.item} >
                <CustomButton
                    title={item.name}
                    onPress={() => _onPress(item.name)}
                    style={{ padding: 10, width: 'auto' }}
                />
            </View>
        );
    };

    const _renderEmpty = () => {
        return (
          <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}} >
              {fetching ? <Spinner style={[styles.spinner]} color={Colors.yellow} /> : null}
          </View>
        );
      };

    return (
        <View style={styles.container} >
            {/* <Text style={styles.listTitle} > {listTitle} </Text> */}
            <FlatList
                data={list}
                key={(item) => item.id}
                // ListEmptyComponent={_renderEmpty}
                renderItem={(item) => _renderItem(item)}
                horizontal={true}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: Metrics.width_20,
        borderBottomWidth: 1,
        borderColor: '#f1f6f9',
        backgroundColor: Colors.white_gray,
    },
    item: {
        flex: 1,
    },
    spinner: {
        justifyContent: 'center',
        alignContent: 'center',
        height: 40,
    },
    listTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 5,
    },
});
