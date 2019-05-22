import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Order extends Component {
    state = {
        orders: []
    };

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Ordenes',
            headerLeft: ({ tintColor }) => (
                <Icon name="menu" size={40} onPress={() => navigation.openDrawer()} />
            ),
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>perro</Text>
                <Button title={'ejemplo'} onPress={() => this.props.navigation.navigate('Order', {'orderID': 120})}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10
    }
});

export default Order;


