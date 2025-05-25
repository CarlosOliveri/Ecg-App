import axios from 'axios';
//IP = "172.16.253.141"
//IP = "192.168.100.146"
IP = " 192.168.0.6"

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
   return response;
}

export const RegisterRequest = (objectJson) =>{
   const response = axios.post(`http://${IP}:8000/auth_log/register`,objectJson);
   return response;
}

export const SaveMedition = (objectJson,username) => {
   const response = axios.post(`http://${IP}:8000/registers/api/v1/post_medicion/${username}`,objectJson);
   return response;
}

export const DeleteMedition = (id) => {
   const response = axios.delete(`http://${IP}:8000/registers/api/v1/delete_medicion/${id}`);
   return response;
}

export const GetPacientes = (accessToken,id) => {
   const response = axios.get(`http://${IP}:8000/registers/api/v1/get_pacientes/${id}`);
   return response;
}