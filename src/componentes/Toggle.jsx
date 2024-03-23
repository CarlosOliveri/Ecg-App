import React from "react";
import { View,Text,StyleSheet,Switch,TouchableOpacity } from "react-native";

const Toggle = (props) => {
    let tog = false;
    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>
                {props.value ? 'ON' : 'OFF'}
            </Text>
            <Switch
                value = {props.value}
                onChange={props.onChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 15,
        flexDirection:'row'
    },
    text:{
        marginLeft:10,
        fontWeight:'bold',
        fontSize: 20,
        flex: 1
    },
    switch:{
        width: 50
    }
})

export default Toggle;