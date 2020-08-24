import React from 'react'
import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
    align-items: center;
    padding: 15px 35px;
    background-color: white;
`;

export const EspacosContainer = styled.ScrollView`
    display: flex;
    padding: 15px;
`;

export const Espaco = styled.TouchableOpacity`
    background-color: #fff
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    margin-bottom: 12px;
`;