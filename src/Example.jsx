import React, {useState, useEffect} from 'react';
import {
  Text,
  Alert,
  View,
  FlatList,
  Platform,
  StatusBar,
  SafeAreaView,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  NativeEventEmitter,
  PermissionsAndroid
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ExampleDevice from './ExampleDivice';
import {styles} from './styles/ExampleStyles';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const serviceUUIDS = [];

const Example = () => {
  const peripherals = new Map();
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [discoveredDevices, setDiscoveredDevices] = useState([]);

  useEffect(() => {
    //Inicializa la libreria
    BleManager.start({showAlert: false}).then(() => {
      console.log('[BleManager Inizialized] Initialized');
      handleGetConnectedDevices();//Busca dispositivos que alguna vez estuvieron conectados al telefono previamente
    });
    
    //Encender Bluetooth del telefono
    BleManager.enableBluetooth().then(() => {
      console.log('[Bluetooth Enable] Bluetooth is turned on!');
    }).catch((err) =>{
      console.log("[Bluetooth Enable] Debe encender su Bluetooth manualmente!",err)
    });
    
    //Escucha cuando se encuentre algun BLE Device y lo agrega a la lista peripherals y luego al estado discoveredDevice 
    let stopDiscoverListener = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',//=>objeto que escucha el listener
      (peripheral) => {//=>funcion anonima que recibe un objeto peripheral
        peripherals.set(peripheral.id, peripheral); //=>Objeto map, actua como una lista, debe resetearse en cada nueva busqueda de dispositivos cercanos
        setDiscoveredDevices(Array.from(peripherals.values())); //=>Se actualiza el estado de los dispositivos encontrados en cada scaneo 
        console.log('BleManagerDiscoverPeripheral:', peripheral);
      },
    );

    let stopConnectListener = BleManagerEmitter.addListener(
      'BleManagerConnectPeripheral',
      peripheral => {
        console.log('BleManagerConnectPeripheral:', peripheral);
      },
    );
    let stopScanListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('[Event Listener]scan stopped');
      },
    );

    return () => {
      stopDiscoverListener.remove();
      stopConnectListener.remove();
      stopScanListener.remove();
    };
  }, []);

  const startScan = () => { //funcion que maneja el inicio del scaneo de dispositivos cercanos
    if (!isScanning) {
      BleManager.scan(serviceUUIDS, 5, true) // Inicia el escaneo de dispositivos cercanos
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(error => {
          console.error(error);
        });
    }
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
          }).catch((err) => {
              console.log('[Permission Scan Request Error]',err);
          });
        }
      }).catch((err) => {
          console.log('[Permision Scan Chech Error]',err)
      });
    }
  }

  // pair with device first before connecting to it
  const connectToPeripheral = peripheral => {
    BleManager.createBond(peripheral.id)
      .then(() => {
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setConnectedDevices(Array.from(peripherals.values()));
        setDiscoveredDevices(Array.from(peripherals.values()));
        console.log('BLE device paired successfully');
      })
      .catch(() => {
        console.log('failed to bond');
      });
  };

  //Encuentra dispositivos conectados previamente
  const handleGetConnectedDevices = () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ).then((result)=>{
      if (!result){
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        ).then((result)=>{
          if(result==PermissionsAndroid.RESULTS.GRANTED){
            console.log("[Permission Connect Request] User accepted");
            BleManager.getBondedPeripherals([]).then(results => {
              for (let i = 0; i < results.length; i++) {
                let peripheral = results[i];
                peripheral.connected = true;
                peripherals.set(peripheral.id, peripheral);
                setConnectedDevices(Array.from(peripherals.values()));
              }
            });
          }else{
            console.log("[Permission Connect Request] User refused")
          }
        })
      }else{
        console.log("[Permission Connect Check] Permission is OK");
      }
    })
  };
  
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        //barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        //backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{pdadingHorizontal: 20}}>
        <Text
          style={[
            styles.title,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          React Native BLE Manager Tutorial
        </Text>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.scanButton}
          onPress={scanPermission}>
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.subtitle,
            {color: isDarkMode ? Colors.white : Colors.black},
          ]}>
          Discovered Devices:
        </Text>
        {discoveredDevices.length > 0 ? (
          <FlatList
            data={discoveredDevices}
            renderItem={({item}) => (
              <ExampleDevice
                peripheral={item}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.noDevicesText}>No Bluetooth devices found</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Example;
