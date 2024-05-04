import { StyleSheet } from "react-native";


const UserRegisterStyles = StyleSheet.create({
    msgText:{
        fontSize: 16,
        marginHorizontal: 15,
        color:'white',
        paddingHorizontal:10,
        paddingVertical:10,
        marginTop: 10,
        textAlign: 'left',
        backgroundColor:'#1F618D',
        //borderBlockColor: '#E72E2E',
        borderRadius: 10,
    },
    formContainer:{
        marginTop: 50
    },
    labels:{
        alignSelf:'flex-start',
        marginTop: 15,//80
        marginHorizontal:20,
        fontSize: 20
    },
    inputName:{
        height:40,
        width: 200,
        borderColor: '#1A5276',
        borderRadius:5,
        borderWidth: 1,
        marginTop: -35,
        marginHorizontal: 120,
        padding: 10
    },
    inputText:{
        height:40,
        width: 106,
        borderColor: '#1A5276',
        borderRadius:5,
        borderWidth: 1,
        marginTop: -35,
        marginHorizontal: 120,
        padding: 10
    },
    touchable:{
        backgroundColor: '#1A5276',
        padding : 10,
        marginTop : 30,
        width : '50%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    textButton:{
        fontSize: 16,
        textAlign: 'center',
        color: "white",
    },
    errores:{
        alignSelf:'flex-start',
        marginTop: 1,//80
        marginHorizontal:120,
        fontSize: 10,
        color: 'red',
    }
})
export default UserRegisterStyles;