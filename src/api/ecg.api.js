import axios from 'axios';
//IP = "172.16.253.141"
IP = "192.168.100.146"

export const getUserDatos = (accessToken,userId) =>{
   return axios.get(`http://${IP}:8000/auth_log/usuarios/${userId}`,{headers:{Authorization: `Bearer ${accessToken}`}});
}

export const getAllMeasurements = (accessToken,username) =>{
   const response = axios.get(`http://${IP}:8000/registers/api/v1/user_mediciones/${username}`,{headers: {Authorization: `Bearer ${accessToken}`,}});
   return response;
}

export const getPacienteDatos = (accessToken,userId) =>{
   const response = axios.get(`http://${IP}:8000/registers/api/v1/pacientes/${userId}`,{headers: {Authorization: `Bearer ${accessToken}`}},);
   return response;
} 

export const getDoctorDatos = (accessToken,userId) =>{
   const response = axios.get(`http://${IP}:8000/registers/api/v1/doctor/${userId}`,{headers: {Authorization: `Bearer ${accessToken}`}},);
   return response;
} 

export const LoginRequest = (username,password) =>{
   const response = axios.post(`http://${IP}:8000/auth_log/login`,{"username":username,"password":password});
   return response
}

export const RegisterRequest = (objectJson) =>{
   const response = axios.post(`http://${IP}:8000/auth_log/register`,objectJson);
   return response
}

