import {React,useState,useEffect} from "react";
import datosJson from '../../assets/appDirectories/Mediciones.json';
import {getAllMeasurements, GetPacientes} from '../api/ecg.api';
import {useAuth} from "./AuthContext";
const useDatosMedidos = () => {

    const [datos, setDatos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [sincro,setSincro] = useState(true);
    const {token,isLog,userDatos} = useAuth();

    const GetMediciones = async(username) =>{
		await getAllMeasurements(token,username).then((response) =>{
			const datos = response.data;
			setDatos(datos["mediciones"]);
		}).catch((error)=>{
			console.debug(error);
		});
    } 

    const GetMisPacientes = async (id) => {
		const response = await GetPacientes(token,id);
		const datos = response.data;
		setPacientes(datos["pacientes"]);
    }


    //const Measurements = datosJson.mediciones;// Esto debe ser una consult al backend
    useEffect(()=>{
		console.debug("[useDatosMedidos]");
		console.debug(pacientes)
		if(isLog && sincro){
			setDatos([]);
			GetMisPacientes(userDatos.user.id);
			setSincro(false);
		}else{
			setDatos([]);
		}
    },[isLog,sincro])

    return([
        datos,
        setDatos,
        setSincro,
		pacientes,
		GetMediciones,
    ]);
};
export default useDatosMedidos;