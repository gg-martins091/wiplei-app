import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { HeaderContainer, EspacosContainer, Espaco } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Api from '../../Service';
import Toast from 'react-native-root-toast';

const EstabelecimentoDetalhe = ({navigation, route}) => {
    let [infoExpanded, setInfoExpanded] = useState(false);
    let [establishment, setEstablishment] = useState();

    useEffect(() => {
        async function getEstablishment() {
            try {
                const es = await Api.get(`/championships/${route.params.id}`);
                console.log(es.data);
                if (es) {
                    setEstablishment(es.data);
                } else {
                    Toast.show('Ooops! Algo deu errado.', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                    });
                    navigation.pop();
                }
            } catch (e) {
                Toast.show('Ooops! Algo deu errado.', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                navigation.pop();
            }
            
        }
        getEstablishment();
    }, []);

    if (establishment) {
        return (
            <View>
                <HeaderContainer>
                    <View style={{width: 200, height: 100}}>
                    <Image style={{borderRadius: 10, width: 200, height: 100}} resizeMethod="resize" source={{uri: `${Api.defaults.baseURL}files/${establishment.avatar.path}`}} />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', marginTop: 10, justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontSize: 16, color: '#f4511e'}}>{establishment.name}</Text>
                        <Text style={{fontSize: 14, color: '#888'}}>{establishment.description}</Text>
                    </View>
                    
                    <View style={{display: 'flex', alignItems: 'flex-start', alignSelf: 'flex-start', marginTop: 15}}>
                        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
                            <Icon name="home-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                            <Text style={{fontSize: 14, color: '#666'}}>{establishment.address}</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
                            <Icon name="phone-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                            <Text style={{fontSize: 14, color: '#666'}}>{establishment.contact}</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
                            <Icon name="clock-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                            <Text style={{fontSize: 14, color: '#666'}}>{establishment.init_hour.substring(0,5)} às {establishment.finish_hour.substring(0,5)}</Text>
                        </View>
                    </View>

                </HeaderContainer>
                <EspacosContainer>
                    {establishment.spaces && establishment.spaces.map((v, i) => (
                        <Espaco key={i} onPress={() => navigation.push('EspacoDetalhe', { id: v.id, title: v.name })}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, color: '#f4511e'}}>
                                    {v.name}
                                </Text>
                                <Text style={{fontSize: 11, color: '#ccc'}}>
                                    R${v.price}
                                </Text>
                            </View>
                            <View style={{marginTop: 10, marginBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <View style={{alignSelf: 'flex-end'}}>
                                    <Text style={{color: '#666'}}>
                                        Modalidade: {v.sport.name}
                                    </Text>
                                    <Text style={{color: '#666', marginBottom: 10}}>
                                        Capacidade máxima: {v.capacity}
                                    </Text>
                                    <Text style={{fontSize: 12, color: '#bbb'}}>
                                        Clique aqui para alugar este espaço
                                    </Text>
                                </View>
                                <Image style={{borderRadius: 10, width: 120, height: 80}} resizeMethod="resize" source={{uri: `${Api.defaults.baseURL}files/${v.avatar.path}`}} />
                            </View>
                        </Espaco>
                    ))}
                        
                </EspacosContainer>
            </View>
        );
    } else {
        return (
            <View style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color="#f4511e" size={80}></ActivityIndicator>
            </View>
        );
    }
}

export default EstabelecimentoDetalhe;