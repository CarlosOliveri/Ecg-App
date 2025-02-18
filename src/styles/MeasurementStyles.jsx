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
        //borderBlockColor:'#1F618D',
        borderColor:'#1F618D',
        borderWidth:2,
    },
    actionContainer:{
        flex:2,
        alignItems:'center',
        //justifyContent:'center',
       // height: 100,
        backgroundColor:'rgb(255,255,255)'
    }, 
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:10,
        width:400,
        paddingHorizontal:5,
        marginVertical:10,

    },
    buttonDesconectar:{
        backgroundColor: '#1F618D',
        padding : 10,
        //marginTop : -10,
        width : '40%',
        alignSelf: 'center',
        borderRadius: 10,
        elevation:3,
    },
    Button:{
        backgroundColor: '#1F618D',
        padding : 10,
        marginTop : 20,
        width : '40%',
        alignSelf: 'center',
        borderRadius: 10,
        elevation:3,
    },
    buttonTitle:{
        color: 'white',
        alignSelf: 'center',
        fontSize: 13
    },
    Icon:{
        marginLeft:-20,
        marginTop:15,
        color:'#1A5276',
    },
    bpmTitle:{
        textAlign:'center',
        fontSize:30,
        //marginTop:20,
        marginVertical:10,
        marginLeft:5,
        fontWeight:'500',
        color:'#1A5276',
    },
    bpmValue:{
        textAlign:'center',
        fontSize:30,
        marginVertical:10,
        marginLeft:5,
        color:'#1A5276',
        fontWeight:'500',
    },
    bpmContainer:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop: 10,
    },
    actividadContainer:{
        //alignItems:'center',
        flexDirection:'row',
        marginTop: 10,
        marginBottom: 15,
    },
    fondo:{
        //flex:1,
        alignItems:'center',
        justifyContent:'center',
        resizeMode:'center',
        width: 350,
        height: 380,
        //marginTop:'40%',
        //marginLeft:45,
        borderRadius: 20, // Ajusta el radio de las esquinas
        overflow: 'hidden',
        elevation:10,
    },
    caja:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(170, 183, 184,0.2)',
        width:350,
        height:380,
        //marginTop:'10%',
        borderRadius:20,
        borderWidth:0,
        borderColor:'#1A5276',
        shadowColor:'#1A5276',
        shadowRadius:100,
        //elevation:10,
    },
    modalHead:{
        fontSize:35,
        fontWeight:'bold',
        color:'#1A5276',//'white',
        marginTop:-10,
    },
    touchActividad:{
        backgroundColor:'#1A5276',//'white',
        margin: 2,
        borderRadius:5,
        
    },
    touchActividadButton:{
        backgroundColor:'#1A5276',//'white',
        margin: 5,
        borderRadius:15,
        elevation:3,
    },
    actividad:{
        color:'white',
        fontSize:13,
        fontWeight:'500',
        margin:5,
    },
    actividadtxt:{
        color:'white',
        fontSize:18,
        fontWeight:'40',
        padding:10,
        paddingHorizontal:15,
    },
    containerButtonActivity:{
        marginTop:15,
        flexDirection:'row',
        justifyContent:'space-around',
        width:400
    },
    duracionActividad:{
        fontWeight: '400',
        textAlign:'justify',       
        fontSize:30,
        borderColor:'#1A5276',
        borderWidth:2,
        backgroundColor:'rgba(255,255,255,0.6)',
        //borderWidth: 2,
        width: 315,
        height:80,
        borderRadius:10,
        paddingTop:10,
        paddingLeft:10,
        marginBottom:10,
    },
    
    titleDesconectar:{
        color: 'white',
        fontSize: 13,
        textAlign:'center',
    }
});