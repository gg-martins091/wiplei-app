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
import { StackActions } from '@react-navigation/native';

const AlugueisStack = createStackNavigator();

const Alugueis = (props) => {
    let [items, setItems] = useState([]);
    let [filterOpen, setFilterOpen] = useState(false);
    let [filter, setFilter] = useState('');
    let [filterDistance, setFilterDistance] = useState(5);
    let [filterOpenTime, setFilterOpenTime] = useState(8);
    let [filterCloseTime, setFilterCloseTime] = useState(22);
    let [filterEsporte, setFilterEsporte] = useState('');

    useEffect(() => {
        setItems([
            {
                name: 'KTrop Paintball e Airsoft',
                rating: 4.5,
                distance: 6.2,
                openTime: '8',
                closeTime: '21',
                address: 'Avenida Mirudsdsdsdsdsdsdsdsna, 204',
                img: require('../../../assets/paintball.jpg')
            },
            {
                name: 'Eleven Futebol',
                rating: 4.9,
                distance: 3.3,
                openTime: '9',
                closeTime: '24',
                address: 'Rua dos Gansos, 982',
                img: require('../../../assets/futebol.jpg')

            },
            {
                name: 'Quadras de Basquete C8',
                rating: 4.1,
                distance: 4.9,
                openTime: '9',
                closeTime: '20',
                address: 'Rua Clemente Pereira, 1870',
                img: require('../../../assets/paintball.jpg')

            },
            {
                name: 'KTrop Paintball e Airsoft',
                rating: 4.5,
                distance: 6.2,
                openTime: '8',
                closeTime: '21',
                address: 'Avenida Mirudsdsdsdsdsdsdsdsna, 204',
                img: require('../../../assets/paintball.jpg')
            },
            {
                name: 'Eleven Futebol',
                rating: 4.9,
                distance: 3.3,
                openTime: '9',
                closeTime: '24',
                address: 'Rua dos Gansos, 982',
                img: require('../../../assets/futebol.jpg')

            },
            {
                name: 'Quadras de Basquete C8',
                rating: 4.1,
                distance: 4.9,
                openTime: '9',
                closeTime: '20',
                address: 'Rua Clemente Pereira, 1870',
                img: require('../../../assets/paintball.jpg')

            },
            {
                name: 'KTrop Paintball e Airsoft',
                rating: 4.5,
                distance: 6.2,
                openTime: '8',
                closeTime: '21',
                address: 'Avenida Mirudsdsdsdsdsdsdsdsna, 204',
                img: require('../../../assets/paintball.jpg')
            },
            {
                name: 'Eleven Futebol',
                rating: 4.9,
                distance: 3.3,
                openTime: '9',
                closeTime: '24',
                address: 'Rua dos Gansos, 982',
                img: require('../../../assets/futebol.jpg')

            },
            {
                name: 'Quadras de Basquete C8',
                rating: 4.1,
                distance: 4.9,
                openTime: '9',
                closeTime: '20',
                address: 'Rua Clemente Pereira, 1870',
                img: require('../../../assets/paintball.jpg')

            },

        ])
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
                    <AluguelBox key={k} onPress={() => props.navigation.dispatch(() => StackActions.push('AluguelDetalhe'))}>
                        <View>
                            <Word fsize="20px">{i.name}</Word>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexWrap: 'wrap', flexGrow: 0, flexBasis: 250}}>
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Icon name="star" size={20} color="#f4511e" />
                                    <Word fsize="14px" fcolor="#888">{i.rating}</Word>
                                    <Word style={{marginLeft: 20}} fsize="14px" fcolor="#888">{i.distance}km</Word>
                                </View>
                                <View style={{marginTop: 10}}>
                    
                                    <Word fsize="14px" fcolor="#888">09/10/2020 16:30</Word>
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


const AlugueisStackComponent = () => {
    return (
        <AlugueisStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    paddingRight: 50,
                },
            }}
        >
            <AlugueisStack.Screen 
                name="AlugueisHome"
                component={Alugueis} 
                options={{
                    title: 'Wiplei',
                    headerRight: () => (
                        <LogoutHeader />
                    )
                }}
            />
            
        </AlugueisStack.Navigator>
    );
}

export default AlugueisStackComponent;