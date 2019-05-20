import { createStackNavigator } from 'react-navigation';

import Login from '../screens/Auth/Login';

const AuthNavigator = createStackNavigator(
    {
        Login: {
            screen: Login
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }

);

export default AuthNavigator;