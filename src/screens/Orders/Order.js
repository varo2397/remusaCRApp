import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import OrderData from '../../components/Order/orderData';
import OrderDescription from '../../components/Order/orderDescription';
import PhoneNumber from '../../components/Order/phoneNumber';
import Waze from '../../components/Order/waze';
import DefaultButton from '../../components/UI/DefaultButton';

class Orders extends Component {
    state = {
        order: {},
        isReady: false
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

        const orderID = this.props.navigation.getParam('orderID', 0);
        const ordersDelayed = JSON.parse(await AsyncStorage.getItem('ordersDelayed'));
        let orderData = {};

        //there is at least one delayed order
        if (ordersDelayed.length > 0) {

            //cfind out if the order is in the delayed orders
            for (let i = 0; ordersDelayed.length; i++) {
                if (ordersDelayed[i].orden === orderID) {
                    orderData = ordersDelayed[i];
                    break
                }
            }

            //check if the order before has been filled 
            if ('antes' in orderData) {
                Alert.alert(
                    'Error',
                    'Ya habías ingresado el antes de esta orden'
                )
            }

            //the order does not has a before 
            else {
                const orderID = this.props.navigation.getParam('orderID', 0);
                this.props.navigation.navigate('OrderReport', {
                    orderID: orderID,
                    type: 'antes'
                });
            }
        }

        //there no delayed orders so the before has to be done 
        else {
            const orderID = this.props.navigation.getParam('orderID', 0);
            this.props.navigation.navigate('OrderReport', {
                orderID: orderID,
                type: 'antes'
            });
        }

    }

    afterOrderHandler = async () => {

        const orderID = this.props.navigation.getParam('orderID', 0);
        const ordersDelayed = JSON.parse(await AsyncStorage.getItem('ordersDelayed'));
        let orderData = {};
        console.log(ordersDelayed);

        if (ordersDelayed.length > 0) {

            for (let i = 0; ordersDelayed.length; i++) {
                if (ordersDelayed[i].orden === orderID && 'antes' in ordersDelayed[i]) {
                    orderData = ordersDelayed[i];
                    break
                }
            }

            if ('despues' in orderData) {
                Alert.alert(
                    'Error',
                    'Ya habías ingresado el después de esta orden'
                )
            }
            else if (orderData !== {}) {
                const orderID = this.props.navigation.getParam('orderID', 0);
                this.props.navigation.navigate('OrderReport', {
                    orderID: orderID,
                    type: 'después'
                });
            }
            else {
                Alert.alert(
                    'Error',
                    'Tienes que llenar el antes de esta orden'
                )
            }
        }
        else {
            Alert.alert(
                'Error',
                'Tienes que llenar el antes de esta orden'
            )
        }


    }

    signOrderHandler = async () => {

        const orderID = this.props.navigation.getParam('orderID', 0);
        const ordersDelayed = JSON.parse(await AsyncStorage.getItem('ordersDelayed'));
        let orderData = {};
        console.log(ordersDelayed);

        if (ordersDelayed.length > 0) {

            for (let i = 0; ordersDelayed.length; i++) {
                console.log(ordersDelayed[i].orden);
                if (ordersDelayed[i].orden == orderID && 'antes' in ordersDelayed[i] && 'despues' in ordersDelayed[i]) {
                    orderData = ordersDelayed[i];
                    break
                }
            }

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
                <View style={styles.button}>
                    <DefaultButton onPress={this.beforeOrderHandler} type={'warning'} title={'Antes'} />
                    <DefaultButton onPress={this.afterOrderHandler} type={'primary'} title={'Después'} />
                    <DefaultButton onPress={this.signOrderHandler} type={'success'} title={'Firma'} />
                </View>

                <View style={styles.details}>
                    <OrderData data={this.state.order.cliente} info={'Cliente:'} />
                    <PhoneNumber data={this.state.order.numero_cliente} info={'Número cliente:'} />
                    <OrderData data={this.state.order.direccion} info={'Dirección cliente:'} />
                    <Waze data={''} info={'Waze:'} />
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


