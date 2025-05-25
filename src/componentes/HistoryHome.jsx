import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList,Button } from 'react-native';
import { StyleSheet, Text, View, StatusBar, FlatList,Button } from 'react-native';
import Header from './Header';
import HistoryCard from './HistoryCard';
//import datosJson from '../../assets/appDirectories/Mediciones.json';
//import datosJson from '../../assets/appDirectories/Mediciones.json';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { useDatosContext } from './useDatosContext';

const HistoryHome = () => {
  
  /* const Measurements = datosJson.mediciones;
  const [datos, setDatos] = useState(Measurements); */
  const {datos,setDatos} = useDatosContext();

  const handleDeleteRegister = async (id) =>{
    //Manejar eliminacion de registros
    const response = await DeleteMedition(id);
    console.debug(response.data["mensaje"]);
    setSincro(true);
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
            showsVerticalScrollIndicator={false}/>
          {/* <Button
          title='actualizar'
          onPress={()=>{console.debug(datos)}}/> */}
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