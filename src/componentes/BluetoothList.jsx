import React,{useState, useEffect} from "react";
import { Platform, NativeModules,
     NativeEventEmitter, PermissionsAndroid, View,
      Text, FlatList, StyleSheet} from "react-native";
import BluetoothListStyles from "../styles/BluetoothListStyles";
import BleManager from 'react-native-ble-manager';
import Empty from './Empty';
import Toggle from './Toggle';
import Dispositivos from "./Dispositivos";
import { useNavigation, useRoute } from "@react-navigation/native";

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BluetoothList = (/*{route}*/) => {

  const route = useRoute();

  const {onBluetoothConnect} = route.params;
  const [isScanning, setIsScanning] =useState(false);
  const [bolEnable,setBolEnable] = useState(false); 
  const [discoveredDevices, setDisceveredDevices] = useState();

  const handleBleConnect = () =>{
    onBluetoothConnect();
  }

  useEffect(() => {
    //Inicializamos los paquetes de BleManager
    BleManager.start({showAlert: false}).then(() => 
        console.debug('[Ble Initialized] Initialized')
      )/*.catch((error) =>
          console.error('[Ble Initialized] No Initialized=>', error),
        );*/

    EncenderBluetooth();

    const listeners = [
        BleManagerEmitter.addListener(
          'BleManagerDiscoverPeripheral',
          handleDiscoverPeripheral,
        ),
        BleManagerEmitter.addListener(
          'BleManagerStopScan', 
          handleStopScan
        ),
        BleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        handleUpdateValueForCharacteristic,
      ),
    ];
    return () => {
        console.debug('[app] main component unmounting. Removing listeners...');
        for (const listener of listeners) {
          listener.remove();
        }
    };

  }, [])

  const handleUpdateValueForCharacteristic = (
    data,
  ) => {
    /*console.debug(
      `[handleUpdateValueForCharacteristic] received data from '${data.peripheral}' with characteristic='${data.characteristic}' and value='${data.value}'`,
    );*/
    console.log(data);
  };

  //Maneja el permiso de Scan de dispositivos cercanos en tiempo de ejecucion
  const scanPermission = () =>{
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      ).then(res => {
        if (res) {
          console.log('[Permission Scan Check] Permission is OK');
          startScan();
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          ).then(res => {
            if (res == true) {
              console.log('[Permission Scan Request] User accepted =>',res);
              startScan();
            } else if(!res) {
              console.log('[Permission Scan Request] User refused =>',res);
            }
            else {
              console.log('[Permission Scan Request] User response was =>',res);
            }
          })/*.catch((err) => {
              console.log('[Permission Scan Request Error]',err);
          });*/
        }
      })/*.catch((err) => {
          console.log('[Permision Scan Chech Error]',err)
      });*/
    }
  }

  //Empezamos a Scanear los dispositivos cercanos
  const startScan = () => {
    if (!isScanning) {
      console.log('[startScan] Scanning...');
      setIsScanning(true);
      BleManager.scan([],5,true).then(() => {
        console.log('[startScan] scan promise returned Succsesfuly');
        handleBleConnect();
      })/*.catch(error => {
        console.log('[startScan] scan returned an error',error);
      });*/
    }
  };

  //Manejamos la detencion del scaneo
  const handleStopScan = () => {
    setIsScanning(false);
    console.debug('[handleStopScan] scan is stopped.');
  };

  const handleDiscoverPeripheral = (peripheral) => {
    console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    setDisceveredDevices(map => {
      return new Map(map.set(peripheral.id, peripheral));
    });
  };

  const handleDisconnectedPeripheral = (BleDisconnectPeripheralEvent) => {
    console.debug(
      `[handleDisconnectedPeripheral][${BleDisconnectPeripheralEvent.peripheral}] disconnected.`,
    );
    setPeripherals(map => {
      let p = map.get(BleDisconnectPeripheralEvent.peripheral);
      if (p) {
        p.connected = false;
        return new Map(map.set(BleDisconnectPeripheralEvent.peripheral, p));
      }
      return map;
    });
};
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

    //Encendemos el Bluetooth si no lo esta
  const EncenderBluetooth = () => {
      BleManager.enableBluetooth().then(() =>{
          console.log('Bluetooth se ha encendido');
          //Inicializamos los paquetes de BleManager
          BleManager.start({showAlert : false}).then(() => {
              console.log('BleManager initialized')/*.catch((error)=>{
                console.log('BeManager could not be started.', error)
              });*/
          });
      });
  };

    //Cambiamos el valor del toggle
    const toggleBluetooth = () => {
        if (!bolEnable) {
            //EncenderBluetooth();
            setBolEnable(true); 
            scanPermission();
            return
        }
        setBolEnable(false);
    }
////////////////////////LAYOUT//////////////////////////////////
    return (
        <View style={BluetoothListStyles.container}>
            <Text style={BluetoothListStyles.title}>
                Bluetooth
            </Text>
            <Toggle
                onChange = {toggleBluetooth}
                value = {bolEnable}
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