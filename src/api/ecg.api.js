import axios from 'axios';

export const getUserData = (userId) =>{
   return axios.get(`http://192.168.100.79:8000/mediciones/api/v1/usuario/${userId}`);
}

export const getAllMeasurements = (username,accessToken) =>{
   const response = axios.get(`http://192.168.100.79:8000/registers/api/v1/user_mediciones/${username}`,{headers: {Authorization: `Bearer ${accessToken}`,}});
   return response;
}

export const getPacienteDatos = (userId) =>{
   const response = axios.get(`http://192.168.100.79:8000/register/api/v1/usuarios/${userId}`,{headers: {Authorization: `Bearer ${accessToken}`}},);
   return response;
} 

export const Logging = (username,password) =>{
   const response = axios.post(`http://192.168.100.79:8000/auth_log/login`,{"username":username,"password":password});
   return response
}