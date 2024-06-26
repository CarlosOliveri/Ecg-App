import { StyleSheet,useWindowDimensions } from "react-native";
import ChartHeart from "../componentes/ChartHeart";

export const Measurementstyles = StyleSheet.create({
    containerPrincipal:{
        flex: 1, 
        backgroundColor: '#F5FCFF'
        //alignItems:'center',
        //justifyContent:'center',
        
    },
    chartHeart:{
        flex:1,
        marginTop: 5,
    },
    actionContainer:{
        flex:2,
        height: 500,
        backgroundColor:'rgb(255,255,255)'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:100,
    },
    Button:{
        backgroundColor: 'red',
        borderRadius: 15,
        padding: 10
    },
    buttonTitle:{
        color: 'white',
        fontSize: 13
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
        marginTop: 50,
    }
});