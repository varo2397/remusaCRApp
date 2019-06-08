import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';

import DefaultButton from '../../components/UI/DefaultButton';
import DefaultInput from '../../components/UI/DefaultInput';
import Signature from '../../components/OrderReport/signature';

class Sign extends Component {

    state = {
        showSignature: false,
        controls: {
            name: {
                value: '',
                touched: false
            },
            id: {
                value: '',
                touched: false
            }
        },
        signed: false,
        error: ''
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Orden #' + navigation.getParam('orderID', 0)
        };
    }

    openModal = () => {
        if (this.state.controls.name.touched
            && this.state.controls.name.value !== ''
            && this.state.controls.id.touched
            && this.state.controls.id.value !== '') {
            this.setState({ showSignature: true, error: '' });
        }
        else {
            this.setState({ error: 'Tienes que ingresar la cédula y el nombre de la persona que va a firmar' })
        }
    }

    closeModal = () => {
        this.setState({ showSignature: false });
    }

    savedSignature = (path) => {
        this.setState({ signed: true, showSignature: false })
        RNFS.readFile(path, 'base64').then(response => {
            console.log(response);
        })
    }

    updateInputState = (key, value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        touched: true
                    }
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Signature text={this.state.controls.name.value + ' ' + this.state.controls.id.value} onSave={this.savedSignature} close={this.closeModal} visible={this.state.showSignature} />

                <DefaultInput editable={!this.state.signed} placeholder={'Nombre'} onChangeText={(value) => this.updateInputState('name', value)} />
                <DefaultInput keyboardType={'numeric'} editable={!this.state.signed} placeholder={'Número de cédula'} onChangeText={(value) => this.updateInputState('id', value)} />

                <DefaultButton onPress={this.openModal} title={'Guardar firma'} type={'primary'} />
                <Text style={styles.textError}>{this.state.error}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textError: {
        color: 'red',
        fontSize: 15,
        textAlign: 'center'
    }
});

export default Sign;