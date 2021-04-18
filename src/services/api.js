import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: 'http://192.168.1.4:3002',
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('&user-token');

    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  } catch (err) {
    console.log(err);
  }
});

export default api;