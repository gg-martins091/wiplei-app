import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Descubra from '../Descubra';
import Alugueis from '../Alugueis';

const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#f4511e',
        inactiveTintColor: '#666',
      }}
    >
        <Tab.Screen 
            name="Descubra"
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="search" size={35} color={color} />
                ),
                tabBarLabel: ({focused, color}) => (
                    <><Text style={{color: '#666'}}>Descubra</Text></>
                )
                //tabBarBadge: 3, 
            }}
            component={Descubra} 
        />

        <Tab.Screen 
            name="Alugueis"
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="book" size={35} color={color} />
                ),
                tabBarLabel: ({focused, color}) => (
                    <><Text style={{color: '#666'}}>Meus</Text></>
                )
                //tabBarBadge: 3, 
            }}
            component={Alugueis}
        />
      
    </Tab.Navigator>
  );
}

export default Main;