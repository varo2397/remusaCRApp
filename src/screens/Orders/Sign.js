import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from'react-native';
import RNFS from 'react-native-fs';

import DefaultButton from '../../components/UI/DefaultButton';
import DefaultInput from '../../components/UI/DefaultInput';
import Signature from '../../components/OrderReport/signature';

class Sign extends Component {

    state = {
        signature: false
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Orden #' + navigation.getParam('orderID', 0)
        };
    }

    openModal = () => {
        this.setState({signature: true});
    }

    closeModal = () => {
        this.setState({signature: false});
    }

    savedSignature = (path) => {
        RNFS.readFile(path, 'base64').then(response => {
            console.log(response);
        })
    }

    render() {
        return (
            <View>
                <Signature onSave={this.savedSignature} close={this.closeModal} visible={this.state.signature}/>

                <DefaultButton onPress={this.openModal} title={'Guardar firma'} type={'primary'} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default Sign;