import React, {createContext, useContext } from "react";
import useDatosMedidos from './useDatosMedidos';

const DatosContext = createContext();

export const DatosProvider = ({children}) => {
    const [datos,setDatos,setSincro,pacientes,GetMediciones] = useDatosMedidos();
    return(
        <DatosContext.Provider value = {{datos,setDatos,setSincro,pacientes,GetMediciones}}>
            {children}
        </DatosContext.Provider>
    );
};
export const useDatosContext = () => useContext(DatosContext);


