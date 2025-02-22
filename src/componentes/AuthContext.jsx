import React, { createContext, useContext, useState, useEffect } from 'react';
//import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {getPacienteDatos,getUserDatos} from '../api/ecg.api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [userDatos, setUserDatos] = useState(null);

    useEffect(() => {
        // Verificar si hay sesión activa al abrir la app
        checkLoginStatus();
    }, []);

    const saveAsyncStorage = async (value) => {
        //await SecureStore.setItemAsync("tokens", value);
    }

    const checkLoginStatus = async () => {
        try {
            //const tokens = await SecureStore.getItemAsync("tokens");
            const accessToken = tokens["accessToken"]
            if (accessToken) {
                const { token } = JSON.parse(accessToken);
                setToken({ token });
            }
        } catch (error) {
            console.error('Error verificando sesión:', error);
        }
        setLoadingScreen(false);
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

    const logout = async () => {
        await EncryptedStorage.removeItem('auth_tokens');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ setToken, token, logout, setLoadingScreen, loadingScreen, userDatos, setUserDatos, saveAsyncStorage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
