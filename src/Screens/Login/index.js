import React, { useState, useContext, useEffect } from 'react';
import { Image, View, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// import { Container } from './styles';
import { AuthContext } from '../../Contexts';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const { signIn } = useContext(AuthContext);

    useEffect(() => {
        signIn('', '');
    }, [])
  
    return (
        <>
        <KeyboardAvoidingView
            style={{
                backgroundColor: '#ccc',
                display: 'flex'
            }}
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
                <View style={{top: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 60,
                }}>
                    <Text style={{
                        fontSize: 62,
                        color: '#f4511e'
                    }}>Wiplei</Text>
                </View>
                
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
                    onPress={() => signIn({ username, password })} 
                    color="#fff"
                    style={{
                        backgroundColor: "#f4511e",
                        width: '80%',
                        borderRadius: 30,
                        padding: 15,
                        alignItems: 'center',
                        marginTop: 50
                    }}
                >  
                    <Text style={{fontSize: 16, color: "#fff"}}>Login</Text>
                </TouchableOpacity>
                

                    
                <TouchableOpacity style={{
                    marginTop: 30
                }}>
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