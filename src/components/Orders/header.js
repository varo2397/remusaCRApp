import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> {'Número \n  de orden'}</Text>
            <Text style={styles.text}>Cliente</Text>
            <Text style={styles.text}>{'Fecha \n limite'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 4
    },
    text: {
        fontSize: 15,
        textAlign: 'center'
    }
});

export default header;