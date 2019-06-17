import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';
import Axios from 'axios';

const sendOrders = async () => {
    const internetConnection = await NetInfo.fetch();
    if (internetConnection.isConnected && (internetConnection.type === 'wifi' || internetConnection.type === 'cellular')) { 
        const ordersDelayed = await JSON.parse(await AsyncStorage.getItem('ordersDelayed'));
        if (ordersDelayed) {
            const ordersToBeSent = ordersDelayed.filter((order) => 'firma' in order );
            for(let i = 0; i < ordersToBeSent.length; i++) {
                await sendOrder(ordersToBeSent[i]);
            }
        }
    }

}

const sendOrder = async (orderData) => {
    // get base64 images from route
    const beforePhoto1 = await RNFS.readFile(orderData.antes.foto1, 'base64');
    const afterPhoto1 = await RNFS.readFile(orderData.despues.foto1, 'base64');
    const signature = await RNFS.readFile(orderData.firma.foto_firma, 'base64');

    // assign base64 image to order to be sent
    orderData.antes.foto1 = 'data:image/png;base64,' + beforePhoto1;
    orderData.despues.foto1 = 'data:image/png;base64,' +  afterPhoto1;
    orderData.firma.foto_firma = 'data:image/png;base64,' +  signature;
    

    Axios.post('http://remusacr.com/gestion/app/procesar.php', orderData, {
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {

        AsyncStorage.getItem('ordersDelayed').then((ordersDelayed) => {
            const parsedOrders = JSON.parse(ordersDelayed);
            const ordersFiltered =  parsedOrders.filter((order) => order.orden !== orderData.orden);
            AsyncStorage.setItem('ordersDelayed', JSON.stringify(ordersFiltered)).then(response => {});
        });

    }).catch((err) => {
        // this.props.navigation.goBack();
    });
}

export default sendOrders;