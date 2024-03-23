import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/componentes/Main.jsx'
import Login from './src/componentes/Login.jsx';
import { NativeRouter } from 'react-router-native'
import BluetoothList from './src/componentes/BluetoothList.jsx'
import * as React from 'react';
import Example from './src/Example.jsx';

export default function App() {
  return <NativeRouter><Main/></NativeRouter>
}
