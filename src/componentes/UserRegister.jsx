import React ,{useState} from 'react'
import {Text,View,TextInput,TouchableOpacity} from 'react-native'
import UserStyles from '../styles/UserRegisterStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserRegister = () => {

    //Estado que almacena los datos del usuario
    const [datosUser,setDatosUser] = useState([]);

    return (
        <View>
            <Text
            style = {UserStyles.msgText}
            >Usted actualmete se encuentra en modo sin conexion, con lo cual 
            sus datos seran almacenados en la memoria de su dispositivo movil</Text>

            <View style = {UserStyles.formContainer}>
                <Text 
                style = {UserStyles.labels}>
                    Nombre: 
                </Text>
                <TextInput
                    style ={UserStyles.inputName}
                    placeholder="Ex: Nombre Apellido"
                    placeholderTextColor={'gray'}/>
                <Text 
                style = {UserStyles.labels}>
                    Edad: 
                </Text>
                <TextInput
                    style ={UserStyles.inputText}
                    placeholder="Ex: 25 años"
                    placeholderTextColor={'gray'}/>
                <Text style = {UserStyles.labels}>
                    Peso: 
                </Text>
                <TextInput style ={UserStyles.inputText}
                    placeholder="Ex: 80 [kg]"
                    placeholderTextColor={'gray'}/>
                <Text style = {UserStyles.labels}>
                    Altura: 
                </Text>
                <TextInput
                    style ={UserStyles.inputText}
                    placeholder="Ex: 177 [cm]"
                    placeholderTextColor={'gray'}/>
                <Text style = {UserStyles.labels}>
                    Sexo: 
                </Text>
                <TextInput
                    style ={UserStyles.inputText}
                    placeholder="Ex: Masculino"
                    placeholderTextColor={'gray'}/>
            </View>
            <TouchableOpacity style = {UserStyles.touchable}>
                <Text style = {UserStyles.textButton}>
                    Guardar Datos 
                </Text>
            </TouchableOpacity>
        
        </View>
        
        
        

    );
}
export default UserRegister;