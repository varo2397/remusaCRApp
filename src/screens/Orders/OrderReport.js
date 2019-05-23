import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Report from '../../components/OrderReport/report';

class OrderReport extends Component {
    state = {
        
    };

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Reporte orden #' + navigation.getParam('orderID', 0)
        };
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} style={styles.container}>
                <Report />
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


