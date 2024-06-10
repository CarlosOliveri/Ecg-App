import React ,{useEffect}from "react";
import { View, Text } from 'react-native';
import RegistroShowStyles from "../styles/RegistroShowStyles";
import { useDatosContext } from "./useDatosContext";
import ChartHeart from './ChartHeart';

const HistoryShow =({route})=>{

    //const {datos,setDatos} = useDatosContext();
    const info = route.params.datos

    useEffect(()=>{
        console.log(info);
    })

    return(
        <>
            <View style = {RegistroShowStyles.container}>
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