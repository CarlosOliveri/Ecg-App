import React from "react";
import {View, Text, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import IconLabel from "./IconLabel";


const iconColor = 'black';

const HistoryCard = ({ info }) => {
  const { num, Fecha, Hora, Actividad, tiempo} = info;
    return(
      //Contenedor de todas las cartas
        <View style = {styles.container}>
          <View style = {styles.cardContainer}>
             <View flexDirection='row'>
              <Text style={styles.titleStyle} > Medicion numero </Text>
              <Text style={styles.titleStyle} marginLeft={-2}> {num} </Text>
            </View>
            <View style={styles.iconTrashStyle}>
              <TouchableOpacity><IconLabel name="trash" color='white'/></TouchableOpacity>
            </View>
            <View style = {styles.infoStyle}>
              <Text style={styles.subtitleStyle}> Fecha: </Text>
              <Text marginLeft={-2}> {Fecha} </Text>
              <Text style={styles.subtitleStyle} marginLeft={20}> Hora: </Text>
              <Text marginLeft={-2}> {Hora} </Text>
            </View>
            <View style = {styles.infoStyle}>
              <Text style={styles.subtitleStyle}> Actividad Realizada: </Text>
              <Text marginLeft={-2}> {Actividad} </Text>
            </View>
            <View style={styles.iconTimerStyle}>
            <IconLabel name="timer" label= {tiempo}  color={iconColor} />
            </View>
            <View style={styles. iconArrowtyle}>
              <TouchableOpacity><IconLabel name="arrow-forward-circle"  color='white' size={40}/></TouchableOpacity>
            </View>
            
          </View>
        </View>
    )
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  //El que contiene todas las CustomCard
    container: { 
    width: deviceWidth ,
    alignItems: 'center',
    marginTop: 15,
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#E05E5E',
    height: 150,
    borderRadius: radius,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation:100,
    alignContent:'center'
  },

  titleStyle: {

    borderBottomColor: 'white',
    color:'white',
    alignSelf : 'flex-start',
    fontSize: 20,
    fontWeight: '800',
    marginLeft:10,
    marginTop:5,
  },

  subtitleStyle: {
    //alignSelf : 'flex-start',
    fontSize: 16,
    fontWeight: '800',
    //marginLeft:10,
    marginTop:-2,
  },
  infoStyle: {
    flexDirection:'row',
    marginHorizontal: 15,
    paddingTop:12,
    marginVertical: 5,
  },
  iconTrashStyle: {
    //flexWrap: 'row',
    marginTop:-25,
    marginLeft:280,
  },
  iconTimerStyle: {
    flexDirection: 'row',
    marginTop: 0,
    marginHorizontal:15,
  },
  iconArrowtyle:{
    marginTop:-45,
    marginLeft:268,
  }
});

export default HistoryCard;