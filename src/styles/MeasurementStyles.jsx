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
        backgroundColor: '#22aaee',
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
    },
    actividadContainer:{
        alignItems:'center',
        flexDirection:'row',
        marginTop: 30,
        marginBottom: 2,

    },
    modalHead:{
        fontSize:35,
        fontWeight:'bold',
        color:'white'

    },
    touchActividad:{
        backgroundColor:'white',
        margin: 2,
        borderRadius:5,
    },
    actividad:{
        color:'#22aaee',
        fontSize:13,
        fontWeight:'bold',
        margin:5,
    },
    containerButtonActivity:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:200
    },
    duracionActividad:{
        fontWeight: 'bold',
        color:'#bbbbbb',
        textAlign:'center',       
        fontSize:40,
        backgroundColor:'#0878cd',
        //borderWidth: 2,
        borderColor: '#22aaee',
        width: 315,
        height:100,
        borderRadius:10,
        padding:20,
        marginBottom:5,
    }
});