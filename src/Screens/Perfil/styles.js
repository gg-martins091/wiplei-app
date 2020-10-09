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


export const ModalContainer = styled.View`
  flex: 1;
  backgroundColor: #FFF;
`;

export const ModalImagesListContainer = styled.View``;

export const ModalImagesList = styled.ScrollView`
  paddingHorizontal: 20px;
  paddingTop: 20px;
`;

export const ModalImageItem = styled.Image`
  height: 100px;
  width: 100px;
  marginRight: 10px;
`;

export const ModalButtons = styled.View`
  paddingHorizontal: 10px;
  paddingVertical: 5px;
  flexDirection: row;
  justifyContent: space-between;
`;

export const CameraButtonContainer = styled.TouchableHighlight`
  paddingVertical: 20px;
  paddingHorizontal: 40px;
`;

export const CancelButtonText = styled.Text`
  color: #333;
  fontSize: 18px;
  fontWeight: bold;
`;

export const ContinueButtonText = styled.Text`
  color: #fc6663;
  fontSize: 18px;
  fontWeight: bold;
`;

export const TakePictureButtonContainer = styled.TouchableHighlight`
  position: absolute;
  alignSelf: center;
  bottom: 20;
  width: 60px;
  height: 60px;
  backgroundColor: #FFF;
  borderRadius: 30px;
  alignItems: center;
  justifyContent: center;
`;

export const TakePictureButtonLabel = styled.View`
  width: 52px;
  height: 52px;
  borderRadius: 26px;
  backgroundColor: #fc6663;
`;