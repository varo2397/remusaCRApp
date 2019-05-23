import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const orderDescription = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Descripción del trabajo</Text>
            <Text style={styles.text}>{props.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 20
    }
});

export default orderDescription;