import React, { useEffect, useRef } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, processColor
} from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';

const ChartHeart = (props) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Mueve la vista del gráfico al último valor de X
        if (props.data && props.data.length > 0) {
            chartRef.current?.moveViewToX(props.data.length - 1); // Desplaza al último punto del gráfico
        }
    }, [props.data]); // Efecto que se ejecuta cuando cambian los datos

    return (
        <View style={{flex: 1}}>
            <View style={ChartHeartStyles.container}>
                <LineChart
                    ref={chartRef} // Asignar referencia al gráfico
                    style={ChartHeartStyles.chart}
                    data={{
                        dataSets: [{
                            label: "Registro Cardiaco",
                            values: props.data,
                            config: {
                                color: processColor('#1F618D'),
                                drawValues: true,
                                lineWidth: 1,
                                drawCircles:false,
                            }
                        }]
                    }}
                    chartDescription={{ text: '' }}
                    marker={{ enabled: true }}

                    xAxis={{
                        axisMinimum: 0, // Mínimo valor del eje X
                        granularity: 1,
                        position: 'BOTTOM',
                    }}
                    
                    visibleRange={{ 
                      x: { min: 600, max: 600 },
                      y: { min: 160, max: 300 },
                    }}
                />
            </View>
        </View>
    );
}

export default ChartHeart;

const ChartHeartStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chart: {
        flex: 1,
        width: 340,
    }
});

/*import React, { useEffect, useRef } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, processColor
} from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';

const ChartHeart = (props) => {
    const chartRef = useRef(null);
    const visibleSamples = 600; // Número de muestras visibles en el gráfico

    useEffect(() => {
        // Mueve la vista del gráfico al último valor de X si no se está mostrando desde el inicio
        if (props.data && props.data.length > 0 && !props.showFromStart) {
            chartRef.current?.moveViewToX(props.data.length); // Desplaza al último punto del gráfico
        }
    }, [props.data]); // Efecto que se ejecuta cuando cambian los datos

    const axisMinimum = props.showFromStart ? 0 : Math.max(0, props.data.length - visibleSamples); // Condicional para el eje X

    return (
        <View style={{flex: 1}}>
            <View style={ChartHeartStyles.container}>
                <LineChart
                    ref={chartRef} // Asignar referencia al gráfico
                    style={ChartHeartStyles.chart}
                    data={{
                        dataSets: [{
                            label: "Registro Cardiaco",
                            values: props.showFromStart ? props.data : props.data.slice(-visibleSamples), // Mostrar todas las muestras o solo las últimas
                            config: {
                                color: processColor('#1F618D'),
                                drawValues: true,
                                lineWidth: 1,
                                drawCircles: false,
                            }
                        }]
                    }}
                    chartDescription={{ text: '' }}
                    marker={{ enabled: true }}

                    xAxis={{
                        axisMinimum: axisMinimum, // Muestra desde el inicio si se selecciona
                        axisMaximum: props.data.length, // Máximo es el último punto de datos
                        granularity: 1,
                        position: 'BOTTOM',
                    }}
                    
                    visibleRange={{
                        x: { min: 600, max: 600 }, // Mostrar solo 'visibleSamples' muestras
                        y: { min: 160, max: 300 },
                    }}
                    onChange={(event) => {
                        // Esta función puede ser útil para manejar eventos en el gráfico.
                    }}
                />
            </View>
        </View>
    );
}

export default ChartHeart;

const ChartHeartStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chart: {
        flex: 1,
        width: 340,
    }
});*/


  
  