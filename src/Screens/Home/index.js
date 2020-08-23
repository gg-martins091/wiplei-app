import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';

import EstabelecimentosScreen from '../Estabelecimentos';
import CampeonatosScreen from '../Campeonatos';

// import { Container } from './styles';
import { AuthContext } from '../../Contexts';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


const Home = () => {
    return (
        <Tab.Navigator lazy={true} lazyPlaceholder={() => (<Text>Loading...</Text>)}>
            <Tab.Screen name="Estabelecimentos" component={EstabelecimentosScreen} />
            <Tab.Screen name="Campeonatos" component={CampeonatosScreen} />
        </Tab.Navigator>
    );
}

export default Home;