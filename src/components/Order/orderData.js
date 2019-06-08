import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const OrderData = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.textInfo}>{props.info}</Text>
            </View>

            <View style={styles.data}>
                <Text style={styles.textData}>{props.data}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomWidth: 2,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
    },
    info: {
        width: '40%',
        height: '100%',
        borderRightWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D1ECF1'
    },
    data: {
        flex:1,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flexDirection: 'row',
    },
    textData: {
        fontSize: 20,
        textAlign: 'center',
        flexWrap: 'wrap',
    },
    textInfo: {
        fontSize: 20,
        textAlign: 'center',
        flexWrap: 'wrap',
        color: '#0C5460'
    }
});

export default OrderData