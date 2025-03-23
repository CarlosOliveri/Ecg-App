import React ,{useEffect, useReducer} from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Dimensions,Image,ImageBackground ,TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation,useIsFocused } from '@react-navigation/native';
import Login from "./Login";
import {useAuth} from './AuthContext';
import { getPacienteDatos, getUserDatos } from "../api/ecg.api";


const UserShow = () =>{

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const {isLog, setIsLog,logout,userDatos,setUserDatos,setToken,token} = useAuth();

    useEffect(() => {
        console.debug("[userShow]");
        const fetchData = async () => {
            try {
                // Obtener el valor almacenado en AsyncStorage
                //const userRegistered = await AsyncStorage.getItem('User');
                //setUserDatos(userRegistered ? JSON.parse(userRegistered) : null);
                //console.debug(userRegistered);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    },[token]);

    const handleLogOut = () =>{
        setIsLog(false);
        logout();
        navigation.navigate("userLogin");
    }

    const handleEditPerfil = () =>{
        navigation.navigate("userEdit");
    }

    return (
        <View style={styles.pincipalContainer}>
            <TouchableOpacity
                style={styles.touchableEditar}
                onPress={()=>{handleEditPerfil()}}>
                <Text style={styles.textButton}>Editar</Text>
            </TouchableOpacity>
            <ImageBackground style ={styles.fondo} resizeMode="cover" source={require('../../assets/fondo.png')} >
                <View style ={styles.container} flexDirection = 'colum'>
                    <View style ={styles.line} flexDirection='row'  paddingRight={50} alingIyems='stretch'>
                        <Image style ={styles.image} source={{uri:"https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg" }}/>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.nombre}>{userDatos.user.first_name}</Text>
                    </View>
                    <View flexDirection='row'>
                        <Text style={styles.caractT}>C.I: </Text>
                        <Text style={styles.caractS}>{userDatos.datosUser.cedula}</Text>
                    </View>
                    <View flexDirection='row'>
                        <Text style={styles.caractT}>Edad: </Text>
                        <Text style={styles.caractS}>{userDatos.datosUser.edad}</Text>
                        <Text style={styles.caractS}>años</Text>
                    </View>
                
                    <View flexDirection='row'>
                        <Text style={styles.caractT}>Sexo: </Text>
                        <Text style={styles.caractS}>{userDatos.datosUser.sexo}</Text>
                    </View>

                    {(userDatos.datosUser.tipo== "Paciente")?(<View>
                        <View flexDirection='row'>
                            <Text style={styles.caractT}>Peso: </Text>
                            <Text style={styles.caractS}>{userDatos.paciente.peso}</Text>
                            <Text style={styles.caractS}>kg</Text>
                        </View>
                        <View flexDirection='row'>
                            <Text style={styles.caractT}>Altura: </Text>
                            <Text style={styles.caractS}>{userDatos.paciente.altura}</Text>
                            <Text style={styles.caractS}>cm</Text>
                        </View>

                        <View flexDirection='row'>
                            <Text style={styles.caractT}>IMC: </Text>
                            <Text style={styles.caractS}>{userDatos.paciente.IMC}</Text>
                        </View>
                        <View flexDirection='row'>
                            <Text style={styles.caractT}>Historial medico: </Text>
                            <Text style={styles.caractS}>{userDatos.paciente.historial_medico}</Text>
                        </View>
                    </View>
                    ):(<View>
                        <View flexDirection='row'>
                            <Text style={styles.caractT}>Especialidad: </Text>
                            <Text style={styles.caractS}>{userDatos.doctor.especialidad}</Text>
                        </View>

                    </View>)}
                </View>
            </ImageBackground>
            <TouchableOpacity
                style={styles.touchable}
                onPress={()=>{handleLogOut()}}>
                <Text style={styles.textButton}>Cerrar sesion</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    pincipalContainer:{
        //backgroundColor:'red',
        //width:400,
        marginTop:-40,
        alignItems: 'center',
    },
    container:{
        width: 340,
        height: 450,
       // marginTop:'40%',
       // marginLeft:25,
       // borderWidth : 5,
       // borderColor : '#FF4646',
        borderRadius : 20,
        backgroundColor : 'rgba(26, 82, 118,0.8)',
       // shadowColor:'black',
        elevation:0,
    },
    line:{
        width: 340,
    },
    fondo:{
        //flex:1,
        resizeMode:'cover',
        width: 340,
        height: 450,
        marginTop:'40%',
        //marginLeft:45,
        borderRadius: 20, // Ajusta el radio de las esquinas
        overflow: 'hidden',
        elevation:10,
    },
    image:{
        width:70,
        height:70,
        marginTop:17,
        marginLeft:5,
        resizeMode:'cover',
        borderRadius:35,
    },
    nombre:{
        fontSize: 30,
        marginTop:15,
        marginLeft:0,
        paddingHorizontal:10,
        paddingVertical:0,
        fontWeight:'bold',
        color:'white',
        textAlign: 'left',
    },
    caractT:{
        fontSize: 20,
        textAlign:'center',
        marginTop:20,
        marginLeft:10,
        fontWeight:'bold',
        color:'white'
    },
    caractS:{
        fontSize: 20,
        textAlign:'center',
        marginTop:20,
        color:'white',
        paddingLeft:5,
    },
    touchableEditar:{
        backgroundColor: '#1A5276',
        padding : 10,
        marginTop : 70,
        width : '50%',
        alignSelf: 'center',
        borderRadius: 10,
        position: "absolute"
    },
    touchable:{
        backgroundColor: '#1A5276',
        padding : 10,
        marginTop : 30,
        width : '50%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    textButton:{
        fontSize: 16,
        textAlign: 'center',
        color: "white",
    },
});
export default UserShow;

