import React, { Component } from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput';
import DefaultButton from '../../components/UI/DefaultButton';

class Login extends Component {

    state = {
        controls: {
            email: {
                valid: false,
                value: ''
            },
            password: {
                valid: false,
                value: ''
            }
        }
    };

    render() {
        return (
            <View style={styles.container} >
                <Text>Remusa</Text>
                <DefaultInput
                    placeholder={'Correo electronico'}
                />
                <DefaultInput
                    placeholder={'Contraseña'}
                    secureTextEntry
                />
                <DefaultButton type={'primary'} title={'Iniciar sesión'}/>
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

export default Login