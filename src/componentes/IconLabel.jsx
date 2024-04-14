import React from "react";
import { View,Text, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

//Funcion para Realizar Iconos
const  IconLabel = ({name,label,color,size})  => {
    return(
        <View style={styles.container}>
            <Icon 
                name = {name}
                type = 'ionicon'
                size = {size}
                color = {color}
                style = {styles.iconStyle} 
            />
            <Text style={styles.labelStyle}>{label}</Text>

        </View>
    );
};

/*<Icon 
                name = {name}
                type = 'ionicon'
                size = {14}
                color = {color}
                style = {styles.iconStyle} 
            />*/


/*<FontAwesome 
            name={name} 
            size={24} 
            color={color}
            style = {styles.iconStyle} 
            />
            <Text style = {styles.labelStyle}>
                {label}
            </Text>*/


//Clases de estilos para utilizar
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginRight:10,
        alignItems: 'center',
    },
    labelStyle: {fontSize:15},
    iconStyle: {marginRight:5,},
});


export default IconLabel;