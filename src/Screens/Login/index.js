import React, { useState, useContext, useEffect } from 'react';
import { Image, View, KeyboardAvoidingView, ActivityIndicator, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../Contexts';
import Toast from 'react-native-root-toast';

const Login = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useContext(AuthContext);
    
    return (
        <>
        <KeyboardAvoidingView
            behavior={'padding'}
            enabled
            style={{
                backgroundColor: '#eee',
                height: '100%',
                alignItems: 'center',
                paddingTop: 100
            }}
        >
            <View style={{
                flex: 1,
                alignSelf: 'center',
                alignItems: 'center',
                width: '100%'
            }}>

                <Image style={{width: 250, height: 100, marginBottom: 45}} resizeMode="contain" source={require('../../../assets/logo.png')} />
                <View 
                    style={{
                        justifyContent: 'center',
                        width: '90%',
                        backgroundColor: '#fff',
                        paddingLeft: 30
                    }}
                >
                    <TextInput
                        style={{
                            height: 50,
                        }}
                        backgroundColor= '#fff'
                        placeholder="Usuário"
                        autoCompleteType="email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <Icon 
                    style={{
                        position: 'absolute',
                        left: 5
                    }} 
                    name="email-outline" size={20} />
                </View>
                
                <View 
                    style={{
                        justifyContent: 'center',
                        width: '90%',
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
                
                <TouchableOpacity 
                    disabled={username.length == 0 || password.length == 0}
                    onPress={() => {
                        if (username.length > 0 && password.length > 0) {
                            setLoading(true);
                            signIn({ username: username.toLowerCase(), password }).then(d => {
                                setLoading(false);
                            }).catch(e => {
                                setLoading(false);
                                Toast.show(e, {
                                    duration: Toast.durations.SHORT,
                                    position: Toast.positions.BOTTOM,
                                    shadow: true,
                                    animation: true,
                                    hideOnPress: true,
                                });
                            });
                        }
                    }} 
                    color="#fff"
                    style={{
                        backgroundColor: (username.length == 0 || password.length == 0) ? "#ccc" : "#f4511e",
                        width: '80%',
                        borderRadius: 30,
                        padding: 15,
                        height: 50,
                        alignItems: 'center',
                        marginTop: 50
                    }}
                >  
                    {!loading && 
                        <Text style={{fontSize: 16, color: "#fff"}}>Login</Text>
                    }

                    {loading &&
                        <ActivityIndicator color="#fff" size={30}></ActivityIndicator>
                    }
                </TouchableOpacity>
                    
                <TouchableOpacity style={{
                    marginTop: 30
                }}
                onPress={() => navigation.push('Cadastro')}
                >
                    <Text style={{
                        color: '#555'
                    }}>Registre-se</Text>
                </TouchableOpacity>

                <View style={{
                    display: 'flex',
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <Text style={{
                        width: '90%',
                        textAlign: 'center',
                        color: "#aaa",
                    }}>
                        Ao prosseguir você concorda com os Termos de Serviços e Políticas de Privacidade.
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
        </>
    );
}

export default Login;