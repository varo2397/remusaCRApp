import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator, createStackNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import Orders from '../screens/Orders/Orders';
import Order from '../screens/Orders/Order';
import OrderReport from '../screens/Orders/OrderReport';
import Logout from '../screens/Auth/Logout';

const OrdersStack = createStackNavigator(
    {
        Orders: {
            screen: Orders
        },
        Order: {
            screen: Order
        },
        EditOrder: {
            screen: OrderReport
        }
    },
    {
        initialRouteName: 'Orders',
        headerMode: 'screen',
    }
);

const DrawerContent = (props) => {
    return (
        <ScrollView>
            <SafeAreaView style={{flex:1}} >
                <Image source={require('../../assets/remusa-01.png')} style={{width: '100%', height: 100, resizeMode: 'contain'}}/>
                <DrawerItems {...props}/>
            </SafeAreaView>
        </ScrollView>
    );
}

const drawer = createDrawerNavigator(
    {
        'Ordenes': {
            screen: OrdersStack,
            navigationOptions: {
                drawerIcon: (
                    <Icon name={'assignment'} size={24} />
                )
            }

        },
        'Cerrar Sesion': {
            screen: Logout,
            navigationOptions: {
                drawerIcon: (
                    <Icon name={'exit-to-app'} size={24} />
                )
            }
        }
    },
    {
        contentComponent: DrawerContent
    }
)

export default drawer;

