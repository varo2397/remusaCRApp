import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import Moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import DefaultButton from '../UI/DefaultButton';
import DefaulInput from '../UI/DefaultInput';
import Signature from './signature';

class Report extends Component {

    state = {
        image: null,
        comment: '',
        date: Moment(new Date()).format("YYYY-MM-DD h:mm:ss"),
        signature: false
    }

    pickPhotoHandler = () => {
        ImagePicker.showImagePicker(
            {
                title: 'Foto previa',
                mediaType: 'photo',
                chooseFromLibraryButtonTitle: 'Seleccionar de galeria',
                takePhotoButtonTitle: 'Tomar una foto',
                cancelButtonTitle: 'Cancelar'
            }, response => {
                if (response.didCancel) {
                    console.log('cancelo');
                }
                else if (response.error) {
                    console.log('error');
                }
                else {
                    this.setState({ image: { uri: response.uri } })
                }
            });
    }

    openModal = () => {
        this.setState({signature: true});
    }

    closeModal = () => {
        this.setState({signature: false});
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.text}>Fecha: {this.state.date}</Text>

                <DefaulInput multiline={true} placeholder={'Comentario'} />

                <View style={styles.imageContainer}>
                    <Image source={this.state.image} style={{ width: '100%', height: 200, borderRadius: 10, padding: 0, margin: 0 }} />
                </View>

                <DefaultButton onPress={this.pickPhotoHandler} title={'Escoger foto del trabajo'} type={'success'} />

                <Signature close={this.closeModal} visible={this.state.signature}/>

                <DefaultButton onPress={this.openModal} title={'Guardar reporte'} type={'primary'} />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 20,
        margin: 10
    },
    imageContainer: {
        borderColor: 'silver',
        borderWidth: 2,
        borderRadius: 10,
        width: '90%',
        height: 200,
        margin: 10
    }
});

export default Report