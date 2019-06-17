import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';
import Moment from 'moment';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-picker';
import DefaultButton from '../UI/DefaultButton';
import DefaulInput from '../UI/DefaultInput';

class Report extends Component {

    state = {
        image: null,
        comment: '',
        date: Moment(new Date()).format("YYYY-MM-DD h:mm:ss"),
        base64Image: null
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
                }
                else if (response.error) {
                }
                else {
                    this.setState({ image: { uri: response.uri }, base64Image: response.data })
                }
            });
    }

    saveReport = () => {
        if (this.state.base64Image !== null && this.state.comment !== '') {
            const filename = String(Math.ceil(Math.random() * 100000000)) + '.png';
            const path = '/storage/emulated/0/Pictures/REMUSA/';
            RNFS.writeFile(path + filename, this.state.base64Image, 'base64').then((response) => {
                if (this.props.type === 'antes') {
                    const report = {
                        fecha_solucion: this.state.date,
                        solucion: this.state.comment,
                        foto1: path + filename,
                        foto2: null
                    };
                    this.props.onSave(report);
                }
                else {
                    const report = {
                        fecha_solucion_fin: this.state.date,
                        comentario_adicional: this.state.comment,
                        foto1: path + filename,
                        foto2: null
                    };
                    this.props.onSave(report);
                }
                
            })
            
        }
    }

    updateInputState = (value) => {
        this.setState({ comment: value });
    }


    render() {

        return (
            <View style={styles.container}>

                <Text style={styles.text}>Fecha: {this.state.date}</Text>

                <DefaulInput onChangeText={(value) => this.updateInputState(value)} multiline={true} placeholder={'Comentario'} />

                <View style={styles.imageContainer}>
                    <Image source={this.state.image} style={{ width: '100%', height: 200, borderRadius: 10, padding: 0, margin: 0 }} />
                </View>

                <DefaultButton onPress={this.pickPhotoHandler} title={'Escoger foto del trabajo'} type={'success'} />

                <DefaultButton onPress={this.saveReport} title={'Guardar información de ' + this.props.type} type={'primary'} />

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