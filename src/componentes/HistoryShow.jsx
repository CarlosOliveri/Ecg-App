import React ,{useEffect, useState}from "react";
import {StyleSheet, View, Text,ImageBackground,Image} from 'react-native';
import RegistroShowStyles from "../styles/RegistroShowStyles";
import { useDatosContext } from "./useDatosContext";
import ChartHeart from './ChartHeart';
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {getUserDatos,getPacienteDatos} from '../api/ecg.api';
import {useAuth} from './AuthContext';

const HistoryShow =({route})=>{
    const info = route.params.datos

    const {token,userDatos} = useAuth();

    return(
        
        <>
            <View style = {styles.principalContainer}>

                <View style ={styles.container} flexDirection = 'colum'>
                    <View style ={styles.line} flexDirection='row' alingIyems='stretch'>
                        <Image style ={styles.image} source={require('../../assets/ffiuna.png')}/>
                        <View flexDirection = 'colum'>
                            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.titulo}>Facultad de Ingeniería</Text>
                            <Text style={[styles.subT]}>Laboratorio de Innovacion Tecnológica</Text>
                        </View>
                        
                    </View>
                    <View style={[styles.linea, {marginTop:-10}]}></View>

                    <View flexDirection='row' position='relative' >
                        <Text style={[styles.caractT ,  { left: 10 }]}>Paciente: </Text>
                        <Text style={[styles.caractS ,  { left: 72 }]}>{userDatos.user.first_name}</Text>
                    </View>
                    <View flexDirection='row' position='relative'>
                        <Text style={[styles.caractT ,  { left: 10 }]}>C.I: </Text>
                        <Text style={[styles.caractS ,  { left: 33 }]}>{userDatos.datosUser.cedula}</Text>

                        <Text style={[styles.caractTs ,  { left: 200 }]} >Fecha: </Text>
                        <Text style={[styles.caractS ,  { left: 245 }]}>{info.fecha}</Text>
                    </View>

                    <View flexDirection='row' position='relative'>
                        <Text style={[styles.caractT ,  { left: 10 }]} >Edad: </Text>
                        <Text style={[styles.caractS ,  { left: 48 }]}>{userDatos.datosUser.edad}</Text>
                        <Text style={[styles.caractS ,  { left: 75 }]}>años</Text>

                        <Text style={[styles.caractTs ,  { left: 200 }]} >Peso: </Text>
                        <Text style={[styles.caractS ,  { left: 238 }]}>{userDatos.paciente.peso}</Text>
                        <Text style={[styles.caractS ,  { left: 265 }]}>kg</Text>
                    </View>

                    <View flexDirection='row' position='relative'>
                        <Text style={[styles.caractT ,  { left: 10 }]}>Sexo: </Text>
                        <Text style={[styles.caractS ,  { left: 48 }]}>{userDatos.datosUser.sexo}</Text>

                        <Text style={[styles.caractTs ,  { left: 200 }]} >Altura: </Text>
                        <Text style={[styles.caractS ,  { left: 243 }]}>{userDatos.paciente.altura}</Text>
                        <Text style={[styles.caractS ,  { left: 268 }]}>cm</Text>
                    </View>
                    <View style={[styles.linea, {marginTop:10}]}></View>
                    <View >
                        <Text style={[styles.titulo,{marginTop:5,textAlign:'center',fontWeight:'normal'}]}>Registro de Actividad</Text>
                    </View>
                    <View flexDirection='row' position='relative'>
                        <Text style={[styles.caractT , {fontSize: 11, left: 10 }]}>Actividad: </Text>
                        <Text style={[styles.caractS ,{fontSize: 11, left: 61 }]}>{info.actividad}</Text>

                        <Text style={[styles.caractTs ,{fontSize: 11, left: 140 }]} >Intensidad: </Text>
                        <Text style={[styles.caractS ,{fontSize: 11, left: 198 }]}>{info.intensidad}</Text>

                        <Text style={[styles.caractTs ,{fontSize: 11, left: 245 }]} >Duración: </Text>
                        <Text style={[styles.caractS ,{fontSize: 11, left: 295 }]}>{info.duracion} min</Text>

                    </View>
                    <View flexDirection='row'>
                        <FontAwesome5 name="heartbeat" size={30} style={styles.Icon} />
                        <Text style={[styles.BPM]}>{info.bpm} BPM</Text>
                    </View>

                    <View style = {RegistroShowStyles.chartHeart}>
                    <ChartHeart
                        data = {JSON.parse(info.datos)}/>
                    </View>

                </View>
               {/* <Text style = {RegistroShowStyles.text}>
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
                </Text>*/}
            </View>

                {/*<View style = {RegistroShowStyles.chartHeart}>
                    <ChartHeart
                    data = {info.datos_medicion}/>
                </View>
                <Text style = {RegistroShowStyles.text}>
                    {info.datos_medicion.map((element)=>{
                        return(<Text>{element.value}</Text>)
                    })}
                </Text> */}
        </>
    );
}

const styles = StyleSheet.create({
    Icon:{
        marginLeft:'33%',
        marginTop:18,
        color:'#1A5276',
    },
    BPM:{
        fontSize: 20,
        marginTop:20,
        marginLeft:10,
        //fontWeight:'bold',
        color:'#1A5276',
        textAlign: 'left',
    },
    titulo:{
        fontSize: 24,
        marginTop:20,
        marginLeft:-15,
        paddingHorizontal:10,
        //fontWeight:'bold',
        color:'#1A5276',
        textAlign: 'left',
    },
    subT:{
        fontSize: 11,
        fontStyle: 'italic',
        marginLeft:-15,
        marginTop:-2,
        paddingHorizontal:10,
        //fontWeight:'bold',
        color:'black',
        textAlign: 'left',
    },
    principalContainer:{
        //backgroundColor:'red',
        //width:400,
        alignItems: 'center',
    },
    container:{
        width: '95%',
        height: '95%',
        borderRadius : 20,
        backgroundColor : 'white',
        elevation:5,
        marginVertical:15,
    },
    linea:{
        width: '95%',
        height: 3,
        marginLeft:'3%',
       // borderWidth : 5,
       // borderColor : '#FF4646',
        borderRadius : 1.5,
        backgroundColor : '#1A5276',
        marginTop:0,
    },
    line:{
        width: 300,
    },
    image:{
        width:80,
        height:80,
        resizeMode:'cover',
        borderRadius:45,
    },
    caractT:{
        fontSize: 14,
        textAlign:'center',
        marginTop:10,
        fontWeight:'bold',
        color:'black'
    },
    caractTs:{
         position: 'absolute',
         fontSize: 14,
         textAlign:'center',
         marginTop:10,
         fontWeight:'bold',
         color:'black'
     },
    caractS:{
        position: 'absolute',
        fontSize: 14,
        textAlign:'center',
        marginTop:10,
        color:'black',
    },
});
export default HistoryShow;