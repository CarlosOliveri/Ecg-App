import { NativeEventEmitter, NativeModules, Platform, PermissionsAndroid,Alert } from 'react-native';
import {useState, useEffect, useRef} from "react";
import BleManager from 'react-native-ble-manager';
import {Buffer} from 'buffer'; 
import { bytesToString } from "convert-string";
import { PERMISSIONS } from 'react-native-permissions';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const _GATT_SERVICE_UUID = "180D"; // UUID del servicio GATT
const _GATT_CHARACTERISTIC_UUID = "2A37"; // UUID de la característica GATT
const _BATTERY_UUID = "180F";
const _BATTERY_LEVEL = "2A19";

const useBLE = () => {
    
    const [isScanning,setIsScanning] = useState(false);
    const [discoveredDevices,setDiscoveredDevices] = useState(new Map())
    const [dataReceived,setDataReceived] = useState([]);
    const [objetGenerate,setObjetGenerate] = useState([]);
    const [isConnected,setIsConnected] = useState(false); //Estado que nos permite switchear entre mediciones y conexion
    const [peripheralId,setPeripheralId] = useState();
    const [isMeasuring, setIsMeasuring] = useState(false); // Añadimos el estado isMeasuring
    const [bpm,setBpm] = useState(0);
    const [detector,setDetector] = useState(null);

	useEffect(()=>{
		//const detector = new RealTimePeakDetector2(minDistanceSamples, threshold);
		const detectorPeaks= new RealTimePeakDetector2(minDistanceSamples, threshold);
		setDetector(detectorPeaks);
	},[])
	
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
            'BleManagerDisconnectPeripheral',
            handleDisconnectedPeripheral
          ),
          BleManagerEmitter.addListener(
            'BleManagerDidUpdateState',
          ({ state }) => {
              console.log('El bluetooth se a apagado =>estado: ', state);
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

  const startMeasurement = () => {
    setIsMeasuring(true);
	contador = 0;
	buffer = [];
	integrationBuffer = [];
	peaksN = 0;
	tiempo = 0;
	bpm = 0;
	peaksI = [];
    //console.log("Starting measurement, isMeasuring set to:", isMeasuring);
  };

  const stopMeasurement = () => {
    setIsMeasuring(false);
	detector.reset();
    //console.log("Stopping measurement, isMeasuring set to:", isMeasuring);
  };

/*const bufferSize = 500; // Tamaño del buffer
let bufferA = []; // Primer buffer
let bufferB = []; // Segundo buffer
let activeBuffer = bufferA; // Buffer activo para llenarse
let processingBuffer = bufferB; // Buffer en procesamiento

// Función para cambiar los buffers
const swapBuffers = () => {
    const temp = activeBuffer;
    activeBuffer = processingBuffer;
    processingBuffer = temp;
};

// Procesar los datos del buffer en procesamiento
const processBuffer = (buffer) => {
    setObjetGenerate(prevObjGen => [
        ...prevObjGen,
        ...buffer.map((y, idx) => ({ x: prevObjGen.length + idx, y }))
    ]);
};

const handleUpdateValueForCharacteristic = (data) => {
    setIsMeasuring(prevIsMeasuring => {
        if (!prevIsMeasuring) {
            return prevIsMeasuring;
        }

        const buffer = Buffer.from(data.value);
        const samples = [];

        for (let i = 0; i < buffer.length; i += 2) {
            const sample = buffer.readInt16LE(i);
            samples.push(sample);
        }

        // Agrega las muestras al buffer activo
        activeBuffer.push(...samples);

        // Si el buffer activo alcanza su límite, lo cambia y procesa el buffer en procesamiento
        if (activeBuffer.length >= bufferSize) {
            swapBuffers(); // Cambia los buffers
            processBuffer(processingBuffer); // Procesa el buffer completo
            processingBuffer.length = 0; // Limpia el buffer que se acaba de procesar
        }

        return prevIsMeasuring;
    });
};*/
/*let buffer = [];

const handleUpdateValueForCharacteristic = (data) => {
    setIsMeasuring(prevIsMeasuring => {
        if (!prevIsMeasuring) return prevIsMeasuring;

        const newBuffer = Buffer.from(data.value);
        const samples = [];

        for (let i = 0; i < newBuffer.length; i += 2) {
            const sample = newBuffer.readInt16LE(i);
            samples.push(sample);
        }

        // Almacena las muestras en un buffer temporal
        buffer = [...buffer, ...samples];

        return prevIsMeasuring;
    });
};

// Esta función se encargará de actualizar los gráficos cada 20ms
setInterval(() => {
    if (buffer.length > 0) {
        // Copia el buffer actual y lo vacía
        const samplesToProcess = buffer.slice();
        buffer = [];

        // Actualiza el objeto de generación solo cada 20ms
        setObjetGenerate(prevObjGen => [
            ...prevObjGen,
            ...samplesToProcess.map((y, idx) => ({ x: prevObjGen.length + idx, y }))
        ]);
    }
}, 50);  // Se actualiza cada 20ms*/

function derivativeFilter(buffer) {
	if (buffer.length < 5) {
    	return 0;
  	}
  	// Diferencia: y(n) = (2x(n) + x(n-1) - x(n-3) - 2x(n-4)) / 8
  	const y = (2 * buffer[buffer.length - 1] + buffer[buffer.length - 2] - buffer[buffer.length - 4] - 2 * buffer[buffer.length - 5]) / 8;
  	return y;
}
class RealTimePeakDetector2 {
	constructor(minDistanceSamples, threshold) {
		this.buffer = []; // Usamos un array fijo de tamaño 3
		this.maxBufferLength = 3;
		this.minDistance = minDistanceSamples;
		this.threshold = threshold;
		this.lastPeakIndex = -minDistanceSamples;
		this.currentIndex = 0;
  	}

	update(newSample) {
		// Manejamos la cola de longitud máxima
		if (this.buffer.length >= this.maxBufferLength) {
			this.buffer.shift(); // elimina el más antiguo
		}
		this.buffer.push(newSample);

		let peakDetected = false;

		// Solo analizamos si hay 3 muestras para comparar
		if (this.buffer.length === 3) {
			const [prev, curr, next_] = this.buffer;

			// Es un máximo local y supera el threshold
			if (curr > prev && curr > next_ && curr > this.threshold) {
				// Y se respeta la distancia mínima desde el último pico
				if (this.currentIndex - 1 - this.lastPeakIndex >= this.minDistance) {
					peakDetected = true;
					this.lastPeakIndex = this.currentIndex - 1;
					// console.log(`${prev}, ${curr}, ${next_}`);
				}
			}
		}

		this.currentIndex += 1;
		return peakDetected;
  	}

	reset(){
		this.buffer = [];
		this.lastPeakIndex = -minDistanceSamples;
		this.currentIndex = 0;
	}
}
const minDistanceMs = 500;
const samplingRate = 500; // 500 muestras por segundo
const minDistanceSamples = Math.floor((minDistanceMs / 1000.0) * samplingRate);
const threshold = 150;
//const detector = new RealTimePeakDetector2(minDistanceSamples, threshold);

let contador = 0;
let buffer = [];
let integrationBuffer = [];
let peaksN = 0;
let tiempo = 0;
let peaksI = [];
const samplingInterval = 0.002;
const integrationWindowSize = 50;

let bufferA = [];
let bufferB = [];
let activeBuffer = bufferA;

const handleUpdateValueForCharacteristic = (data) => {
    setIsMeasuring(prevIsMeasuring => {
        if (!prevIsMeasuring) return prevIsMeasuring;

        const newBuffer = Buffer.from(data.value);
        const samples = [];

        for (let i = 0; i < newBuffer.length; i += 2) {
            const sample = newBuffer.readInt16LE(i);
            samples.push(sample);

			buffer.push(sample);
			contador = contador + 1;
			const outDeriv = derivativeFilter(buffer);
  			const squared = outDeriv * outDeriv;
			integrationBuffer.push(squared);
			if (integrationBuffer.length > integrationWindowSize) {
				integrationBuffer.shift(); // descarta la muestra más antigua
			}
			const integrated = integrationBuffer.reduce((a, b) => a + b, 0) / integrationBuffer.length;
			//console.log("Integrado:", integrated.toFixed(2));
			if (detector.update(squared)) {
				peaksI.push(contador);
				peaksN += 1;
			}
			tiempo = contador * samplingInterval; // 500 Hz → 0.002 s por muestra
  			setBpm((peaksN / tiempo) * 60);
        	///////////hasta aca es el bucle for que lee los elementos que llegan uno a uno    
        }

        // Agregar muestras al buffer activo
        activeBuffer.push(...samples);

        return prevIsMeasuring;
    });
};

// Esta función se encargará de actualizar los gráficos cada 200ms
setInterval(() => {
    // Alterna el buffer activo para no perder muestras entrantes
    const processingBuffer = activeBuffer === bufferA ? bufferA : bufferB;
    activeBuffer = activeBuffer === bufferA ? bufferB : bufferA;

    if (processingBuffer.length > 0) {
        const samplesToProcess = processingBuffer.slice();
        processingBuffer.length = 0;  // Vacía el buffer procesado

        // Actualiza el objeto de generación solo cada 200ms
        setObjetGenerate(prevObjGen => [
            ...prevObjGen,
            ...samplesToProcess.map((y, idx) => ({ x: prevObjGen.length + idx, y }))
        ]);
    }
}, 200);  // Se actualiza cada 200ms 


    

    

    //const buffer = Buffer.from([1]);
    /*const writeStartOrder = (order) => {
      const buffer = Buffer.from([order]);
      BleManager.write(peripheralId, _GATT_SERVICE_UUID, _GATT_CHARACTERISTIC_UUID,
        buffer.toJSON().data
      ).then(() => {
        if (order == 1){
          console.debug("empezar medicion");  
        }else{
          //setObjetGenerate([]);
          console.debug("terminar medicion");
        }
      })
    }*/
   //************************ UTILIZANDO GATT ******************************
   
   const writeStartOrder = (order) => {
    const buffer = Buffer.from([0x01, 0x02]); // Enviar un valor conocido para verificar la recepción
    BleManager.write(peripheralId, _GATT_SERVICE_UUID, _GATT_CHARACTERISTIC_UUID,
      buffer.toJSON().data
    ).then(() => {
      console.debug("Data sent successfully");  
    }).catch((error) => {
      console.error("Error sending data: ", error);
    });
 };
    
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
		if (Platform.OS !== 'web') {
			const { PermissionsAndroid } = require('react-native');
		}else{
			console.log("soy");
		}

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
		if (Platform.OS !== 'web') {
			const { PermissionsAndroid } = require('react-native');
		}

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

    /*const handleConnectPeripheral = async (peripheral) => {
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
            }*//*
        }catch(error){
           console.debug("[Connection Peripheral] Error al intental conectarse a un dispositivo",error)
        }
    }*/

    const handleConnectPeripheral = async (peripheral) => {
        try {
            if (!peripheral) {
                console.debug("[Connection Peripheral] Periferico no válido");
                return;
            }
    
            await BleManager.connect(peripheral.id);
            console.debug("[Connection Peripheral] Conexión realizada con éxito");
            setPeripheralId(peripheral.id);
    
            // Esperar un tiempo para asegurar que la conexión se ha establecido correctamente
            await sleep(900);
    
            // Recuperar los servicios disponibles en el dispositivo
            const peripheralData = await BleManager.retrieveServices(peripheral.id);
            console.debug("[Retrieve Service] Servicios GATT recuperados:", peripheralData);
    
            // Suscribirse a la característica GATT para recibir notificaciones
            await suscribeCharacteristicToReceive(peripheral);
    
        } catch (error) {
            console.debug("[Connection Peripheral] Error al intentar conectarse al dispositivo:", error);
        }
    };

    function sleep(ms) {
      return new Promise (resolve => setTimeout(resolve, ms));
    }

    const handleBleDisconnect = () => {
      setIsConnected(false);
    }
    const handleBleDisconnectManual = () => {
      BleManager.disconnect(peripheralId).then(() => {
        // Success code
        console.debug("Disconnected");
      }).catch((error) => {
        // Failure code
        console.log(error);
      });
    }
    
    const suscribeCharacteristicToReceive = async (peripheral) => {
      await BleManager.startNotification(peripheral.id, _GATT_SERVICE_UUID, _GATT_CHARACTERISTIC_UUID);
      console.debug("Subscribed to GATT characteristic notifications");
   };

    const handleDisconnectedPeripheral = (BleDisconnectPeripheralEvent) => {
        console.debug(
          `[handleDisconnectedPeripheral][${BleDisconnectPeripheralEvent.peripheral}] disconnected.`,
        );
        setDiscoveredDevices(map => {
          let p = map.get(BleDisconnectPeripheralEvent.peripheral);
          if (p) {
            p.connected = false;
            return new Map(map.set(BleDisconnectPeripheralEvent.peripheral, p));
          }
          return map;
        });
        setIsConnected(false);
    };

    return ([
        discoveredDevices,
        dataReceived,
        isConnected,
        objetGenerate,
        setObjetGenerate,
        writeStartOrder,
        setIsConnected,
        startScan,
        setDiscoveredDevices,
        scanPermission,
        handleConnectPeripheral,
        handleBleDisconnectManual,
        isMeasuring,            // Exportamos isMeasuring
        startMeasurement,       // Función para iniciar medición
        stopMeasurement,        // Función para detener medición
        bpm,
    ]);
}

export default useBLE;