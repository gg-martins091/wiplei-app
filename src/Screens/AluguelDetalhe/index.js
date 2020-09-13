import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
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
import Firestore from '@react-native-firebase/firestore';
import {format, getMonth} from 'date-fns';
import Api from '../../Service';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const InviteTab = createMaterialTopTabNavigator();
const months = ['Jan','Fev','MAr','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];


const Aluguel = ({user, route}) => {
    const [msgs, setMsgs] = useState([]);
    const [msg, setMsg] = useState('');
    const [details, setDetails] = useState();
    const [chat, setChat] = useState(true);
    const [inviteList, setInviteList] = useState([]);
    const [invitesLoading, setInvitesLoading] = useState([]);
    const [invitesDone, setInvitesDone] = useState([]);

    useEffect(() => {
        async function getDetails() {
            try {
                const data = await Api.get(`rents/${route.params.id}`);
                setDetails(data.data);
            } catch (e) {
            }
        }
        getDetails();

        async function getInviteList() {
            const data = await Api.get(`/rents/users/not/${route.params.id}`);
            setInviteList(data.data || []);
        }
        getInviteList();

        const unsubscribe = Firestore().collection('chat').doc(route.params.chatId).collection('msgs').onSnapshot(snap => {
            if (snap && !snap.empty) {
                const data = snap.docs.map(doc => doc.data())
                setMsgs(data);
            }
        });
        return () => unsubscribe();
    }, [])

    const scrollViewRef = useRef();
    if (details) {
        return (
            <>
            <Header >
                <HeaderTop> 
                    <DateBox>
                        <Text style={{color: '#f4511e'}}>{months[getMonth(new Date(details.rent_date))].toUpperCase()}</Text>
                        <Text style={{color: '#666'}}>{new Date(details.rent_date).getDate()}</Text>
                    </DateBox>
                    <TitleBox>
                        <Text style={{fontSize: 18}}>{details.establishment_name}</Text>
                        <Text style={{fontSize: 16, color: '#666'}}>{details.establishment_address}</Text>
                        <Text style={{fontSize: 12, marginTop: 8, color: '#666'}}>{details.init_hour.substring(0,5)}h às {details.finish_hour.substring(0,5)}h </Text>
                        <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
                            <Icon name="check-circle-outline" size={20} color="#f4511e" style={{marginRight: 5}}/>
                            <Text style={{fontSize: 12, marginTop: 3, color: '#666'}}>{details.count} pessoa{details.count > 1 && 's'} confirm{details.count == 1 ? 'ou' : 'aram'} presença</Text>
                        </View>
                    </TitleBox>
                </HeaderTop>
                <View>
                    <TouchableOpacity style={{backgroundColor: '#f4511e', padding: 5, borderRadius: 5}}>
                        <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}> Aceitar </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#f4511e', padding: 5, borderRadius: 5}}
                        onPress={async () => {
                            if (!chat) {
                                const data = await Api.get(`/rents/users/not/${route.params.id}`);
                                setInviteList(data.data || []);
                                setInvitesDone([]);
                                setInvitesLoading([]);
                            }
                            setChat(!chat)}
                        }>
                        <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}> {chat ? 'Convidar pessoas' : 'Voltar ao chat'} </Text>
                    </TouchableOpacity>
                </View>
            </Header>

            {!chat &&
                <Chat style={{
                    paddingTop: 10,
                    paddingBottom: 10
                }}>
                    {!inviteList || inviteList.length == 0 && 
                        <Text>Não existem usuários disponíveis para convidar.</Text>
                    }

                    {inviteList.length > 0 && inviteList.map((v,i) => (
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
                            {!invitesLoading.includes(i) && !invitesDone.includes(i) &&
                                <TouchableOpacity
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: '#f4511e',
                                        padding: 5
                                    }}
                                    onPress={async () => {
                                        setInvitesLoading([...invitesLoading, i]);
                                        try {
                                            const d = await Api.post(`rent-invite`, {
                                                rent_id: route.params.id,
                                                user_id: v.id
                                            });

                                            if (d.data.id) {
                                                const invitesLoadingNew = invitesLoading.filter(x => {
                                                    return x != i
                                                });
                                                setInvitesLoading(invitesLoadingNew);
                                                setInvitesDone([...invitesDone, i]);
                                            }
                                        } catch (er) {
                                            console.log(Object.keys(er));
                                            const invitesLoadingNew = invitesLoading.filter(x => {
                                                return x != i
                                            });
                                            setInvitesLoading(invitesLoadingNew);
                                        }
                                    }}
                                >
                                    <Text style={{ color: 'white' }}>Convidar</Text>
                                </TouchableOpacity>
                            }

                            {invitesLoading.includes(i) &&
                                <View
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: '#f4511e',
                                        padding: 5
                                    }}
                                >
                                    <ActivityIndicator color="white"></ActivityIndicator>
                                </View>
                            }

                            {invitesDone.includes(i) && 
                                <View
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: '#f4511e',
                                        padding: 5
                                    }}
                                >
                                   <Icon 
                                        name="check-bold" color="white" size={20} />
                                </View>
                            }
                        </View>
                    ))
                    }
                </Chat>
            }

            
            {chat &&
            <>
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
            }
            </>
        );
    } else {
        return (
            <View>
                <Text>
                    Loading...
                </Text>
            </View>
        );
    }
    
}

export default Aluguel;