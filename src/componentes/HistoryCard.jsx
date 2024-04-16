import React, {useEffect} from "react";
import {View, Text, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import IconLabel from "./IconLabel";
import HistoryCardStyles from "../styles/HistoryCardStyles";
import { useNavigation } from "@react-navigation/native";

const iconColor = 'black';

const HistoryCard = ({ info, handleDeleteRegister }) => {

  const navigation = useNavigation();
  
    return(
      //Contenedor de todas las cartas
        <View style = {HistoryCardStyles.container}>
          
          <View style = {HistoryCardStyles.cardContainer}>
             <View flexDirection='row'>
              <Text style={HistoryCardStyles.titleStyle} > Medicion numero </Text>
              <Text style={HistoryCardStyles.titleStyle} marginLeft={-2}> {info.num} </Text>
            </View>

            <View style={HistoryCardStyles.iconTrashStyle}>
              <TouchableOpacity
              onPress = {()=>{
                handleDeleteRegister(info.id); //Manejar eliminar Registros
              }}>
                <IconLabel name="trash" color='white'/></TouchableOpacity>
            </View>

            <View style = {HistoryCardStyles.infoStyle}>
              
              <Text style={HistoryCardStyles.subtitleStyle}> Fecha: </Text>
              <Text marginLeft={-2}> {info.fecha} </Text>
              
              <Text style={HistoryCardStyles.subtitleStyle} marginLeft={20}> Hora: </Text>
              <Text marginLeft={-2}> {info.hora} </Text>
            
            </View>
            
            <View style = {HistoryCardStyles.infoStyle}>
            
              <Text style={HistoryCardStyles.subtitleStyle}> Actividad Realizada: </Text>
              <Text marginLeft={-2}> {info.actividad} </Text>
            
            </View>
            
            <View style={HistoryCardStyles.iconTimerStyle}>
              <IconLabel name="timer" label= {info.tiempo_actividad_minutos}  color={iconColor} />
            </View>
            
            <View style={HistoryCardStyles. iconArrowtyle}>
              <TouchableOpacity
                onPress = {()=>{
                  navigation.navigate('Registro',{datos:info})//Manejar abrir Registro
                }}>
                  <IconLabel name="arrow-forward-circle"  color='white' size={40}/></TouchableOpacity>
            </View>
            
          </View>
        </View>
    )
}
export default HistoryCard;