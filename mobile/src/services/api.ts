import axios from 'axios';

const API = axios.create({
    baseURL: 'http:///192.168.2.105:3033'
})

export default API;