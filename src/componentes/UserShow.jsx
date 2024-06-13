import React ,{useEffect, useReducer} from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Dimensions,Image,ImageBackground } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";



const UserShow = () =>{
    const [storedName, setStoredName] = useState(null);
    const [storedAge, setStoredAge] = useState(null);
    const [storedWeight, setStoredWeight] = useState(null);
    const [storedHeight, setStoredHeight] = useState(null);
    const [storedSex, setStoredSex] = useState(null);
    const [user,setUser] = useState({
        "nombre": null,
        "edad": null,
        "peso": null,
        "altura": null,
        "sexo": null,});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener el valor almacenado en AsyncStorage
                const userRegistered = await AsyncStorage.getItem('User');
                setUser(userRegistered ? JSON.parse(userRegistered) : null);
                console.debug("Usuario cargado correctamente");

                const storedName = await AsyncStorage.getItem('Nombre');
                setStoredName(storedName ? JSON.parse(storedName) : null);

            } catch (error) {
                console.error('Error al obtener el valor:', error);
            }
        };
        fetchData();
    }, []);

    //require('../../assets/')
    return (
        <>
        <ImageBackground style ={styles.fondo} resizeMode="cover" source={require('../../assets/fondo.png')} >
            <View style ={styles.container} flexDirection = 'colum'>
            <View style ={styles.line} flexDirection='row'  paddingRight={50} alingIyems='stretch'>
                <Image style ={styles.image} source={{uri:"https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg" }}/>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.nombre}>{user.nombre}</Text>
            </View>
            <View flexDirection='row'>
                <Text style={styles.caractT}>Edad: </Text>
                <Text style={styles.caractS}>{user.edad}</Text>
                <Text style={styles.caractS}>años</Text>
            </View>
            <View flexDirection='row'>
                <Text style={styles.caractT}>Peso: </Text>
                <Text style={styles.caractS}>{user.peso}</Text>
                <Text style={styles.caractS}>kg</Text>
            </View>
            <View flexDirection='row'>
                <Text style={styles.caractT}>Altura: </Text>
                <Text style={styles.caractS}>{user.altura}</Text>
                <Text style={styles.caractS}>cm</Text>
            </View>
            <View flexDirection='row'>
                <Text style={styles.caractT}>Sexo: </Text>
                <Text style={styles.caractS}>{user.sexo}</Text>
            </View>
            <View flexDirection='row'>
            </View>
        </View>
        </ImageBackground>
        </>
        /*<View style ={styles.container} flexDirection = 'colum'>
            <ImageBackground style ={styles.fondo} resizeMode="cover" source={require('../../assets/USER.png')}/>
            <View flexDirection='row'>
                <Image style ={styles.image} source={{uri:"https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg" }}/>
                <Text style={styles.nombre}>{storedName}</Text>
            </View>
            <View flexDirection='row'>
                <Text style={styles.caractT}>Edad: </Text>
                <Text style={styles.caractS}>{storedAge}</Text>
            </View>
            <View flexDirection='row'>
                <Text style={styles.caractT}>Peso: </Text>
                <Text style={styles.caractS}>{storedWeight}</Text>
            </View>
            <View flexDirection='row'>
                <Text style={styles.caractT}>Altura: </Text>
                <Text style={styles.caractS}>{storedHeight}</Text>
            </View>
            <View flexDirection='row'>
                <Text style={styles.caractT}>Sexo: </Text>
                <Text style={styles.caractS}>{storedSex}</Text>
            </View>
            <View flexDirection='row'>
            </View>
        </View>*/
    );
}
const styles = StyleSheet.create({
    container:{
        width: 300,
        height: 300,
       // marginTop:'40%',
       // marginLeft:25,
       // borderWidth : 5,
       // borderColor : '#FF4646',
        borderRadius : 20,
        backgroundColor : 'rgba(26, 82, 118,0.8)',
       // shadowColor:'black',
        elevation:0,
    },
    line:{
        width: 300,
    },
    fondo:{
        //flex:1,
        resizeMode:'cover',
        width: 300,
        height: 300,
        marginTop:'40%',
        marginLeft:30,
        borderRadius: 20, // Ajusta el radio de las esquinas
        overflow: 'hidden',
        elevation:10,
    },
    image:{
        width:70,
        height:70,
        marginTop:5,
        marginLeft:5,
        resizeMode:'cover',
        borderRadius:35,
    },
    nombre:{
        fontSize: 30,
        marginTop:15,
        marginLeft:10,
        paddingHorizontal:10,
        paddingVertical:0,
        fontWeight:'bold',
        color:'white',
        textAlign: 'left',
    },
    caractT:{
        fontSize: 20,
        textAlign:'center',
        marginTop:20,
        marginLeft:10,
        fontWeight:'bold',
        color:'white'
    },
    caractS:{
        fontSize: 20,
        textAlign:'center',
        marginTop:20,
        color:'white',
        paddingLeft:5,
    },
});
export default UserShow;

