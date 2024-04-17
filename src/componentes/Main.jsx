import React ,{useState }from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import UserRegister from './UserRegister'
import Estadisticas from './Estadisticas'
import Home from './Home';
import { StateProvider } from './useBleConnectContext';
import BluetoothList from './BluetoothList';
import Login from './Login';
import RegistroShow from './RegistroShow';
import Mediciones from './Mediciones';
import { Header } from '@react-navigation/stack';

//Iconos
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BleProvider } from './useBleContext';


const homeName = 'Historial'
const estadisticas = 'Estadisticas'
const userRegister = 'UserRegister'
// Estetica
const themeColor = 'red' //'#4EC8DB'
const titleSize = 20 //'#4EC8DB'

const bleStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()
const HomeStackNavigator = createNativeStackNavigator();
const RegistroStackNavigator = createNativeStackNavigator();

const Main = () => {

    const [isUserAuthenticated,setIsUserAuthenticated] = useState(false);

    const handleUserAuthenticated = () => {
        !isUserAuthenticated ? setIsUserAuthenticated(true) : setIsUserAuthenticated(false);
    }

    const MedicionesStack = () =>{
        return(
            <StateProvider>
                <BleProvider>
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
                </HomeStackNavigator.Navigator>
                </BleProvider>
            </StateProvider>
        );
    }
    
    const RegistrosStack = ()=>{
        return (
            <RegistroStackNavigator.Navigator
                initialRouteName = {estadisticas}
                screenOptions = {{
                    headerShown: false,
                }}>
                <RegistroStackNavigator.Screen
                    name = 'Registro'
                    component={RegistroShow}/>
                <RegistroStackNavigator.Screen
                    name = {estadisticas}
                    component={Estadisticas}/>
            </RegistroStackNavigator.Navigator>
        );
    }
    
    const AutenticacioStack = () => {
        return(
            <bleStack.Navigator
                initialRouteName= {isUserAuthenticated ? 'bleStackUser' : 'Login'}
            >
                <bleStack.Screen 
                    name = 'Login'
                    component = {Login}
                    options={{
                        headerShown:false,
                    }}/>
                <bleStack.Screen 
                    name = 'userRegister'
                    component = {UserRegister}
                    options={{
                        headerShown:false,
                    }}/>
            </bleStack.Navigator>
        );
    };

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
                    component={MedicionesStack}
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
                    name = 'RegistrosStack' 
                    component={RegistrosStack}
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
                    name = 'AutenticacioStack'
                    component={AutenticacioStack}
                    options={{
                        tabBarLabel : 'Usuario',
                        tabBarIcon: ({color,size}) => (<MaterialCommunityIcons name="account" size={24} color={color} />),
                        //tabBarBadge  es para notificcaciones
                        headerTitle : 'Registro de Usuario',
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