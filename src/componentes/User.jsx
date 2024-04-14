import React from 'react'
import {Text,View,TextInput,TouchableOpacity} from 'react-native'

const User = () => {
    return (
        <View>
            <Text
            style = {{
                fontSize: 16,
                marginHorizontal: 15,
                color:'white',
                paddingHorizontal:10,
                paddingVertical:10,
                marginTop: 10,
                textAlign: 'left',
                backgroundColor:'#E05E5E',
                //borderBlockColor: '#E72E2E',
                borderRadius: 10,

            }}
            >Usted actualmete se encuentra en modo sin conexion, con lo cual 
            sus datos seran almacenados en la memoria de su dispositivo movil</Text>
            
            <Text 
            style = {{
                alignSelf:'flex-start',
                marginTop: 80,
                marginHorizontal:20,
                fontSize: 20}}
                >Nombre: </Text>
            <TextInput
                style ={{
                    height:40,
                    width: 200,
                    borderColor: '#E05E5E',
                    borderRadius:5,
                    borderWidth: 1,
                    marginTop: -35,
                    marginHorizontal: 120,
                    padding: 10
                }}
                placeholder="Inserte su Nombre y Apellido"
                placeholderTextColor={'gray'}
            />
             <Text 
            style = {{
                alignSelf:'flex-start',
                marginTop: 30,
                marginHorizontal:20,
                fontSize: 20}}
                >Edad: </Text>
            <TextInput
                style ={{
                    height:40,
                    width: 95,
                    borderColor: '#E05E5E',
                    borderRadius:5,
                    borderWidth: 1,
                    marginTop: -35,
                    marginHorizontal: 120,
                    padding: 10
                }}
                placeholder="Ex: 25 años"
                placeholderTextColor={'gray'}
            />
            <Text 
            style = {{
                alignSelf:'flex-start',
                marginTop: 30,
                marginHorizontal:20,
                fontSize: 20}}
                >Peso: </Text>
            <TextInput
                style ={{
                    height:40,
                    width: 95,
                    borderColor: '#E05E5E',
                    borderRadius:5,
                    borderWidth: 1,
                    marginTop: -35,
                    marginHorizontal: 120,
                    padding: 10
                }}
                placeholder="Ex: 80 [kg]"
                placeholderTextColor={'gray'}
            />
            <Text 
            style = {{
                alignSelf:'flex-start',
                marginTop: 30,
                marginHorizontal:20,
                fontSize: 20}}
                >Altura: </Text>
            <TextInput
                style ={{
                    height:40,
                    width: 95,
                    borderColor: '#E05E5E',
                    borderRadius:5,
                    borderWidth: 1,
                    marginTop: -35,
                    marginHorizontal: 120,
                    padding: 10
                }}
                placeholder="Ex: 177 [cm]"
                placeholderTextColor={'gray'}
            />
            <Text 
            style = {{
                alignSelf:'flex-start',
                marginTop: 30,
                marginHorizontal:20,
                fontSize: 20}}
                >Sexo: </Text>
            <TextInput
                style ={{
                    height:40,
                    width: 110,
                    borderColor: '#E05E5E',
                    borderRadius:5,
                    borderWidth: 1,
                    marginTop: -35,
                    marginHorizontal: 120,
                    padding: 10
                }}
                placeholder="Ex: Masculino"
                placeholderTextColor={'gray'}
            />

            <TouchableOpacity
                    style = {{
                        backgroundColor: 'red',
                        padding : 10,
                        marginTop : 30,
                        width : '50%',
                        alignSelf: 'center',
                        borderRadius: 10,
                    }}
              >
                <Text
                    style = {{
                        fontSize: 16,
                        textAlign: 'center',
                        color: "white",

                    }}
                    >Guardar Datos </Text>
              </TouchableOpacity>
        
        </View>
        
        
        

    );
}

export default User