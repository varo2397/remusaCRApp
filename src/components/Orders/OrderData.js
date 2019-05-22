import React from 'react';
import { View, Text, StyleSheet, Linkink, Dimensions } from 'react-native';
const { width } = Dimensions.get('window')
const OrderData = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.text}>{props.info}</Text>
            </View>

            <View style={styles.data}>
                <Text style={styles.text}>{props.data}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
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
        margin: 10
    },
    data: {
        flex:1,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flexDirection: 'row',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        flexWrap: 'wrap',
    }
});

export default OrderData