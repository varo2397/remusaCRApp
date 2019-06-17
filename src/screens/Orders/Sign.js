import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';
import Axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import DefaultButton from '../../components/UI/DefaultButton';
import Loading from '../../components/UI/Loading';
import DefaultInput from '../../components/UI/DefaultInput';
import Signature from '../../components/OrderReport/signature';
import { NavigationActions } from 'react-navigation';


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
        error: '',
        isLoading: false
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

    savedSignature = async (path) => {

        this.setState({ signed: true, showSignature: false, isLoading: true });

        const orderData = {
            foto_firma: path,
            estado: 0
        }

        const ordersDelayed = JSON.parse(await AsyncStorage.getItem('ordersDelayed'));

        const orderID = this.props.navigation.getParam('orderID', 0);
        let currentOrder = {};

        let i = 0;
        for (i; i < ordersDelayed.length; i++) {
            if (ordersDelayed[i].orden === orderID) {
                currentOrder = ordersDelayed[i];
                break;
            }
        }
        currentOrder['firma'] = orderData;


        const value = await AsyncStorage.setItem('ordersDelayed', JSON.stringify(ordersDelayed));
        await this.sendOrderReport(currentOrder);


    }

    sendOrderReport = async (orderData) => {
        this.setState({ isLoading: true });
        const internetConnection = await NetInfo.fetch();

        // check if the user has internet available       
        if (internetConnection.isConnected && (internetConnection.type === 'wifi' || internetConnection.type === 'cellular')) {
            // get base64 images from route
            const beforePhoto1 = await RNFS.readFile(orderData.antes.foto1, 'base64');
            const afterPhoto1 = await RNFS.readFile(orderData.despues.foto1, 'base64');
            const signature = await RNFS.readFile(orderData.firma.foto_firma, 'base64');

            // assign base64 image to order to be sent
            orderData.antes.foto1 = 'data:image/png;base64,' + beforePhoto1;
            orderData.despues.foto1 = 'data:image/png;base64,' +  afterPhoto1;
            orderData.firma.foto_firma = 'data:image/png;base64,' +  signature;
            

            Axios.post('http://remusacr.com/gestion/app/procesar.php', orderData, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((response) => {
                this.setState({ isLoading: false });
                const orderID = this.props.navigation.getParam('orderID', 0);

                AsyncStorage.getItem('ordersDelayed').then((ordersDelayed) => {
                    const parsedOrders = JSON.parse(ordersDelayed);
                    const ordersFiltered =  parsedOrders.filter((order) => order.orden !== orderID);
                    AsyncStorage.setItem('ordersDelayed', JSON.stringify(ordersFiltered)).then(response => {
                        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Orders' })], 0);
                    });
                });

            }).catch((err) => {
                this.setState({ isLoading: false });
                this.props.navigation.goBack();
            });
        }
        else {
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Orders' })], 0);
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

    render() {
        return (
            <View style={styles.container}>
                <Loading visible={this.state.isLoading}/>
                <Signature text={this.state.controls.name.value + '\n' + this.state.controls.id.value} onSave={this.savedSignature} close={this.closeModal} visible={this.state.showSignature} />

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