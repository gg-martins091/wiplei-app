import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, KeyboardAvoidingView, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    AmigosContainer,
} from './styles';
import Api from '../../Service';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';

const Tabs = createMaterialTopTabNavigator();

const Perfil = (props) => {
    const [info, setInfo] = useState();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [loading, setLoading] = useState(false);

    async function getInfo() {
        const data = await Api.get('/users');
        setInfo(data.data || null);
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
            <KeyboardAvoidingView
                behavior={'position'}
                enabled
                style={{
                    backgroundColor: '#eee',
                    height: '100%',
                    alignItems: 'center',
                }}
            >
            
                <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 10,
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
                        secureTextEntry={true}
                        style={{
                            height: 50,
                        }}
                        backgroundColor="#fff"
                        placeholder="Senha Atual"
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
                <View 
                    style={{
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        paddingLeft: 30,
                        marginTop: 10,
                    }}
                >
                    <TextInput
                        secureTextEntry={true}
                        style={{
                            height: 50,
                        }}
                        backgroundColor="#fff"
                        placeholder="Nova Senha"
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <Icon 
                    style={{
                        position: 'absolute',
                        left: 5
                    }} 
                    name="lock" size={20} />
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
                        placeholder="Cofirme a nova senha"
                        value={newPasswordConfirm}
                        onChangeText={setNewPasswordConfirm}
                    />
                    <Icon 
                    style={{
                        position: 'absolute',
                        left: 5
                    }} 
                    name="lock" size={20} />
                </View>
                <TouchableOpacity style={{
                    backgroundColor: '#f4511e',
                    borderRadius: 5,
                    padding: 15,
                    marginTop: 25,
                    alignSelf: 'center'
                }}
                    onPress={() => {
                        if (password && newPassword && newPasswordConfirm && newPassword == newPasswordConfirm) {
                            setLoading(true);
                            Api.put('users', {
                                oldPassword: password,
                                password: newPassword,
                                confirmPassword: newPasswordConfirm
                            }).then(d => {
                                console.log(d);
                                setLoading(false);
                            }).catch(e => {
                                console.log(e);
                                Toast.show(e.response.data.error, {
                                    duration: Toast.durations.SHORT,
                                    position: Toast.positions.BOTTOM,
                                    shadow: true,
                                    animation: true,
                                    hideOnPress: true,
                                });
                                setLoading(false);
                            })
                        } else {
                            Toast.show('Verifique os campos.', {
                                duration: Toast.durations.SHORT,
                                position: Toast.positions.BOTTOM,
                                shadow: true,
                                animation: true,
                                hideOnPress: true,
                            });
                        }
                    }}
                >
                    {!loading &&
                        <Text style={{
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: 16
                        }}>Atualizar senha</Text>
                    }

                    {loading &&
                        <ActivityIndicator color="#fff" size={30}></ActivityIndicator>
                    }
                </TouchableOpacity>
        </KeyboardAvoidingView>
        );
    }
}

function Amigos(props) {
    const [amigos, setAmigos] = useState();

    useEffect(() => {
        async function getAmigos() {
            const data = await Api.get('/user-friend/friends');
            setAmigos(data.data || []);
        }
        getAmigos();
    }, []);

    return (
        <>
            {!amigos &&
                <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator color="#f4511e" size={30}></ActivityIndicator>
                    <Text>Resgatando sua lista de amigos...</Text>
                </View>
            }

            {amigos && amigos.length == 0 &&
                <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{
                        textAlign: 'center',
                        marginTop: 30
                    }}>Você ainda não tem amigos.</Text>
                </View>
            }

            {amigos && amigos.length > 0 &&
                <AmigosContainer {...props}>
                    {amigos.map((v,i) => (
                        <View key ={i} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            padding: 10,
                            marginBottom: 10 
                        }}>
                            <Text>{v.name} {v.surname}</Text>
                        </View>
                    ))
                    }
                </AmigosContainer>    
            }
        </>
    );
}

function Encontre(props) {
    const [input, setInput] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        async function getUsuarios() {
            const d = Api.get('/user-friend/users');
            setUsuarios(d.data);
        }
        getUsuarios();
    }, []);

    return (
        <View>
            <Text>
                Teste
            </Text>
        </View>
    );
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
            <Tabs.Screen 
                name="Amigos"
                options={{
                    title: 'Amizades'
                }}
                children={ props => <Amigos isInvite={true} {...props} user={propsState.user} />} />

            <Tabs.Screen 
                name="EncontrarPessoas"
                options={{
                    title: 'Encontre Amigos'
                }}
                children={ props => <Encontre isInvite={true} {...props} user={propsState.user} />} />
        </Tabs.Navigator>
    );
}

export default TabsComponent;