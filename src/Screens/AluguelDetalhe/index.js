import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { Header, DateBox, TitleBox, HeaderTop, HeaderBottom } from './styles';

const Aluguel = () => {
  return (
    <Header>
        <HeaderTop> 
            <DateBox>
                <Text style={{color: '#f4511e'}}>MAY</Text>
                <Text style={{color: '#666'}}>09</Text>
                <Text style={{fontSize: 12, marginTop: 5, color: '#666'}}>18:00h</Text>
            </DateBox>
            <TitleBox>
                <Text style={{fontSize: 18}}>Eleven Futebol Society</Text>
                <Text style={{fontSize: 16, color: '#666'}}>Rua Moura Galvão, 478</Text>
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
                    <Icon name="check-circle-outline" size={20} color="#f4511e" style={{marginRight: 5}}/>
                    <Text style={{fontSize: 12, marginTop: 3, color: '#666'}}>14 pessoas confirmaram presença</Text>
                </View>
            </TitleBox>
        </HeaderTop>
        <View>
            <TouchableOpacity style={{backgroundColor: '#f4511e', padding: 5, borderRadius: 5}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}> Aceitar </Text>
            </TouchableOpacity>
        </View>
    </Header>
  );
}

export default Aluguel;