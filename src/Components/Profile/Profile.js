import { Box, FormControl, Input, ScrollView, VStack } from 'native-base'
import React, { useState } from 'react'
import Buttons from '../Buttons'
import Colors from '../../data/Colors';
import { Alert } from 'react-native';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import database from '../../config/Firebase';


const Inputs = [
    {
        label: "USERNAME",
        type: "text",
    },
    {
        label: "EMAIL",
        type: "text",
    },
    {
        label: "NEW PASSWORD",
        type: "password",
    },
    {
        label: "CONFIRM PASSWORD",
        type: "password",
    },
]

export default function Profile() {
  const [newItem, setNewItem] = useState({});
  const user = global.user;
  return (
    <Box h="full" bg="white" px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space={10} mt={5} pb={10}>   

                        <FormControl>
                            <FormControl.Label
                                _text={{
                                    fontSize: "12px",
                                    fontWeight: "bold"
                                }}
                            >
                                USUARIO
                            </FormControl.Label>
                            <Input 
                                borderWidth={0.2}
                                bg={Colors.subGreen}
                                py={3}
                                mb={8}
                                type="text"
                                color={Colors.main}
                                fontSize={15}
                                placeholder='John Doe'
                                onChangeText={(text) => setNewItem({...newItem, userName:text})}
                                _focus={{ bg: Colors.subGreen,
                                        borderColor: Colors.main,
                                        borderWidth: 1,}}
                            />

                            <FormControl.Label
                                _text={{
                                    fontSize: "12px",
                                    fontWeight: "bold"
                                }}
                            >
                                CONTRASEÑA
                            </FormControl.Label>
                            <Input 
                                borderWidth={0.2}
                                bg={Colors.subGreen}
                                py={3}
                                type="password"
                                color={Colors.main}
                                fontSize={15}
                                placeholder='*********'
                                onChangeText={(text) => setNewItem({...newItem, password:text})}
                                _focus={{ bg: Colors.subGreen,
                                        borderColor: Colors.main,
                                        borderWidth: 1,}}
                            />
                        </FormControl>
                
                <Buttons bg={Colors.main} color="white"
                 onPress={()=>{
                if(newItem.password===undefined || newItem.password==="" || newItem.userName===undefined || newItem.userName===""){
                  Alert.alert("Error: Debe llenar todos los campos para actualizar.");
                }else{
                    const docRef = doc(database, 'usuarios', user);
                    updateDoc(docRef, {
                      userName: newItem.userName,
                      password: newItem.password,
                    })
                    Alert.alert("Datos actualizados satisfactoriamente");
                }
              }}>
                    UPDATE PROFILE
                </Buttons>
            </VStack>
        </ScrollView>

    </Box>
  )
}