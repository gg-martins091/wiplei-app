import React, { useState } from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Descubra from '../Descubra';
import Alugueis from '../Alugueis';
import Aluguel from '../AluguelDetalhe';
import EstabelecimentoDetalhe from '../EstabelecimentoDetalhe';
import LogoutHeader from '../../Components/LogoutHeader';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

function Main(props) {
    const [propsState, setPropsState] = useState(props);
    return (
    <Tab.Navigator
      initialRouteName="Descubra"
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#444',
        activeBackgroundColor: '#f4511e',
      }}
    >
        <Tab.Screen 
            name="Descubra"
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="search" size={22} color={color} />
                ),
                tabBarLabel: ({focused, color}) => (
                    <><Text style={{color: color}}>Explorar</Text></>
                )
                //tabBarBadge: 3, 
            }}
        
        >
            {props => <Descubra {...props} user={propsState.user}/>}
        </Tab.Screen>

        <Tab.Screen 
            {...props}
            name="Alugueis"
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="book" size={22} color={color} />
                ),
                tabBarLabel: ({focused, color}) => (
                    <><Text style={{color: color}}>Meus</Text></>
                )
                //tabBarBadge: 3, 
            }}
        >
            {props => <Alugueis {...props} user={propsState.user}/>}
        </Tab.Screen>
      
    </Tab.Navigator>
  );
}


function MainStackComponent(props) {
    const [propsState, setPropsState] = useState(props);
    return (
        <MainStack.Navigator
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
            <MainStack.Screen 
                name="MainTabs"
                options={{
                    title: 'Wiplei',
                    headerRight: () => (
                        <LogoutHeader />
                    )
                }}
            >
                {props => <Main {...props} user={propsState.user}/>}
            </MainStack.Screen>
            
            <MainStack.Screen 
                name="AluguelDetalhe"
                options={{
                    title: 'Wiplei',
                    headerRight: () => (
                        <LogoutHeader />
                    )
                }}
            >
                {props => <Aluguel {...props} user={propsState.user}/>}
            </MainStack.Screen>

            <MainStack.Screen 
                name="EstabelecimentoDetalhe"
                options={{
                    title: 'Wiplei',
                    headerRight: () => (
                        <LogoutHeader />
                    )
                }}
            >
                {props => <EstabelecimentoDetalhe {...props} user={propsState.user}/>}
            </MainStack.Screen>
        </MainStack.Navigator>
    );
}

export default MainStackComponent;