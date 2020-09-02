import React from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LogoutHeader from '../../Components/LogoutHeader';

import Estabelecimentos from '../Estabelecimentos';
import EstabelecimentoDetalhe from '../EstabelecimentoDetalhe';
import CampeonatosScreen from '../Campeonatos';

const Tab = createMaterialTopTabNavigator();
const HomeStack = createStackNavigator();

const TabNavigator = (props) => {
    return (
        <Tab.Navigator lazy={true} lazyPlaceholder={() => (<Text>Loading...</Text>)}>
            <Tab.Screen {...props} name="Estabelecimentos" component={Estabelecimentos} />
            <Tab.Screen {...props} name="Campeonatos" component={CampeonatosScreen} />
        </Tab.Navigator>
    )
}

const Descubra = (props) => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    paddingRight: 50,
                },
            }}
        >
            <HomeStack.Screen 
                {...props}
                name="Tabs"
                component={TabNavigator} 
                options={{
                    title: 'Wiplei',
                    headerRight: () => (
                        <LogoutHeader />
                    )
                }}
            />
           
        </HomeStack.Navigator>
    );
}

export default Descubra;