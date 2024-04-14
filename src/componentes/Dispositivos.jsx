import React from "react";
import { View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import DispositivosStyles from "../styles/DispositivosStyles";

const Dispositivos =(props)=>{
    return (
        <>
            <TouchableOpacity style={DispositivosStyles.wrapper} onPress = {props.onPress}>
                <View style={DispositivosStyles.wrapperLeft}>
                    <Image style={DispositivosStyles.iconLeft} source ={props.iconLeft}/>
                </View>
                <View style={DispositivosStyles.wrapperName}>
                    <Text style={DispositivosStyles.name}>
                        {props.name}
                    </Text>
                </View>
                <Image style={DispositivosStyles.iconRight} source = {props.iconRight}/>
            </TouchableOpacity>
            <View style = {DispositivosStyles.separador}/>
        </>
    );
}
export default Dispositivos;
/*
const DispositivosStyles = StyleSheet.create({
    wrapper:{
        flexDirection: 'row',
        alignItems: 'centre',
        padding: 10,
        justifyContent: 'space-between'
    },
    wrapperLeft:{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapperName:{
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 15,
        marginTop: 10
    },
    name:{

    },
    iconRight:{
        marginTop: 13,
        width: 20,
        height: 20
    },
    iconLeft:{
        width: 20,
        height: 20
    },
    separador:{
        flex:1,
        borderTopWidth: 1,
        marginLeft:60,
        marginRight:25,
        borderColor: '#eceff1',
    }
})
*/
