import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNav from './AuthNav';

const Routes = createSwitchNavigator(
    {
        Auth: AuthNav
    },
    {
        initialRouteName: 'Auth'
    }
)


const App = createAppContainer(Routes);

export default App;