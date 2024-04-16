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
        backgroundColor:'#E05E5E',
        //borderBlockColor: '#E72E2E',
        borderRadius: 10,
    },
    formContainer:{
        marginTop: 50
    },
    labels:{
        alignSelf:'flex-start',
        marginTop: 30,//80
        marginHorizontal:20,
        fontSize: 20
    },
    inputName:{
        height:40,
        width: 200,
        borderColor: '#E05E5E',
        borderRadius:5,
        borderWidth: 1,
        marginTop: -35,
        marginHorizontal: 120,
        padding: 10
    },
    inputText:{
        height:40,
        width: 95,
        borderColor: '#E05E5E',
        borderRadius:5,
        borderWidth: 1,
        marginTop: -35,
        marginHorizontal: 120,
        padding: 10
    },
    touchable:{
        backgroundColor: 'red',
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
    }
})
export default UserRegisterStyles;