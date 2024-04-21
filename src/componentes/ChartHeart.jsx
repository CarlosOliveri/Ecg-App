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
              data={{dataSets:[{label: "demo", values: props.data}]}}
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
      backgroundColor: '#F5FCFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chart: {
      flex: 1,
      width: 370
    }
  });