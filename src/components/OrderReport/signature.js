import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions } from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

import DefaultButton from '../UI/DefaultButton';

const { width, height } = Dimensions.get('window');
class Signature extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const text = this.props.text;

        return (
            <Modal
                visible={this.props.visible}
            >
                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <RNSketchCanvas
                            containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                            canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                            defaultStrokeIndex={0}
                            defaultStrokeWidth={5}
                            closeComponent={<DefaultButton type={'danger'} title={'Cancelar'} onPress={() => this.props.close()} />}
                            clearComponent={
                                <View style={[styles.button, { backgroundColor: '#ffc107', borderColor: '#ffc107' }]}>
                                    <Text style={styles.text} > Limpiar </Text>
                                </View>}

                            strokeSelectedComponent={(color, index, changed) => {
                                return (
                                    <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
                                )
                            }}
                            onSketchSaved={(result, path) => this.props.onSave(path)}

                            saveComponent={
                                <View style={[styles.button, { backgroundColor: '#007bff', borderColor: '#007bff' }]}>
                                    <Text style={styles.text} > Guardar </Text>
                                </View>}
                            savePreference={() => {
                                return {
                                    folder: 'REMUSA',
                                    filename: String(Math.ceil(Math.random() * 100000000)),
                                    transparent: false,
                                    imageType: 'png',
                                    includeText: true
                                }
                            }}
                            text={[
                                {
                                    text: text,
                                    position: {x: 300, y: 400},
                                    overlay: 'TextOnSketch',
                                    fontSize: 60,
                                    coordinate: "Absolute",
                                    alignment: 'Center'
                                }
                            ]}
                        />
                    </View>
                </View>

            </Modal>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
    },
    strokeColorButton: {
        marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    },
    strokeWidthButton: {
        marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
        justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
    },
    functionButton: {
        marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
        backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
    },
    button: {
        width: '90%',
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    text: {
        color: 'white',
        fontSize: 20

    }
});

export default Signature