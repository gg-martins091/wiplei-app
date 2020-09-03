import React, { useState } from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LogoutHeader from '../../Components/LogoutHeader';
import Estabelecimentos from '../Estabelecimentos';
import CampeonatosScreen from '../Campeonatos';

const Tab = createMaterialTopTabNavigator();
const HomeStack = createStackNavigator();

const TabNavigator = (props) => {
    const [propsState, setPropsState] = useState(props); 
    return (
        <Tab.Navigator lazy={true} lazyPlaceholder={() => (<Text>Loading...</Text>)}>
            <Tab.Screen name="Estabelecimentos" children={ props => <Estabelecimentos {...props} user={propsState.user} />} />
            <Tab.Screen name="Campeonatos" children={ props => <CampeonatosScreen {...props} user={propsState.user} />} />
        </Tab.Navigator>
    )
}

const Descubra = (props) => {
    const [propsState, setPropsState] = useState(props); 
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
                name="Tabs"
                options={{
                    title: 'Wiplei',
                    headerRight: () => (
                        <LogoutHeader />
                    )
                }}
            >
                {props => <TabNavigator {...props} user={propsState.user}/>}
            </HomeStack.Screen>
           
        </HomeStack.Navigator>
    );
}

export default Descubra;