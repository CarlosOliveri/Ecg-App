import React ,{useState, useEffect} from 'react'
import {Text,View,TextInput,TouchableOpacity,Switch,Button, InputAccessoryView} from 'react-native'
import SwitchToggle from "react-native-switch-toggle";
import UserStyles from '../styles/UserRegisterStyles';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import UserShow from './UserShow';
import {useAuth} from './AuthContext';
import { LoginRequest, getPacienteDatos, getUserDatos,RegisterRequest } from "../api/ecg.api";
import UserRegisterStyles from '../styles/UserRegisterStyles';
import Login from './Login';
import Toggle from './Toggle';

const UserEdit = () => {

    const {logout,setUserDatos,userDatos} =useAuth();
    const [firstRender,setFirstRender] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() =>{
        console.debug("[UserEditRegister]");
        if (firstRender){
            setFirstRender(false);

            setAge(userDatos.datosUser.edad);
            setName(userDatos.user.first_name);
            setApellido(userDatos.user.last_name);
            setCI(userDatos.datosUser.cedula);
            setEmail(userDatos.user.email);
            setEspecialidad(userDatos.doctor.especialidad);
            setHeight(userDatos.paciente.altura);
            setIMC(userDatos.paciente.IMC);
            setHistorialMedico(userDatos.paciente.historialMedico);
            setMatricula(userDatos.doctor.matricula);
            setSex(userDatos.datosUser.sexo);
            setTelefono(userDatos.datosUser.telefono);
            setUsername(userDatos.user.username);
            setWeight(userDatos.paciente.peso);

            return 
        }
        if (isFocused){
            handleEdit();
            setFirstRender(true);
        }
    },[userDatos])
    
    const [userLog,setUserLog] = useState(true);
    const navigation = useNavigation();
    //const [foto,setFoto] = useState();
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();
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
    const [historialMedico,setHistorialMedico] = useState();
    const [especialidad,setEspecialidad] = useState();
    const [matricula,setMatricula] = useState();
    const [errors,setErrors] = useState({
        Fot:'',
        Un:'',
        Nam:'',
        Ape:'',
        Em:'',
        Cd:'',
        Ag: '',
        Se:'',
        tel:'',
        tip:'',
        We:'',
        He:'',
        imc:'',
        HM:'',
        Mt:'',
    });

    const [esPaciente,setEsPaciente] = useState(true);
    const [tipoUsuario,setTipoUsuario] = useState("Paciente");

    const handleGuardarRegistro = async () => {
        //Generacion de objeto JS
        if (tipoUsuario){
            setUserDatos({
                "user":{
                    "username":username,
                    "password":password,
                    "email": email,
                    "first_name": name,
                },
                "datosUser":{
                    "cedula":CI,
                    "edad": parseInt(Age,10),
                    "sexo": Sex,
                    "telefono":telefono,
                    "tipo":tipoUsuario,
                },
                "paciente":{
                    "peso": Weight,
                    "altura": Height,
                    "IMC":imc,
                    "historial_medico":historialMedico,
                    "doctor":null
                },
                "doctor":{
                    "especialidad":"",
                    "matricula": "",
                },
            })
        }else{
            setUserDatos({
                "user":{
                    "username":username,
                    "password":password,
                    "email": email,
                    "first_name": name,
                    "last_name": apellido,
                },
                "datosUser":{
                    "cedula":CI,
                    "edad": Age,
                    "sexo": Sex,
                    "telefono":telefono,
                    "tipo":tipoUsuario,
                },
                "paciente":{
                    "peso": "",
                    "altura": "",
                    "IMC":"",
                    "historial_medico":"",
                    "doctor":null
                },
                "doctor":{
                    "especialidad": especialidad,
                    "matricula": matricula,
                },
            })
        }
        //setUserLog(true);
        //Guardamos los datos 
        //setUserDatos(newRegistro);
        //await AsyncStorage.setItem('User', JSON.stringify(newRegistro));

        //Cambiamos de Pantalla
        //navigation.navigate('UserShow');
    }

    const handleEdit = async() =>{
        //await RegisterRequest(userDatos);
        console.debug("Se editaron los datos");
    }

    const handleSetUserLog = ()=>{
        setUserLog(false);
    }

    const handleToggel = () => {
        if (esPaciente) {
            setEsPaciente(false);
            setTipoUsuario("Doctor");
        }else{
            setEsPaciente(true);
            setTipoUsuario("Paciente");
        }
    }

    return (
        <KeyboardAwareScrollView style={UserStyles.keyboard}>
            <Text
            style = {UserStyles.msgText}
            >Usted actualmete se encuentra en modo sin conexion, con lo cual 
            sus datos seran almacenados en la memoria de su dispositivo movil</Text>
            <View>
                <View style = {UserStyles.formContainer}>

                    <Text style = {UserStyles.labels}>Username: </Text> 
                    <TextInput
                        style ={UserStyles.inputText}
                        placeholder="Ex: NApellido"
                        placeholderTextColor={'gray'}
                        value= {username}
                        onChangeText = {(val)=>{
                            setUsername(val);
                            setErrors(_errors =>({..._errors,Un:''}));
                        }}/>

                    <Text style = {UserStyles.labels}>Password: </Text> 
                    <TextInput
                        style ={UserStyles.inputText}
                        placeholder="Ex: bhbj32bh"
                        placeholderTextColor={'gray'}
                        value= {password}
                        onChangeText = {(val)=>{
                            setPassword(val);
                            setErrors(_errors =>({..._errors,Nam:''}));
                        }}/>
                    
                    <Text style = {UserStyles.labels}>Email: </Text> 
                    <TextInput
                        style ={UserStyles.inputName}
                        placeholder="Ej: NApel@gmail.com"
                        placeholderTextColor={'gray'}
                        value= {email}
                        onChangeText = {(val)=>{
                            setEmail(val);
                            setErrors(_errors =>({..._errors,Em:''}));
                        }}/>

                    <Text style = {UserStyles.labels}>Nombre: </Text> 
                    <TextInput
                        style ={UserStyles.inputName}
                        placeholder="Ej: Nombre"
                        placeholderTextColor={'grey'}
                        value= {name}
                        onChangeText = {(val)=>{
                            setName(val);
                            setErrors(_errors =>({..._errors,Nam:''}));
                        }}
                        />
                    {errors.Nam ? <Text style = {UserStyles.errores}>{errors.Nam}</Text> : null}

                    <Text style = {UserStyles.labels}>Apellido: </Text> 
                    <TextInput
                        style ={UserStyles.inputName}
                        placeholder="Ej: Apellido"
                        placeholderTextColor={'grey'}
                        value= {apellido}
                        onChangeText = {(val)=>{
                            setApellido(val);
                            setErrors(_errors =>({..._errors,Ape:''}));
                        }}
                        />
                    {errors.Ape ? <Text style = {UserStyles.errores}>{errors.Ape}</Text> : null}

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
                        value= {String(Age)}
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
                            setErrors(_errors =>({..._errors,tel:''}));
                        }}
                        />                    
                    
                    {(esPaciente)?(<View>
                        <Text style = {UserStyles.labels}>Peso: </Text>
                        <TextInput style ={UserStyles.inputText}
                            placeholder="Ex: 80 [kg]"
                            placeholderTextColor={'gray'}
                            value= {String(Weight)}
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
                            value= {String(Height)}
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
                            value= {String(imc)}
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
                    ):(<View>
                        <Text style = {UserStyles.labels}>Especialidad: </Text>
                        <TextInput
                            style ={UserStyles.inputText}
                            placeholder="Ex: Pediatria"
                            placeholderTextColor={'gray'}
                            value= {especialidad}
                            onChangeText = {(val)=>{
                                setEspecialidad(val);
                                setErrors(_errors =>({..._errors,ep:''}));
                            }}/>
                        
                        <Text style = {UserStyles.labels}>Matricula: </Text>
                        <TextInput
                            style ={UserStyles.inputText}
                            placeholder="Ex: 7654"
                            placeholderTextColor={'gray'}
                            value= {matricula}
                            onChangeText = {(val)=>{
                                setMatricula(val);
                                setErrors(_errors =>({..._errors,mc:''}));
                            }}/>
                    </View>)}

                </View>


                <TouchableOpacity 
                style = {UserStyles.touchable}
                onPress={()=> {
                    let err = {};
                    if(!name) err = {...err, Nam :'Inserte el Nombre'}
                    if(!CI) err = {...err, Cd :'Inserte el documento de identidad'}
                    if(!Age) err = {...err, Ag :'Inserte la Edad'}
                    if(!Weight) err = {...err, We :'Inserte el Peso'}
                    if(!Height) err = {...err, He :'Inserte la Altura'}
                    if(!Sex) err = {...err, Se :'Inserte el Sexo'}
                    if(!imc) err = {...err, imc :'Inserte el IMC'}
                    //Condicional de validacion de datos 
                    if(err.Nam || err.Cd || err.Ag || err.We || err.We || err.He || err.Se || err.imc){
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
                        Guardar Cambios
                    </Text>
                </TouchableOpacity>
            
            </View>

        
        </KeyboardAwareScrollView>
    );
}
export default UserEdit;