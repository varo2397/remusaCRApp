import React, { Component } from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput';
import DefaultButton from '../../components/UI/DefaultButton';

class Login extends Component {

    state = {
        controls: {
            email: {
                value: '',
                touched: false
            },
            password: {
                value: '',
                touched: false
            }
        },
        error: ''
    };

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

    loginHandler = () => {
        if (this.state.controls.email.touched
            && this.state.controls.email.value !== ''
            && this.state.controls.password.touched
            && this.state.controls.password.value !== '') {
            this.setState({ error: '' });
            this.props.navigation.navigate('Orders');
        }
        else {
            this.setState({ error: 'No has ingresado la contraseña o el correo electronico' })
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Image source={require('../../../assets/remusa-01.png')} style={{resizeMode: 'contain', width: '80%', height: '30%'}} />
                <DefaultInput
                    placeholder={'Correo electronico'}
                    onChangeText={(value) => this.updateInputState('email', value)}
                />
                <DefaultInput
                    placeholder={'Contraseña'}
                    secureTextEntry
                    onChangeText={(value) => this.updateInputState('password', value)}
                />
                <DefaultButton onPress={this.loginHandler} type={'success'} title={'Iniciar sesión'} />
                <Text style={styles.textError}>{this.state.error}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textError: {
        color: 'red',
        fontSize: 15,
        textAlign: 'center'
    }
});

export default Login