import React, { createContext, useContext, useState } from 'react';

//contexto para compartir un estado entre varios componentes
//este contexto se va a compartir con stack de Measurementstack
//para que los componentes de este stack sepan cuando el bluetooth esta on
const BleConnectContext = createContext();

export const StateProvider = ({children}) => {
    const [isBleConnected,setIsBleConnected] = useState(false);
    return(
        <BleConnectContext.Provider
            value = {{isBleConnected,setIsBleConnected}}>
                {children}
        </BleConnectContext.Provider>
    );
}

export const useBleConnectContext = () => useContext(BleConnectContext);