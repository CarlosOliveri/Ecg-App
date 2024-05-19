import React ,{useState }from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import UserRegister from './UserRegister'
import HistoryHome from './HistoryHome'
import MeasurementsHome from './MeasurementsHome';
import { StateProvider } from './useBleConnectContext';
import BluetoothList from './BluetoothList';
import Login from './Login';
import HistoryShow from './HistoryShow';
//import Measurements from './Measurements';
import { Header } from '@react-navigation/stack';
import UserShow from './UserShow';

//Iconos
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BleProvider } from './useBleContext';
import Dispositivos from './Dispositivos';


const Measurements = 'Measurementscreen'
const history = 'HistoryScreen'
const userRegister = 'UserRegister'
// Estetica
const themeColor = '#154360' //'#4EC8DB'
const titleSize = 20 //'#4EC8DB'

const Tab = createBottomTabNavigator();

//Stacks
const MeasuremetStackNavigator = createNativeStackNavigator();
const HistoryStackNavigator = createNativeStackNavigator();
const UserStackNavigator = createNativeStackNavigator();

const Main = () => {

    const [isUserAuthenticated,setIsUserAuthenticated] = useState(false);

    const handleUserAuthenticated = () => {
        !isUserAuthenticated ? setIsUserAuthenticated(true) : setIsUserAuthenticated(false);
    }

    const Measurementstack = () =>{
        return(
            <StateProvider>
                <BleProvider>
                    <MeasuremetStackNavigator.Navigator
                        initialRouteName='HomeScreen'
                        screenOptions = {{
                            headerShown: false,
                        }}
                    >
                        <MeasuremetStackNavigator.Screen 
                            name = 'HomeScreen' 
                            component={MeasurementsHome}/>
                        <MeasuremetStackNavigator.Screen 
                            name = "Bluetooth" 
                            component={BluetoothList} />
                    </MeasuremetStackNavigator.Navigator>
                </BleProvider>
            </StateProvider>
        );
    }
    
    const HistoryStack = ()=>{
        return (
            <HistoryStackNavigator.Navigator
                initialRouteName = {history}
                screenOptions = {{
                    headerShown: false,
                }}>
                <HistoryStackNavigator.Screen
                    name = 'Registro'
                    component={HistoryShow}/>
                <HistoryStackNavigator.Screen
                    name = {history}
                    component={HistoryHome}/>
            </HistoryStackNavigator.Navigator>
        );
    }
    
    /*const AutenticacioStack = () => {
        return(
            <UserStack.Navigator
                //initialRouteName= {isUserAuthenticated ? 'bleStackUser' : 'Login'}
                intialRouteName = 'userRegister'
            >
                <UserStack.Screen 
                    name = 'Login'
                    component = {Login}
                    options={{
                        headerShown:false,
                    }}/>
                <UserStack.Screen 
                    name = 'userRegister'
                    component = {UserRegister}
                    options={{
                        headerShown:false,
                    }}/>
            </UserStack.Navigator>
        );
    };*/

    const UserStack = ()=>{
        return (
            <UserStackNavigator.Navigator
                initialRouteName = {userRegister}
                screenOptions = {{
                    headerShown: false,
                }}>
                <HistoryStackNavigator.Screen
                    name = 'UserShow'
                    component={UserShow}/>
                <HistoryStackNavigator.Screen
                    name = {userRegister}
                    component={UserRegister}/>
            </UserStackNavigator.Navigator>
        );
    }

    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName= 'HistoryStack'
                screenOptions = {{
                    tabBarActiveTintColor : '#2471A3',
                    tabBarInactiveTintColor : '#AAB7B8',
                }}
            >
                <Tab.Screen 
                    name = {Measurements}
                    component={Measurementstack}
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
                    name = 'HistoryStack' 
                    component={HistoryStack}
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
                    component={UserStack}
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