import React,{useState,useEffect} from 'react';
import { View,Text,DeviceEventEmitter, Button } from 'react-native';
import {Measurementstyles} from '../styles/MeasurementStyles';
//import useBLE from './useBLE';
import {useBleContext} from './useBleContext';
import { useBleConnectContext } from './useBleConnectContext';
import ChartHeart from './ChartHeart';

const Measurements = () => {

    const {isBleConnected,setIsBleConnected} = useBleConnectContext();
    const {discoveredDevices,dataReceived,isConnected,objetGenerate,setIsConnected,startScan,scanPermission,handleConnectPeripheral} = useBleContext();


    //estado correspondiene a los BPS
    const [bpsValue,setBpsValue] = useState(0);
    //estado correspondiente al numero de maximos detectados
    const [numMaximos,setNumMaximos] = useState(0);
    //estado correspondiente al array de Measurements que se va recibiendo
    const [MeasurementsData,setMeasurementsData] = useState([]);

    //Llamamos a esta funcion cada vez que llega una nueva medicion
    const handleBpsChange =() => {
        //Calculo de los BPS
        //El tiempoTranscurridoc corresponde al tiempo actual
        setBpsValue(numMaximos/tiempoTranscurrido);
    }

    //Cuando se detecta un pico se llama a esta funcion
    //y se incrementa el numero de maximos detectados 
    const handleNumMaxChange =()=>{
        setNumMaximos(numMaximos + 1);
    }

    const handleBleDisconnect = () =>{
        setIsConnected(false);
    }

    useEffect(()=>{
        // Listener que escucha la desconexion del bluetooth
        const subscription = DeviceEventEmitter.addListener(
            'BleManagerDidUpdateState',
            ({ state }) => {
                console.log('El bluetooth se a apagado =>estado: ', state);
                // Aquí puedes actualizar el estado del Bluetooth en tu componente
                handleBleDisconnect();
            }
        );
        // Retornar una función de limpieza para desuscribirse del evento
        return () => {
            subscription.remove(); // limpiar el reqgistro del listener
        };
    },[]);

    
    //Datos que se muestran en el grafico 
    //este array debe actualizarse conforme llegan los datos
    //=> Debe cambiarse por el estado "MeasurementsData"
    const initialData =[
        {x:0, y: 32.51 },
        {x:1, y: 31.11 },
        {x:2, y: 27.02 },
        {x:3, y: 27.32 },
        {x:4, y: 25.17 },
        {x:5, y: 28.89 },
        {x:6, y: 25.46 },
        {x:7, y: 23.92 },
        {x:8, y: 22.68 },
        {x:9, y: 22.67 },
    ];

    const data = [{x:0,y: 1}, {x:1,y: 2}, {x:2,y: 1}];
    console.log(objetGenerate[objetGenerate.length-1]);
    
    return(
        <View style={Measurementstyles.containerPrincipal}>
            <View style = {Measurementstyles.chartHeart}>
                <ChartHeart
                data = {objetGenerate}/>
            </View>
        
            <View style={Measurementstyles.actionContainer}>
                <View style={Measurementstyles.bpmContainer}>
                    <Text style={Measurementstyles.bpmTitle}>BPM:</Text>
                    <Text style={Measurementstyles.bpmValue}>{bpsValue}</Text>
                </View>
                <View style={Measurementstyles.buttonContainer}>
                    <Button
                    title='Iniciar Medicion'
                    onPress={()=>{}}/>
                    <Button
                    title='Detener medicion'
                    onPress={()=>{}}/>
                </View>
            </View>
            {/* <Text style = {{fontSize:20}}>{dataReceived}</Text> */}
        </View>
    );
}
export default Measurements;
