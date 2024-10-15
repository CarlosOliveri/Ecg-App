/*import React, {createContext, useContext } from "react";
import useBLE from "./useBLE";

const BleContext = createContext();

export const BleProvider = ({children}) => {
    const [discoveredDevices,dataReceived,isConnected,objetGenerate,
        setObjetGenerate,writeStartOrder,setIsConnected,startScan,setDiscoveredDevices,scanPermission,handleConnectPeripheral,handleBleDisconnectManual] = useBLE();
    return(
        <BleContext.Provider value = {{discoveredDevices,dataReceived,isConnected,objetGenerate,
            setObjetGenerate,writeStartOrder,setIsConnected,startScan,setDiscoveredDevices,scanPermission,handleConnectPeripheral,handleBleDisconnectManual}}>
            {children}
        </BleContext.Provider>
    );
};
export const useBleContext = () => useContext(BleContext);*/
import React, { createContext, useContext } from 'react';
import useBLE from './useBLE';

const BleContext = createContext();

export const BleProvider = ({ children }) => {
    const [discoveredDevices, dataReceived, isConnected, objetGenerate,
        setObjetGenerate, writeStartOrder, setIsConnected, startScan,
        setDiscoveredDevices, scanPermission, handleConnectPeripheral,
        handleBleDisconnectManual, isMeasuring, startMeasurement, stopMeasurement] = useBLE();  // Añadimos isMeasuring, startMeasurement, stopMeasurement

    return (
        <BleContext.Provider value={{
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
            isMeasuring,            // Incluimos isMeasuring en el contexto
            startMeasurement,       // Incluimos startMeasurement en el contexto
            stopMeasurement,        // Incluimos stopMeasurement en el contexto
        }}>
            {children}
        </BleContext.Provider>
    );
};

export const useBleContext = () => useContext(BleContext);



