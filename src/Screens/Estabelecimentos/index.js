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

const timePreset = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30"
]

const Estabelecimentos = (props) => {

    let [items, setItems] = useState([]);
    let [filterOpen, setFilterOpen] = useState(false);
    let [filter, setFilter] = useState('');
    let [filterDistance, setFilterDistance] = useState(5);
    let [filterOpenTime, setFilterOpenTime] = useState(17);
    let [filterCloseTime, setFilterCloseTime] = useState(46);
    let [filterEsporte, setFilterEsporte] = useState('');

    useEffect(() => {
        Api.get('establishments').then(d => {
            setItems(d.data);
        }).catch(e => {
            console.log(e);
        });
       
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
                            {timePreset.map((v,i) => (
                                <Picker.Item key={i} label={v} value={i} />

                            ))}
                           
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
                           {timePreset.map((v,i) => (
                                <Picker.Item key={i} label={v} value={i} />

                            ))}
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
                let filterOpen = new Date();
                filterOpen.setHours(timePreset[filterOpenTime].substring(0,2) -3, timePreset[filterOpenTime].substring(3,5), "00", "00")

                let filterClose = new Date();
                filterClose.setHours(timePreset[filterCloseTime].substring(0,2) -3, timePreset[filterCloseTime].substring(3,5), "00", "00");

                let openTime = new Date();
                openTime.setHours(i.open_hours.substring(0,2) -3, i.open_hours.substring(3,5), "00", "00");

                let closeTime = new Date();
                closeTime.setHours(i.close_hours.substring(0,2) -3, i.close_hours.substring(3,5), "00", "00");

                console.log(openTime, filterOpen)
                console.log(closeTime, filterClose)
                if (i.name.toLowerCase().includes(filter.toLowerCase())
                    && openTime <= filterOpen 
                    && closeTime >= filterClose
                    && (filterEsporte == '' || i.esportes.includes(filterEsporte))
                    //&& (filterDistance >= 15 || i.distance < filterDistance)
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
                                    <Word fsize="14px" fcolor="#888">{i.stars}</Word>
                                    {//<Word style={{marginLeft: 20}} fsize="14px" fcolor="#888">{i.distance}km</Word>
                                    }
                                </View>
                                <View style={{marginTop: 10}}>
                                    <Word fsize="14px" fcolor="#888">Funcionamento: {i.open_hours.substring(0,5)} às {i.close_hours.substring(0,5)}</Word>
                                </View>
                                <View style={{marginTop: 10}}>
                                    <Word fsize="18px" fcolor="#222">{i.address}</Word>
                                </View>
                            </View>
                            <Image style={{borderRadius: 5, width: 100, height: 80}} resizeMethod="resize" source={{
                                uri: `${Api.defaults.baseURL}files/${i.avatar.path}`
                            }} />
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