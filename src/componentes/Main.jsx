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

//Iconos
import { MaterialCommunityIcons } from '@expo/vector-icons';


const homeName = 'Historial'
const Mediciones = 'Mediciones'
const user = 'Usuario'
// Estetica
const themeColor = 'red' //'#4EC8DB'
const titleSize = 20 //'#4EC8DB'

const Tab = createBottomTabNavigator()
const HomeStackNavigator = createNativeStackNavigator();

const MyStack = () =>{
    return(
        <HomeStackNavigator.Navigator
            initialRouteName='HomeScreen'
            screenOptions = {{
                headerShown: false,
            }}
        >
            
            <HomeStackNavigator.Screen 
                name = 'HomeScreen' 
                component={Home} />
            <HomeStackNavigator.Screen 
                name = "Bluetooth" 
                component={BluetoothList} />
        </HomeStackNavigator.Navigator>
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
                    component={MyStack}
                    options={{
                        tabBarLabel : 'Medicion',
                        tabBarIcon: ({color,size}) => (<MaterialCommunityIcons name="heart-pulse" size={24} color={color} />),
                        //tabBarBadge  es para notificcaciones
                        headerTitle : 'Realizar Medicion',
                        //headerTintColor : 'white',
                        headerTitleStyle: { color: 'white', fontSize: titleSize, fontWeight : 'normal'},
                        headerStyle: { backgroundColor: themeColor},
                        headerTitleAlign : 'center',
                    }}
                     
                />
                <Tab.Screen 
                    name = {Mediciones} 
                    component={Estadisticas}
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
                    }}
                    />
            </Tab.Navigator>
        </NavigationContainer>
        
    );

}

export default Main 