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
import Firestore from '@react-native-firebase/firestore';
import {format, getMonth, getDay} from 'date-fns';
import Api from '../../Service';
import { ScrollView } from 'react-native-gesture-handler';

const months = ['Jan','Fev','MAr','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];


const Aluguel = ({user, route}) => {
    const [msgs, setMsgs] = useState([]);
    const [msg, setMsg] = useState('');
    const [details, setDetails] = useState();
    const [chat, setChat] = useState(true);

    useEffect(() => {
        async function getDetails() {
            try {
                console.log(`rents/${route.params.id}`);
                const data = await Api.get(`rents/${route.params.id}`);
                console.log(data.data);
                setDetails(data.data);
            } catch (e) {
                console.log(e);
            }
        }
        getDetails();

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
                        onPress={() => setChat(!chat)}>
                        <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}> {chat ? 'Convidar pessoas' : 'Voltar ao chat'} </Text>
                    </TouchableOpacity>
                </View>
            </Header>

            {!chat &&
                <ScrollView>
                    <Text>opa</Text>
                </ScrollView>
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