import React from 'react'
import styled from 'styled-components/native';

export const ScrollContainer = styled.ScrollView`
    padding: 15px;
`;

export const Estabelecimento = styled.TouchableOpacity`
    background-color: #fff
    border-radius: 5px;
    padding: 5px;
    display: flex;
    margin-bottom: 12px;
`;


export const Word = styled.Text`
    color: ${props => props.fcolor || '#000'};
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