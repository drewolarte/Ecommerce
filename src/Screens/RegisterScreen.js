//rfce
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Heading, Image, Input, VStack, Pressable, Text } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import database from '../config/Firebase';
import { Alert } from 'react-native';
import { async } from '@firebase/util';
import Colors from '../data/Colors';

function RegisterScreen({navigation}) {

  const [newItem, setNewItem] = useState({});
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

  async function onSend(error) {
    try {

      for (let elemento of usuarioDb) {
        if(newItem.email===elemento.email) {
          encontrado.current=true
          break;
        }
      }
      if(encontrado.current===true){
        Alert.alert("Error: Correo ya registrado. Intente con otro nuevamente.")
         navigation.navigate("Login")
      }else{
        await addDoc(collection(database, "usuarios"), newItem);
        Alert.alert("Usuario registrado satisfactoriamente.");
        navigation.navigate("Login");
      }

    } catch (error) {
    }
  }

  return (
    <Box flex={1} bg={'black'}>
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
            
          <Heading mb={-4}>REGISTRO</Heading>
          <VStack space={5} pt="6">

            {/* USERNAME */}
            <Input
              InputLeftElement={
                <Entypo name="user" size={24} color={Colors.main}/>
              }
              variant="underlined"
              placeholder='John Doe'
              width="70%"
              pl={2}
              color={Colors.main}
              borderBottomColor={Colors.main}
              onChangeText={(text) => setNewItem({...newItem, userName:text})}
              placeholderTextColor={Colors.main}
            >
            </Input>

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
              onChangeText={(text) => setNewItem({...newItem, email:text})}
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
              onChangeText={(text) => setNewItem({...newItem, password:text})}
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
                if(newItem.password===undefined || newItem.password==="" || newItem.userName===undefined || newItem.userName==="" || newItem.email===undefined || newItem.email===""){
                  Alert.alert("Error: Debe llenar todos los campos para registrarse.");
                }else{
                  onSend()
                }
              }}
              >
              
            REGISTRARSE
            </Button>

            <Pressable mt={2} onPress={() => navigation.navigate("Login")}>
              <Text fontWeight="extrabold" fontSize={15} italic color={Colors.main}>LOGIN</Text>
            </Pressable>

        </Box>
    </Box>
  )
}

export default RegisterScreen