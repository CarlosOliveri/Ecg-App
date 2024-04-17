import React, { createContext, useContext, useState } from 'react';

//contexto para compartir un estado entre varios componentes
//este contexto se va a compartir con stack de medicionesStack
//para que los componentes de este stack sepan cuando el bluetooth esta on
const stateContext = createContext();
export const StateProvider = ({children}) => {
    const [isBleConnected,setIsBleConnected] = useState(true);
    return(
        <stateContext.Provider
            value = {{isBleConnected,setIsBleConnected}}>
                {children}
        </stateContext.Provider>
    );
}

export const useStateContext = () => useContext(stateContext);