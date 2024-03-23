import React from "react";
import { View, Text, StyleSheet,Image } from "react-native";

const Empty =(props) =>{
    return (
        <View style = {styles.container}>
            <Image style = {styles.icon} source = {require('../../icons/ic_empty.png')}></Image>
            <Text style = {styles.text}>
                {props.text}
            </Text>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        marginLeft:10,
        alignItems:'center',
    },
    text:{
        fontSize:20
    },
    icon:{
        width: 200,
        height: 200,
        marginVertical: 50
    }
})

export default Empty;