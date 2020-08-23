import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { HeaderContainer, EspacosContainer } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const EstabelecimentoDetalhe = () => {
    let [infoExpanded, setInfoExpanded] = useState(false);

    return (
    <View>
        <HeaderContainer>
            <Image style={{borderRadius: 10, width: 200, height: 100}} resizeMethod="resize" source={require('../../../assets/quadra.jpg')} />
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
                <Icon name="star" size={20} color="#f4511e" />
                <Text style={{fontSize: 14, color: '#888'}}>4.5</Text>
                <Text style={{marginLeft: 20, fontSize: 14, color: '#888'}}>6 km de distância</Text>
            </View>
            {!infoExpanded && 
            <TouchableOpacity onPress={() => setInfoExpanded(!infoExpanded)}>
                <Icon name="chevron-down" size={20} color="#555" style={{padding: 0}}/>
            </TouchableOpacity>
            }
            

            {infoExpanded && 
                <>
                <View style={{display: 'flex', alignItems: 'flex-start', alignSelf: 'flex-start'}}>
                    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
                        <Icon name="home-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                        <Text style={{fontSize: 14, color: '#333'}}>Avenida Miruna, 590</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
                        <Icon name="chat-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                        <Text style={{fontSize: 14, color: '#333'}}>Alugue quadras de society. As melhores quadras da zona sul.</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
                        <Icon name="check-circle-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                        <Text style={{fontSize: 14, color: '#007a00'}}>Aberto agora</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Icon name="alert-circle-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                        <Text style={{fontSize: 14, color: '#7a0e00'}}>Fechado agora</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setInfoExpanded(!infoExpanded)}>
                    <Icon name="chevron-up" size={20} color="#555" style={{padding: 0}}/>
                </TouchableOpacity>
                </>}

        </HeaderContainer>
        <EspacosContainer>

        </EspacosContainer>
    </View>
  );
}

export default EstabelecimentoDetalhe;