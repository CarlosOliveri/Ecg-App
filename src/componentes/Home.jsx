import React from 'react'
import {Text, View, TouchableNativeFeedback, Button} from 'react-native'
import BluetoothList from './BluetoothList';
import { useNavigation } from '@react-navigation/native';





const Home = () => {
    const navigation = useNavigation();
    return (
        <>
            <Text>Aqui se espera encontrar las lecturas en tiempo real recibidas y otra infirmacion</Text>
            <View 
                style={{ width: 200,
                height: 50, 
                justifyContent: 'center',
                alignItems: 'center' }}
            >
                <Button 
                title="Bluetooth" 
                onPress={() => navigation.navigate('Bluetooth')} />
            </View>
        </>
    );
}

export default Home