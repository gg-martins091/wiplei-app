import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Api from '../../Service';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {getMonth, getYear} from 'date-fns';
import { HeaderContainer } from './styles';

LocaleConfig.locales['br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan','Fev.','MAr','Abr','Mai','Jun','Jul','Ago','Set.','Out','Nov','Dez'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: 'Hoje'
  };
  LocaleConfig.defaultLocale = 'br';

const months = {
    0: 'Janeiro',
    1: 'Fevereiro',
    2: 'Março',
    3: 'Abril',
    4: 'Maio',
    5: 'Junho',
    6: 'Julho',
    7: 'Agosto',
    8: 'Setembro',
    9: 'Outubro',
    10: 'Novembro',
    11: 'Dezembro'
}

const EspacoDetalhe = ({route}) => {
    const [details, setDetails] = useState();
    const [selected, setSelected] = useState('');

    useEffect(() => {
        async function getDetails() {
            try {
                const d = await Api.get(`/spaces/${route.params.id}`);
                if (d) {
                    setDetails(d.data);
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
        getDetails();

    }, [])

    if (details) {
        return (
            <View>
                <HeaderContainer>
                    <Image style={{borderRadius: 10, width: 200, height: 100}} resizeMethod="resize" source={{uri: `${Api.defaults.baseURL}files/${details.avatar.path}`}} />
                    <Text style={{fontSize: 22, color: '#f4511e'}}>{details.name}</Text>
                    <Text style={{fontSize: 14, color: '#888'}}>{details.sport.name}</Text>
                    <Text style={{fontSize: 12, color: '#888', textAlign: 'center'}}>R${details.price}</Text>

                </HeaderContainer>
            
                <Calendar
                    current={new Date()}
                    minDate={new Date()}
                    onDayPress={(day) => {setSelected(day.dateString)}}
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    monthFormat={'yyyy MM'}
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    hideArrows={false}
                    hideExtraDays={true}
                    firstDay={1}
                    hideDayNames={false}
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    onPressArrowRight={addMonth => addMonth()}
                    disableArrowLeft={true}
                    disableArrowRight={true}
                    markedDates={{
                        [selected]: {
                          selected: true,
                          disableTouchEvent: true,
                          selectedColor: 'orange',
                          selectedTextColor: 'red',
                        },
                    }}
                    disableAllTouchEventsForDisabledDays={true}
                    theme={{
                        calendarBackground: 'white',
                        textSectionTitleColor: 'black',
                        textSectionTitleDisabledColor: 'black',
                        dayTextColor: 'black',
                        todayTextColor: '#f4511e',
                        selectedDayTextColor: 'white',
                        monthTextColor: 'red',
                        indicatorColor: 'red',
                        selectedDayBackgroundColor: 'black',
                        arrowColor: 'red',
                    }}
                    renderHeader={(date) => {
                        return (
                            <View>
                                <Text style={{color: 'black', fontSize: 18}}>{months[getMonth(new Date(date))]} de {getYear(new Date(date))}</Text>
                            </View>
                        );
                    }}
                    enableSwipeMonths={true}
                />

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

export default EspacoDetalhe;