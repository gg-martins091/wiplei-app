import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
    Header,
    DateBox,
    TitleBox,
    HeaderTop,
    Chat,
    ChatMsg,
    Input,
    ChatInputContainer 
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';


const Aluguel = () => {
    const [id, setId] = useState('');
    useEffect(() => {
        async function getId() {
            return await AsyncStorage.getItem('id');
        }
        setId(getId());
    }, [])
    const scrollViewRef = useRef();
    return (
        <>
        <Header>
            <Text>{id}</Text>

            <HeaderTop> 
                <DateBox>
                    <Text style={{color: '#f4511e'}}>MAY</Text>
                    <Text style={{color: '#666'}}>09</Text>
                    <Text style={{fontSize: 12, marginTop: 5, color: '#666'}}>18:00h</Text>
                </DateBox>
                <TitleBox>
                    <Text style={{fontSize: 18}}>Eleven Futebol Society</Text>
                    <Text style={{fontSize: 16, color: '#666'}}>Rua Moura Galvão, 478</Text>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
                        <Icon name="check-circle-outline" size={20} color="#f4511e" style={{marginRight: 5}}/>
                        <Text style={{fontSize: 12, marginTop: 3, color: '#666'}}>14 pessoas confirmaram presença</Text>
                    </View>
                </TitleBox>
            </HeaderTop>
            <View>
                <TouchableOpacity style={{backgroundColor: '#f4511e', padding: 5, borderRadius: 5}}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}> Aceitar </Text>
                </TouchableOpacity>
            </View>
        </Header>
        <Chat 
            contentContainerStyle={{
                justifyContent: 'flex-end', alignItems: 'stretch'
            }}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
            <ChatMsg>
                <Text>
                    dsaddsadsadsadsadsaad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsaddsadsadsadadsadsadsadasdasdsadsaddsdasdsadasdsadasdsadasdasdsad
                </Text>
            </ChatMsg>
            <ChatMsg mine={true}>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsaddsadsadsadadsadsadsadasdasdsadsaddsdasdsadasdsadasdsadasdasdsad
                </Text>
            </ChatMsg>
            <ChatMsg mine={true}>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsaddsadsadsadadsadsadsadasdasdsadsaddsdasdsadasdsadasdsadasdasdsad
                </Text>
            </ChatMsg>
            <ChatMsg mine={true}>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsaddsadsadsadadsadsadsadasdasdsadsaddsdasdsadasdsadasdsadasdasdsad
                </Text>
            </ChatMsg>
            <ChatMsg mine={true}>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsaddsadsadsadadsadsadsadasdasdsadsaddsdasdsadasdsadasdsadasdasdsad
                </Text>
            </ChatMsg>
            <ChatMsg mine={true}>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsaddsadsadsadadsadsadsadasdasdsadsaddsdasdsadasdsadasdsadasdasdsad
                </Text>
            </ChatMsg>
            <ChatMsg mine={true}>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsaddsadsadsadadsadsadsadasdasdsadsaddsdasdsadasdsadasdsadasdasdsad
                </Text>
            </ChatMsg>
            <ChatMsg mine={true}>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsaddsadsadsadadsadsadsadasdasdsadsaddsdasdsadasdsadasdsadasdasdsad
                </Text>
            </ChatMsg>
            <ChatMsg mine={true}>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsadsad
                </Text>
            </ChatMsg>
            <ChatMsg>
                <Text>
                    dsaddsadsadsadadsadsadsadasdasdsadsaddsdasdsadasdsadasdsadasdasdsad
                </Text>
            </ChatMsg>
            <ChatMsg mine={true}>
                <Text>
                    sasasasasasas
                </Text>
            </ChatMsg>
        </Chat>
        <ChatInputContainer>
            <Input
                placeholder="Digite sua mensagem"
                placeholderTextColor="#bbb"
                multiline={true}
            >

            </Input>
            <TouchableOpacity>
                <Icon name="send" size={30} color="#f4511e" style={{marginRight: 5}}/>
            </TouchableOpacity>
        </ChatInputContainer>
        </>
    );
}

export default Aluguel;