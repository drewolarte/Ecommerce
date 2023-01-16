//rfce
import { Box, Button, Heading, Image, Input, VStack, Pressable, Text, FormControl } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { async } from '@firebase/util';
import { collection, onSnapshot, query } from 'firebase/firestore';
import database from '../config/Firebase';
import { Alert } from 'react-native';
import Colors from '../data/Colors';


function LoginScreen({navigation}) {

  const [usuario, setUsuario] = useState({});
  const [usuarioDb, setUsarioDb] = useState([]);
  const encontrado = useRef(false);

  useEffect(() => {
    const collectionRef = collection(database, 'usuarios');
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setUsarioDb(
        querySnapshot.docs.map(doc =>({
          id:doc.id,
          userName:doc.data().userName,
          email:doc.data().email,
          password:doc.data().password,
        }))
      )
    })
    return unsubscribe;
  },[]);

  function onLogin(error) {
      try {
        for (let elemento of usuarioDb) {
          if(elemento.password===usuario.password && elemento.email===usuario.email) {
            global.user = elemento.id;
            Alert.alert("Usuario autenticado correctamente.");
            navigation.navigate('Bottom')
            encontrado.current=false
            break;
          }
          if(elemento.password!==usuario.password && elemento.email!==usuario.email){
            encontrado.current=true
          }
        }
      } catch (error) {
        Alert.alert("Error: No hay usuarios registrados.");
      }
  }
  
  return (
    <Box flex={1}  bg='black'>
        <Image 
          flex={1}
          alt="logo"
          resizeMode='cover'
          size="lg"
          width="full"
          source={require("../../assets/background.jpg")}
        />

        <Box 
          width="full"
          height="full"
          position="absolute"
          top="0"
          px="6"
          justifyContent="center"
          alignItems="center"
        > 
          <Image mb={4} source={require('../../assets/icon_full.png')}
           alt="profile"
           w={150}
           h={100}
            />
          <Heading mb={-4}>LOGIN</Heading>
          <VStack space={5} pt="6">

            {/* EMAIL */}
            <Input
              InputLeftElement={
                <Entypo name="mail" size={24} color={Colors.main} />
              }
              variant="underlined"
              placeholder='user@gmail.com'
              width="70%"
              pl={2}
              color={Colors.main}
              borderBottomColor={Colors.main}
              onChangeText={(text) => setUsuario({...usuario, email:text})}
              placeholderTextColor={Colors.main}
              >
            </Input>

            {/* PASSWORD */}
            <Input
              InputLeftElement={
                <Entypo name="lock" size={24} color={Colors.main} />
              }
              variant="underlined"
              placeholder='*********'
              width="70%"
              type="password"
              pl={2}
              color={Colors.main}
              borderBottomColor={Colors.main}
              onChangeText={(text) => setUsuario({...usuario, password:text})}
              placeholderTextColor={Colors.main}
            >
              
            </Input>
            </VStack>

            <Button 
              _pressed={{
                bg: "black",
              }}
              my={30} 
              width="40%" 
              rounded={50} 
              bg={Colors.main}
              onPress={()=>{
                if(usuario.password===undefined || usuario.password==="" || usuario.email===undefined || usuario.email===""){
                  Alert.alert("Error: Debe llenar todos los campos para iniciar sesión.");
                }else{
                  onLogin()
                  if(encontrado.current===true){
                    Alert.alert("Error: Email y/o contraseña inválidas. Intente de nuevo.");}
                }
              }}
              >
            LOGIN
            </Button>

            <Pressable mt={2} onPress={() => navigation.navigate('Register')}>
              <Text fontWeight='extrabold' fontSize={15} italic color={Colors.main}>REGISTRARSE</Text>
            </Pressable>

        </Box>
    </Box>
  )
  

}

export default LoginScreen;