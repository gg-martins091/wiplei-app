import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Api from '../../Service';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { getDay, getMonth, getYear, parseISO } from 'date-fns';
import { HeaderContainer } from './styles';
import {Picker} from '@react-native-community/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions } from '@react-navigation/native';


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

const EspacoDetalhe = ({navigation, route}) => {
    const [details, setDetails] = useState();
    const [selected, setSelected] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [selectedDayOfWeek, setSelectedDayOfWeekState] = useState();
    const [selectedSchedule, setSelectedSchedule] = useState();
    const [daySchedules, setDaySchedules] = useState([]);

    useEffect(() => {
        async function getDetails() {
            try {
                const d = await Api.get(`/spaces/${route.params.id}`);
                if (d) {
                    setDetails(d.data);
                    setSchedules(d.data.schedule);
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

    async function setSelectedDayOfWeek(d, day) {
        setSelectedDayOfWeekState(d);
        const schedules = await Api.get(`schedules/available/${route.params.id}/${d}/${day}`);
        const data = schedules.data.filter(x => {
            return x.available == true
        });
        setDaySchedules(data);
    }

    if (details) {
        return (
            <View style={{backgroundColor: '#fff', height: '100%'}}>
                <HeaderContainer>
                    <Image style={{borderRadius: 10, width: 200, height: 100}} resizeMethod="resize" source={{uri: `${Api.defaults.baseURL}files/${details.avatar.path}`}} />
                    <Text style={{fontSize: 22, color: '#f4511e'}}>{details.name}</Text>
                    <Text style={{fontSize: 14, color: '#888'}}>{details.sport.name}</Text>
                    <Text style={{fontSize: 12, color: '#888', textAlign: 'center'}}>R${details.price}</Text>

                </HeaderContainer>
            
                <Calendar
                    current={new Date()}
                    minDate={new Date()}
                    onDayPress={(day) => {
                        setSelectedDayOfWeek(getDay(parseISO(day.dateString)), day.dateString);
                        setSelected(day.dateString);
                    }}
                    monthFormat={'yyyy MM'}
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
                
                {daySchedules.length == 0 && 
                    <View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'auto',
                        paddingTop: 50
                    }}>
                        <Text style={{
                            color: "#f4511e",
                            fontSize: 16
                        }}>Selecione um dia para ver os horários disponíveis.</Text>
                    </View>
                }
                
                {daySchedules.length > 0 &&
                    <View style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 30,
                        backgroundColor: '#fff'
                    }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                color: "#f4511e",
                                fontSize: 16,
                                paddingTop: 12,
                                marginRight: 10
                            }}>Horário: </Text>
                            <Picker
                                mode="dialog"
                                selectedValue={selectedSchedule}
                                style={{
                                    height: 50,
                                    color: '#666',
                                    textAlign: 'center',
                                    marginBottom: 30,
                                    width:190,
                                    borderRadius: 20,

                                }}
                                mode='dropdown'
                                onValueChange={(v) => {
                                    if (v != selectedSchedule) {
                                        setSelectedSchedule(v);
                                    }
                                }}
                                key={schedules.length}
                            >
                                <Picker.Item key={999} label="Selecione" value={0} />
                                {daySchedules.map((v,i) => {
                                    return (<Picker.Item key={i} label={`${v.init_hour.substring(0, 5)} - ${v.finish_hour.substring(0,5)}`} value={v.schedule_id} />)
                                })}
                            </Picker>
                        </View>
                        <TouchableOpacity
                            style={{
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                backgroundColor: '#f4511e'
                            }}
                            onPress={async () => {
                                if (selectedSchedule && selected) {
                                    const data = await Api.post(`rents`, {
                                        schedule_id: selectedSchedule,
                                        rent_date: selected
                                    });

                                    if (data.data.id) {
                                        navigation.dispatch(
                                            StackActions.replace('Alugueis')
                                        );
                                    }
                                }
                            }}

                        >
                            <Text style={{color: 'white'}}>Alugar</Text>
                        </TouchableOpacity>
                    </View>
                    
                }
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