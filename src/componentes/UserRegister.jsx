import React ,{useState, useEffect} from 'react'
import {Text,View,TextInput,TouchableOpacity,Button} from 'react-native'
import UserStyles from '../styles/UserRegisterStyles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserShow from './UserShow';
import useAuth from '../api/ecg.api';
import UserRegisterStyles from '../styles/UserRegisterStyles';

const UserRegister = () => {

    const {setUserDatos} =useAuth();

    useEffect(() =>{
        console.log(userLog);
    },[userLog])
    
    const [userLog,setUserLog] = useState(false);
    const navigation = useNavigation();
    const [foto,setFoto] = useState();
    const [name,setName] = useState();
    const [apellido,setApellido] = useState();
    const [CI,setCI] = useState();
    const [Age,setAge] = useState();
    const [Sex,setSex] = useState();
    const [telefono,setTelefono] = useState();
    const [tipo,setTipo] = useState();
    const [Weight,setWeight] = useState();
    const [Height,setHeight] = useState();
    const [imc,setIMC] = useState();
    const [historialMedico,setHistorialedico] = useState();
    const [errors,setErrors] = useState({
        Fot:'',
        Nam:'',
        Ap:'',
        Cd:'',
        Ag: '',
        Se:'',
        tel:'',
        tip:'',
        We:'',
        He:'',
        imc:'',
        HM:'',
    });

    const handleGuardarRegistro = async () => {
        //Generacion de objeto JS
        const newRegistro = {
            "user":{
                "foto":foto,
                "nombre": name,
                "apellido":apellido,
                "cedula":CI,
                "edad": Age,
                "sexo": Sex,
                "telefono":telefono,
                "tipo":tipo,
            },
            "paciente":{
                "peso": Weight,
                "altura": Height,
                "IMC":imc,
                "historial_medico":historialMedico,
            },
        };
        setUserLog(true);
        setUserDatos(newRegistro);
        //Guardamos los datos 
        //await AsyncStorage.setItem('User', JSON.stringify(newRegistro));

        //await AsyncStorage.setItem('Nombre', JSON.stringify(Name));

        //Cambiamos de Pantalla
        //navigation.navigate('UserShow');
    }

    const handleSetUserLog = ()=>{
        setUserLog(false);
    }

    return (
    (!userLog)?(
        <KeyboardAwareScrollView style={UserStyles.keyboard}>
            <Text
            style = {UserStyles.msgText}
            >Usted actualmete se encuentra en modo sin conexion, con lo cual 
            sus datos seran almacenados en la memoria de su dispositivo movil</Text>
            <View>
                <View style = {UserStyles.formContainer}>
                    <Text style = {UserStyles.labels}>Nombre: </Text> 
                    
                    <TextInput
                        style ={UserStyles.inputName}
                        placeholder="Ex: Nombre Apellido"
                        placeholderTextColor={'gray'}
                        value= {name}
                        onChangeText = {(val)=>{
                            setName(val);
                            setErrors(_errors =>({..._errors,Nam:''}));
                        }}
                        />
                    {errors.Nam ? <Text style = {UserStyles.errores}>{errors.Nam}</Text> : null}

                    <Text style = {UserStyles.labels}>Cedula: </Text> 
                    
                    <TextInput
                        style ={UserStyles.inputCI}
                        placeholder="Ex: 5.555.555"
                        placeholderTextColor={'gray'}
                        value= {CI}
                        onChangeText = {(val)=>{
                            setCI(val);
                            setErrors(_errors =>({..._errors,Cd:''}));
                        }}
                        />
                    {errors.Cd ? <Text style = {UserStyles.errores}>{errors.Cd}</Text> : null}

                    <Text style = {UserStyles.labels}>Edad: </Text>
                    <TextInput
                        style ={UserStyles.inputText}
                        placeholder="Ex: 25 años"
                        placeholderTextColor={'gray'}
                        value= {Age}
                        onChangeText = {(val)=>{
                            setAge(val);
                            setErrors(_errors =>({..._errors,Ag:''}));
                        }}
                        />
                    {errors.Ag ? <Text style = {UserStyles.errores}>{errors.Ag}</Text> : null}
                    
                    <Text style = {UserStyles.labels}>Peso: </Text>
                    <TextInput style ={UserStyles.inputText}
                        placeholder="Ex: 80 [kg]"
                        placeholderTextColor={'gray'}
                        value= {Weight}
                        onChangeText = {(val)=>{
                            setWeight(val);
                            setErrors(_errors =>({..._errors,We:''}));
                        }}
                        />
                    {errors.We ? <Text style = {UserStyles.errores}>{errors.We}</Text> : null}
                
                    <Text style = {UserStyles.labels}>Altura: </Text>
                    <TextInput
                        style ={UserStyles.inputText}
                        placeholder="Ex: 177 [cm]"
                        placeholderTextColor={'gray'}
                        value= {Height}
                        onChangeText = {(val)=>{
                            setHeight(val);
                            setErrors(_errors =>({..._errors,He:''}));
                        }}
                        />
                    {errors.He ? <Text style = {UserStyles.errores}>{errors.He}</Text> : null}
                    
                    <Text style = {UserStyles.labels}>Sexo: </Text>
                    <TextInput
                        style ={UserStyles.inputText}
                        placeholder="Ex: Masculino"
                        placeholderTextColor={'gray'}
                        value= {Sex}
                        onChangeText = {(val)=>{
                            setSex(val);
                            setErrors(_errors =>({..._errors,Se:''}));
                        }}
                        />
                    {errors.Se ? <Text style = {UserStyles.errores}>{errors.Se}</Text> : null}
                </View>


                <TouchableOpacity 
                style = {UserStyles.touchable}
                onPress={()=> {
                    let err = {};
                    if(!Name) err = {...err, Nam :'Inserte el Nombre'}
                    if(!CI) err = {...err, Cd :'Inserte el documento de identidad'}
                    if(!Age) err = {...err, Ag :'Inserte la Edad'}
                    if(!Weight) err = {...err, We :'Inserte el Peso'}
                    if(!Height) err = {...err, He :'Inserte la Altura'}
                    if(!Sex) err = {...err, Se :'Inserte el Sexo'}
                    //Condicional de validacion de datos 
                    if(err.Nam || err.Cd || err.Ag || err.We || err.We || err.He || err.Se){
                        setErrors(_errors =>({..._errors, ...err}));
                    }else{
                        //console.log({Name,Age,Weight,Height,Sex});
                        setErrors({
                            Nam:'',
                            Cd:'',
                            Ag: '',
                            We:'',
                            He:'',
                            Se:'',
                        });
                        handleGuardarRegistro();
                    }
                }}
                >
                    <Text style = {UserStyles.textButton}>
                        Guardar Datos 
                    </Text>
                </TouchableOpacity>
            
            </View>

        
        </KeyboardAwareScrollView>
        
        
        

    ):(
        <>
            <UserShow
            handleSetUserLog = {handleSetUserLog}/>
        </> 
        //console.debug('nada')
    )
    );
}
export default UserRegister;