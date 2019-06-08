import React, { Component } from 'react';
import { Image, Text, StyleSheet, View, PermissionsAndroid } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
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
        error: '',
        users: []
    };

    componentDidMount() {
        this.checkCameraPermissions();
    }

    checkCameraPermissions = async () => {
        
        const checkCameraPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        if(checkCameraPermission === PermissionsAndroid.RESULTS.GRANTED) {

        }
        else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        'title': 'Cool Location App required Location permission',
                        'message': 'We required Location permission in order to get device location ' +
                            'Please grant us.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    
                } else {
                    alert("You don't have access for the location");
                }
            } catch (err) {
                alert(err)
            }
        }
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

    submitValidation = (users) => {
        const userCorrect = users.filter(value => {
            if (this.state.controls.email.value === value.email &&
                this.state.controls.password.value === value.pass) {
                    return value
                }
        });

        if (userCorrect.length > 0) {
            const userID = ['userID', JSON.stringify(userCorrect[0].id)];
            const ordersDelayed = ['ordersDelayed', JSON.stringify([])];

            AsyncStorage.multiSet([userID, ordersDelayed])
            .then(() => this.props.navigation.navigate('Orders'))
            .catch(err => console.log(err));
            
        }
        else {
            this.setState({ error: 'Correo eléctronico o contraseña incorrectos' })
        }
    }

    getAllUsers = () => {
        axios.get('http://remusacr.com/gestion/app/usuarios.php').then(response => {
            this.submitValidation(response.data);
        })
    }

    loginHandler = () => {
        if (this.state.controls.email.touched
            && this.state.controls.email.value !== ''
            && this.state.controls.password.touched
            && this.state.controls.password.value !== '') {
            this.setState({ error: '' });
            this.getAllUsers();
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