import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Row from '../../components/Orders/row';
import Header from '../../components/Orders/header';

class Order extends Component {
    state = {
        orders: [
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
            { ID: 0, client: 'VETRASA(ZAPOTE)', dueDate: '2019-05-20' },
        ],
        isReady: true
    };

    componentDidMount() {
        this.setState({isReady: true});
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Ordenes',
            headerLeft: ({ tintColor }) => (
                <Icon name="menu" style={{marginLeft: 10}} size={40} onPress={() => navigation.openDrawer()} />
            ),
        };
    }

    onPressHandler = (index) => {
        this.props.navigation.navigate('Order', { orderID: this.state.orders[index].ID })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isReady ?
                    <FlatList
                        ListHeaderComponent={(<Header/>)}
                        data={this.state.orders}
                        renderItem={({ item, index }) => <Row onPress={this.onPressHandler} index={index} ID={item.ID} client={item.client} dueDate={item.dueDate}/>}
                        keyExtractor={(item, index) => index.toString() }
                        style={{ width: '100%' }}
                    /> : null
                }


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
        flex: 1
    }
});

export default Order;


