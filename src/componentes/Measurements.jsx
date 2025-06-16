import React,{useState,useEffect} from 'react';
import { View,Text,TextInput,FlatList,DeviceEventEmitter, Button, TouchableOpacity, Modal,ImageBackground, Touchable} from 'react-native';
import {Measurementstyles} from '../styles/MeasurementStyles';
import { useDatosContext } from './useDatosContext';
import {useBleContext} from './useBleContext';
import { useBleConnectContext } from './useBleConnectContext';
import ChartHeart from './ChartHeart';
import IconLabel from "./IconLabel";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SaveMedition } from '../api/ecg.api';
import { useAuth } from './AuthContext';


const Measurements = () => {

    const {userDatos} = useAuth({});
    const {datos,setDatos,setSincro,pacientes} = useDatosContext();
    const [paciente,setPaciente] = useState();
    const [firstRender,setFirstRender] = useState(true);
    const [newRegister,setNewRegister] = useState({});
    //const {isBleConnected,setIsBleConnected} = useBleConnectContext();
    const {discoveredDevices,dataReceived,isConnected,objetGenerate,
        setObjetGenerate,writeStartOrder,setIsConnected,startScan,
        setDiscoveredDevices,scanPermission,handleConnectPeripheral,
        handleBleDisconnectManual,isMeasuring, startMeasurement, 
        stopMeasurement,bpm} = useBleContext();
    const [fecha,setFecha] = useState("");
    const [segundos,setSegundos] = useState(0);
    const [isRunning,setIsRunning] = useState(false);
    const [modalVisible,setModalVisible] = useState(false);
    const [intensityAct,setIntensityAct] = useState('Baja');
    const [timeActivity,setTimeActivity] = useState(0);
    const [Activity,setActivity] = useState("");
    const [bpmValue,setBpmValue] = useState(0);
    const [showPacientesOption,setShowPacientesOption] = useState();

    const handleBpsCalculate = () => {
        //Calculo de los BPS
        //const bps = (contarPicos()/segundos)*60;
        //setBpmValue(parseInt(bps,10));
        console.log(bpm);
        setBpmValue(bpm);
    }

    const handleBleDisconnect = () =>{
        setIsConnected(false);
        setObjetGenerate([]);
    }

    const contarPicos = () => {
        let cant = 0;
        for(let i = 0; i < objetGenerate.length; i++){
            try{
                if (objetGenerate[i].y > 230 && objetGenerate[i - 1].y < 230){
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
        if (segundos >= 20){
            stopTimer();
            //console.log(segundos)
            setearFecha(); //Se genera el objeto fecha y Datos para guardar
            mostrarModal();//Temporalmente aca
            //Prueba para detener la medicion 
            setIsRunning(false);
            //writeStartOrder(0);
        }
        if (segundos != 0){
            handleBpsCalculate();
        }
    },[segundos])

    useEffect(() =>{
        if (firstRender){
            setFirstRender(false);
            return;
        }
        if(paciente){
            handleSaveMedition();
            setFirstRender(true);
        }
    },[newRegister])
    //inicia el timer
    const startTimer = () => {
        setObjetGenerate([]);
        setIsRunning(true);
        //setIsMeasuring(true); // Inicia la medición
        startMeasurement();
       // writeStartOrder(1);
        setSegundos(0);
    }
    //detiene el timer
    const stopTimer = () =>{
        //setIsMeasuring(false); // Detiene la medición
        //setObjetGenerate([]);
        stopMeasurement();
        setIsRunning(false);
        setSegundos(0);
        setBpmValue(0);
        //writeStartOrder(0);
        //setSegundos(0);
    }
    const resetTimer = () => {
        //writeStartOrder(0);
        setIsRunning(false);
        setSegundos(0);
        //setObjetGenerate([]);
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
        setNewRegister({
            //"id": obtenerId(),
            //"num": obtenerId(),
            "datos": JSON.stringify(objetGenerate),
            "actividad": Activity,
            "intensidad":intensityAct,
            "fecha": fecha.fecha,
            "hora": fecha.hora,
            "duracion": parseInt(timeActivity,10),
            "bpm": parseInt(bpmValue,10),
            "user":paciente
        });
        //setDatos(datos => [...datos,newRegistro])
        //await AsyncStorage.setItem('mediciones',JSON.stringify(datos));
        //console.debug('guardado con exito');
        //console.log(newRegistro);
        if(!paciente){
            setShowPacientesOption(true);
        }else{
            ocultarModal();
        }
    }

    const handleSaveMedition = async () => {
        response = await SaveMedition(newRegister,userDatos.user.username);
        console.log(newRegister);
        setSincro(true);
    }
    
    const handleSelectPaciente = (opcion) => {
        setPaciente(opcion);
        setShowPacientesOption(false);
    }
    
    return(
        <View style={Measurementstyles.containerPrincipal}>

                <View style={Measurementstyles.actionContainer}>
                <View style={Measurementstyles.bpmContainer}>
                    <FontAwesome5 name="heartbeat" size={30} style={Measurementstyles.Icon}/>
                    <Text style={Measurementstyles.bpmValue}>{bpmValue}</Text>
                    <Text style={Measurementstyles.bpmTitle}>BPM</Text>
                    <MaterialIcons name="timer" size={24} color={'#1A5276'} marginTop={20} marginLeft={90} />
                    <Text style={[Measurementstyles.bpmValue, {marginLeft: 10}]}>{segundos}s</Text>
                </View>
                <View style = {Measurementstyles.chartHeart}>
                    <ChartHeart
                    data = {objetGenerate}
                    //isMeasuring={isMeasuring}
                    />
                </View>

                
            
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
                <View marginVertical={50}>
                    <TouchableOpacity
                    style={Measurementstyles.buttonDesconectar}
                    onPress={handleBleDisconnectManual}>
                        <Text style={Measurementstyles.titleDesconectar}>
                            DESCONECTAR
                        </Text>
                    </TouchableOpacity>
                </View>
               
            </View>
            {/* <Text style = {{fontSize:20}}>{dataReceived}</Text> */}

            {/*Pantalla emergente tras concluir la medicion*/}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={ocultarModal}>
                <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.2)',height:'100%'}}>
                        <ImageBackground style ={Measurementstyles.fondo} source={require('../../assets/cmp.png')} >
                        <View style={Measurementstyles.caja}>
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
                                placeholder="Actividad Realizada"
                                placeholderTextColor={'#616A6B'}
                                value= {Activity}
                                onFocus={()=>{setShowPacientesOption(false)}}
                                onChangeText = {(val)=>{
                                    setActivity(val);
                                }}/>
                            <TextInput
                                style={Measurementstyles.duracionActividad}
                                placeholder="Duracion [minutos]"
                                placeholderTextColor={'#616A6B'}
                                value= {!timeActivity ? "" : timeActivity}
                                onFocus={()=>{setShowPacientesOption(false)}}
                                onChangeText = {(val)=>{
                                    setTimeActivity(val);
                                }}/>
                            <TouchableOpacity
                            onPress={()=>{setShowPacientesOption(true)}}>
                            <TextInput
                                style={Measurementstyles.duracionActividad}
                                placeholder="Paciente[ID]"
                                placeholderTextColor={'#616A6B'}
                                value= {!paciente ? "" : String(paciente)}
                                onChangeText = {(val)=>{
                                    setPaciente(val);
                                    setShowPacientesOption(false);
                                }}
                                editable={false}
                                pointerEvents="none"/>
                            </TouchableOpacity>    

                            {/*showPacientesOption && (
                                <FlatList
                                data={pacientes}
                                keyExtractor={(item, index) => index.toString()}
                                style={Measurementstyles.dropdown}
                                nestedScrollEnabled
                                renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        onPress={() => handleSelectPaciente(item.user)} 
                                        style={Measurementstyles.option}>
                                            <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                              />
                            )*/}
                    
                            <View style={Measurementstyles.containerButtonActivity}>
                                <TouchableOpacity
                                    style={Measurementstyles.touchActividadButton}
                                    onPress={guardarNewRegistro}>
                                        <Text
                                            style={Measurementstyles.actividadtxt}    
                                                >Guardar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={Measurementstyles.touchActividadButton}
                                    onPress={ocultarModal}>
                                        <Text
                                            style={Measurementstyles.actividadtxt}
                                                >Descartar</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        </ImageBackground>
                        {showPacientesOption && (
                                <FlatList
                                data={pacientes}
                                keyExtractor={(item, index) => index.toString()}
                                style={Measurementstyles.dropdown}
                                nestedScrollEnabled
                                renderItem={({ item }) => (
                                    <TouchableOpacity 
                                        onPress={() => handleSelectPaciente(item.user)} 
                                        style={Measurementstyles.option}>
                                            <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                              />
                            )}        
                </View>
            </Modal>
        </View>
    );
}
export default Measurements;
