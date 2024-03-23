import React,{useState, useEffect} from "react";
import { Platform, NativeModules, useColorScheme,
     NativeEventEmitter, PermissionsAndroid, View,
      Text, FlatList, StyleSheet, ScrollView, Switch } from "react-native";
import {
        BleDisconnectPeripheralEvent,
        BleManagerDidUpdateValueForCharacteristicEvent,
        BleScanCallbackType,
        BleScanMatchMode,
        BleScanMode,
        Peripheral,
      } from 'react-native-ble-manager';
import BleManager from 'react-native-ble-manager';
//import {Colors} from 'react-native/libraries/NewAppScreen';
import Empty from './Empty';
import Toggle from './Toggle';
import Dispositivos from "./Dispositivos";

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const SECONDS_TO_SCAN_FOR = 5;
const SERVICE_UUIDS = [];
const ALLOW_DUPLICATES = true;

const BluetoothList = () => {

    const [isScanning, setIsScanning] =useState(false);
    const [bolEnable,setBolEnable] = useState(false); 
    const [peripherals, setPeripherals] = useState([]);

    //Empezamos a Scanear los dispositivos cercanos
    const startScan = () => {
      if (!isScanning) {
        try{
          console.log('[startScan] Scanning...');
          setIsScanning(true);
          BleManager.scan(
            SERVICE_UUIDS,
            SECONDS_TO_SCAN_FOR,
            ALLOW_DUPLICATES).then(() => {
              console.log('[startScan] scan promise returned Succsesfuly');
            }).catch((error) => {
              console.log('[startScan] scan returned an error',error);
          });
        }catch(error){
          console.log('[startScan] scan error thrown',error);
        };/**/
      };
  };

  //Manejamos la detencion del scaneo
  const handleStopScan = () => {
    setIsScanning(false);
    console.debug('[handleStopScan] scan is stopped.');
    console.log(SERVICE_UUIDS)
  };



  const handleConnectPeripheral = (event) => {
        console.log(`[handleConnectPeripheral][${event.peripheral}] connected.`);
  };

  const handleUpdateValueForCharacteristic = (data) => {
    console.debug(
      `[handleUpdateValueForCharacteristic] received data from '${data.peripheral}' with characteristic='${data.characteristic}' and value='${data.value}'`,
    );
  };
    
  const handleDiscoverPeripheral = (peripheral) => {
        console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral);
        if (!peripheral.name) {
          peripheral.name = 'NO NAME';
        }
        setPeripherals(map => {
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

    const retrieveConnected = async () => {
      try {
        const connectedPeripherals = await BleManager.getConnectedPeripherals();
        if (connectedPeripherals.length === 0) {
          console.warn('[retrieveConnected] No connected peripherals found.');
          return;
        }
  
        console.debug(
          '[retrieveConnected] connectedPeripherals',
          connectedPeripherals,
        );
  
        for (var i = 0; i < connectedPeripherals.length; i++) {
          var peripheral = connectedPeripherals[i];
          setPeripherals(map => {
            let p = map.get(peripheral.id);
            if (p) {
              p.connected = true;
              return new Map(map.set(p.id, p));
            }
            return map;
          });
        }
      } catch (error) {
        console.error(
          '[retrieveConnected] unable to retrieve connected peripherals.',
          error,
        );
      }
    };

    const connectPeripheral = async (peripheral) => {
      try {
        if (peripheral) {
          setPeripherals(map => {
            let p = map.get(peripheral.id);
            if (p) {
              p.connecting = true;
              return new Map(map.set(p.id, p));
            }
            return map;
          });
  
          await BleManager.connect(peripheral.id);
          console.debug(`[connectPeripheral][${peripheral.id}] connected.`);
  
          setPeripherals(map => {
            let p = map.get(peripheral.id);
            if (p) {
              p.connecting = false;
              p.connected = true;
              return new Map(map.set(p.id, p));
            }
            return map;
          });
  
          // before retrieving services, it is often a good idea to let bonding & connection finish properly
          await sleep(900);
  
          /* Test read current RSSI value, retrieve services first */
          const peripheralData = await BleManager.retrieveServices(peripheral.id);
          console.debug(
            `[connectPeripheral][${peripheral.id}] retrieved peripheral services`,
            peripheralData,
          );
  
          setPeripherals(map => {
            let p = map.get(peripheral.id);
            if (p) {
              return new Map(map.set(p.id, p));
            }
            return map;
          });
  
          const rssi = await BleManager.readRSSI(peripheral.id);
          console.debug(
            `[connectPeripheral][${peripheral.id}] retrieved current RSSI value: ${rssi}.`,
          );
  
          if (peripheralData.characteristics) {
            for (let characteristic of peripheralData.characteristics) {
              if (characteristic.descriptors) {
                for (let descriptor of characteristic.descriptors) {
                  try {
                    let data = await BleManager.readDescriptor(
                      peripheral.id,
                      characteristic.service,
                      characteristic.characteristic,
                      descriptor.uuid,
                    );
                    console.debug(
                      `[connectPeripheral][${peripheral.id}] ${characteristic.service} ${characteristic.characteristic} ${descriptor.uuid} descriptor read as:`,
                      data,
                    );
                  } catch (error) {
                    console.error(
                      `[connectPeripheral][${peripheral.id}] failed to retrieve descriptor ${descriptor} for characteristic ${characteristic}:`,
                      error,
                    );
                  }
                }
              }
            }
          }
  
          setPeripherals(map => {
            let p = map.get(peripheral.id);
            if (p) {
              p.rssi = rssi;
              return new Map(map.set(p.id, p));
            }
            return map;
          });
          
          navigation.navigate('PeripheralDetails', {peripheralData: peripheralData});
        }
      
        
      
      } catch (error) {
        console.error(
          `[connectPeripheral][${peripheral.id}] connectPeripheral error`,
          error,
        );
      }
    };

    

    const handleAndroidPermissions = () => {
        if (Platform.OS === 'android' && Platform.Version >= 31) {
          PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.BLUETOOTH,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          ]).then(result => {
            if (result) {
              console.debug(
                '[handleAndroidPermissions] User accepts runtime permissions android 12+',
              );
            } else {
              console.error(
                '[handleAndroidPermissions] User refuses runtime permissions android 12+',
              );
            }
          });
        } else if (Platform.OS === 'android' && Platform.Version >= 23) {
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(checkResult => {
            if (checkResult) {
              console.debug(
                '[handleAndroidPermissions] runtime permission Android <12 already OK',
              );
            } else {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              ).then(requestResult => {
                if (requestResult) {
                  console.debug(
                    '[handleAndroidPermissions] User accepts runtime permission android <12',
                  );
                } else {
                  console.error(
                    '[handleAndroidPermissions] User refuses runtime permission android <12',
                  );
                }
              });
            }
          });
        }
      };

    useEffect(() => {

        handleAndroidPermissions();

        //Inicializamos los paquetes de BleManager
      try {
        BleManager.start({showAlert: false}).then(() => 
          console.debug('BleManager started.')).catch((error) =>
            console.error('BeManager could not be started.', error),
          );
      } catch (error) {
        console.error('unexpected error starting BleManager.', error);
        return;
      }

        const listeners = [
            BleManagerEmitter.addListener(
              'BleManagerDiscoverPeripheral',
              handleDiscoverPeripheral,
            ),
            BleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
            BleManagerEmitter.addListener(
              'BleManagerDisconnectPeripheral',
              handleDisconnectedPeripheral,
            ),
            BleManagerEmitter.addListener(
              'BleManagerDidUpdateValueForCharacteristic',
              handleUpdateValueForCharacteristic,
            ),
            BleManagerEmitter.addListener(
              'BleManagerConnectPeripheral',
              handleConnectPeripheral,
            ),
        ];
        return () => {
            console.debug('[app] main component unmounting. Removing listeners...');
            for (const listener of listeners) {
              listener.remove();
            }
        };

    }, [])

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
              console.log('BleManager initialized').catch((error)=>{
                console.log('BeManager could not be started.', error)
              });   
          });
      });
  };

    //Cambiamos el valor del toggle
    const toggleBluetooth = () => {
        if (!bolEnable) {
            //EncenderBluetooth();
            setBolEnable(true); 
            startScan();
            return
        }
        setBolEnable(false);
    }
////////////////////////LAYOUT//////////////////////////////////
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Bluetooth
            </Text>
            <Toggle
                onChange = {toggleBluetooth}
                value = {bolEnable}
            />
            
            <View style = {styles.containerSubtitle}>
            <Text style={styles.Subtitle}>
                Lista de Dispositivos
            </Text>
            <View style={styles.lineSubtitle}/>
        </View>
            <FlatList
                data ={SERVICE_UUIDS}
                ListEmptyComponent={renderEmpty}
                renderItem={renderItem}
            />
        </View>
    );
}
//////////////////////////ESTILOS///////////////////////////////
const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        paddingVertical: 25,
        backgroundColor: '#f5fcff'
    },
    title:{
        marginLeft:10,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    containerSubtitle:{
        flexDirection: 'row',
        marginVertical:15,
        alignItems:'center'
    },
    Subtitle:{
        marginLeft: 10,
        fontSize:18,
        fontWeight:'bold',
        color:'gray'
    },
    lineSubtitle:{
        borderBottomWidth:1,
        flex:1,
        marginLeft:10,
        marginTop:3,
        borderColor:'#eceff1'
    }
})

export default BluetoothList;