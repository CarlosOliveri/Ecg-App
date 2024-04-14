import { StyleSheet } from "react-native";

const LoginStyles = StyleSheet.create({
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
    }
})

export default LoginStyles;