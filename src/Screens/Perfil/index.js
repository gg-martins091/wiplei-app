import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    ScrollContainer,
} from './styles';
import Api from '../../Service';
import { format } from 'date-fns';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tabs = createMaterialTopTabNavigator();

const Perfil = (props) => {
    let [info, setInfo] = useState();
    let [name, setName] = useState('');
    let [surname, setSurname] = useState('');
    let [password, setPassword] = useState('');

    async function getInfo() {
        const data = await Api.get('/users');
        setInfo(data.data || null);
        setName(data.data.name);
        setSurname(data.data.surname);

    }

    useEffect(() => {
        getInfo();
    }, []);

    const w = (Dimensions.get('window').width / 2) - 20;

    if (!info) {
        return (
            <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="#f4511e" size={80}></ActivityIndicator>
            </View>
        );
    } else {
        return (
            <ScrollContainer contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
            }}>
                <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 10
                }}>
                    <Image style={{
                        width: 150,
                        height: 150
                    }} source={require('../../../assets/profile.png')} />
                    <Text>{info.name} {info.surname}</Text>
                    <Text style={{
                        color: '#999',
                        marginTop: 5,
                        marginBottom: 10
                    }}>{info.email}</Text>
                </View>
                 <View 
                    style={{
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        paddingLeft: 30,
                        marginTop: 10
                    }}
                >
                    <TextInput
                        style={{
                            height: 50,
                        }}
                        backgroundColor="#fff"
                        placeholder="Nome"
                        value={name}
                        onChangeText={setName}
                    />
                    <Icon 
                    style={{
                        position: 'absolute',
                        left: 5
                    }} 
                    name="account" size={20} />
                </View>
                <View 
                    style={{
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        paddingLeft: 30,
                        marginTop: 10
                    }}
                >
                    <TextInput
                        style={{
                            height: 50,
                        }}
                        backgroundColor="#fff"
                        placeholder="Sobrenome"
                        value={surname}
                        onChangeText={setSurname}
                    />
                    <Icon 
                    style={{
                        position: 'absolute',
                        left: 5
                    }} 
                    name="account" size={20} />
                </View>
                <View 
                    style={{
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        paddingLeft: 30,
                        marginTop: 10
                    }}
                >
                    <TextInput
                        secureTextEntry={true}
                        style={{
                            height: 50,
                        }}
                        backgroundColor="#fff"
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Icon 
                    style={{
                        position: 'absolute',
                        left: 5
                    }} 
                    name="lock" size={20} />
                </View>
            </ScrollContainer>
        );
    }
}

function TabsComponent(props) {
    const [propsState, setPropsState] = useState(props);
    return (
        <Tabs.Navigator lazy={true} lazyPlaceholder={() => (<Text>Loading...</Text>)}>
            <Tabs.Screen 
                name="Perfil"
                options={{
                    title: 'Perfil'
                }}
                children={ props => <Perfil {...props} user={propsState.user} />} />
            {
            /*<Tabs.Screen 
                name="Amigos"
                options={{
                    title: 'Convites'
                }}
                children={ props => <Amigos isInvite={true} {...props} user={propsState.user} />} />
            */
            }
        </Tabs.Navigator>
    );
}

export default TabsComponent;