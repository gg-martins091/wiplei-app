import React from 'react'
import styled from 'styled-components/native';

export const ScrollContainer = styled.ScrollView`
    padding: 10px 20px;
    background-color: #fff;
`;

export const Estabelecimento = styled.TouchableOpacity`
    border-radius: 5px;
    padding: 5px;
    border: 1px solid #efefef;
    display: flex;
    margin-bottom: 12px;
`;


export const Word = styled.Text`
    color: ${props => props.fcolor || '#000'};
    font-size: ${props => props.fsize || '14px'};
`;
