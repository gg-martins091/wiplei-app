import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    ScrollContainer,
    AluguelBox,
    Word,
} from './styles';
import Api from '../../Service';
import { format } from 'date-fns';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tabs = createMaterialTopTabNavigator();

const Alugueis = (props) => {
    let [items, setItems] = useState();

    useEffect(() => {
        async function getAlugueis() {
            const data = await Api.get('rents');
            setItems(data.data || []);
        }
        getAlugueis();
    }, []);
    
    return (
        <ScrollContainer>
        {!items && 
            <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="#f4511e" size={80}></ActivityIndicator>
            </View>
        }
        
        {items && items.length > 0 &&
            <Text style={{textAlign: 'center', marginTop: 10, marginBottom: 20, color: '#f4511e'}}>Você tem {items.length} aluguéis.</Text>
        }
        
        {items && items.length > 0 && items.map((i, k) => {
            return (
                <AluguelBox key={k} onPress={() => props.navigation.push('AluguelDetalhe', {id: i.id, chatId: i.chatId})}>
                    <View>
                        <Word fsize="20px">{i.schedule.space.establishment.name}</Word>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexWrap: 'wrap', flexGrow: 0, flexBasis: 250}}>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Icon name="star" size={20} color="#f4511e" />
                                <Word fsize="14px" fcolor="#666">{i.schedule.space.establishment.stars}</Word>
                            </View>
                            <View style={{marginTop: 10}}>
                
                                <Word fsize="14px" fcolor="#666">{format(new Date(i.rent_date), 'dd/MM/yyyy')} {i.schedule.init_hour.substring(0,5)} - {i.schedule.finish_hour.substring(0,5)}</Word>
                                
                            </View>
                            <View style={{marginTop: 10}}>
                                <Word fsize="18px" fcolor="#222">{i.schedule.space.establishment.address}</Word>
                            </View>
                        </View>
                        <Image style={{borderRadius: 5, width: 100, height: 80}} resizeMethod="resize" source={{
                            uri: `${Api.defaults.baseURL}files/${i.schedule.space.establishment.avatar.path}`
                        }} />
                    </View>
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