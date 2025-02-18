import {React,useState,useEffect} from "react";
import datosJson from '../../assets/appDirectories/Mediciones.json';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import {getAllMeasurements} from '../api/ecg.api';

const useDatosMedidos = () => {

    const [datos, setDatos] = useState([]);

    const fetchData = async() =>{
        const response = await getAllMeasurements("ceom1");
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