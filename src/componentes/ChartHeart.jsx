import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, processColor } from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';

const ChartHeart = (props) => {

    //render() {
      return (
        <View style={{flex: 1}}>
          <View style={ChartHeartStyles.container}>
            <LineChart style={ChartHeartStyles.chart}
              data={{
                dataSets:[{
                  label: "Registro Cardiaco", 
                  values: props.data,
                  config: {
                    color: processColor('#1F618D'), // Change the line color here
                    drawValues: true, //Para quitar los valores
                    lineWidth: 1,
                    circleColor: processColor('#1F618D'), // Change the circle color here
                    circleRadius: 1, // Adjust the circle size
                    circleHoleColor: processColor('white'), // Change the circle hole color
                    circleHoleRadius:0.5, // Adjust the circle hole size
                  }
                }]
              }}
              chartDescription={{ text: '' }}
              marker={{ enabled: true }}
            />
          </View>
        </View>
      );
    //}
}
export default ChartHeart;
  
  const ChartHeartStyles = StyleSheet.create({
    container: {
      flex: 1,
      //color:'black',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chart: {
      flex: 1,
      width: 340,
    }
  });