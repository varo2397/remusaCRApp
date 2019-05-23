import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PickImage