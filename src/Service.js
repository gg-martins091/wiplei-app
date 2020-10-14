import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const Api = Axios.create({
    baseURL: 'http://192.168.15.13:2424/',//'http://192.168.15.13:2424/',
});


Api.interceptors.request.use(async config => {
    const user = JSON.parse(await AsyncStorage.getItem('userInfo'));

    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
});



export default Api