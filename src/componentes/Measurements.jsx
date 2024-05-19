import React,{useState,useEffect} from 'react';
import { View,Text,DeviceEventEmitter, Button, TouchableOpacity, Modal} from 'react-native';
import {Measurementstyles} from '../styles/MeasurementStyles';
//import useBLE from './useBLE';
import {useBleContext} from './useBleContext';
import { useBleConnectContext } from './useBleConnectContext';
import ChartHeart from './ChartHeart';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

const Measurements = () => {

    const {isBleConnected,setIsBleConnected} = useBleConnectContext();
    const {discoveredDevices,dataReceived,isConnected,objetGenerate,setIsConnected,startScan,scanPermission,handleConnectPeripheral} = useBleContext();

    const [fecha,setFecha] = useState();
    const [segundos,setSegundos] = useState(0);
    const [isRunning,setIsRunning] = useState(false);
    const [modalVisible,setModalVisible] = useState(false);

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

    //detecta cambios en el estado del bluetooth
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

    const handleStorage = () => {
        date = new Date();
        dia = date.getDate();
        mes = date.getMonth()+1;
        año = date.getFullYear();
        hora = date.getHours();
        minuto = date.getMinutes();
        setFecha({'fecha':{'dia':dia,'mes':mes,'año':año,'hora':hora,'minuto':minuto}})
        console.log(dia, mes, año, hora,minuto);
    }

    //se encarga del inicio del timer
    useEffect(() => {
        let interval;
        if(isRunning){
            interval = setInterval(() => {
                setSegundos(prevTime => prevTime + 1);
            },1000);
        }
        return() =>{
            clearInterval(interval);
        };
    },[isRunning])
    //Detecta cambios en el Timer para detenerlo
    useEffect(() =>{
        if (segundos == 6){
            stopTimer();
            //console.log(segundos)
            handleStorage(); //Se genera el objeto fecha y Datos para guardar
            mostrarModal();//Temporalmente aca
        }
    },[segundos])
    //inicia el timer
    const startTimer = () => {
        setIsRunning(true);
    }
    //detiene el timer
    const stopTimer = () =>{
        setIsRunning(false);
        setSegundos(0)
    }

    const mostrarModal = () => {
        setModalVisible(true);
    }
    const ocultarModal = () => {
        setModalVisible(false);
    }

    
    //Datos que se muestran en el grafico 
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

    /* const data = [{x:0,y: 1}, {x:1,y: 2}, {x:2,y: 1}];*/
    //console.log(objetGenerate); 
    
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
                <Text style={Measurementstyles.bpmValue}>{segundos}</Text>
                <View style={Measurementstyles.buttonContainer}>
                    <TouchableOpacity
                    style = {Measurementstyles.Button}
                    onPress={() => {
                        //aca se debe manejar el inicio de las mediciones
                        startTimer();//temporalmente aca
                    }}>
                        <Text style={Measurementstyles.buttonTitle}>
                            INICIAR MEDICIONES
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style = {Measurementstyles.Button}
                    onPress={() => {stopTimer();}}>
                        <Text style={Measurementstyles.buttonTitle}>
                            DETENER MEDICIONES
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <Text style = {{fontSize:20}}>{dataReceived}</Text> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={ocultarModal}>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <View style={{backgroundColor: 'pink',width:300,height:500,marginTop:200}}>
                        <Text>
                            Hola Mundo
                            <Button
                                title='cerrar'
                                onPress={ocultarModal}
                            />
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default Measurements;
