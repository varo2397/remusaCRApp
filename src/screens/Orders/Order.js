import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import OrderData from '../../components/Orders/OrderData';
import OrderDescription from '../../components/Orders/OrderDescription';

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
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
                <View style={styles.details}>
                    <OrderData data={'VETRASA (Zapote) '} info={'Cliente:'} />
                    <OrderData data={'2272-7000'} info={'Número cliente:'} />
                    <OrderData data={'Zapote, diagonal a la rotonda de las Garantías Sociales.'} info={'Dirección cliente:'} />
                    <OrderData data={'Boton'} info={'Waze:'} />
                    <OrderData data={'William Chavarría'} info={'Técnico Responsable:'} />
                    <OrderData data={'Abierto'} info={'Estado:'} />
                    <OrderData data={'Alta'} info={'Prioridad:'} />
                    <OrderData data={'2019-05-16 13:55:32'} info={'Fecha de ingreso:'} />
                    <OrderData data={'2019-05-20'} info={'Fecha Planificada:'} />
                </View>
                <View>
                    <OrderDescription description={
                        '1.	Mantenimiento de elevadores: Algunos elevadores se encuentran en condiciones no aptas para su funcionamiento, por ejemplo, unos están faltantes de seguros tanto en las torres como en los brazos, hules anti deslizantes, adaptadores de altura, algunos pistones se encuentran con fugas de aceite y otros rechinan por falta de lubricación. 2.	Dispensadores de aceite: Las mangueras no bloquean, se quedan atascadas y no desenvuelven, otros no se devuelven una vez utilizada la manguera, adicional a esto, las pistolas se encuentran descalibradas.'
                    }/>
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
    description: {

    }
});

export default Orders;


