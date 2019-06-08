import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Report from '../../components/OrderReport/report';
import Loading from '../../components/UI/Loading';

class OrderReport extends Component {
    state = {
        type: this.props.navigation.getParam('type', 0),
        isLoading: false
    };

    saveOrderReport = async (orderData) => {
        this.setState({isLoading: true});
        if(this.state.type === 'antes') {
            const orderReport = {};
            orderReport['antes'] = orderData;
            const ordersDelayed = JSON.parse(await AsyncStorage.getItem('ordersDelayed'));
            
            const orderID = this.props.navigation.getParam('orderID', 0);
            orderReport['orden'] = orderID;
            
            ordersDelayed.push(orderReport);
            
            const value = await AsyncStorage.setItem('ordersDelayed', JSON.stringify(ordersDelayed));
            this.setState({isLoading: false});
            this.props.navigation.goBack();
        }
        else {
            
            const ordersDelayed = JSON.parse(await AsyncStorage.getItem('ordersDelayed'));
            
            const orderID = this.props.navigation.getParam('orderID', 0);
            let currentOrder = {};
            console.log(ordersDelayed);
            let i = 0;
            for(i; i < ordersDelayed.length; i++) {
                if (ordersDelayed[i].orden === orderID) {
                    currentOrder = ordersDelayed[i];
                    break;
                }
            }
            currentOrder['despues'] = orderData;

            
            ordersDelayed[i] = currentOrder;
            
            const value = await AsyncStorage.setItem('ordersDelayed', JSON.stringify(ordersDelayed));
            this.setState({isLoading: false});
            this.props.navigation.goBack();
        }

        
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Reporte orden #' + navigation.getParam('orderID', 0)
        };
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} style={styles.container}>
                <Loading visible={this.state.isLoading}/>
                <Report type={this.state.type} onSave={this.saveOrderReport}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
});

export default OrderReport;


