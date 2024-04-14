import React,{useState} from 'react'
import {Text, View, Button} from 'react-native'
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
            <View style={HomeStyles.ButtonContainer}>
                <Text
                style = {HomeStyles.Text}>
                    Para realizar mediciones debe 
                    conectarse por Bluetooth al dispositivo ECG.
                </Text>
                <Button 
                title="Conectar Dispositivo" 
                onPress={() => navigation.navigate('Bluetooth',{onBluetoothConnect:handleBleConnect})}
                color = '#56C0FF' />
            </View>
        ):(
            <Mediciones
            onBluetoothDisconnect = {handleBleConnect}/>
        )
        
    );
}

export default Home