import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

 import { ScrollContainer, Estabelecimento, Word } from './styles';

const Estabelecimentos = () => {
    let [items, setItems] = useState([]);

    useEffect(() => {
        setItems([
            {
                name: 'KTrop Paintball e Airsoft',
                rating: 4.5,
                distance: 6.2,
                openTime: '8am',
                closeTime: '9pm',
                address: 'Avenida Mirudsdsdsdsdsdsdsdsna, 204',
                img: require('../../../assets/paintball.jpg')
            },
            {
                name: 'Eleven Futebol',
                rating: 4.9,
                distance: 3.3,
                openTime: '9am',
                closeTime: '00pm',
                address: 'Rua dos Gansos, 982',
                img: require('../../../assets/futebol.jpg')

            },
            {
                name: 'Quadras de Basquete C8',
                rating: 4.1,
                distance: 4.9,
                openTime: '9am',
                closeTime: '20pm',
                address: 'Rua Clemente Pereira, 1870',
                img: require('../../../assets/paintball.jpg')

            },
            {
                name: 'KTrop Paintball e Airsoft',
                rating: 4.5,
                distance: 6.2,
                openTime: '8am',
                closeTime: '9pm',
                address: 'Avenida Mirudsdsdsdsdsdsdsdsna, 204',
                img: require('../../../assets/paintball.jpg')
            },
            {
                name: 'Eleven Futebol',
                rating: 4.9,
                distance: 3.3,
                openTime: '9am',
                closeTime: '00pm',
                address: 'Rua dos Gansos, 982',
                img: require('../../../assets/futebol.jpg')

            },
            {
                name: 'Quadras de Basquete C8',
                rating: 4.1,
                distance: 4.9,
                openTime: '9am',
                closeTime: '20pm',
                address: 'Rua Clemente Pereira, 1870',
                img: require('../../../assets/paintball.jpg')

            },
            {
                name: 'KTrop Paintball e Airsoft',
                rating: 4.5,
                distance: 6.2,
                openTime: '8am',
                closeTime: '9pm',
                address: 'Avenida Mirudsdsdsdsdsdsdsdsna, 204',
                img: require('../../../assets/paintball.jpg')
            },
            {
                name: 'Eleven Futebol',
                rating: 4.9,
                distance: 3.3,
                openTime: '9am',
                closeTime: '00pm',
                address: 'Rua dos Gansos, 982',
                img: require('../../../assets/futebol.jpg')

            },
            {
                name: 'Quadras de Basquete C8',
                rating: 4.1,
                distance: 4.9,
                openTime: '9am',
                closeTime: '20pm',
                address: 'Rua Clemente Pereira, 1870',
                img: require('../../../assets/paintball.jpg')

            },

        ])
    }, []);
    

    return (
        <ScrollContainer style={{paddingTop: 15}}>
            {items.length < 1 && <Text>Não há estabalecimentos para serem exibidos.</Text>}
            {items.length > 0 && items.map((i, k) => (
                <Estabelecimento key={k}>
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
                </Estabelecimento>
            ))
            }
            
        </ScrollContainer>
    );
}

export default Estabelecimentos;