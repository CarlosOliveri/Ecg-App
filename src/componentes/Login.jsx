import {React, useState,useEffect} from "react";
import { View, Text ,TextInput, Button, Alert, TouchableOpacity} from "react-native";
import LoginStyles from '../styles/LoginStyles';
import { useNavigation,useIsFocused } from "@react-navigation/native";
import { useAuth } from './AuthContext';
//import UserRegister from "./UserRegister";
import { LoginRequest, getPacienteDatos, getUserDatos } from "../api/ecg.api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

    const { token,setToken,setLoadingScreen,saveTokens,setUserDatos,userDatos,setIsLog, isLog } = useAuth({});
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [user,setUser] = useState();
    const [password,setPassword] = useState();
    const [firstRender,setFirstRender] = useState(true);

    function onChangeUser(value){
        if (value !== ''){
            setUser(value);
        }
    }

    useEffect(() => {
        if (isFocused & !isLog){
            setFirstRender(false);
            setUserDatos({
                "user":{
                    "username":"",
                    "password":"",
                    "email": "",
                    "first_name": "",
                },
                "datosUser":{
                    "cedula":"",
                    "edad": 0,
                    "sexo": "",
                    "telefono":"",
                    "tipo":"",
                },
                "paciente":{
                    "peso": "",
                    "altura": "",
                    "IMC":"",
                    "historial_medico":"",
                    "doctor":null
                },
                "doctor":{
                    "especialidad":"",
                    "matricula": "",
                },
            });
            console.debug("[Login]primer render");
            return 
        }
        //setFirstRender(true);//[IMPORTANTE]No mover de debajo del IF
        if(isLog){
            AsyncStorage.setItem("User", JSON.stringify(userDatos));
            navigation.navigate('UserShow');
        }
    },[isLog,isFocused]);


    function onChangePass(value){
        if (value !== ''){
            setPassword(value);
        }
    }

    const onPressButton = async () => {
        try{
            const response = await LoginRequest(user, password);
            
            if (response.status == 200){
                const datos = response.data;
                setLoadingScreen(true);
                
                saveTokens(datos["tokens"]);
                Alert.alert(datos["mensaje"]);
                //const datos_paciente = await getPacienteDatos(token,1)
                setToken(datos["tokens"]["access"]);//[IMPORTANTE]esto debe estar en la ultima linea del if, porque se usa de condicion en UserShow
                setUserDatos({
                    "user": datos["user"],
                    "datosUser": datos["datos_user"],
                    "paciente": (datos["paciente"] == "") ? userDatos.paciente : datos["paciente"],
                    "doctor": (datos["doctor"] == "") ? userDatos.doctor : datos["doctor"],
                })
                setIsLog(true);
            }
        }catch(error){
            Alert.alert(error.response.data["Error"]);
            console.debug(error);

        }
    }

    function onPressRegisterButton(){
        navigation.navigate('UserRegister');
    }

    return(
        <View style = {LoginStyles.container}>
            <Text style = {LoginStyles.title}>
                    Sing in
            </Text>
            <TextInput
                style ={LoginStyles.textInput}
                placeholder="User"
                onChangeText={onChangeUser}
            />
            <TextInput
                style ={LoginStyles.textInput}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={onChangePass}
            />
            <View style={LoginStyles.Buttom}>
                <Button
                    onPress = {onPressButton}
                    title = "Enter"
                    color= "#225599"
                />
            </View>
            <View style = {LoginStyles.registerContainer}>
                <TouchableOpacity 
                    style = {LoginStyles.registerButton}
                    onPress = {onPressRegisterButton}>
                    <Text style = {LoginStyles.registerText}>
                        Registrarse
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {LoginStyles.registerButton}
                    onPress = {onPressRegisterButton}>
                    <Text style = {LoginStyles.registerText}>
                        Modo visitante
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;