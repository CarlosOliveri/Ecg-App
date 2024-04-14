
import React,{useState} from 'react'
import {Text, View, TouchableNativeFeedback, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { HomeStyles } from '../styles/HomeStyles';
import Mediciones from './Mediciones';

const Estadisticas = () => {
        const navigation = useNavigation();
       
        const [isBleConnected,setIsBleConnected] = useState(false);

        const handleBleConnect =()=>{
        !isBleConnected ? setIsBleConnected(true) : setIsBleConnected(false);
        }

    return (
        (!isBleConnected) ? (
            <View>
                    <Text
                        style = {{
                            fontSize: 17,
                            marginHorizontal: 10,
                            marginTop: '50%',
                            paddingHorizontal:10,
                            textAlign: 'center',
                        }}
                    >Para poder realizar la medicion debe estar conectado al dispositivo Elecctronico mediante Bluethooth  </Text>
                <TouchableOpacity
                        style = {{
                            backgroundColor: 'red',
                            padding : 10,
                            marginTop : 20,
                            width : '50%',
                            alignSelf: 'center',
                            borderRadius: 10,
                        }}
                        onPress={() => navigation.navigate('Bluetooth',{onBluetoothConnect:handleBleConnect})}   
                >
                    <Text
                        style = {{
                            fontSize: 16,
                            textAlign: 'center',
                            color: "white",

                        }}
                        >Conectar Dispositivo </Text>
                </TouchableOpacity>
                </View>
         ):(
            <Mediciones
            onBluetoothDisconnect = {handleBleConnect}/>
        )
 
    );
}


export default Estadisticas