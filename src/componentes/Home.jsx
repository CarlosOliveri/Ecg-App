import React,{useState} from 'react'
import {Text, View, TouchableNativeFeedback, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { HomeStyles } from '../styles/HomeStyles';
import Mediciones from './Mediciones';

const Home = () => {
        const navigation = useNavigation();
       
        const [isBleConnected,setIsBleConnected] = useState(false);

        const handleBleConnect =()=>{
        !isBleConnected ? setIsBleConnected(true) : setIsBleConnected(false);
        }

    return (
        (!isBleConnected) ? (
            <View>
              <Text style = {HomeStyles.Text}
              >Para poder realizar la medicion debe estar conectado al dispositivo Elecctronico mediante Bluethooth  </Text>
              <TouchableOpacity
                        style = {HomeStyles.touchable}
                        onPress={() => navigation.navigate('Bluetooth',{onBluetoothConnect:handleBleConnect})}   
              >
                    <Text
                        style = {HomeStyles.textButton}
                        >Conectar Dispositivo </Text>
                </TouchableOpacity>
                </View>
         ):(
            <Mediciones
            onBluetoothDisconnect = {handleBleConnect}/>
        )
 
    );
}


export default Home;