import React from "react";
import { View, Text ,TextInput, Button, Alert} from "react-native";
import LoginStyles from '../styles/LoginStyles';

const Login = ({onUserAuthenticated}) => {
    
    function onPressButton(){
        Alert.alert('Login sucsesful');
        handleUserAuthenticated();
    }

    const handleUserAuthenticated = () => {
        onUserAuthenticated();
    }

    return(
        <View>
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
        </View>
    );
}

export default Login;