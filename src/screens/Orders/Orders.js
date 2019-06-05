import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Row from '../../components/Orders/row';
import Header from '../../components/Orders/header';

class Order extends Component {
    state = {
        orders: [],
        isReady: true
    };

    async componentDidMount() {
        const internetConnection = await NetInfo.fetch();
        if (internetConnection.isConnected && internetConnection.type === 'wifi') {
            this.getOrdersServer();
        }
        else {
            this.getOrdersDevice();
        }
        
    }

    getOrdersDevice = async () => {
        const orders = JSON.parse(await AsyncStorage.getItem('orders'));
        this.setState({isReady: true, orders: orders})
    }

    getOrdersServer = async () => {
        const { data } = await axios.get('http://remusacr.com/gestion/app/ordenes.php?id=385');
        await AsyncStorage.setItem('orders', JSON.stringify(data));
        this.setState({isReady: true, orders: data});
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Ordenes',
            headerLeft: ({ tintColor }) => (
                <Icon name="menu" style={{marginLeft: 10}} size={40} onPress={() => navigation.openDrawer()} />
            ),
        };
    }

    onPressHandler = (index) => {
        this.props.navigation.navigate('Order', { orderID: this.state.orders[index].id_orden })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isReady ?
                    <FlatList
                        ListHeaderComponent={(<Header/>)}
                        data={this.state.orders}
                        renderItem={({ item, index }) => <Row onPress={this.onPressHandler} index={index} ID={item.id_orden} client={item.cliente} dueDate={item.fecha_limite}/>}
                        keyExtractor={(item, index) => index.toString() }
                        style={{ width: '100%' }}
                    /> : null
                }


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        flex: 1
    }
});

export default Order;


