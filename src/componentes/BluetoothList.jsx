import React,{useState, useEffect} from "react";
import { Platform, NativeModules,
     NativeEventEmitter, PermissionsAndroid, View,
      Text, FlatList, StyleSheet} from "react-native";
import BluetoothListStyles from "../styles/BluetoothListStyles";
import Empty from './Empty';
import Toggle from './Toggle';
import Dispositivos from "./Dispositivos";
//import useBLE from "./useBLE";
import {useBleConnectContext} from "./useBleConnectContext";
import {useBleContext} from './useBleContext';
import { useNavigation} from "@react-navigation/native";

const BluetoothList = () => {

  const {discoveredDevices,startScan,startPermission} = useBleContext();

  const {isBleConnected,setIsBleConnected} = useBleConnectContext();

  const updateState = () => {
    setIsBleConnected(true);
  }

  const [toggleEnable,setToggleEnable] = useState(false); 

    //Si no hay dispositivos encontrados
    const renderEmpty = () => <Empty text = 'No hay Dispositivos'/>
 
    //Enlistamos los dispositivos detectados
    const renderItem = ({peripheral}) => {
        const {name, rssi, connected} = peripheral;
        return (
            <Dispositivos 
                {...connectedDevices} 
                onPress = {connectToPeripheral}
                iconLeft = {require('../../icons/ic_laptop.webp')} 
                iconRight = {require('../../icons/ic_settings.png')}
            />
        );
    }
    //inicia el scaneo de dispositivos cercanos
  const handleStartScan = () => {
    startPermission(
      () => {startScan();},
      () => {console.log("Permisos no consedidos");}
    );
  }

    //Cambiamos el valor del toggle
    const toggleBluetooth = () => {
        if (!toggleEnable) {
            setToggleEnable(true); 
            handleStartScan();
            updateState();
            return
        }
        setToggleEnable(false);
    }
////////////////////////LAYOUT//////////////////////////////////
    return (
        <View style={BluetoothListStyles.container}>
            <Text style={BluetoothListStyles.title}>
                Bluetooth
            </Text>
            <Toggle
                onChange = {toggleBluetooth}
                value = {toggleEnable}
            />
            
            <View style = {BluetoothListStyles.containerSubtitle}>
            <Text style={BluetoothListStyles.Subtitle}>
                Lista de Dispositivos
            </Text>
            <View style={BluetoothListStyles.lineSubtitle}/>
        </View>
            <FlatList
                data ={discoveredDevices}
                ListEmptyComponent={renderEmpty}
                renderItem={renderItem}
            />
        </View>
    );
}
export default BluetoothList;