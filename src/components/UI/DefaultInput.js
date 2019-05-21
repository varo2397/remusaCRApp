import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = props => (
    <TextInput
        underlineColorAndroid="transparent"
        {...props}
        placeholderTextColor={'#383838'}
        style={[styles.input]}
    />
);

const styles = StyleSheet.create({
    input: {
        width: '90%',
        borderWidth: 2,
        borderColor: 'silver',
        margin: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
    }
});


export default defaultInput;