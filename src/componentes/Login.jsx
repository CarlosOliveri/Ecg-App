import React from "react";
import { View, Text ,TextInput, Button, Alert} from "react-native";

const Login = () => {
    function onPressButton(){
        Alert.alert('Login sucsesful');
    }

    return(
        <View>
            <Text style = {{
                alignSelf:"center", 
                marginTop: 100,
                fontSize: 30}}>
                    Sing in
            </Text>
            <TextInput
                style ={{
                    height:40,
                    width: 200,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 30,
                    marginHorizontal: 100,
                    padding: 10
                }}
                placeholder="User"
            />
            <TextInput
                style ={{
                    height:40,
                    width: 200,
                    borderColor: 'gray',
                    borderWidth: 1,
                    marginTop: 10,
                    marginHorizontal: 100,
                    padding: 10
                }}
                placeholder="Password"
                secureTextEntry={true}
            />
            <View style={{
                width:100,
                alignSelf:"center",
                marginTop:10}}>
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