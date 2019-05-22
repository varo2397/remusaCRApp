import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

const row = (props) => {
    return (
        <TouchableNativeFeedback onPress={()=> props.onPress(props.index)}>
            <View style={styles.container}>
                <Text style={styles.text}>{props.ID}</Text>
                <Text style={styles.text}>{props.client}</Text>
                <Text style={styles.text}>{props.dueDate}</Text>
            </View>
        </TouchableNativeFeedback>

    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 4,
        borderRadius: 5
    },
    text: {
        fontSize: 15,
    }
});

export default row;