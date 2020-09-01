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
import Firestore from '@react-native-firebase/firestore';
import {format} from 'date-fns';


const Aluguel = ({route}) => {
    const [user, setUser] = useState();
    const [msgs, setMsgs] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        async function getUser() {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            console.log(user);
            setUser(user);
        }
        getUser();

        const unsubscribe = Firestore().collection('chat').doc(route.params.chatId).collection('msgs').onSnapshot(snap => {
            if (snap && !snap.empty) {
                const data = snap.docs.map(doc => doc.data())
                setMsgs(data);
            }
        }, e => {
            console.log(e);
        });
        return () => unsubscribe();
    }, [])

    const scrollViewRef = useRef();
    return (
        <>
        <Header>
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
            {msgs.length > 0 && msgs.map((m, i) => 
                (
                    <ChatMsg key={i} mine={m.userid == user.id}>
                        <View style={{marginBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize: 10, color: '#666'}}>
                                {m.userid == user.id ? 'eu' : m.usuario}
                            </Text>
                            <Text style={{marginLeft: 8, fontSize: 8, color: '#666'}}>
                                {format(m.created_at.toDate(), 'HH:mm')}
                            </Text>
                        </View>
                        
                        <Text>
                            {m.msg}
                        </Text>
                        
                    </ChatMsg>
                )
            )}
            
            
        </Chat>
        <ChatInputContainer>
            <Input
                placeholder="Digite sua mensagem"
                placeholderTextColor="#bbb"
                multiline={true}
                value={msg}
                onChangeText={setMsg}
            />

            <TouchableOpacity onPress={() => {
                if (msg.length > 0) {
                    Firestore().collection('chat').doc(route.params.chatId).collection('msgs').add({
                        created_at: new Date(),
                        msg: msg,
                        userid: user.id,
                        usuario: user.nome
                    });
                    setMsg('');
                }
                
            }}>
                <Icon name="send" size={30} color="#f4511e" style={{marginRight: 5}}/>
            </TouchableOpacity>
        </ChatInputContainer>
        </>
    );
}

export default Aluguel;