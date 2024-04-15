import React ,{useEffect}from "react";
import { View, Text } from 'react-native';
import RegistroShowStyles from "../styles/RegistroShowStyles";

const RegistroShow =({route})=>{

    const datos = route.params.datos

    useEffect(()=>{
        console.log(datos);
    })

    return(
        <>
            <View style = {RegistroShowStyles.container}>
                <Text style = {RegistroShowStyles.text}>
                    {datos.num}:{datos.actividad}
                </Text>
            </View>
        </>
    );
}
export default RegistroShow;