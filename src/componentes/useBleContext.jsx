import React, {createContext, useContext } from "react";
import useBLE from "./useBLE";

const BleContext = createContext();

export const BleProvider = ({children}) => {
    const [discoveredDevices,dataRecived,startScan,scanPermission,handleConnectPeripheral] = useBLE();
    return(
        <BleContext.Provider value = {{discoveredDevices,dataRecived,startScan,scanPermission,handleConnectPeripheral}}>
            {children}
        </BleContext.Provider>
    );
};
export const useBleContext = () => useContext(BleContext);


