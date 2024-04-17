import React,{useState,useEffect} from 'react';
import { View,Text,DeviceEventEmitter, Button } from 'react-native';
import {Measurementstyles} from '../styles/MeasurementStyles';
import { ColorType, CrosshairMode, createChart } from 'lightweight-charts';
import WebView from 'react-native-webview';
//import useBLE from './useBLE';
import {useBleContext} from './useBleContext';
import { useBleConnectContext } from './useBleConnectContext';

const Measurements = () => {

    const {isBleConnected,setIsBleConnected} = useBleConnectContext();

    const {discoveredDevices,startScan,startPermission} = useBleContext();

    //estado correspondiene a los BPS
    const [bpsValue,setBpsValue] = useState(0);
    //estado correspondiente al numero de maximos detectados
    const [numMaximos,setNumMaximos] = useState(0);
    //estado correspondiente al array de Measurements que se va recibiendo
    const [MeasurementsData,setMeasurementsData] = useState([]);

    //Llamamos a esta funcion cada vez que llega una nueva medicion
    const handleBpsChange =() => {
        //Calculo de los BPS
        //El tiempoTranscurridoc corresponde al tiempo actual
        setBpsValue(numMaximos/tiempoTranscurrido);
    }

    //Cuando se detecta un pico se llama a esta funcion
    //y se incrementa el numero de maximos detectados 
    const handleNumMaxChange =()=>{
        setNumMaximos(numMaximos + 1);
    }

    const handleBleDisconnect = () =>{
        setIsBleConnected(false);
    }

    useEffect(()=>{
        // Listener que escucha la desconexion del bluetooth
        const subscription = DeviceEventEmitter.addListener(
            'BleManagerDidUpdateState',
            ({ state }) => {
                console.log('El bluetooth se a apagado =>estado: ', state);
                // Aquí puedes actualizar el estado del Bluetooth en tu componente
                handleBleDisconnect();
            }
        );
        // Retornar una función de limpieza para desuscribirse del evento
        return () => {
            subscription.remove(); // limpiar el reqgistro del listener
        };
    },[]);

    
    //Datos que se muestran en el grafico 
    //este array debe actualizarse conforme llegan los datos
    //=> Debe cambiarse por el estado "MeasurementsData"
    const initialData =[
        { time: '2018-12-22', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 27.02 },
        { time: '2018-12-25', value: 27.32 },
        { time: '2018-12-26', value: 25.17 },
        { time: '2018-12-27', value: 28.89 },
        { time: '2018-12-28', value: 25.46 },
        { time: '2018-12-29', value: 23.92 },
        { time: '2018-12-30', value: 22.68 },
        { time: '2018-12-31', value: 22.67 },
    ];
    //configuracion del objeto chart
    const chartOptions = {
        layout:{
            background:{type: ColorType.Solid,color: "white"},
        },
        width:950, 
        height:700,
        rightPriceScale:{
            borderColor:'rgba(147, 208, 248 ,1)',
        },
        timeScale: {
            borderColor: 'rgba(147, 208, 248 ,1)',
        },
        grid: {
			vertLines: {
				color: '#93D0F8',
			},
			horzLines: {
				color: '#93D0F8',
			},
		},
        // Otras opciones de configuración para lightweight-charts
    };
    /*Estas lineas se insertan dentro del archivo HTML dentro de una etiqueta <script>
     const chart = LightweightCharts.createChart(document.getElementById('container'), ${JSON.stringify(chartOptions)});
            const newSeries = chart.addAreaSeries({
                lineColor: "#2962ff",
                topColor: "#2962ff",
                bottomColor: "egba(41,98,255,0.28)",
            });
            newSeries.setData(${JSON.stringify(initialData)});
    */
    
    const chartHtml = `
        <!DOCTYPE html>
        <html>
        <head>
        <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
            <style>
                body {
                    //display: flex;
                    //justify-content: center;
                    //align-items: center;
                    height: 100vh;
                    margin: 0;
                    padding: 0;
                    background-color: #f0f0f0;
                }
                
                #container {
                    display:flex;
                    align-items: end;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    background-color: rgb(255,255,255);
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
            </style>
        </head>
        <body>
        <div id="container"></div>
        <script>
            const chart = LightweightCharts.createChart(document.getElementById('container'), ${JSON.stringify(chartOptions)});
            const newSeries = chart.addAreaSeries({
                lineColor: "#111111",
                topColor: "#ffffff",
                bottomColor: "rgba(255,255,255,0)",
            });
            newSeries.setData(${JSON.stringify(initialData)});
            chart.timeScale().fitContent();
            // Aquí puedes configurar tu gráfico con lightweight-charts
            // Ejemplo: const lineSeries = chart.addLineSeries();
            // Agrega datos al gráfico, etc.
        </script>
        </body>
        </html>
    `;

    return(
        <View style={Measurementstyles.containerPrincipal}>
            <WebView //componente que renderiza hojas HTML
                originWhitelist={['*']}
                javaScriptEnabled={true}
                source={{ html: chartHtml }}
                style = {Measurementstyles.webview}
            />
        
            <View style={Measurementstyles.actionContainer}>
                <View style={Measurementstyles.bpmContainer}>
                    <Text style={Measurementstyles.bpmTitle}>BPM:</Text>
                    <Text style={Measurementstyles.bpmValue}>{bpsValue}</Text>
                </View>
                <View style={Measurementstyles.buttonContainer}>
                    <Button
                    title='Iniciar Medicion'
                    onPress={()=>{}}/>
                    <Button
                    title='Detener medicion'
                    onPress={()=>{}}/>
                </View>
            </View>
        </View>
    );
}
export default Measurements;
