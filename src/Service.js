import Axios from 'axios';

const Api = Axios.create({
    baseURL: 'http://192.168.15.12:2424/',
});

export default Api