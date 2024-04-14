import React from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import Header from './Header';
import HistoryCard from './HistoryCard';

const datos = [
    {
        num: '1',
        Fecha: '30/03/2024',
        Hora: '6:00 am',
        Actividad: 'Trote',
        tiempo: '30 min',
        id: 1,
    },
    {
        num: '2',
        Fecha: '30/03/2024',
        Hora: '10:00 am',
        Actividad: 'Reposo',
        tiempo: '10 min',
        id: 2,
    },
    {
        num: '3',
        Fecha: '30/03/2024',
        Hora: '5:00 pm',
        Actividad: 'Natacion',
        tiempo: '20 min',
        id: 3,
    },
    {
        num: '4',
        Fecha: '30/03/2024',
        Hora: '20:00 pm',
        Actividad: 'Gimnasio',
        tiempo: '1 hora',
        id: 4,
    },
  ];

const Home = () => {
    return (
        <View style={styles.container}>
          <FlatList
            data={datos}
            renderItem={({ item }) => {
              return <HistoryCard info={item} />;
            }}
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

export default Home

 /*<View>
            <Text
            style = {{
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

            }}
            > Medicion 3                          Fecha:30/02024           
            Hora:6:00 pm                                                Actividad Realizada:Trote                           Tiempo: 20min</Text>
            <Text
            style = {{
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

            }}
            > Medicion 2                          Fecha:30/02024           
            Hora:5:00 pm                                                Actividad Realizada:Reposo                           Tiempo: 10min</Text>
            <Text
            style = {{
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

            }}
            > Medicion 1                          Fecha:30/02024           
            Hora:7:00 am                                                Actividad Realizada:Natacion                          Tiempo: 30min</Text>
        </View>*/