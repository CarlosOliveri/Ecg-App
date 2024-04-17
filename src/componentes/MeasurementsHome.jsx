import React,{useState} from 'react'
import {Text, View, TouchableNativeFeedback, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MeasurementsHomeStyles } from '../styles/MeasurementsHomeStyles';
import Measurements from './Measurements';
import { useBleConnectContext } from './useBleConnectContext';

const MeasurementsHome = () => {
    
    const navigation = useNavigation();
       
    const {isBleConnected,setIsBleConnected} = useBleConnectContext(false);

    return (
        (!isBleConnected) ? (
            <View>
              <Text style = {MeasurementsHomeStyles.Text}
              >Para poder realizar la medicion debe estar conectado al dispositivo Elecctronico mediante Bluethooth  </Text>
              <TouchableOpacity
                        style = {MeasurementsHomeStyles.touchable}
                        onPress={() => navigation.navigate('Bluetooth')}   
              >
                    <Text
                        style = {MeasurementsHomeStyles.textButton}
                        >Conectar Dispositivo </Text>
                </TouchableOpacity>
            </View>
         ):(
            <Measurements/>
        )
 
    );
}


export default MeasurementsHome;