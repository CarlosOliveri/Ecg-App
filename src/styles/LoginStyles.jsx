import { StyleSheet } from "react-native";

const LoginStyles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
    title:{
        alignSelf:"center", 
        marginTop: 100,
        fontSize: 30
    },
    textInput:{
        height:40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginHorizontal: 100,
        padding: 10
    },
    Buttom:{
        width:100,
        alignSelf:"center",
        marginTop:10
    },
    registerContainer:{
        marginTop: 20,
        alignItems:'start',
        width: 200,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    registerText:{
        color:'#11ccff'
    },
    registerButton:{

    }
})

export default LoginStyles;