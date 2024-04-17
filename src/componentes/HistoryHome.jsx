import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import Header from './Header';
import HistoryCard from './HistoryCard';
import datosJson from '../../assets/appDirectories/Mediciones.json';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const HistoryHome = () => {
  
  const mediciones = datosJson.mediciones;
  const [datos, setDatos] = useState(mediciones);

  useEffect(()=>{
    
    AsyncStorage.setItem('mediciones', JSON.stringify(mediciones)).then(()=>{   //esto se debe cambiar mas adelante
      console.log("[Data UpLoad] Archivo Json Cargado con exito");
    })
  },[])


  const handleDeleteRegister = (id) =>{
    //Manejar eliminacion de registros
    const datosActualizados = datos.filter(dato => dato.id !== id);
    for (i = 0; i < datosActualizados.length;i++){
      datosActualizados[i].num = i+1;
    }
    setDatos(datosActualizados);
    AsyncStorage.setItem('mediciones', JSON.stringify(datos)).then(()=>{
      console.log("[Data Storage] Datos Actualizados correctamente")
    })
  }

    return (
        <View style={styles.container}>
          <FlatList
            data={datos}
            renderItem={({ item }) => {
              return (
                <HistoryCard 
                  info = {item} 
                  handleDeleteRegister = {handleDeleteRegister}/>
            );}}
            keyExtractor={(datos) => datos.id.toString()}
            showsVerticalScrollIndicator={false}
          />
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