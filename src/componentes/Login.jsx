import {React, useState} from "react";
import { View, Text ,TextInput, Button, Alert, TouchableOpacity} from "react-native";
import LoginStyles from '../styles/LoginStyles';
import { useNavigation } from "@react-navigation/native";
import {Logging} from '../api/ecg.api';
//import UserRegister from "./UserRegister";

const Login = () => {
    
    const navigation = useNavigation();

    const [user,setUser] = useState();
    const [password,setPassword] = useState();

    function onChangeUser(value){
        if (value !== ''){
            setUser(value);
        }
    }

    function onChangePass(value){
        if (value !== ''){
            setPassword(value);
        }
    }

    const onPressButton = async () => {
        try{
            const response = await Logging(user, password);
            if (response.status == 200){
                const datos = response.data;
                Alert.alert(datos["mensaje"]);
                console.log(datos);
            }
        }catch(error){
            Alert.alert(error.response.data["Error"]);
        }
        //navigation.navigate('bleStackUser');
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