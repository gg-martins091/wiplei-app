import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-community/picker';
import {
    ScrollContainer,
    Estabelecimento,
    Word,
    FilterContainer,
    FilterButton,
    FilterFormContainer,
    FilterInputView,
} from './styles';
import { StackActions } from '@react-navigation/native';
import Api from '../../Service';

const Estabelecimentos = (props) => {
    let [items, setItems] = useState([]);
    let [filterOpen, setFilterOpen] = useState(false);
    let [filter, setFilter] = useState('');
    let [filterDistance, setFilterDistance] = useState(5);
    let [filterOpenTime, setFilterOpenTime] = useState(8);
    let [filterCloseTime, setFilterCloseTime] = useState(22);
    let [filterEsporte, setFilterEsporte] = useState('');

    useEffect(() => {
        Api.get('establishment').then(d => {
            
            console.log(d.data);
        });
        /* setItems([
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

        ]) */
    }, []);
    

    return (
       <>
        <FilterContainer>
            <FilterButton filterOpen={filterOpen} onPress={() => { setFilterOpen(!filterOpen);}}>
                <Text style={{fontSize: 18, marginRight: 5}}>
                    Filtros
                </Text>
                <Icon name="filter" size={20} color={filterOpen ? '#f4511e' : '#ccc'} />
            </FilterButton>
            <TextInput
                style={{
                    height:35,
                    flex :1,
                    padding: 8,
                    borderRadius: 5
                }}
                backgroundColor= '#eee'
                placeholder="Nome do estabelecimento"
                value={filter}
                onChangeText={setFilter}
            />
            
            
        </FilterContainer>
        {filterOpen && 
        <FilterFormContainer>
            <Text style={{color: '#f4511e', textAlign: 'center', fontSize: 24, marginBottom: 15}}>Filtros</Text>
            <FilterInputView>
                <View style={{width: 110}}>
                    <Text style={{marginRight: 10, textAlign: 'center'}}>Proximidade</Text>
                    <Text style={{color: '#666', textAlign: 'center'}}>{filterDistance >= 15 ? ('15km ou mais') : ('até ' + filterDistance + ' km')}</Text>
                </View>
                <View style={{flex: 1}}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: '#aaa'}}>1km</Text>
                        <Text style={{color: '#aaa'}}>15km</Text>
                    </View>
                    <Slider
                        style={{flex: 1, height: 40}}
                        minimumValue={1}
                        maximumValue={15}
                        thumbTintColor='#f4511e'
                        step={1}
                        value={filterDistance}
                        onValueChange={setFilterDistance}
                        minimumTrackTintColor="#f4511e"
                        maximumTrackTintColor="#000000"
                    />
                </View>
            </FilterInputView>

            <FilterInputView>
                <View style={{width: 110}}>
                    <Text style={{marginRight: 10, textAlign: 'center'}}>Horários</Text>
                </View>
                <View style={{flex: 1}}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{color: '#aaa'}}>De</Text>
                        <Picker
                            selectedValue={filterOpenTime}
                            style={{height: 50, width: 100, color: '#666'}}
                            mode='dropdown'
                            onValueChange={(v) => {
                                if (v < filterCloseTime && v != filterOpenTime) {
                                    setFilterOpenTime(v);
                                }
                            }}
                        >
                            <Picker.Item label="01h" value={1} />
                            <Picker.Item label="02h" value={2} />
                            <Picker.Item label="03h" value={3} />
                            <Picker.Item label="04h" value={4} />
                            <Picker.Item label="05h" value={5} />
                            <Picker.Item label="06h" value={6} />
                            <Picker.Item label="07h" value={7} />
                            <Picker.Item label="08h" value={8} />
                            <Picker.Item label="09h" value={9} />
                            <Picker.Item label="10h" value={10} />
                            <Picker.Item label="11h" value={11} />
                            <Picker.Item label="12h" value={12} />
                            <Picker.Item label="13h" value={13} />
                            <Picker.Item label="14h" value={14} />
                            <Picker.Item label="15h" value={15} />
                            <Picker.Item label="16h" value={16} />
                            <Picker.Item label="17h" value={17} />
                            <Picker.Item label="18h" value={18} />
                            <Picker.Item label="19h" value={19} />
                            <Picker.Item label="20h" value={20} />
                            <Picker.Item label="21h" value={21} />
                            <Picker.Item label="22h" value={22} />
                            <Picker.Item label="23h" value={23} />
                            <Picker.Item label="00h" value={24} />
                        </Picker>
                        <Text style={{color: '#aaa'}}>Até</Text>
                        <Picker
                            selectedValue={filterCloseTime}
                            style={{height: 50, width: 100, color: '#666'}}
                            mode='dropdown'
                            onValueChange={(v) => {
                                if (v > filterOpenTime && v != filterCloseTime) {
                                    setFilterCloseTime(v);
                                }
                            }}
                        >
                            <Picker.Item label="01h" value={1} />
                            <Picker.Item label="02h" value={2} />
                            <Picker.Item label="03h" value={3} />
                            <Picker.Item label="04h" value={4} />
                            <Picker.Item label="05h" value={5} />
                            <Picker.Item label="06h" value={6} />
                            <Picker.Item label="07h" value={7} />
                            <Picker.Item label="08h" value={8} />
                            <Picker.Item label="09h" value={9} />
                            <Picker.Item label="10h" value={10} />
                            <Picker.Item label="11h" value={11} />
                            <Picker.Item label="12h" value={12} />
                            <Picker.Item label="13h" value={13} />
                            <Picker.Item label="14h" value={14} />
                            <Picker.Item label="15h" value={15} />
                            <Picker.Item label="16h" value={16} />
                            <Picker.Item label="17h" value={17} />
                            <Picker.Item label="18h" value={18} />
                            <Picker.Item label="19h" value={19} />
                            <Picker.Item label="20h" value={20} />
                            <Picker.Item label="21h" value={21} />
                            <Picker.Item label="22h" value={22} />
                            <Picker.Item label="23h" value={23} />
                            <Picker.Item label="00h" value={24} />
                        </Picker>
                    </View>
                </View>
            </FilterInputView>

            <FilterInputView>
                <View style={{width: 110}}>
                    <Text style={{marginRight: 10, textAlign: 'center'}}>Esportes</Text>
                </View>
                <View style={{flex: 1}}>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Picker
                            selectedValue={filterOpenTime}
                            style={{flex: 1, color: '#666'}}
                            mode='dropdown'
                            onValueChange={(v) => {
                                if (v != filterEsporte) {
                                    setFilterEsporte(v);
                                }
                            }}
                        >
                            <Picker.Item label="Baqueste" value="basquete" />
                            <Picker.Item label="Futebol Society" value="futebolsociety" />
                            <Picker.Item label="Futsal" value="futsal" />
                            <Picker.Item label="Paintball" value="paintball" />
                            <Picker.Item label="Volêi" value="volei" />
                        </Picker>
                    </View>
                </View>
            </FilterInputView>

            <FilterButton 
                onPress={
                    () => {
                        setFilterOpen(!filterOpen)
                    }
                }
                style={{
                    marginTop: 30,
                    backgroundColor: '#f4511e',
                    padding: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}
            >
                <Text style={{color: 'white'}}>Filtrar</Text>
            </FilterButton>
        </FilterFormContainer>
        }

        {!filterOpen && 
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
                    <Estabelecimento key={k} onPress={() => props.navigation.dispatch(StackActions.push('EstabelecimentoDetalhe', { user: 'Wojtek' }))}>
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
                    
                                    <Word fsize="14px" fcolor="#888">Funcionamento: {i.openTime} às {i.closeTime}</Word>
                                </View>
                                <View style={{marginTop: 10}}>
                                    <Word fsize="18px" fcolor="#222">{i.address}</Word>
                                </View>
                            </View>
                            <Image style={{borderRadius: 5, maxWidth: 100, maxHeight: 100}} resizeMethod="resize" source={i.img} />
                        </View>
                    </Estabelecimento>)
                }
                
            })
            }
        </ScrollContainer>
        }
        </>
    );
}


export default Estabelecimentos;