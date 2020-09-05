import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { HeaderContainer, EspacosContainer, Espaco } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Api from '../../Service';

const EstabelecimentoDetalhe = ({route}) => {
    let [infoExpanded, setInfoExpanded] = useState(false);
    let [establishment, setEstablishment] = useState({});

    useEffect(() => {
        async function getEstablishment() {
            const es = await Api.get(`/establishments/${route.params.id}`);
            console.log(es);
        }
    }, []);
    return (
        <View>
            <HeaderContainer>
                <Image style={{borderRadius: 10, width: 200, height: 100}} resizeMethod="resize" source={require('../../../assets/quadra.jpg')} />
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
                    <Icon name="star" size={20} color="#f4511e" />
                    <Text style={{fontSize: 14, color: '#888'}}>4.5</Text>
                    <Text style={{marginLeft: 20, fontSize: 14, color: '#888'}}>6 km de distância</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
                    <Text style={{fontSize: 16, color: '#333'}}>Eleven Quadras de Futebol</Text>
                </View>
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
                            <Text style={{fontSize: 14, color: '#666'}}>Avenida Miruna, 590</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
                            <Icon name="chat-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                            <Text style={{fontSize: 14, color: '#666'}}>Alugue quadras de society. As melhores quadras da zona sul.</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 8}}>
                            <Icon name="check-circle-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                            <Text style={{fontSize: 14, color: '#666'}}>Aberto agora</Text>
                        </View>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Icon name="alert-circle-outline" size={20} color="#f4511e" style={{marginRight: 10}}/>
                            <Text style={{fontSize: 14, color: '#666'}}>Fechado agora</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{padding: 5}} onPress={() => setInfoExpanded(!infoExpanded)}>
                        <Icon name="chevron-up" size={20} color="#555" style={{padding: 0}}/>
                    </TouchableOpacity>
                    </>}

            </HeaderContainer>
            <EspacosContainer>
                    <Espaco>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, color: '#f4511e'}}>
                                Quadra Society 1
                            </Text>
                            <Text style={{fontSize: 11, color: '#ccc'}}>
                                R$300/hora
                            </Text>
                        </View>
                        <View style={{marginTop: 10, marginBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{alignSelf: 'flex-end'}}>
                                <Text style={{color: '#222'}}>
                                    Horários: das 9h até 00h
                                </Text>
                                <Text style={{fontSize: 12, color: '#bbb'}}>
                                    Clique aqui para alugar este espaço
                                </Text>
                            </View>
                            <Image style={{borderRadius: 10, width: 120, height: 80}} resizeMethod="resize" source={require('../../../assets/quadra.jpg')} />

                        </View>
                    </Espaco>


                    <Espaco>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, color: '#f4511e'}}>
                                Quadra Society 1
                            </Text>
                            <Text style={{fontSize: 11, color: '#ccc'}}>
                                R$300/hora
                            </Text>
                        </View>
                        <View style={{marginTop: 10, marginBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{alignSelf: 'flex-end'}}>
                                <Text style={{color: '#222'}}>
                                    Horários: das 9h até 00h
                                </Text>
                                <Text style={{fontSize: 12, color: '#bbb'}}>
                                    Clique aqui para alugar este espaço
                                </Text>
                            </View>
                            <Image style={{borderRadius: 10, width: 120, height: 80}} resizeMethod="resize" source={require('../../../assets/quadra.jpg')} />

                        </View>
                    </Espaco>


                    
                    <Espaco>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, color: '#f4511e'}}>
                                Quadra Society 1
                            </Text>
                            <Text style={{fontSize: 11, color: '#ccc'}}>
                                R$300/hora
                            </Text>
                        </View>
                        <View style={{marginTop: 10, marginBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{alignSelf: 'flex-end'}}>
                                <Text style={{color: '#222'}}>
                                    Horários: das 9h até 00h
                                </Text>
                                <Text style={{fontSize: 12, color: '#bbb'}}>
                                    Clique aqui para alugar este espaço
                                </Text>
                            </View>
                            <Image style={{borderRadius: 10, width: 120, height: 80}} resizeMethod="resize" source={require('../../../assets/quadra.jpg')} />

                        </View>
                    </Espaco>


                    <Espaco>
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, color: '#f4511e'}}>
                                Quadra Society 1
                            </Text>
                            <Text style={{fontSize: 11, color: '#ccc'}}>
                                R$300/hora
                            </Text>
                        </View>
                        <View style={{marginTop: 10, marginBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{alignSelf: 'flex-end'}}>
                                <Text style={{color: '#222'}}>
                                    Horários: das 9h até 00h
                                </Text>
                                <Text style={{fontSize: 12, color: '#bbb'}}>
                                    Clique aqui para alugar este espaço
                                </Text>
                            </View>
                            <Image style={{borderRadius: 10, width: 120, height: 80}} resizeMethod="resize" source={require('../../../assets/quadra.jpg')} />

                        </View>
                    </Espaco>


                    
            </EspacosContainer>
        </View>
    );
}

export default EstabelecimentoDetalhe;