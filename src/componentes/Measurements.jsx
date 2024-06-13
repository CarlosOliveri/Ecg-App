import React,{useState,useEffect} from 'react';
import { View,Text,TextInput,DeviceEventEmitter, Button, TouchableOpacity, Modal, Touchable} from 'react-native';
import {Measurementstyles} from '../styles/MeasurementStyles';
import { useDatosContext } from './useDatosContext';
import {useBleContext} from './useBleContext';
import { useBleConnectContext } from './useBleConnectContext';
import ChartHeart from './ChartHeart';
import IconLabel from "./IconLabel";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const Measurements = () => {

    const {datos,setDatos} = useDatosContext();
    //const {isBleConnected,setIsBleConnected} = useBleConnectContext();
    const {discoveredDevices,dataReceived,isConnected,objetGenerate,
        setObjetGenerate,writeStartOrder,setIsConnected,startScan,setDiscoveredDevices,scanPermission,
        handleConnectPeripheral,handleBleDisconnectManual} = useBleContext();

    const [fecha,setFecha] = useState();
    const [segundos,setSegundos] = useState(0);
    const [isRunning,setIsRunning] = useState(false);
    const [modalVisible,setModalVisible] = useState(false);
    const [intensityAct,setIntensityAct] = useState('Baja');
    const [timeActivity,setTimeActivity] = useState(0);
    const [Activity,setActivity] = useState("");
    //const [datosRegistro,setDatosRegistro] = useState([]);
    //estado correspondiene a los BPS
    const [bpmValue,setBpmValue] = useState(0);

    const handleBpsCalculate = () => {
        //Calculo de los BPS
        const bps = (contarPicos()/segundos)*60;
        setBpmValue(parseInt(bps,10));
        //console.log(bps);
    }

    const handleBleDisconnect = () =>{
        setIsConnected(false);
        setObjetGenerate([]);
    }

    const contarPicos = () => {
        let cant = 0;
        for(let i = 0; i < objetGenerate.length; i++){
            try{
                if (objetGenerate[i].y > 500 && objetGenerate[i - 1].y < 480){
                    cant++;
                }
            }catch(err){
                console.debug("no hacer nada");
            }
        }
        //console.debug(objetGenerate.length);
        return cant;
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

    const setearFecha = () => {
        date = new Date();
        dia = date.getDate();
        mes = date.getMonth()+1;
        año = date.getFullYear();
        hora = date.getHours();
        minuto = date.getMinutes();
        const newDate = año.toString()+'-'+ mes.toString()+'-'+ dia.toString();
        const newHora = hora.toString()+':'+minuto.toString();
        //console.debug(newHora);
        setFecha({'fecha':newDate,'hora': newHora});
        //console.log(dia, mes, año, hora,minuto);
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
        if (segundos > 9){
            stopTimer();
            //console.log(segundos)
            setearFecha(); //Se genera el objeto fecha y Datos para guardar
            mostrarModal();//Temporalmente aca
        }
        if (segundos != 0){
            handleBpsCalculate();
        }
    },[segundos])
    //inicia el timer
    const startTimer = () => {
        setObjetGenerate([]);
        setIsRunning(true);
        writeStartOrder(1);
        setSegundos(0);
    }
    //detiene el timer
    const stopTimer = () =>{
        setIsRunning(false);
        writeStartOrder(0);
        //setSegundos(0);
    }
    const resetTimer = () => {
        writeStartOrder(0);
        setIsRunning(false);
        setSegundos(0);
        setObjetGenerate([]);
        setBpmValue(0);
        //console.debug(bpmValue);
    }

    const mostrarModal = () => {
        setModalVisible(true);
    }
    const ocultarModal = () => {
        setModalVisible(false);
        setActivity("");
        setTimeActivity(0);
        setIntensityAct('Baja');
        resetTimer();
        //console.debug(datos[datos.length -1]);
    }

    const obtenerId =()=>{
        if (datos.length == 0){
            return 1;
        }else{
            return datos[datos.length-1]['id'] + 1;
        }
    }

    const guardarNewRegistro = async () => {
        const newRegistro = {
            "id": obtenerId(),
            "num": obtenerId(),
            "actividad": Activity,
            "intensidad":intensityAct.toString(),
            "fecha": fecha.fecha,
            "hora": fecha.hora,
            "tiempo_actividad_minutos": timeActivity,
            "datos_medicion": objetGenerate,
        };
        setDatos(datos => [...datos,newRegistro])
        await AsyncStorage.setItem('mediciones',JSON.stringify(datos));
        console.debug('guardado con exito');
        ocultarModal();
    }

    
    //Datos que se muestran en el grafico 
    /* const initialData =[
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
    ]; */

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
                    <Text style={Measurementstyles.bpmValue}>{bpmValue}</Text>
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
                    onPress={() => {resetTimer();}}>
                        <Text style={Measurementstyles.buttonTitle}>
                            DETENER MEDICIONES
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                style={Measurementstyles.buttonDesconectar}
                onPress={handleBleDisconnectManual}>
                    <Text style={Measurementstyles.titleDesconectar}>
                        DESCONECTAR
                    </Text>
                </TouchableOpacity>
            </View>
            {/* <Text style = {{fontSize:20}}>{dataReceived}</Text> */}

            {/*Pantalla emergente tras concluir la medicion*/}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={ocultarModal}>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <View style={{alignItems:'center',justifyContent:'center',backgroundColor: '#22aaee',width:350,height:500,marginTop:200}}>
                        <Text style={Measurementstyles.modalHead}>
                            Actividad
                        </Text>
                        <View style={Measurementstyles.actividadContainer}>
                            <TouchableOpacity
                            style={Measurementstyles.touchActividad}
                            onPress={()=>{setIntensityAct('Alta');}}>
                                <Text style={Measurementstyles.actividad}>
                                    Alta intensidad
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={()=>{setIntensityAct('Media')}}
                            style={Measurementstyles.touchActividad}>
                                <Text style={Measurementstyles.actividad}>
                                    Media intensidad
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={()=>{setIntensityAct('Baja')}}
                            style={Measurementstyles.touchActividad}>
                                <Text style={Measurementstyles.actividad}>
                                    Baja intensidad
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={Measurementstyles.duracionActividad}
                            placeholder="actividad"
                            placeholderTextColor={'#bbbbbb'}
                            value= {Activity}
                            onChangeText = {(val)=>{
                                setActivity(val);
                            }}/>
                        <TextInput
                            style={Measurementstyles.duracionActividad}
                            placeholder="[minutos]"
                            placeholderTextColor={'#bbbbbb'}
                            value= {timeActivity}
                            onChangeText = {(val)=>{
                                setTimeActivity(parseInt(val,10));
                            }}/>
                        <View style={Measurementstyles.containerButtonActivity}>
                            <TouchableOpacity
                                style={Measurementstyles.touchActividad}
                                onPress={guardarNewRegistro}>
                                    <Text
                                        style={Measurementstyles.actividad}    
                                            >Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={Measurementstyles.touchActividad}
                                onPress={ocultarModal}>
                                    <Text
                                        style={Measurementstyles.actividad}
                                            >Descartar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default Measurements;
