import React, { createContext, useContext, useState, useEffect } from 'react';
//import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPacienteDatos,getUserDatos} from '../api/ecg.api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [userDatos, setUserDatos] = useState({
        "user":{
            "username":"",
            "password":"",
            "email": "",
            "first_name": "",
        },
        "datosUser":{
            "cedula":"",
            "edad": "",
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
    const [isLog,setIsLog] = useState(false);

    useEffect(() => {
        // Verificar si hay sesión activa al abrir la app
        checkLoginStatus(); //lo llevo a login 
    }, []);
 
    const saveTokens = async (value) => {
        //console.log(value["access"]);
        await AsyncStorage.setItem("tokens", JSON.stringify(value));
        await AsyncStorage.setItem("accessToken", JSON.stringify(value["access"]));
        await AsyncStorage.setItem("refreshToken", JSON.stringify(value["refresh"]));
    }

    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken");//[IMPORTANTE]descomentar en produccion
            if (token) {
                setToken(JSON.parse(token));
            }
        } catch (error) {
            console.debug('Error verificando sesión:', error);
        }
        setLoadingScreen(false);
    };

    const logout = async () => {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.setItem("accessToken",JSON.stringify({}));
        setToken(null);
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
        console.debug("log Out");

        checkLoginStatus();

    };

    /* const login = async (username, password) => {
        try {
            const response = await Loggin(username, password);
            const { access_token, refresh_token } = response.data["Tokens"];
            const datos = response.data["user"];
            Alert.alert(response.data["mensaje"]);
            console.log(response.data);
            // Guardar tokens de forma segura
            await EncryptedStorage.setItem('auth_tokens', JSON.stringify({ accessToken: access_token, refreshToken: refresh_token }));
            setToken({ accessToken: access_token });
            setUserDatos(datos);

            return true;
        } catch (error) {
            console.error('Error en login:', error.response?.data);
            return false;
        }
    }; */

    return (
        <AuthContext.Provider value={{ setToken, token, logout, setLoadingScreen, loadingScreen, 
                                        userDatos, setUserDatos, saveTokens,isLog, setIsLog }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
