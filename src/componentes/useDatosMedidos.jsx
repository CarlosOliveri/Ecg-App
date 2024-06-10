import {React,useState,useEffect} from "react";
import datosJson from '../../assets/appDirectories/Mediciones.json';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const useDatosMedidos = () => {

    const Measurements = datosJson.mediciones;
    const [datos, setDatos] = useState(Measurements);
    useEffect(()=>{
        //console.debug(Measurements);
        /* AsyncStorage.setItem('mediciones', JSON.stringify(Measurements)).then(()=>{   //esto se debe cambiar mas adelante
          console.log("[Data UpLoad] Archivo Json Cargado con exito");
        }) */
        //console.log(AsyncStorage.getItem('mediciones'));
      },[])

    return([
        datos,
        setDatos
    ]);
};

export default useDatosMedidos;