import styled from 'styled-components/native';

export const Header = styled.View`
    padding: 5px 10px 8px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    
`;

export const DateBox = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #e4e9f2;
    padding: 10px;
    padding-right: 15px;
    border-left-width: 0px;
    border-top-width: 0px;
    border-bottom-width: 0px;
`

export const TitleBox = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 8px;
    padding-left: 15px;
` 
export const HeaderTop = styled.View`
    padding: 5px 10px;
    background-color: #fff;
    marginBottom: 5px;
    display: flex;
    flex-direction: row;
`;

export const Chat = styled.ScrollView`
    padding: 0px 12px;
    background-color: #f5f5f5;
    padding-top: 10px;
    padding-bottom: 10px;
`

export const ChatMsg = styled.View`
    background-color: ${props => props.mine ? 'rgba(244, 81, 30, .2)' : 'white'};
    max-width: 90%;
    border-radius: 8px;
    padding: 5px 10px;
    margin-bottom: 5px;
    align-self: ${props => props.mine ? 'flex-end' : 'flex-start'}    
`

export const Input = styled.TextInput`
    width: 90%;
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid #ddd;
`

export const ChatInputContainer = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    background-color: #eaeaea;
`