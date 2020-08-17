import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native'; 

import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

// import { Container } from './styles';
import { AuthContext } from '../../Contexts';

const LogoutHeader = () => {
    const { signOut } = useContext(AuthContext);
    return (
        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => signOut()}>
            <IconMaterialCommunity name="logout" size={30} style={{ color: '#fff' }} />
        </TouchableOpacity>
    )
}

export default LogoutHeader;