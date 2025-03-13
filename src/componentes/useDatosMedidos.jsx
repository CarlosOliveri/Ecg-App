import {React,useState,useEffect} from "react";
import datosJson from '../../assets/appDirectories/Mediciones.json';
import {getAllMeasurements} from '../api/ecg.api';
import { useAuth } from "./AuthContext";
const useDatosMedidos = () => {

    const [datos, setDatos] = useState([]);
    const {token} = useAuth();

    const fetchData = async() =>{
        const response = await getAllMeasurements(token,'ceom1');
        const datos = response.data;
        setDatos(datos["mediciones"]);
      }

    //const Measurements = datosJson.mediciones;// Esto debe ser una consult al backend
    useEffect(()=>{
      fetchData();
    },[])

    return([
        datos,
        setDatos
    ]);
};
export default useDatosMedidos;