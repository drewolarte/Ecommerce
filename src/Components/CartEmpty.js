import React from 'react'
import { Box, Center, Text } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import Buttons from './Buttons'
import Colors from '../data/Colors';

const CartEmpty = () => {
  return (
    <Box flex={1} px={4} >
      <Center h="90%">
        <Center w={200} h={200} bg="white" rounded="full">
            <FontAwesome name="shopping-basket" size={64} color={Colors.main}/>
        </Center>
        <Text style={{color:Colors.main, fontWeight:"bold", marginTop:10}} >
            CART IS EMPTY
        </Text>
      </Center>
      <Buttons bg={Colors.main} color="white">
        START SHOPPING
      </Buttons>
    </Box>
  )
}

export default CartEmpty