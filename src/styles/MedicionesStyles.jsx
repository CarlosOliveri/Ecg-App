import { StyleSheet,useWindowDimensions } from "react-native";

export const MedicionesStyles = StyleSheet.create({
    containerPrincipal:{
        flex: 1, 
        //alignItems:'center',
        //justifyContent:'center',
        
    },
    webview:{
        
    },
    actionContainer:{
        //alignItems:'center',
        height: 500,
        backgroundColor:'rgb(255,255,255)'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    bpmTitle:{
        textAlign:'center',
        fontSize:30,
        margin:30,
    },
    bpmValue:{
        textAlign:'center',
        fontSize:30,
        margin:30,
    },
    bpmContainer:{
        flexDirection:'row',
        justifyContent:'center',
    }
});