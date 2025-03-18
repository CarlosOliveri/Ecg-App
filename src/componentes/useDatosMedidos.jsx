import {React,useState,useEffect} from "react";
import datosJson from '../../assets/appDirectories/Mediciones.json';
import {getAllMeasurements} from '../api/ecg.api';
import { useAuth } from "./AuthContext";
const useDatosMedidos = () => {

    const [datos, setDatos] = useState([]);
    const {token,isLog,userDatos} = useAuth();

    const fetchData = async() =>{
		try{
			const response = await getAllMeasurements(token,userDatos.user.username);
			const datos = response.data;
			setDatos(datos["mediciones"]);
		}catch{
			console.debug("[useDatosMedidos]" + response.data["mensaje"]);
		}
    } 

    //const Measurements = datosJson.mediciones;// Esto debe ser una consult al backend
    useEffect(()=>{
      if(isLog){
        fetchData();
      }
    },[isLog])

    return([
        datos,
        setDatos
    ]);
};
export default useDatosMedidos;