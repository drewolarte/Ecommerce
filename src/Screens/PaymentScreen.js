//rfce
import { Box, Center, HStack, ScrollView, Text, VStack, Image } from 'native-base'
import React from 'react'
import Buttons from '../Components/Buttons'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Colors from '../data/Colors';


const paymentMethodes = [
  {
    image: "https://cdn-icons-png.flaticon.com/512/196/196566.png",
    alt: "paypal",
    icon: "Ionicons"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/196/196550.png",
    alt: "discover",
    icon: "fontAwesome"
  },
  {
    image: "https://cdn-icons-png.flaticon.com/512/6124/6124998.png",
    alt: "googlepay",
    icon: "fontAwesome"
  },
]


function PaymentScreen() {
  const navigation = useNavigation();
  return (
    <Box flex={1} safeAreaTop bg={Colors.main} py={5}>
      {/* HEADER */}
      <Center pb={15}>
        <Text color="white" fontSize={14} fontWeight="extrabold">
          PAYMENT METHOD
        </Text>
      </Center>
      {/* SELECTION */}
      <Box h="full" bg={Colors.subGreen} px={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={6} mt={5}>
            {paymentMethodes.map((i,index) => (
              <HStack
              alignItems="center"
              bg="white"
              px={3}
              py={1}
              rounded={10}
              justifyContent="space-between"
              key={index}>
                  <Box>
                    <Image 
                      source={{uri:i.image}}
                      alt={i.alt}
                      resizeMode='contain'
                      w={60}
                      h={50}
                      />
                  </Box>
                  {
                    i.icon==="Ionicons" ? <Ionicons name="checkmark-circle" size={30} color={Colors.main} /> : <FontAwesome name="circle-thin" size={30} color={Colors.main} />
                  }
              </HStack>
            )) 
            }
            <Buttons onPress={() => navigation.navigate("PlaceOrder")} bg={Colors.main} color="white" mt={5}>
              CONTINUE
            </Buttons>
            <Text italic textAlign="center">
              Payment method is <Text bold> Paypal</Text> by default
            </Text>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  )
}

export default PaymentScreen