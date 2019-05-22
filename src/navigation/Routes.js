import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNav from './AuthNav';
import Drawer from './OrdersNav';

const Routes = createSwitchNavigator(
    {
        Auth: AuthNav,
        Orders: Drawer
    },
    {
        initialRouteName: 'Orders'
    }
)


const App = createAppContainer(Routes);

export default App;