import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Row from '../../components/Orders/row';
import Header from '../../components/Orders/header';
import DefaultButton from '../../components/UI/DefaultButton';
import Loading from '../../components/UI/Loading';
import sendOrders from '../saveOrders';

class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            isReady: true,
            isLoading: false,
            userID: ''
        };
    }

    async componentDidMount() {
        const internetConnection = await NetInfo.fetch();
        const userID = await AsyncStorage.getItem('userID');
        this.setState({ userID: userID }, () => {
            if (internetConnection.isConnected && (internetConnection.type === 'wifi' || internetConnection.type === 'cellular')) {

                this.getOrdersServer();
            }
            else {
                this.getOrdersDevice();
            }
        });
    }

    refresh = async () => {
        this.setState({ isLoading: true })
        const internetConnection = await NetInfo.fetch();
        if (internetConnection.isConnected && (internetConnection.type === 'wifi' || internetConnection.type === 'cellular')) {
            this.getOrdersServer().then(() => this.setState({ isLoading: false }));
        }
        this.setState({ isLoading: false });
    }

    getOrdersDevice = async () => {
        const orders = JSON.parse(await AsyncStorage.getItem('orders'));
        this.setState({ isReady: true, orders: orders })
    }

    getOrdersServer = async () => {
        sendOrders().finally(async () => {
            const { data } = await axios.get('http://remusacr.com/gestion/app/ordenes.php?id=' + this.state.userID);
            await AsyncStorage.setItem('orders', JSON.stringify(data));
            this.setState({ isReady: true, orders: data });
        });

    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Ordenes',
            headerLeft: ({ tintColor }) => (
                <Icon name="menu" style={{ marginLeft: 10 }} size={40} onPress={() => navigation.openDrawer()} />
            ),
        };
    }

    onPressHandler = (index) => {
        this.props.navigation.navigate('Order', { orderID: this.state.orders[index].id_orden })
    }

    render() {
        return (
            <View style={styles.container}>
                <Loading visible={this.state.isLoading} />
                <DefaultButton type={'primary'} title={'Refrescar'} onPress={this.refresh} />
                {this.state.isReady ?
                    <FlatList
                        ListHeaderComponent={(<Header />)}
                        data={this.state.orders}
                        renderItem={({ item, index }) => <Row onPress={this.onPressHandler} index={index} ID={item.id_orden} client={item.cliente} dueDate={item.fecha_limite} />}
                        keyExtractor={(item, index) => index.toString()}
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


