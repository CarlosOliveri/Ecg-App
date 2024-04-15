import React from "react";
import { View, Text ,TextInput, Button, Alert, TouchableOpacity} from "react-native";
import LoginStyles from '../styles/LoginStyles';
import { useNavigation } from "@react-navigation/native";
//import UserRegister from "./UserRegister";

const Login = () => {
    
    const navigation = useNavigation();

    function onPressButton(){
        //navigation.navigate('bleStackUser');
        Alert.alert('Login sucsesful');
    }

    function onPressRegisterButton(){
        navigation.navigate('userRegister');
    }

    return(
        <View style = {LoginStyles.container}>
            <Text style = {LoginStyles.title}>
                    Sing in
            </Text>
            <TextInput
                style ={LoginStyles.textInput}
                placeholder="User"
            />
            <TextInput
                style ={LoginStyles.textInput}
                placeholder="Password"
                secureTextEntry={true}
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