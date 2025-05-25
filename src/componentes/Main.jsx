import React ,{useState,useEffect }from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import UserRegister from './UserRegister'
import Doc_register_user from './Doc_register_user';
import HistoryHome from './HistoryHome'
import MeasurementsHome from './MeasurementsHome';
import Measurements from './Measurements';
import Measurements from './Measurements';
import { StateProvider } from './useBleConnectContext';
import BluetoothList from './BluetoothList';
import Login from './Login';
import UserEdit from './UserEditRegister'
import HistoryShow from './HistoryShow';
import { Header } from '@react-navigation/stack';
import UserShow from './UserShow';
import { BleProvider } from './useBleContext';
import { DatosProvider } from './useDatosContext';

//Iconos
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dispositivos from './Dispositivos';


const measurements = 'Measurementscreen'
const history = 'HistoryScreen'
const userRegister = 'UserRegister'
const userLogin = "UserLogin";
const Pacientes = "Pacientes"
// Estetica
const themeColor = '#154360' //'#4EC8DB'
const titleSize = 20 //'#4EC8DB'

const Tab = createBottomTabNavigator();

//Stacks
const MeasuremetStackNavigator = createNativeStackNavigator();
const HistoryStackNavigator = createNativeStackNavigator();
const UserStackNavigator = createNativeStackNavigator();

const Main = () => {

    const {token,loadingScreen} = useAuth();
    const [isUserAuthenticated,setIsUserAuthenticated] = useState(false);

    const handleUserAuthenticated = () => {
        !isUserAuthenticated ? setIsUserAuthenticated(true) : setIsUserAuthenticated(false);
    }

    useEffect(() => {
        //console.log("esto es del main " +token);
     },[]);

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
                            component={MeasurementsHome}
                            options={{ unmountOnBlur: true }}/>
                        <MeasuremetStackNavigator.Screen 
                            name = "Bluetooth" 
                            component={BluetoothList} 
                            options={{ unmountOnBlur: true }}/>
                    </MeasuremetStackNavigator.Navigator>
                </BleProvider>
            </StateProvider>
        );
    }


    
    const HistoryStack = ()=>{
        return (
            <HistoryStackNavigator.Navigator
                initialRouteName = "Pacientes"
                screenOptions = {{
                    headerShown: false,
                }}>
                <HistoryStackNavigator.Screen
                    name = 'Registro'
                    component={HistoryShow}
                    options={{ unmountOnBlur: true }}/>
                <HistoryStackNavigator.Screen
                    name = {history}
                    component={HistoryHome}
                    options={{ unmountOnBlur: true }}/>
                <HistoryStackNavigator.Screen
                    name = "Pacientes"
                    component={MisPacientes}
                    options={{ unmountOnBlur: true }}/>
                <HistoryStackNavigator.Screen
                    name = "PacienteRegister"
                    component={Doc_register_user}
                    options={{ unmountOnBlur: true }}/>
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
        <DatosProvider>
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName= 'HistoryStack'
                //keyboardHidesTabBar={true}
                screenOptions = {{
                    keyboardHidesTabBar: true,
                    tabBarActiveTintColor : '#2471A3',
                    tabBarInactiveTintColor : '#AAB7B8',
                    tabBarHideOnKeyboard: true,
                //}}
                //keyboardShouldPersistTaps="handled"
                
                    keyboardHidesTabBar: true,
                    tabBarActiveTintColor : '#2471A3',
                    tabBarInactiveTintColor : '#AAB7B8',
                    tabBarHideOnKeyboard: true,
                }}
                //keyboardShouldPersistTaps="handled"
                
            >
                <Tab.Screen 
                    name = {measurements}
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
                        headerTitle : 'Historial de Mediciones',
                        //headerTintColor : 'white',
                        headerTitleStyle: { color: 'white', fontSize: titleSize, fontWeight : 'normal'},
                        headerStyle: { backgroundColor: themeColor},
                        headerTitleAlign : 'center',
                    }}
                    />
                <Tab.Screen 
                    name = 'userStack'
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
        </DatosProvider>
    );

}

export default Main 