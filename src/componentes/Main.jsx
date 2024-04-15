import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import User from './User'
import Estadisticas from './Estadisticas'
import Home from './Home'
import BluetoothList from './BluetoothList';
import { Header } from '@react-navigation/stack';
import HistoryCard from './HistoryCard'
import RegistroShow from './RegistroShow';

//Iconos
import { MaterialCommunityIcons } from '@expo/vector-icons';


const homeName = 'Historial'
const estadisticas = 'Estadisticas'
const user = 'Usuario'
// Estetica
const themeColor = 'red' //'#4EC8DB'
const titleSize = 20 //'#4EC8DB'

const Tab = createBottomTabNavigator()
const HomeStackNavigator = createNativeStackNavigator();
const RegistroStackNavigator = createNativeStackNavigator();

const MyStack1 = () =>{
    return(
        <HomeStackNavigator.Navigator
            initialRouteName='HomeScreen'
            screenOptions = {{
                headerShown: false,
            }}
        >
            <HomeStackNavigator.Screen 
                name = 'HomeScreen' 
                component={Home}/>
            <HomeStackNavigator.Screen 
                name = "Bluetooth" 
                component={BluetoothList} />
            {/*<HomeStackNavigator.Screen
                name = "Registro"
        component={RegistroShow}/>*/}
        </HomeStackNavigator.Navigator>
    );
}

const MyStack2 = ()=>{
    return (
        <RegistroStackNavigator.Navigator
            initialRouteName = {estadisticas}
            screenOptions = {{
                headerShown: false,
            }}>
            <RegistroStackNavigator.Screen
                name = 'Registro'
                component={RegistroShow}
                /*options={{headerShown : true}}*//>
            <RegistroStackNavigator.Screen
                name = {estadisticas}
                component={Estadisticas}/>
        </RegistroStackNavigator.Navigator>
    );
}

const Main = () => {
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName= {homeName}
                screenOptions = {{
                    tabBarActiveTintColor : themeColor,
                    tabBarInactiveTintColor : 'grey',
                }}
            >
                <Tab.Screen 
                    name = {homeName}
                    component={MyStack1}
                    options={{
                        tabBarLabel : 'Medicion',
                        tabBarIcon: ({color,size}) => (<MaterialCommunityIcons name="heart-pulse" size={24} color={color} />),
                        //tabBarBadge  es para notificcaciones
                        headerTitle : 'Realizar Medicion',
                        //headerTintColor : 'white',
                        headerTitleStyle: { color: 'white', fontSize: titleSize, fontWeight : 'normal'},
                        headerStyle: { backgroundColor: themeColor},
                        headerTitleAlign : 'center',
                        //headerShown: false
                    }}
                     
                />
                <Tab.Screen 
                    name = 'MyStack2' 
                    component={MyStack2}
                    options={{
                        tabBarLabel : 'Historial',
                        tabBarIcon: ({color,size}) => (<MaterialCommunityIcons name="history" size={39} color={color} />),
                        //tabBarBadge  es para notificcaciones
                        headerTitle : 'Historial de Mediciones',
                        //headerTintColor : 'white',
                        headerTitleStyle: { color: 'white', fontSize: titleSize, fontWeight : 'normal'},
                        headerStyle: { backgroundColor: themeColor},
                        headerTitleAlign : 'center',
                    }}
                    />
                <Tab.Screen 
                    name = {user} 
                    component={User}
                    options={{
                        tabBarLabel : 'Usuario',
                        tabBarIcon: ({color,size}) => (<MaterialCommunityIcons name="account" size={24} color={color} />),
                        //tabBarBadge  es para notificcaciones
                        headerTitle : 'Perfil del Usuario',
                        //headerTintColor : 'white',
                        headerTitleStyle: { color: 'white', fontSize: titleSize, fontWeight : 'normal'},
                        headerStyle: { backgroundColor: themeColor},
                        headerTitleAlign : 'center',
                    }}/>
            </Tab.Navigator>
        </NavigationContainer>
        
    );

}

export default Main 