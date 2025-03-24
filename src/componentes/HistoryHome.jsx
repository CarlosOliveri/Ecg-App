import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList,Button } from 'react-native';
import Header from './Header';
import HistoryCard from './HistoryCard';
//import datosJson from '../../assets/appDirectories/Mediciones.json';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { useDatosContext } from './useDatosContext';
import { DeleteMedition } from '../api/ecg.api';

const HistoryHome = () => {
  
  /* const Measurements = datosJson.mediciones;
  const [datos, setDatos] = useState(Measurements); */
  const {datos,setDatos,setSincro} = useDatosContext();
  
  useEffect(() => {
    console.log("[HistoryHome]");
  },[]);

  const handleDeleteRegister = async (id) =>{
    //Manejar eliminacion de registros
    const response = await DeleteMedition(id);
    console.debug(response.data["mensaje"]);
    setSincro(true);
  }
  const handleSincronizacion = () => {
	setSincro(true);
  }

    return (
        <View style={styles.container}>
        	<Button
        		title='Actualizar'
				    onPress={()=>{handleSincronizacion()}}/>
          	<FlatList
            	data={datos}
            	renderItem={({ item, index }) => {
              		return (
                		<HistoryCard 
                  			info = {{... item,num : index +1}} 
                  			handleDeleteRegister = {handleDeleteRegister}/>
            	);}}
            	keyExtractor={(datos) => String(datos.id)}
            	showsVerticalScrollIndicator={false}/>
          
        </View>

      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //backgroundColor: '#6c5ce7',
      alignItems: 'center',
      // justifyContent: 'center',
    },
  });

export default HistoryHome;