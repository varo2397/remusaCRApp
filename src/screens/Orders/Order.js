import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
            if ( order.id_orden === orderID ) {
                return order;
            }
        })[0];
        this.setState({ order: order });
    }

    componentDidMount() {
        this.getOrderInfo();
    }

    beforeOrderHandler = () => {
        const orderID = this.props.navigation.getParam('orderID', 0);
        this.props.navigation.navigate('OrderReport', {
            orderID: orderID,
            type: 'antes'
        })
    }

    afterOrderHandler = () => {
        const orderID = this.props.navigation.getParam('orderID', 0);
        this.props.navigation.navigate('OrderReport', {
            orderID: orderID,
            type: 'después'
        })
    }

    signOrderHandler = () => {
        const orderID = this.props.navigation.getParam('orderID', 0);
        this.props.navigation.navigate('Sign', {
            orderID: orderID
        })
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
                        this.state.order.descripcion_trabajo } />
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


