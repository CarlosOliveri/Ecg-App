import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import User from './User'
import Estadisticas from './Estadisticas'
import Home from './Home'
import BluetoothList from './BluetoothList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from '@react-navigation/stack';



const homeName = 'HomeStack';
const estadisticas = 'Estadisticas'
const user = 'User'

const Tab = createBottomTabNavigator()
const bleStack = createNativeStackNavigator();

const Main = () => {

    const MyStack = () => {
        return(
            <bleStack.Navigator
                initialRouteName='Home'
            >
                <bleStack.Screen 
                    name = 'Bluetooth'
                    component = {BluetoothList}
                />
                <bleStack.Screen 
                    name = 'Home'
                    component = {Home}
                />
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
                })}
                ScreenOptions = {{
                    activeTintColor : 'tomato',
                    inactiveTintColor : 'grey',
                    labelStyle : {paddingBottom: 10, fontSize: 10},
                    style: {padding: 10, heigth: 70}
                }}
            >

                <Tab.Screen name = {homeName} component = {MyStack} options={{headerShown:false}}/>
                <Tab.Screen name = {estadisticas} component = {Estadisticas}/>
                <Tab.Screen name = {user} component = {User}/>
            </Tab.Navigator>
        </NavigationContainer>
        //</GestureHandlerRootView>
    )
}

export default Main