import {React,useState,useEffect} from "react";
import datosJson from '../../assets/appDirectories/Mediciones.json';
import {getAllMeasurements} from '../api/ecg.api';
import {useAuth} from "./AuthContext";
const useDatosMedidos = () => {

    const [datos, setDatos] = useState([]);
    const [sincro,setSincro] = useState(true);
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
      console.debug("[useDatosMedidos]");
      if(isLog && sincro){
        setDatos([]);
        fetchData();
        setSincro(false);
      }else{
        setDatos([]);
      }
    },[isLog,sincro])

    return([
        datos,
        setDatos,
        setSincro
    ]);
};
export default useDatosMedidos;