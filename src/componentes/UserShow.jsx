import React ,{useEffect} from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";



const UserShow = () =>{
    const [storedName, setStoredName] = useState(null);
    const [storedAge, setStoredAge] = useState(null);
    const [storedWeight, setStoredWeight] = useState(null);
    const [storedHeight, setStoredHeight] = useState(null);
    const [storedSex, setStoredSex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            // Obtener el valor almacenado en AsyncStorage
            const storedName = await AsyncStorage.getItem('Nombre');
            setStoredName(storedName);
            const storedAge = await AsyncStorage.getItem('Edad');
            setStoredAge(storedAge);
            const storedWeight = await AsyncStorage.getItem('Peso');
            setStoredWeight(storedWeight);
            const storedHeight = await AsyncStorage.getItem('Altura');
            setStoredHeight(storedHeight);
            const storedSex = await AsyncStorage.getItem('Sexo');
            setStoredSex(storedSex);
        } catch (error) {
            console.error('Error al obtener el valor:', error);
        }
        };

        fetchData();
    }, []);

    return (
        <View style ={styles.container} flexDirection = 'colum'>
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
        </View>
        /*<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Datos Guardados del Usuario:</Text>
        <Text>{storedName} / {storedAge} / {storedWeight} / {storedHeight} / {storedSex}</Text>
        </View>*/
    );
}
const styles = StyleSheet.create({
    container:{
        width: 300,
        height: 300,
        marginTop:'40%',
        marginLeft:25,
       // borderWidth : 5,
       // borderColor : '#FF4646',
        borderRadius : 20,
        backgroundColor : '#FF4646',
        shadowColor:'black',
        elevation:11,
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
        textAlign:'center',
        marginTop:20,
        marginLeft:10,
    },
    caractT:{
        fontSize: 20,
        textAlign:'center',
        marginTop:20,
        marginLeft:10,
        fontWeight:'bold'
    },
    caractS:{
        fontSize: 20,
        textAlign:'center',
        marginTop:20,
    },
});
export default UserShow;

