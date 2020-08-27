import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Descubra from '../Descubra';

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
        component={Descubra} />
      
    </Tab.Navigator>
  );
}

export default Main;