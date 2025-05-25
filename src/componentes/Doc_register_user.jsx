import React ,{useState, useEffect} from 'react'
import {Text,View,TextInput,TouchableOpacity,Switch,Button, InputAccessoryView} from 'react-native'
import SwitchToggle from "react-native-switch-toggle";
import UserStyles from '../styles/UserRegisterStyles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {useAuth} from './AuthContext';
import { LoginRequest, getPacienteDatos, getUserDatos,RegisterRequest } from "../api/ecg.api";
import UserRegisterStyles from '../styles/UserRegisterStyles';
import Login from './Login';
import Toggle from './Toggle';

const UserRegister = () => {

    const {logout,setUserDatos,userDatos} =useAuth();
    const [paciente,setPaciente] = useState({});
    const [firstRender,setFirstRender] = useState(true);

    useEffect(() =>{
        console.debug("[userRegister]");
        if (firstRender){
            console.log("primer render");
            setFirstRender(false);
            return 
        }
        handleRegisterUp(paciente);
    },[paciente]);
    
    //const navigation = useNavigation();
    //const [foto,setFoto] = useState();
    const [username,setUsername] = useState();
    const [password,setPassword] = useState("changeme");
    const [email,setEmail] = useState();
    const [name,setName] = useState();
    const [apellido,setApellido] = useState();
    const [CI,setCI] = useState();
    const [Age,setAge] = useState();
    const [Sex,setSex] = useState();
    const [telefono,setTelefono] = useState();
    const [Weight,setWeight] = useState();
    const [Height,setHeight] = useState();
    const [imc,setIMC] = useState();
    const [historialMedico,setHistorialMedico] = useState();
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
        setPaciente({
            "user":{
                "username":String(CI),
                "password":password,
                "email": email,
                "first_name": name,
            },
            "datosUser":{
                "cedula":CI,
                "edad": parseInt(Age,10),
                "sexo": Sex,
                "telefono":telefono,
                "tipo":"Paciente",
            },
            "paciente":{
                "peso": Weight,
                "altura": Height,
                "IMC":imc,
                "historial_medico":historialMedico,
                "doctor":userDatos.user.id
            },
        })
    }

    const handleRegisterUp = async(value) =>{
        await RegisterRequest(value);
    }

    return (
        <KeyboardAwareScrollView style={UserStyles.keyboard}>
            <Text
            style = {UserStyles.msgText}
            >Usted actualmete se encuentra en modo sin conexion, con lo cual 
            sus datos seran almacenados en la memoria de su dispositivo movil</Text>
            <View>
                <View style = {UserStyles.formContainer}>
                    
                    <Text style = {UserStyles.labels}>Email: </Text> 
                    <TextInput
                        style ={UserStyles.inputName}
                        placeholder="Ex: NomAp@gmail.com"
                        placeholderTextColor={'gray'}
                        value= {email}
                        onChangeText = {(val)=>{
                            setEmail(val);
                            setErrors(_errors =>({..._errors,Nam:''}));
                        }}/>

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
                        placeholder="Ex: 5555555"
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

                    <Text style = {UserStyles.labels}>Sexo: </Text>
                    <TextInput
                        style ={UserStyles.inputText}
                        placeholder="Ex: H:Hombre"
                        placeholderTextColor={'gray'}
                        value= {Sex}
                        onChangeText = {(val)=>{
                            setSex(val);
                            setErrors(_errors =>({..._errors,Se:''}));
                        }}
                        />
                    {errors.Se ? <Text style = {UserStyles.errores}>{errors.Se}</Text> : null}

                    <Text style = {UserStyles.labels}>Teléfono: </Text>
                    <TextInput
                        style ={UserStyles.inputText}
                        placeholder="Ex: 0971256372"
                        placeholderTextColor={'gray'}
                        value= {telefono}
                        onChangeText = {(val)=>{
                            setTelefono(val);
                            setErrors(_errors =>({..._errors,Se:''}));
                        }}
                        />                    
                    
                    <View>
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

                        <Text style = {UserStyles.labels}>IMC: </Text>
                        <TextInput
                            style ={UserStyles.inputText}
                            placeholder="Ex: 21"
                            placeholderTextColor={'gray'}
                            value= {imc}
                            onChangeText = {(val)=>{
                                setIMC(val);
                                setErrors(_errors =>({..._errors,imc:''}));
                            }}
                            />
                        {errors.imc ? <Text style = {UserStyles.errores}>{errors.imc}</Text> : null}

                        <Text style = {UserStyles.labels}>Historial medico: </Text>
                        <TextInput
                            style ={UserStyles.inputHistorialMedico}
                            placeholder="Ex: asma, ..."
                            placeholderTextColor={'gray'}
                            value= {historialMedico}
                            onChangeText = {(val)=>{
                                setHistorialMedico(val);
                                setErrors(_errors =>({..._errors,hm:''}));
                            }}
                            multiline = {true}/>
                    </View>            

                </View>


                <TouchableOpacity 
                style = {UserStyles.touchable}
                onPress={()=> {
                    let err = {};
                    if(!name) err = {...err, Nam :'Inserte el Nombre'}
                    if(!CI) err = {...err, Cd :'Inserte el documento de identidad'}
                    if(!Age) err = {...err, Ag :'Inserte la Edad'}
                    if(!Sex) err = {...err, Se :'Inserte el Sexo'}
                    if(!imc) err = {...err, imc :'Inserte el IMC'}
                    //Condicional de validacion de datos 
                    if(err.Nam || err.Cd || err.Ag || err.We || err.He || err.Se || err.imc){
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
                            imc:'',
                        });
                        handleGuardarRegistro();
                    }
                }}
                >
                    <Text style = {UserStyles.textButton}>
                        Registrarse 
                    </Text>
                </TouchableOpacity>
            
            </View>        
        </KeyboardAwareScrollView>
    );
}
export default UserRegister;