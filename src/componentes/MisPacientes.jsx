import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList,Button, TouchableOpacity } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import Header from './Header';
import PacientesCards from './PacientesCards';
import { useNavigation } from "@react-navigation/native";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { useDatosContext } from './useDatosContext';
import { DeleteMedition} from '../api/ecg.api';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import IconLabel from "./IconLabel";

const MisPacientes = () => {
  
	/* const Measurements = datosJson.mediciones;
	const [datos, setDatos] = useState(Measurements); */
	const {datos,setDatos,setSincro, pacientes} = useDatosContext();
	const isFocused = useIsFocused();
	const navigation = useNavigation();
	
	useEffect(() => {
		if (isFocused){
			console.log("[MisPacientes]");
			setDatos([]);
		}
	},[isFocused]);

	const handleDeleteRegister = async (id) =>{
		//Manejar eliminacion de registros
		const response = await DeleteMedition(id);
		console.debug(response.data["mensaje"]);
		setSincro(true);
	}


	const NuevoUsuario = () => {
		navigation.navigate("PacienteRegister");
	}

	const handleSincronizacion = () => {
		setSincro(true);
	}

    return (
        <View style={styles.container}>
			<View  style={styles.addPaciente}>
				<TouchableOpacity
					title='Nuevo Paciente'
					onPress={()=>{NuevoUsuario()}}
					>
						<IconLabel name="add-circle"  color='rgba(31,97,160,0.8)' size={40}/>
				</TouchableOpacity>
				<TouchableOpacity
					title='Actualizar'
					onPress={()=>{handleSincronizacion()}}>
						<IconLabel name="refresh-circle"  color='rgba(31,97,160,0.8)' size={40}/>
				</TouchableOpacity>
			</View>
          	<FlatList
            	data={pacientes}
            	renderItem={({ item, index }) => {
					return (
                		<PacientesCards 
                  			info = {{... item,num : index +1}} 
                  			handleDeleteRegister = {handleDeleteRegister}/>
            	);}}
            	keyExtractor={(pacientes) => String(pacientes.user)}
            	showsVerticalScrollIndicator={false}/>
          
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		alignItems: 'center',
    },
	addPaciente:{
		flexDirection: "row",
		paddingLeft: 13,
		width: 360,
		justifyContent: "space-between",
    	color:'white',
		//backgroundColor: "red"
	}
});

export default MisPacientes;