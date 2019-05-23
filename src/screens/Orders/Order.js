import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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

    componentDidMount() {
        this.setState({
            order: {
                client: 'VETRASA (Zapote)',
                phoneNumber: '2272-7000',
                address: 'Zapote, diagonal a la rotonda de las Garantías Sociales.',
                waze: 'https://waze.com/ul?q=Zapote, diagonal a la rotonda de las Garantías Sociales.',
                tech: 'William Chavarría',
                state: 'Abierto',
                priority: 'Alta',
                entryDate: '2019-05-16 13:55:32',
                dueDate: '2019-05-20'
            }
        })
    }

    editOrderHandler = () => {
        const orderID = this.props.navigation.getParam('orderID', 0);
        this.props.navigation.navigate('OrderReport', {orderID: orderID})
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
                <View style={styles.button}>
                    <DefaultButton onPress={this.editOrderHandler} type={'warning'} title={'Llenar reporte'} />
                </View>

                <View style={styles.details}>
                    <OrderData data={this.state.order.client} info={'Cliente:'} />
                    <PhoneNumber data={this.state.order.phoneNumber} info={'Número cliente:'} />
                    <OrderData data={this.state.order.address} info={'Dirección cliente:'} />
                    <Waze data={this.state.order.waze} info={'Waze:'} />
                    <OrderData data={this.state.order.tech} info={'Técnico Responsable:'} />
                    <OrderData data={this.state.order.state} info={'Estado:'} />
                    <OrderData data={this.state.order.priority} info={'Prioridad:'} />
                    <OrderData data={this.state.order.entryDate} info={'Fecha de ingreso:'} />
                    <OrderData data={this.state.order.dueDate} info={'Fecha Planificada:'} />
                </View>
                <View style={styles.description}>
                    <OrderDescription description={
                        '1.	Mantenimiento de elevadores: Algunos elevadores se encuentran en condiciones no aptas para su funcionamiento, por ejemplo, unos están faltantes de seguros tanto en las torres como en los brazos, hules anti deslizantes, adaptadores de altura, algunos pistones se encuentran con fugas de aceite y otros rechinan por falta de lubricación. 2.	Dispensadores de aceite: Las mangueras no bloquean, se quedan atascadas y no desenvuelven, otros no se devuelven una vez utilizada la manguera, adicional a esto, las pistolas se encuentran descalibradas.'
                    } />
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


