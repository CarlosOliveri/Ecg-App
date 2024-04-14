import React,{useState,useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import User from './User'
import Estadisticas from './Estadisticas'
import Home from './Home'
import BluetoothList from './BluetoothList';
import Login from './Login';
//import { GestureHandlerRootView } from 'react-native-gesture-handler';
//import { Header } from '@react-navigation/stack';



const homeName = 'Mediciones';
const estadisticas = 'Estadisticas'
const user = 'User'

const Tab = createBottomTabNavigator()
const bleStack = createNativeStackNavigator();

const Main = () => {

    const [isUserAuthenticated,setIsUserAuthenticated] = useState(false);

    const handleUserAuthenticated = () => {
        !isUserAuthenticated ? setIsUserAuthenticated(true) : setIsUserAuthenticated(false);
    }

    const MyStack = () => {
        return(
            <bleStack.Navigator
                initialRouteName= 'Home'
            >
                <bleStack.Screen 
                    name = 'Bluetooth'
                    component = {BluetoothList}
                />
                <bleStack.Screen 
                    name = 'Home'
                    component = {Home}
                    options={{
                        headerShown:false,
                    }}
                />
            </bleStack.Navigator>
        );
    };

    const AuthStack = () => {
        return(
            <bleStack.Navigator
                initialRouteName= 'Login'
            >
                <bleStack.Screen 
                    name = 'Login'
                    component = {Login}
                    initialParams = {{onUserAuthenticated:handleUserAuthenticated}}
                    options={{
                        headerShown:false,
                    }}/>
            </bleStack.Navigator>
        );
    };

    return (
        //<GestureHandlerRootView >
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName = {homeName}
                screenOptions = {({route}) =>({
                    tabBarIcon : ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;
 
                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home'
                        }else if (rn === estadisticas){
                            iconName = focused ? 'auto-graph' : "auto-graph"
                        }else if (rn === user){
                            iconName = focused ? 'person' : 'person'
                        }
                        return <MaterialIcons name={iconName}  size={size} color={color}/>
                    }   
                })}>
                <Tab.Screen 
                    name = {homeName} 
                    component = {MyStack} 
                    options={{
                    headerTitleAlign: 'center'}}/>
                <Tab.Screen 
                    name = {estadisticas} 
                    component = {Estadisticas} 
                    options={{
                        headerTitleAlign: 'center'}}/>
                <Tab.Screen 
                    name = {user} 
                    component = {User}
                    options={{
                        headerTitleAlign: 'center'}}/>
            </Tab.Navigator>
        </NavigationContainer>
        //</GestureHandlerRootView>
    )
}

export default Main