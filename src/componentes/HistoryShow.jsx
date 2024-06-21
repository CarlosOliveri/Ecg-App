import React ,{useEffect, useState}from "react";
import { View, Text } from 'react-native';
import RegistroShowStyles from "../styles/RegistroShowStyles";
import { useDatosContext } from "./useDatosContext";
import ChartHeart from './ChartHeart';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryShow =({route})=>{

    const [user,setUser] = useState({
        "nombre": null,
        "edad": null,
        "peso": null,
        "altura": null,
        "sexo": null,});
    //const {datos,setDatos} = useDatosContext();
    const info = route.params.datos

    useEffect(()=>{
        //console.debug(info);
        const getUser = async () => {
            const userRegistered = await AsyncStorage.getItem('User');
            setUser(userRegistered ? JSON.parse(userRegistered) : null);
        }
        getUser();
    },[])

    return(
        <>
            <View style = {RegistroShowStyles.container}>
                <Text style = {RegistroShowStyles.text}>
                    {user.nombre}-{user.edad}
                </Text>
                <Text style = {RegistroShowStyles.text}>
                    {user.sexo}-{user.altura}-{user.peso}
                </Text>
                <Text style = {RegistroShowStyles.text}>
                    {info.num}:{info.actividad}
                </Text>
                <Text style = {RegistroShowStyles.text}>
                    intensidad:  {info.intensidad}
                </Text>
                <Text style = {RegistroShowStyles.text}>
                    {info.fecha}/{info.hora}
                </Text>
                <Text style = {RegistroShowStyles.text}>
                    {info.tiempo_actividad_minutos} min
                </Text>
            </View>

                <View style = {RegistroShowStyles.chartHeart}>
                    <ChartHeart
                    data = {info.datos_medicion}/>
                </View>
                {/* <Text style = {RegistroShowStyles.text}>
                    {info.datos_medicion.map((element)=>{
                        return(<Text>{element.value}</Text>)
                    })}
                </Text> */}
        </>
    );
}
export default HistoryShow;