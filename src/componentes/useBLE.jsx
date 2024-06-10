import { NativeEventEmitter, NativeModules, Platform, PermissionsAndroid,Alert } from 'react-native';
import {useState, useEffect} from "react";
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer'; 
import { bytesToString } from "convert-string";
import { PERMISSIONS } from 'react-native-permissions';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const _UART_TX = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const _UART_RX = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";
const _UART_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const _BATTERY_UUID = "180F";
const _BATTERY_LEVEL = "2A19";

const useBLE = () => {
    
    const [isScanning,setIsScanning] = useState(false);
    const [discoveredDevices,setDiscoveredDevices] = useState(new Map())
    const [dataReceived,setDataReceived] = useState([]);
    const [objetGenerate,setObjetGenerate] = useState([]);
    const [isConnected,setIsConnected] = useState(false); //Estado que nos permite switchear entre mediciones y conexion
    const [peripheralId,setPeripheralId] = useState();

    useEffect(()=>{
        BluetoothModuleStart();
        EncenderBluetooth();
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
            BleManagerEmitter.addListener(
              'BleManagerConnectPeripheral',
              ()=>{setIsConnected(true);}
            ),
            BleManagerEmitter.addListener(
              'BleManagerDidUpdateState',
            ({ state }) => {
                console.log('El bluetooth se a apagado =>estado: ', state);
                // Aquí puedes actualizar el estado del Bluetooth en tu componente
                handleBleDisconnect();}
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
        const valuesAcsii = data.value;//recibe el dato en formato ascii
        const valuesString = String.fromCharCode.apply(null, valuesAcsii); //devuelve el valor entero real pero como un string
        const valuesInt = parseInt(valuesString,10);
        //setDataReceived(dataReceived => [...dataReceived,parseInt(valuesInt,10)]); //posiblemente no se use este estado
        //Concatenamos el dato recibido en formato de objeto de JS casteando a un entero y guardando tambien el indice
        setObjetGenerate(objetGenerate => [...objetGenerate,{x: objetGenerate.length,y: valuesInt}]);
        //console.log(valuesString);

    };

    //const buffer = Buffer.from([1]);
    const writeStartOrder = (order) => {
      const buffer = Buffer.from([order]);
      BleManager.write(peripheralId,_UART_UUID,_UART_TX,
        buffer.toJSON().data
      ).then(() => {
        if (order == 1){
          console.debug("empezar medicion");  
        }else{
          //setObjetGenerate([]);
          console.debug("terminar medicion");
        }
      })
    }
    
    const BluetoothModuleStart = () => {
        BleManager.start({showAlert: false, forceLegacy: true}).then(() =>{ 
            console.debug('[Ble Initialized] Initialized'); 
        })/*.catch((error) =>
          console.error('[Ble Initialized] No Initialized=>', error),
        );*/
    }

    //Encendemos el Bluetooth si no lo esta
    const EncenderBluetooth = async () => {
        try{  
          await BleManager.enableBluetooth();
        }catch(err){
            console.debug('[EnableBluetoothError] ',err);
            Alert.alert("Necesita encender su Bluetooth manualmente")
        };
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

    const handleConnectPeripheral = async (peripheral) => {
        try{
            if(!peripheral){
              console.debug("[Connection Peripheral] Periferico no valido");
            return;
            } 
            BleManager.connect(peripheral.id).then(() =>{
              console.debug("[Connection Peripheral] La conexion se ha realizado con exito");
              setPeripheralId(peripheral.id);
              //console.log(peripheral)
            });

            // Antes de establece comunicacion es recomendable esperar un periodo a que la conexion se establezca corectamente
            await sleep(900);
          
            //pripheralData recibira los diferentes servicios de los que dispone el dispositivo
             const peripheralData = await BleManager.retrieveServices(peripheral.id);
             console.debug("[Retrieve Sevice called] Retrieve Service Responded");

             suscribeCharacteristicToReceive(peripheral);
             //suscribeCharacteristicToSend();
              /*console.debug(
              `[connectPeripheral][${peripheral.id}] retrieved peripheral services`,
              peripheralData,
            );*/
            
            /*if (peripheralData.characteristics){
              for (i = 0; i< peripheralData.characteristics.length; i++){
                const characteristic = peripheralData.characteristics[i];
                console.log(characteristic);
                if (characteristic.descriptors) {
                  for (k = 0; k< characteristic.descriptors.length; k++){
                    const descriptor = characteristic.descriptors[k];
                    console.log(descriptor)
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
                    }catch(error){
                      console.debug(
                        `[connectPeripheral][${peripheral.id}] failed to retrieve descriptor ${descriptor} for characteristic ${characteristic}:`,
                        error,
                      );
                    } 
                  }
                }
              }
            }else{
              console.debug("no hubo respuesta")
            }*/
        }catch(error){
           console.debug("[Connection Peripheral] Error al intental conectarse a un dispositivo",error)
        }
    }

    function sleep(ms) {
      return new Promise (resolve => setTimeout(resolve, ms));
    }

    const handleBleDisconnect = () => {
      setIsConnected(false);
    }

    const suscribeCharacteristicToReceive = async (peripheral) => {
      await BleManager.startNotification(peripheral.id,_UART_UUID,_UART_RX);
      console.debug("[Suscripcion Receive] Suscripcion a recibir datos realizada");
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
        dataReceived,
        isConnected,
        objetGenerate,
        setObjetGenerate,
        writeStartOrder,
        setIsConnected,
        startScan,
        scanPermission,
        handleConnectPeripheral,
    ]);
}

export default useBLE;