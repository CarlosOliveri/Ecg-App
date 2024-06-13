import React, {createContext, useContext } from "react";
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
export const useBleContext = () => useContext(BleContext);


