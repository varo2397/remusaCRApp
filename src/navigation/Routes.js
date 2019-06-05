import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNav from './AuthNav';
import Drawer from './OrdersNav';
import LoadingScreen from './LoadingScreen';

const Routes = createSwitchNavigator(
    {
        LoadingScreen: LoadingScreen,
        Auth: AuthNav,
        Orders: Drawer
    },
    {
        initialRouteName: 'LoadingScreen'
    }
)


const App = createAppContainer(Routes);

export default App;