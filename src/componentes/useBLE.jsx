import { NativeEventEmitter, NativeModules, Platform, PermissionsAndroid,Alert } from 'react-native';
import {useState, useEffect} from "react";
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);


const useBLE = () => {
    
    const [isScanning,setIsScanning] = useState(false);
    const [discoveredDevices,setDisceveredDevices] = useState()
    const [dataRecived,setDataRecived] = useState([]);
    
    useEffect(()=>{
        BluetoothModuleStart();
        //EncenderBluetooth();

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
        setDataRecived(data)
        console.log(data);
    };
    
    const BluetoothModuleStart = () => {
        BleManager.start({showAlert: false}).then(() =>{ 
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
                console.log('[Permission Scan Check] Permission is OK');
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

    //Empezamos a Scanear los dispositivos cercanos
    const startScan = async () => {
        if (!isScanning) {
            //console.log('[startScan] Scanning...');
            setIsScanning(true);
            BleManager.scan([],5,true).then(() => {
              console.log('[startScan] Scanning...');
            });
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

    return ([
        discoveredDevices,
        startScan,
        scanPermission,
        dataRecived
    ]);
}

export default useBLE;