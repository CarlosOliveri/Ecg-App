import axios from 'axios';

export const getUserDatos = (accessToken,userId) =>{
   return axios.get(`http://192.168.100.79:8000/mediciones/api/v1/usuario/${userId}`,{headers:{Authorization: `Bearer ${accessToken}`}});
}

export const getAllMeasurements = (username,accessToken) =>{
   const response = axios.get(`http://192.168.100.79:8000/registers/api/v1/user_mediciones/${username}`,{headers: {Authorization: `Bearer ${accessToken}`,}});
   return response;
}

export const getPacienteDatos = (accessToken,userId) =>{
   const response = axios.get(`http://192.168.100.79:8000/register/api/v1/usuarios/${userId}`,{headers: {Authorization: `Bearer ${accessToken}`}},);
   return response;
} 

export const LoginRequest = (username,password) =>{
   const response = axios.post(`http://192.168.100.79:8000/auth_log/login`,{"username":username,"password":password});
   return response
}

