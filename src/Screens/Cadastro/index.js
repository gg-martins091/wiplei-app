import React, { useState, useContext } from 'react';
import { Image, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../Contexts';
import Toast from 'react-native-root-toast';

const Cadastro = ({navigation}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const { signUp } = useContext(AuthContext);

    
    return (
        <KeyboardAvoidingView
            behavior='height'
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>

                    <Image style={{width: 200, height: 50, marginBottom: 20, alignSelf: 'center'}} resizeMode="contain" source={require('../../../assets/logo.png')} />
                    <View 
                        style={{
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            paddingLeft: 30,
                            marginTop: 15
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
                            backgroundColor: '#fff',
                            paddingLeft: 30,
                            marginTop: 15,
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
                            backgroundColor: '#fff',
                            paddingLeft: 30,
                            marginTop: 15
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
                            backgroundColor: '#fff',
                            paddingLeft: 30,
                            marginTop: 15
                        }}
                    >
                        <TextInput
                            style={{
                                height: 50,
                            }}
                            backgroundColor= '#fff'
                            placeholder="Telefone"
                            value={phone}
                            onChangeText={setPhone}
                        />
                        <Icon 
                        style={{
                            position: 'absolute',
                            left: 5
                        }} 
                        name="account" size={20} />
                    </View>

                    <View >
                        <View 
                            style={{
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                                paddingLeft: 30,
                                marginTop: 15
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
                        <Text style={{
                            color: '#f00',
                            marginBottom: 5,
                            alignSelf: 'flex-end'
                        }}>Mínimo de 6 caracteres.</Text>
                    </View>

                    
                    <TouchableOpacity 
                        disabled={surname.length == 0 || name.length == 0 || email.length == 0 || password.length == 0}
                        onPress={() => {
                            if (phone.length < 6 || name.length > 0 || surname.length > 0 || email.length > 0 && password.length > 0) {
                                signUp({ phone: phone, surname: surname.toLowerCase(), email: email.toLowerCase(), name: name.toLowerCase(), password }).then(d => {
                                    Toast.show('Cadastro realizado com sucesso.', {
                                        duration: Toast.durations.SHORT,
                                        position: Toast.positions.BOTTOM,
                                        shadow: true,
                                        animation: true,
                                        hideOnPress: true,
                                    });
                                    navigation.pop();
                                }).catch(e => {
                                    Toast.show('Ocorreu um erro. Tente novamente ou tente outro email.', {
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
                            backgroundColor: (surname.length == 0 || name.length == 0 || email.length == 0 || password.length == 0) ? "#ccc" : "#f4511e",
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        flex: 1
    },
    inner: {
        padding: 24,
        justifyContent: "space-around",
        flex: 1
    }
  });


export default Cadastro;