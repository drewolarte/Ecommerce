import { useNavigation } from '@react-navigation/native'
import { Box, Center, HStack, Modal, Text, VStack, Button, PresenceTransition, Pressable, Image } from 'native-base'
import React, { useState } from 'react'
import Buttons from '../Components/Buttons'
import Colors from '../data/Colors';

const OrdersInfos = [
    {
        title: "Products",
        price: 125.77,
        color: "black",
    },
    {
        title: "Shipping",
        price: 34.00,
        color: "black",
    },
    {
        title: "Tax",
        price: 23.24,
        color: "black",
    },
    {
        title: "Total Amount",
        price: 3458.00,
        color: Colors.main,
    },
]

export default function OrderModel() {
  const navigation = useNavigation();  
  const [showModel,setShowModel] = useState(false);
  return (
    <Center>
        <Buttons
            onPress={() => setShowModel(true)}
            bg={Colors.main}
            color="white"
            mt={5}
            >
                SHOW PAYMENT & TOTAL
        </Buttons>
        <Modal isOpen={showModel} onClose={() => setShowModel(false)} size="lg">
            <Modal.Content maxWidth={350}>
                <Modal.CloseButton />
                <Modal.Header>Order</Modal.Header>
                <Modal.Body>
                    <VStack space={7}>
                        {OrdersInfos.map((i,index) => (
                            <HStack alignItems="center" justifyContent="space-between" key={index}>
                                <Text fontWeight="medium">{i.title}</Text>
                                <Text color={i.color === Colors.main ? Colors.main : "black"} bold>${i.price}</Text>
                            </HStack>
                        ))}
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Pressable
                        w="full"
                        justifyContent="center"
                        bg={Colors.paypal}
                        h={45}
                        rounded={3}
                        overflow="hidden"
                        onPress={() => setShowModel(false)}
                        >
                            <Image 
                                source={{uri: "https://cdn-icons-png.flaticon.com/512/196/196566.png"}}
                                alt="paypal"
                                resizeMode="contain"
                                w="full"
                                h={34}
                                />
                    </Pressable>
                    <Button
                        w="full"
                        mt={2}
                        bg="black"
                        h={45}
                        _text={{
                            color:"white"
                        }}
                        onPress={() => {
                            navigation.navigate("Home");
                            setShowModel(false);
                        }}
                        _pressed={{
                            bg: "black"
                        }}
                        >
                            PAY LATER
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>
  )
}