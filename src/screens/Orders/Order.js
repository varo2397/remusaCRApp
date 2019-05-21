import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

class Orders extends Component {
    state = {
        orders: []
    };

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Orden #' + navigation.getParam('orderID', 0),
            headerBackTitle: 'ejemplo'
        };
    }

    render() {
        return (
            <View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default Orders;


