import React, {useReducer, useEffect, useMemo} from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './src/Contexts';
import Login from './src/Screens/Login';
import Main from './src/Screens/Main';
import Api from './src/Service';


const Stack = createStackNavigator();

function SplashScreen() {
    return (
        <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color="#f4511e" size={80}></ActivityIndicator>
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
                name: action.name,
                surname: action.surname,
                id: action
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
                name: action.name,
                surname: action.surname,
                id: action
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
                name: action.name,
                surname: action.surname,
                id: action
              };
          }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            name: null,
            surname: null,
            id: null
        }
    );

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let user;
          try {
            user = JSON.parse(await AsyncStorage.getItem('userInfo')) || {};
          } catch (e) {
            // Restoring token failed
          }
    
          // After restoring token, we may need to validate it in production apps
    
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          if (user) {
            
            dispatch({ type: 'RESTORE_TOKEN', token: user.token, id: user.id, name: user.name, surname: user.surname });
          }
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
            
            Api.post('login', {
                email: data.username,
                password: data.password,
            }).then(({data}) => {
                const d = {
                    id: data.user.id,
                    token: data.token,
                    name: data.user.name,
                    surname: data.user.surname
                };
                AsyncStorage.setItem('userInfo', JSON.stringify(d)).then(x => {
                    dispatch({ type: 'SIGN_IN', token: data.token, id: data.user.id, name: data.user.name, surname: data.user.surname });
                });
            }).catch(e => {
                console.log(JSON.stringify(e));
            });
            
          },
          signOut: () => {
            AsyncStorage.removeItem('userInfo');
            dispatch({ type: 'SIGN_OUT' })
          },
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
                <Stack.Screen options={{
                    headerShown: false,
                }} name="Splash" component={SplashScreen} />
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
                    options={{
                        headerShown: false
                    }}
                >
                    {props => <Main {...props} user={{
                        userToken: state.id.token,
                        userId: state.id.id,
                        userName: state.name,
                        userSurname: state.surname}}
                     />}
                </Stack.Screen>

                )}
            </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};
  