import React, { useState, useContext, useEffect } from 'react';
import { Image, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../Contexts';

const Cadastro = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp } = useContext(AuthContext);

    
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
            enabled
            style={{
                backgroundColor: '#eee',
                flex: 1,
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{
                    flex: 1,
                    alignSelf: 'center',
                    alignItems: 'center',
                    width: '100%'
                }}>

                    <Image style={{width: 200, height: 50, marginBottom: 45}} resizeMode="contain" source={require('../../../assets/logo.png')} />
                    <View 
                        style={{
                            justifyContent: 'center',
                            width: '90%',
                            backgroundColor: '#fff',
                            paddingLeft: 30,
                            marginTop: 25
                        }}
                    >
                        <TextInput
                            style={{
                                height: 50,
                            }}
                            backgroundColor= '#fff'
                            placeholder="Email"
                            autoCompleteType="email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            value={email}
                            onChangeText={setEmail}
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
                            marginTop: 25,
                        }}
                    >
                        <TextInput
                            style={{
                                height: 50,
                            }}
                            backgroundColor= '#fff'
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
                            width: '90%',
                            backgroundColor: '#fff',
                            paddingLeft: 30,
                            marginTop: 25
                        }}
                    >
                        <TextInput
                            style={{
                                height: 50,
                            }}
                            backgroundColor= '#fff'
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
                            width: '90%',
                            backgroundColor: '#fff',
                            paddingLeft: 30,
                            marginTop: 25
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
                        disabled={surname.length == 0 || name.length == 0 || email.length == 0 || password.length == 0}
                        onPress={() => {
                            if (name.length > 0 || surname.length > 0 || email.length > 0 && password.length > 0) {
                                signUp({ surname: surname.toLowerCase(), email: email.toLowerCase(), name: name.toLowerCase(), password }).then(d => {
                                    console.log('d', d);
                                    navigation.pop();
                                }).catch(e => {
                                    console.log('e', e);
                                });
                            }
                        }} 
                        color="#fff"
                        style={{
                            backgroundColor: (surname.length == 0 || name.length == 0 || email.length == 0 || password.length == 0) ? "#ccc" : "#f4511e",
                            width: '80%',
                            borderRadius: 30,
                            padding: 15,
                            alignItems: 'center',
                            marginTop: 50
                        }}
                    >  
                        <Text style={{fontSize: 16, color: "#fff"}}>Registre-se</Text>
                    </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Cadastro;