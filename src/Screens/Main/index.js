import React from 'react';
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


function Main() {
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
            component={Descubra} 
        />

        <Tab.Screen 
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
            component={Alugueis}
        />
      
    </Tab.Navigator>
  );
}


function MainStackComponent() {
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
                component={Main} 
                options={{
                    title: 'Wiplei',
                    headerRight: () => (
                        <LogoutHeader />
                    )
                }}
            />
            <MainStack.Screen 
                name="AluguelDetalhe"
                component={Aluguel} 
                options={{
                    title: 'Wiplei',
                    headerRight: () => (
                        <LogoutHeader />
                    )
                }}
            />
             <MainStack.Screen 
                name="EstabelecimentoDetalhe"
                component={EstabelecimentoDetalhe} 
                options={{
                    title: 'Wiplei',
                    headerRight: () => (
                        <LogoutHeader />
                    )
                }}
            />
        </MainStack.Navigator>
    );
}

export default MainStackComponent;