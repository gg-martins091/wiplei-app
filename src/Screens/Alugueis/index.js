import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    ScrollContainer,
    AluguelBox,
    Word,
} from './styles';
import Api from '../../Service';
import { format } from 'date-fns';


const AlugueisStack = createStackNavigator();

const Alugueis = (props) => {
    let [items, setItems] = useState([]);

    useEffect(() => {
        async function getAlugueis() {
            const data = await Api.get('rents');
            setItems(data.data);
        }
        getAlugueis();
    }, []);
    
    return (
        <ScrollContainer>
        {items.length < 1 && <Text>Não há estabalecimentos para serem exibidos.</Text>}
        
        {items.length > 0 &&
            <Text style={{textAlign: 'center', marginTop: 10, marginBottom: 20, color: '#f4511e'}}>Você tem {items.length} aluguéis.</Text>
        }
        
        {items.length > 0 && items.map((i, k) => {
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



export default Alugueis;