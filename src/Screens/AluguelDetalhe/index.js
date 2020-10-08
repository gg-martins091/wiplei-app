import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
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
    const [invitesSent, setInvitesSent] = useState([]);
    const [acceptedInvites, setAcceptedInvites] = useState([]);
    const [refreshing1, setRefreshing1] = useState(false);
    const [refreshing2, setRefreshing2] = useState(false);

    async function getInviteList() {
        const data = await Api.get(`/rents/users/not/${route.params.id}`);
        setInviteList(data.data || []);
        setInvitesDone([]);
        setInvitesLoading([]);
        return true;
    }

    async function getInvitesSent() {
        const data = await Api.get(`/rent-invite/${route.params.id}`);
        setInvitesSent(data.data);
        return true;
    }

    async function getAcceptedInvitesSent() {
        const data = await Api.get(`/rent-invite/accepted/${route.params.id}`);
        setAcceptedInvites(data.data);
        return true;
    }
    
    useEffect(() => {
        async function getDetails() {
            try {
                const data = await Api.get(`rents/${route.params.id}`);
                console.log(data.data, user.userId) 
                setDetails(data.data);
            } catch (e) {
            }
        }
        getDetails();
        getInviteList();
        getInvitesSent();
        getAcceptedInvitesSent();
        

        const unsubscribe = Firestore().collection('chat').doc(route.params.chat_id).collection('msgs').onSnapshot(snap => {
            if (snap && !snap.empty) {
                const data = snap.docs.map(doc => doc.data())
                setMsgs(data);
            }
        });
        return () => unsubscribe();
    }, [])

    const onRefresh1 = useCallback(() => {
        setRefreshing1(true);
        getInviteList().then(() => setRefreshing1(false));
    }, []);


    const onRefresh2 = useCallback(() => {
        setRefreshing2(true);
        Promise.all([
            getAcceptedInvitesSent(),
            getInvitesSent(),
        ]).then(() => setRefreshing2(false));
    }, []);
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
                {details.owner_id == user.userId && 
                    <View>
                        <TouchableOpacity style={{backgroundColor: '#f4511e', padding: 5, borderRadius: 5}}
                            onPress={async () => {
                                const oldChat = chat;
                                setChat(!chat)
                                if (!oldChat) {
                                    const data = await Api.get(`/rents/users/not/${route.params.id}`);
                                    setInviteList(data.data || []);
                                    setInvitesDone([]);
                                    setInvitesLoading([]);
                                    const invitesSentData = await Api.get(`/rent-invite/${route.params.id}`);
                                    setInvitesSent(invitesSentData.data); 
                                }
                                
                            }
                            }>
                            <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}> {chat ? 'Convidar pessoas' : 'Voltar ao chat'} </Text>
                        </TouchableOpacity>
                    </View>
                }
            </Header>

            {!chat &&
                <InviteTab.Navigator lazy={true} lazyPlaceholder={() => (<Text>Loading...</Text>)}>
                    <InviteTab.Screen name="Invites" options={{
                        title: 'Convidar'
                    }} children={ props => 
                    
                        <Chat 
                            refreshControl={
                                <RefreshControl refreshing={refreshing1} onRefresh={onRefresh1} />
                            }
                            {...props}>
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
                    } />

                    <InviteTab.Screen name="InvitesSent" options={{
                        title: 'Convites Enviados'
                    }} children={ props => 
                    
                        <Chat 
                        refreshControl={
                            <RefreshControl refreshing={refreshing2} onRefresh={onRefresh2} />
                        }
                        {...props} style={{
                            paddingTop: 10,
                            paddingBottom: 10
                        }}>
                            {(!invitesSent && !acceptedInvites) || (invitesSent.length == 0 && acceptedInvites.length == 0) && 
                                <Text>Não existem usuários convidados.</Text>
                            }

                            {invitesSent.length > 0 &&
                                <View style={{padding: 15}}>
                                    <Text style={{textAlign: 'center', color: '#f4511e'}}>Convites enviados</Text>
                                </View>
                            }
                            {invitesSent.length > 0 && invitesSent.map((v,i) => (
                                
                                <View key={i} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    padding: 10,
                                    marginBottom: 10 
                                }}>
                                    <Text>{v.name} {v.surname}</Text>
                                    <TouchableOpacity
                                        style={{
                                            borderRadius: 5,
                                            backgroundColor: '#f4511e',
                                            padding: 5
                                        }}
                                        onPress={async () => {
                                            try {
                                                const d = await Api.post(`rent-invite/cancel`, {
                                                    invite_id: v.invite_id
                                                });

                                                if (d.data.success) {
                                                  //  getInviteList();
                                                    getInvitesSent();
                                                }
                                            } catch (er) {
                                            }
                                        }}
                                    >
                                        <Icon 
                                            name="window-close" color="white" size={20} />
                                    </TouchableOpacity>
                                </View>
                            ))
                            }

                            {acceptedInvites.length > 0 &&
                                <View style={{padding: 15}}>
                                    <Text style={{textAlign: 'center', color: '#f4511e'}}>Convites aceitos</Text>
                                </View>
                            }
                            
                            {acceptedInvites.length > 0 && acceptedInvites.map((v,i) => (
                                
                                <View key={i} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    padding: 10,
                                    marginBottom: 10 
                                }}>
                                    <Text>{v.name} {v.surname}</Text>
                                    <TouchableOpacity
                                        style={{
                                            borderRadius: 5,
                                            backgroundColor: '#f4511e',
                                            paddingVertical: 5,
                                            paddingHorizontal: 10
                                        }}
                                        onPress={async () => {
                                            try {
                                                const d = await Api.post(`/rent-invite/accepted/remove`, {
                                                    rent_id: v.rent_id,
                                                    user_id: v.id
                                                });

                                                if (d.data.success) {
                                                    getAcceptedInvitesSent();
                                                }
                                            } catch (er) {
                                            }
                                        }}
                                    >
                                        <Text style={{color: 'white'}}>Remover</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                            }


                        </Chat>              
                    } />

                </InviteTab.Navigator>
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
                            <ChatMsg key={i} mine={m.userid == user.userId}>
                                <View style={{marginBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontSize: 10, color: '#666'}}>
                                        {m.userid == user.userId ? 'eu' : m.usuario}
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
                            Firestore().collection('chat').doc(route.params.chat_id).collection('msgs').add({
                                created_at: new Date(),
                                msg: msg,
                                userid: user.userId,
                                usuario: `${user.userName} ${user.userSurname}`
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
            <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="#f4511e" size={80}></ActivityIndicator>
            </View>
        );
    }
    
}

export default Aluguel;