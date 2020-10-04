import React from 'react'
import styled from 'styled-components/native';

export const ScrollContainer = styled.KeyboardAvoidingView`
    padding: 15px;
    flex: 1;
`;

export const AluguelBox = styled.TouchableOpacity`
    background-color: #fff
    border-radius: 5px;
    padding: 5px;
    display: flex;
    margin-bottom: 12px;
`;


export const Word = styled.Text`
    color: ${props => props.fcolor || '#222'};
    font-size: ${props => props.fsize || '14px'};
`;

export const FilterContainer = styled.View`
    padding: 15px;
    background-color: #fff;
    marginBottom: 5px;
    padding: 15px;
    display: flex;
    flex-direction: row;
`;


export const FilterButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 25%;
    border-radius: 5px;
`;


export const FilterFormContainer = styled.ScrollView`
    padding: 15px;
`;

export const FilterInputView = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 35px;
`;

export const FilterFormInput = styled.TextInput`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    border: 1px solid black;
    flex: 1;
`;

export const AmigosContainer = styled.ScrollView`
    padding: 0px 12px;
    background-color: #f5f5f5;
    padding-top: 10px;
    padding-bottom: 30px;
`