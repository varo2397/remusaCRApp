import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Text } from 'react-native';

const defaultButton = (props) => {
    let buttonTypeColor = null;
    switch (props.type) {
        case 'primary': 
            buttonTypeColor = '#007bff';
            break;
        case 'success': 
            buttonTypeColor = '#28a745';
            break;
        case 'danger': 
            buttonTypeColor = '#dc3545';
            break;
        case 'warning': 
            buttonTypeColor = '#ffc107';
            break;
        case 'info': 
            buttonTypeColor = '#17a2b8';
            break;
        default: 
            buttonTypeColor = '#868e96'
    }

    return (
        <TouchableNativeFeedback >
            <View style={[styles.button, {backgroundColor: buttonTypeColor, borderColor: buttonTypeColor}]}>
                <Text style={styles.text} > {props.title} </Text>
            </View>
            
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20
        
    }
});

export default defaultButton;