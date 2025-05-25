import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Dimensions,TouchableOpacity,ImageBackground} from 'react-native';
import IconLabel from "./IconLabel";
import HistoryCardStyles from "../styles/HistoryCardStyles";
import { useNavigation } from "@react-navigation/native";
import { color } from "react-native-elements/dist/helpers";
import { getUserDatos } from '../api/ecg.api';
import { useAuth } from "./AuthContext";

const iconColor = 'white';

const PacientesCards = ({ info, handleDeleteRegister }) => {

  	const navigation = useNavigation();
	const [paciente,setPaciente] = useState({
		"first_name": "",
		"last_name": "",
		"username": "",
		"email": "",
		"id":0,
	});
	const {token} = useAuth();

	const GetDatosPaciente = async () => {
		const response = await getUserDatos(token,info.user);
		const datosPaciente = response.data
		setPaciente(datosPaciente);
}

	useEffect(()=>{
		//console.log(info)
		GetDatosPaciente();
	},[])

	useEffect(()=>{
		//console.log(paciente);
	},[paciente])

    return(
      	//Contenedor de todas las cartas
        <View style = {HistoryCardStyles.container}>
			<ImageBackground style ={HistoryCardStyles.fondo} resizeMode="cover" source={require('../../assets/hhearth.png')} >
			<View style = {HistoryCardStyles.cardContainer}>
				<View flexDirection='row'>
				<Text style={HistoryCardStyles.titleStyle} > {paciente.first_name} </Text>
				<Text style={HistoryCardStyles.titleStyle} marginLeft={-2}> {paciente.last_name} </Text>
				</View>

            <View style={HistoryCardStyles.iconTrashStyle}>
				<TouchableOpacity
				onPress = {()=>{
					handleDeleteRegister(info.id); //Manejar eliminar Registros
				}}>
					<IconLabel name="trash" color='white'/></TouchableOpacity>
            </View>

            <View style = {HistoryCardStyles.infoStyle}>
              
				<Text style={HistoryCardStyles.subtitleStyle}> historial Medico:</Text>
				<Text marginLeft={-2} style={{color:'white'}}> {info.historial_medico} </Text>
				
				<Text style={HistoryCardStyles.subtitleStyle} marginLeft={20}> Altura: </Text>
				<Text marginLeft={-2} style={{color:'white'}}> {info.altura} </Text>
				
            </View>
            
            <View style = {HistoryCardStyles.infoStyle}>
            
				<Text style={HistoryCardStyles.subtitleStyle}> Peso: </Text>
				<Text marginLeft={-2} style={{color:'white'}}> {info.peso} </Text>
            
            </View>
            
            <View style={HistoryCardStyles.iconTimerStyle}>
              	<IconLabel name="timer" label = {info.duracion} color={iconColor}/>
            </View>
            
            <View style={HistoryCardStyles. iconArrowtyle}>
				<TouchableOpacity
					onPress = {()=>{
					navigation.navigate("HistoryScreen",{datos:{paciente,info}})//Manejar abrir Registro
				}}>
					<IconLabel name="arrow-forward-circle"  color='white' size={40}/></TouchableOpacity>
            </View>
            
            
			</View>
			</ImageBackground>
        </View>
    )
}




export default PacientesCards;