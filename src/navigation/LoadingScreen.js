import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class LoadingScreen extends Component {

    constructor(props) {
        super(props);
        this.checkLoggedInUser();
    }

    checkLoggedInUser = async() => {
        const email = await AsyncStorage.getItem('userID');
        console.log(email)
        this.props.navigation.navigate(email ? 'Orders' : 'Auth');
    }

    render() {
        return (
            <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }
}

export default LoadingScreen;