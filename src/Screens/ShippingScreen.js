//rfce
import { useNavigation } from '@react-navigation/native'
import { Box, Center, FormControl, Input, ScrollView, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { Alert } from 'react-native';
import Buttons from '../Components/Buttons'
import Colors from '../data/Colors';

function ShippingScreen() {  
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({});

  return (
    <Box flex={1} safeAreaTop bg={Colors.main} py={5}>
      {/* HEADER */}
      <Center pb={15}>
        <Text color="white" fontSize={14} fontWeight="extrabold">
          DATOS DE ENTREGA
        </Text>
      </Center>
      {/* INPUTS */}
      <Box h="full" bg="white" px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {
                <FormControl>
                  <FormControl.Label
                    _text={{
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}>
                    INGRESE CIUDAD
                  </FormControl.Label>
                  <Input 
                    borderWidth={0.2}
                    borderColor={Colors.main}
                    bg={Colors.subGreen}
                    py={4}
                    mb={8}
                    type="text"
                    color={Colors.main}
                    onChangeText={(text) => setUsuario({...usuario, ciudad:text})}
                    _focus={{
                      bg: Colors.subGreen,
                      borderWidth: 1,
                      borderColor: Colors.main
                    }}
                    />

                  <FormControl.Label
                    _text={{
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}>
                    INGRESE DIRECCIÓN
                  </FormControl.Label>
                  <Input 
                    borderWidth={0.2}
                    borderColor={Colors.main}
                    bg={Colors.subGreen}
                    py={4}
                    mb={8}
                    type="text"
                    color={Colors.main}
                    onChangeText={(text) => setUsuario({...usuario, direccion:text})}
                    _focus={{
                      bg: Colors.subGreen,
                      borderWidth: 1,
                      borderColor: Colors.main
                    }}
                    />

                  <FormControl.Label
                    _text={{
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}>
                    INGRESE TELÉFONO DE CONTACTO
                  </FormControl.Label>
                  <Input 
                    borderWidth={0.2}
                    borderColor={Colors.main}
                    bg={Colors.subGreen}
                    py={4}
                    type="text"
                    color={Colors.main}
                    onChangeText={(text) => setUsuario({...usuario, telefono:text})}
                    _focus={{
                      bg: Colors.subGreen,
                      borderWidth: 1,
                      borderColor: Colors.main
                    }}
                    />
                </FormControl>
              
            }
            <Buttons onPress={() => {
                if(usuario.ciudad===undefined || usuario.ciudad==="" || usuario.direccion===undefined || usuario.direccion==="" || usuario.telefono===undefined || usuario.telefono===""){
                  Alert.alert("Error: Debe llenar todos los campos para realizar el pedido.");
                }else{
                    navigation.navigate("PlaceOrder",usuario)
                }
              }} bg={Colors.main} color="white" mt={5}>
              CONTINUE
            </Buttons>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  )
}

export default ShippingScreen