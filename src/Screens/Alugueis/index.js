import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-community/picker';
import LogoutHeader from '../../Components/LogoutHeader';
import {
    ScrollContainer,
    AluguelBox,
    Word,
    FilterContainer,
    FilterButton,
    FilterFormContainer,
    FilterInputView,
    FilterFormInput
} from './styles';
import Api from '../../Service';

const AlugueisStack = createStackNavigator();

const Alugueis = (props) => {
    let [items, setItems] = useState([]);

    useEffect(() => {
        async function getAlugueis() {
            const data = await Api.get('rents');
            console.log(data.data);
        }
        
    }, []);
    
    return (
            <ScrollContainer>
            {items.length < 1 && <Text>Não há estabalecimentos para serem exibidos.</Text>}
            {items.length > 0 && items.map((i, k) => {
                if (i.name.toLowerCase().includes(filter.toLowerCase())
                    && i.openTime >= filterOpenTime 
                    && i.closeTime >= filterCloseTime
                    && (filterEsporte == '' || i.esportes.includes(filterEsporte))
                    && (filterDistance >= 15 || i.distance < filterDistance)
                    ) {
                    return (
                    <AluguelBox key={k} onPress={() => props.navigation.push('AluguelDetalhe', {chatId: i.chatId})}>
                        <View>
                            <Word fsize="20px">{i.name}</Word>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexWrap: 'wrap', flexGrow: 0, flexBasis: 250}}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Icon name="star" size={20} color="#f4511e" />
                                    <Word fsize="14px" fcolor="#666">{i.rating}</Word>
                                    <Word style={{marginLeft: 20}} fsize="14px" fcolor="#666">{i.distance}km</Word>
                                </View>
                                <View style={{marginTop: 10}}>
                    
                                    <Word fsize="14px" fcolor="#666">09/10/2020 16:30</Word>
                                </View>
                                <View style={{marginTop: 10}}>
                                    <Word fsize="18px" fcolor="#222">{i.address}</Word>
                                </View>
                            </View>
                            <Icon name="chat" size={50} color="#f4511e" style={{marginRight: 30}}/>
                        </View>
                    </AluguelBox>)
                }
                
            })
            }
        </ScrollContainer>
    );
}



export default Alugueis;