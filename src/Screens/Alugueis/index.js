import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, Text, ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    ScrollContainer,
    AluguelBox,
    Word,
} from './styles';
import Api from '../../Service';
import { format } from 'date-fns';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tabs = createMaterialTopTabNavigator();

const Alugueis = (props) => {
    const [items, setItems] = useState();
    const [refreshing, setRefreshing] = useState(false);
    async function getAlugueis() {
        const data = await Api.get(props.isInvite ? 'rent-invite' :'rents');
        setItems(data.data || []);
        return true;
    }

    useEffect(() => {
        getAlugueis();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getAlugueis().then(() => setRefreshing(false));
    }, []);

    const w = (Dimensions.get('window').width / 2) - 20;

    return (
        <ScrollContainer
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {!items && 
            <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="#f4511e" size={80}></ActivityIndicator>
            </View>
        }
        
        { items && items.length == 0 &&
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 20
            }}>
            <Text style={{textAlign: 'center', marginTop: 10, marginBottom: 20, color: '#f4511e'}}>Você não tem nenhum {props.isInvite ? 'convite' : 'aluguél'}.</Text>
            </View>
        }
        
        {items && items.length > 0 &&
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 20
            }}>
                <Text style={{textAlign: 'center', color: '#f4511e', marginRight: 10}}>Você tem {items.length} {props.isInvite ? items.length == 1 ? 'convite' : 'convites' : items.length == 1 ? 'aluguél' : 'aluguéis'}.
                </Text>
            </View>
        }
        
        {items && items.length > 0 && items.map((i, k) => {
            return (
                <AluguelBox key={k} onPress={props.isInvite ? null : () => props.navigation.push('AluguelDetalhe', {id: i.id, chat_id: i.chat_id})}>
                    <View>
                        <Word fsize="20px">{i.name}</Word>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexWrap: 'wrap', flexGrow: 0, flexBasis: 250}}>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Icon name="star" size={20} color="#f4511e" />
                                <Word fsize="14px" fcolor="#666">{i.stars}</Word>
                            </View>
                            <View style={{marginTop: 10}}>
                
                                <Word fsize="14px" fcolor="#666">{format(new Date(i.rent_date), 'dd/MM/yyyy')} {i.init_hour.substring(0,5)} - {i.finish_hour.substring(0,5)}</Word>
                                
                            </View>
                            <View style={{marginTop: 10}}>
                                <Word fsize="18px" fcolor="#222">{i.address}</Word>
                            </View>
                        </View>
                        {i.path && 
                            <Image style={{borderRadius: 5, width: 100, height: 80}} resizeMethod="resize" source={{
                                uri: `${Api.defaults.baseURL}files/${i.path}`
                            }} />
                        }
                        {!i.path &&
                            <Image style={{borderRadius: 5, width: 100, height: 80}} resizeMethod="resize" source={{
                                uri: 'https://api.wiplei.com/files/placeholder.png'
                            }} />
                        }
                        
                    </View>
                    {props.isInvite &&
                    <>
                        <Text style={{
                            marginTop: 10,
                            textAlign: 'center',
                            color: '#f4511e'
                        }}>{i.inviter_name} convidou você.</Text>

                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: '#f4511e',
                                padding: 5,
                                borderRadius: 5,
                                marginTop: 5,
                                width: w - 10
                            }}
                                onPress={ async () => {
                                    const d = await Api.post(`rent-invite/accept`, {
                                        invite_id: i.invite_id
                                    });
                                    if (d.data.success) {
                                        getAlugueis();
                                    }
                                }}
                            >
                                <Text style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: 18
                                }}>Aceitar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                backgroundColor: '#fff',
                                padding: 5,
                                borderRadius: 5,
                                marginTop: 5,
                                width: w - 10
                            }}
                                onPress={ async () => {
                                    const d = await Api.post(`rent-invite/decline`, {
                                        invite_id: i.invite_id
                                    });
                                    if (d.data.success) {
                                        getAlugueis();
                                    }
                                }}
                            >
                                <Text style={{
                                    color: '#f4511e',
                                    textAlign: 'center',
                                    fontSize: 18
                                }}>Recusar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    }
                </AluguelBox>
            )
        })
        }
    </ScrollContainer>
    );
}

function TabsComponent(props) {
    const [propsState, setPropsState] = useState(props);
    return (
        <Tabs.Navigator lazy={true} lazyPlaceholder={() => (<Text>Loading...</Text>)}>
            <Tabs.Screen 
                name="AlugueisListagem"
                options={{
                    title: 'Aluguéis'
                }}
                children={ props => <Alugueis isInvite={false} {...props} user={propsState.user} />} />
            <Tabs.Screen 
                name="AlugueisInvite"
                options={{
                    title: 'Convites'
                }}
                children={ props => <Alugueis isInvite={true} {...props} user={propsState.user} />} />
        </Tabs.Navigator>
    );
}

export default TabsComponent;