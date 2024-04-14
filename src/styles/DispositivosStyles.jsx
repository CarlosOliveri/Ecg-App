import { StyleSheet } from "react-native";

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

export default DispositivosStyles;