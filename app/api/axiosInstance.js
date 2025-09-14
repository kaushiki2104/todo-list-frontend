import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:"http://10.185.22.200:8080/api/v1",
    // baseURL:"https://todo-list-backend-green.vercel.app/api/v1",
    headers:{
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    async config => {
 try{
        const token = await AsyncStorage.getItem('token')
       if(token){
        config.headers.Authorization = `Bearer ${token}`
       } 
 }catch(error){
    console.log("storage error",error)
 }
 return config;
    },error =>{
        return Promise.reject(error)
    }
)

export default axiosInstance;