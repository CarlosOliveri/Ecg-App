import { NativeEventEmitter, NativeModules, Platform, PermissionsAndroid,Alert } from 'react-native';
import {useState, useEffect} from "react";
import BleManager from 'react-native-ble-manager';
import { PERMISSIONS } from 'react-native-permissions';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);


const useBLE = () => {
    
    const [isScanning,setIsScanning] = useState(false);
    const [discoveredDevices,setDiscoveredDevices] = useState(new Map())
    const [dataRecived,setDataRecived] = useState([]);
    
    useEffect(()=>{
        BluetoothModuleStart();
        //EncenderBluetooth();
        requestPermissions();

        /*BleManager.checkState().then(state => {
            if (state == 'off'){
                console.log('Turnning ON de Bluetooth')
                Alert.alert(
                    'Bluetooth Disable',
                    'Debe encender su Bluetooth.',
                    [
                      {
                        text: 'Aceptar',
                        onPress: () => {console.log('Botón Aceptar presionado');},
                        style: 'default', // 'default', 'cancel', 'destructive'
                      },
                      {
                        text: 'Cancelar',
                        onPress: () => console.log('Botón Cancelar presionado'),
                        style: 'cancel',
                      },
                    ],
                    { cancelable: false } // No permite cerrar el alerta haciendo clic fuera de él
                  );
            }else{
                console.log('Bluetooth already ON')
            }
        });*/

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

    },[]);

    const handleUpdateValueForCharacteristic = (data) => {
        //LOS DATOS DEBEN SER PROCESADOS PRIMERAMENTE ANTES DE CONCATENARLOS AL ESTADO DE DATOS RECIBIDO ACTUAL
        //setDataRecived(data)
        console.debug(data);
    };
    
    const BluetoothModuleStart = () => {
        BleManager.start({showAlert: false, forceLegacy: true}).then(() =>{ 
            console.debug('[Ble Initialized] Initialized'); 
        })/*.catch((error) =>
          console.error('[Ble Initialized] No Initialized=>', error),
        );*/
    }

    //Encendemos el Bluetooth si no lo esta
    const EncenderBluetooth = () => {
        BleManager.enableBluetooth().then(() =>{
            console.log('Bluetooth se ha encendido');
        }).catch((err)=>{
            console.log('[EnableBluetoothError] ',err);
        });
    };

    const scanPermission = (onPermissionGranted, onPermissionDenied) =>{
        if (Platform.OS === 'android' && Platform.Version >= 23) {
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          ).then(res => {
            if (res) {
                console.log('[Permission Scan Check] Permission is OK',res);
                onPermissionGranted();
            } else {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
              ).then(res => {
                if (res == true) {
                    console.log('[Permission Scan Request] User accepted =>',res);
                    onPermissionGranted();
                } else if(!res) {
                    console.log('[Permission Scan Request] User refused =>',res);
                    onPermissionDenied();
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
    };

    const requestPermissions = () => {
      if (Platform.OS == 'android'){
        PermissionsAndroid.requestMultiple(
          [PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION]
        ).then((result) => {
            console.debug("[Location Permissions] granted");
        }).catch((err)=> {console.log("Error de permisos" ,err)})
      }
    }

    //Empezamos a Scanear los dispositivos cercanos
    const startScan = async () => {
        if (!isScanning) {
            //console.log('[startScan] Scanning...');
            setIsScanning(true);
            BleManager.scan([],1,true).then(() => {
              console.debug('[startScan] Scanning...');
            }).catch((err) => {
              console.debug("[StartScan] Error al scanear")
            });
        }
    };

    //Manejamos la detencion del scaneo
    const handleStopScan = () => {
        setIsScanning(false);
        console.debug('[handleStopScan] scan is stopped.');
    };

    const handleDiscoverPeripheral = (peripheral) => {
        setDiscoveredDevices(map => {
          return new Map(map.set(peripheral.id, peripheral));
        });
        //console.debug(discoveredDevices.get("D4:3D:51:50:3B:E9")); 
    };

    const handleConnectPeripheral = (peripheral) => {
        try{
           if(!peripheral){
            console.debug("[Connection Peripheral] Periferico no valido");
            return;
           } 
           BleManager.connect(peripheral.id).then(() =>{
              console.debug("[Connection Peripheral] La conexion se ha realizado con exito");}

           );
        }catch(error){
           console.debug("[Connection Peripheral] Error al intental conectarse a un dispositivo",peripheral)
        }
    }

    /* const handleDisconnectedPeripheral = (BleDisconnectPeripheralEvent) => {
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
    }; */

    return ([
        discoveredDevices,
        dataRecived,
        startScan,
        scanPermission,
        handleConnectPeripheral,
    ]);
}

export default useBLE;