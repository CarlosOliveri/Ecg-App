import { StyleSheet } from "react-native";

const BluetoothListStyles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        paddingVertical: 25,
        backgroundColor: '#f5fcff'
    },
    title:{
        marginLeft:10,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    containerSubtitle:{
        flexDirection: 'row',
        marginVertical:15,
        alignItems:'center'
    },
    Subtitle:{
        marginLeft: 10,
        fontSize:18,
        fontWeight:'bold',
        color:'gray'
    },
    lineSubtitle:{
        borderBottomWidth:1,
        flex:1,
        marginLeft:10,
        marginTop:3,
        borderColor:'#eceff1'
    }
})

export default BluetoothListStyles;