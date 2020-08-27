import React, {useReducer, useEffect, useMemo, useContext} from 'react';
import { View, Text, Button } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import { AuthContext } from './src/Contexts';
import Login from './src/Screens/Login';
import Main from './src/Screens/Main';

import LogoutHeader from './src/Components/LogoutHeader';

const Stack = createStackNavigator();

function SplashScreen() {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

export default function App({ navigation }) {
    let isLoggedIn = false;

    const [state, dispatch] = useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
        }
    );

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;
    
          try {
            userToken = await AsyncStorage.getItem('userToken');
          } catch (e) {
            // Restoring token failed
          }
    
          // After restoring token, we may need to validate it in production apps
    
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
    
        bootstrapAsync();
    }, []);

    const authContext = useMemo(
        () => ({
          signIn: async data => {
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token
    
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          },
          signOut: () => dispatch({ type: 'SIGN_OUT' }),
          signUp: async data => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token
    
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          },
        }), 
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
            <Stack.Navigator>
                {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen name="Splash" component={SplashScreen} />
                ) : state.userToken == null ? (
                // No token found, user isn't signed in
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                        animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                    }}
                />
                ) : (
                // User is signed in
                <Stack.Screen 
                    name="Main"
                    component={Main} 
                    options={{
                        headerShown: false
                    }}
                />
                )}
            </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};
  