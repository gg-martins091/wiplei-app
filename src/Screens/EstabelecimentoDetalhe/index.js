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
                const es = await Api.get(`/establishments/${route.params.id}`);
                if (es) {
                    let openTime = new Date();
                    openTime.setHours(es.data.open_hours.substring(0,2) -3, es.data.open_hours.substring(3,5), "00", "00");
                    let closeTime = new Date();
                    closeTime.setHours(es.data.close_hours.substring(0,2) -3, es.data.close_hours.substring(3,5), "00", "00");
                    let now = new Date();
                    now.setSeconds("00", "00");

                    setEstablishment({...es.data, open: now >= openTime && now < closeTime});
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
                console.log(e);
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
                        {!establishment.open && 
                            <View style={{borderRadius: 10, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200, height: 100, backgroundColor: 'rgba(100,100,100,0.8)'}}>
                                <Text style={{fontWeight: '500', fontSize: 16, letterSpacing: 1, color: "#f4511e"}}>Fechado</Text>
                                <Text style={{marginTop: 8, fontWeight: '500', fontSize: 10, letterSpacing: 1, color: "#fff"}}>Abre normalmente às {establishment.open_hours.substring(0,5)}</Text>
                            </View>
                        }
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 10, marginBottom: 20, justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{marginRight: 20, fontSize: 16, color: '#888'}}>{establishment.name}</Text>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Icon name="star" size={20} color="#f4511e" />
                            <Text style={{fontSize: 12, color: '#888', textAlign: 'center'}}>{establishment.stars}</Text>
                        </View>
                    </View>
                    {!establishment.open && 
                        <View style={{borderRadius: 5, display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(100,255,100,0.3)', padding: 10, alignItems: 'center'}}>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Icon name="check-circle-outline" size={20} color="#f4511e" style={{marginRight: 5}}/>
                                <Text style={{marginBottom: 5}}>Garanta seu horário agora mesmo!</Text>
                            </View>
                            <Text style={{textAlign: 'center', color: '#666', fontSize: 12, color: "#666"}}>
                                Apesar do estabelecimento estar fechado neste momento, você ainda pode realizar reservas.
                            </Text>
                        </View>
                    }

                    {!infoExpanded && 
                    <TouchableOpacity style={{padding: 5}} onPress={() => setInfoExpanded(!infoExpanded)}>
                        <Icon name="chevron-down" size={20} color="#555" style={{padding: 0}}/>
                    </TouchableOpacity>
                    }
                    
                    {infoExpanded && 
                        <>
                        <View style={{display: 'flex', alignItems: 'flex-start', alignSelf: 'flex-start', marginTop: 15}}>
                            <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
                                <Icon name="home-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                                <Text style={{fontSize: 14, color: '#666'}}>{establishment.address}</Text>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
                                <Icon name="phone-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                                <Text style={{fontSize: 14, color: '#666'}}>{establishment.contact}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{padding: 5}} onPress={() => setInfoExpanded(!infoExpanded)}>
                            <Icon name="chevron-up" size={20} color="#555" style={{padding: 0}}/>
                        </TouchableOpacity>
                        </>}    

                </HeaderContainer>
                <EspacosContainer>
                    {establishment.spaces && establishment.spaces.map((v, i) => (
                        <Espaco key={i}>
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
                                {console.log(v.avatar)}
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