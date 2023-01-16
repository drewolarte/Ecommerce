//rfce
import React from 'react'
import { Box, Button, Heading, Image, Input, VStack, Pressable, Center } from 'native-base';
import Buttons from '../Components/Buttons';
import Colors from '../data/Colors';

function NotVerifyScreen() {
  return (
    <Box flex={1} bg={Colors.main} safeAreaTop>
        <Center width="full" height={250}>
            <Image 
              source={require("../../assets/favicon.png")}
              alt="Logo"
              size="lg"
              />
        </Center>
        <VStack space={6} px={5} alignItems="center">
          <Buttons bg="black" color="white">
            REGISTER
          </Buttons>
          <Buttons bg="white" color="black">
            LOGIN
          </Buttons>
        </VStack>
    </Box>
    
  )
}

export default NotVerifyScreen