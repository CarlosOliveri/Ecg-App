import {StyleSheet} from 'react-native';

export const MeasurementsHomeStyles = StyleSheet.create({
    ButtonContainer:{
        //width: 200,
        //height: 50, 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#E5F5FF'
    },
    Text:{
        padding:20,
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: '50%',
        paddingHorizontal:10,
        textAlign: 'center',
    },
    touchable:{
        backgroundColor: 'red',
        padding : 10,
        marginTop : 20,
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