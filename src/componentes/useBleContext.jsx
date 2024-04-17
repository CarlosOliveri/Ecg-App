import React, {createContext, useContext } from "react";
import useBLE from "./useBLE";

const BleContext = createContext();

export const BleProvider = ({children}) => {
    const [discoveredDevices,startScan,startPermission] = useBLE();
    return(
        <BleContext.Provider value = {{discoveredDevices,startScan,startPermission}}>
            {children}
        </BleContext.Provider>
    );
};
export const useBleContext = () => useContext(BleContext);


