import React, {useEffect} from "react";
import { View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import DispositivosStyles from "../styles/DispositivosStyles";

const Dispositivos =({onConnectPeripheral,data, iconLeft, iconRight})=>{
    
    const device = data.item;

    const handleOnPress = () => {
        onConnectPeripheral(device);
    }

    return (
        <>
            <TouchableOpacity style={DispositivosStyles.wrapper} onPress = {handleOnPress}>
                <View style={DispositivosStyles.wrapperLeft}>
                    <Image style={DispositivosStyles.iconLeft} source ={iconLeft}/>
                </View>
                <View style={DispositivosStyles.wrapperName}>
                    <Text style={DispositivosStyles.name}>
                        {device.name}
                    </Text>
                    {/* <Text style={DispositivosStyles.rssi}>
                        RSSI: {device.rssi}
                    </Text> */}
                </View>
                {/* <Image style={DispositivosStyles.iconRight} source = {iconRight}/> */}
            </TouchableOpacity>
            <View style = {DispositivosStyles.separador}/>
        </>
    );
}
export default Dispositivos;