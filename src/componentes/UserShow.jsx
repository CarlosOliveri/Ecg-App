import React ,{useEffect} from "react";
import { useState } from "react";
import { View, Text } from 'react-native';
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
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Datos Guardados del Usuario:</Text>
        <Text>{storedName} / {storedAge} / {storedWeight} / {storedHeight} / {storedSex}</Text>
        </View>
    );
}
export default UserShow;