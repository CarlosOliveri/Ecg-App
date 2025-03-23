import React, {createContext, useContext } from "react";
import useDatosMedidos from './useDatosMedidos';

const DatosContext = createContext();

export const DatosProvider = ({children}) => {
    const [datos,setDatos,setSincro] = useDatosMedidos();
    return(
        <DatosContext.Provider value = {{datos,setDatos,setSincro}}>
            {children}
        </DatosContext.Provider>
    );
};
export const useDatosContext = () => useContext(DatosContext);


