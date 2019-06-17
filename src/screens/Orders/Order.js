import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import OrderData from '../../components/Order/orderData';
import OrderDescription from '../../components/Order/orderDescription';
import PhoneNumber from '../../components/Order/phoneNumber';
import DefaultButton from '../../components/UI/DefaultButton';
import Loading from '../../components/UI/Loading';

class Orders extends Component {
    state = {
        order: {},
        isReady: false,
        isLoading: false
    };

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Orden #' + navigation.getParam('orderID', 0)
        };
    }

    getOrderInfo = async () => {
        const orders = JSON.parse(await AsyncStorage.getItem('orders'));
        const orderID = this.props.navigation.getParam('orderID', 0);

        const order = orders.filter(order => {
            if (order.id_orden === orderID) {
                return order;
            }
        })[0];
        this.setState({ order: order });
    }

    componentDidMount() {
        this.getOrderInfo();
    }

    beforeOrderHandler = async () => {
        this.setState({isLoading: true});
        const orderID = this.props.navigation.getParam('orderID', 0);
        const ordersDelayed = JSON.parse(await AsyncStorage.getItem('ordersDelayed'));
        let orderData = {};
        
        const filteredOrders = ordersDelayed.filter((order) => order.orden === orderID);

        //there is at least one delayed order
        if (filteredOrders.length > 0) {
            orderData = filteredOrders[0];
 
            //check if the order before has been filled 
            if ('antes' in orderData) {
                this.setState({isLoading: false});
                Alert.alert(
                    'Error',
                    'Ya habías ingresado el antes de esta orden'
                )
            }
        }

        //there no delayed orders so the before has to be done 
        else {
            this.setState({isLoading: false});
            const orderID = this.props.navigation.getParam('orderID', 0);
            this.props.navigation.navigate('OrderReport', {
                orderID: orderID,
                type: 'antes'
            });
        }

    }

    afterOrderHandler = async () => {
        this.setState({isLoading: true});
        const orderID = this.props.navigation.getParam('orderID', 0);
        const ordersDelayed = JSON.parse(await AsyncStorage.getItem('ordersDelayed'));
        let orderData = {};

        const filteredOrders = ordersDelayed.filter((order) => order.orden === orderID);

        if (filteredOrders.length > 0) {

            orderData = filteredOrders[0];

            if ('despues' in orderData) {
                this.setState({isLoading: false});
                Alert.alert(
                    'Error',
                    'Ya habías ingresado el después de esta orden'
                )
            }
            else if (orderData !== {}) {
                this.setState({isLoading: false});
                const orderID = this.props.navigation.getParam('orderID', 0);
                this.props.navigation.navigate('OrderReport', {
                    orderID: orderID,
                    type: 'después'
                });
            }
        }
        else {
            this.setState({isLoading: false});
            Alert.alert(
                'Error',
                'Tienes que llenar el antes de esta orden'
            )
        }


    }

    signOrderHandler = async () => {
        // this.setState({isLoading: true});
        const orderID = this.props.navigation.getParam('orderID', 0);
        const ordersDelayed = JSON.parse(await AsyncStorage.getItem('ordersDelayed'));
        let orderData = {};

        const filteredOrders = ordersDelayed.filter((order) => order.orden === orderID);

        if (filteredOrders.length > 0) {

            orderData = filteredOrders[0];

            if ('firma' in orderData) {
                Alert.alert(
                    'Error',
                    'Ya habías firmado estado esta orden'
                )
            }
            else if (orderData !== {}) {
                const orderID = this.props.navigation.getParam('orderID', 0);
                this.props.navigation.navigate('Sign', {
                    orderID: orderID
                })
            }
            else {
                Alert.alert(
                    'Error',
                    'Tienes que llenar el después de esta orden'
                )
            }
        }
        else {
            Alert.alert(
                'Error',
                'Tienes que llenar el después de esta orden'
            )
        }


    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
                <Loading visible={this.state.isLoading}/>
                <View style={styles.button}>
                    <DefaultButton onPress={this.beforeOrderHandler} type={'warning'} title={'Antes'} />
                    <DefaultButton onPress={this.afterOrderHandler} type={'primary'} title={'Después'} />
                    <DefaultButton onPress={this.signOrderHandler} type={'success'} title={'Firma'} />
                </View>

                <View style={styles.details}>
                    <OrderData data={this.state.order.cliente} info={'Cliente:'} />
                    <PhoneNumber data={this.state.order.numero_cliente} info={'Número cliente:'} />
                    <OrderData data={this.state.order.direccion} info={'Dirección cliente:'} />
                    <OrderData data={this.state.order.tecnico} info={'Técnico Responsable:'} />
                    <OrderData data={0} info={'Estado:'} />
                    <OrderData data={this.state.order.prioridad} info={'Prioridad:'} />
                    <OrderData data={this.state.order.fecha_ingreso} info={'Fecha de ingreso:'} />
                    <OrderData data={this.state.order.fecha_limite} info={'Fecha Planificada:'} />
                </View>
                <View style={styles.description}>
                    <OrderDescription description={
                        this.state.order.descripcion_trabajo} />
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,

    },
    details: {
        borderRadius: 5,
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderColor: 'black',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        margin: 10
    }
});

export default Orders;


