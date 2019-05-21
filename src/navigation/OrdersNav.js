import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Orders from '../screens/Orders/Orders';
import Order from '../screens/Orders/Order';
import EditOrder from '../screens/Orders/EditOrder';
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
            screen: EditOrder
        }
    },
    {
        initialRouteName: 'Orders',
        headerMode: 'screen',
    }
);

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
    }
)

export default drawer;

