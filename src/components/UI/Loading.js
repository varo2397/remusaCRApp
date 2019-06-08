import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import Spinner from 'react-native-spinkit';

const loading = (props) => {
    return (
        <Modal
            visible={props.visible}
            transparent={true}
            onRequestClose={()=>{}}
        >
            <View style={styles.container}>
                <Spinner isVisible={true} size={150} type={'Circle'} color={'#007bff'} />

            </View>
        </Modal>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
        width: '80%',
        height: '60%',
        borderColor: 'white',
        borderWidth: 2
    }
});

export default loading;