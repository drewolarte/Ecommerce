import React, {useEffect, useRef, useState}  from 'react'
import { Box, Center, HStack, Pressable, Image, VStack, Text, Button } from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view'
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../data/Colors';
import database from '../config/Firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Alert } from 'react-native';



const Swiper = ({products}) => {
    const user=global.user
    return(
    <SwipeListView
    rightOpenValue={-50}
    previewRowKey="0"
    previewOpenValue={-40}
    previewOpenDelay={3000}
    data={products}
    renderItem={renderiterms}
    renderHiddenItem={hiddeniterms}
    showVerticalScrollIndicator={false}
    />
    )
}

const renderiterms = (data) => {
    return (
    <Pressable>
        <Box ml={6} mb={3}>
            <HStack alignItems="center" bg="white" shadow={1} rounded={10} overflow="hidden">
                <Center w="25%" bg={Colors.deepGray}>
                    <Image source={{uri:data.item.image}} alt={data.item.name} w="full" h={24} resizeMode="contain"/>
                </Center>
                <VStack w="60%" px={2} space={2}>
                    <Text isTruncated style={{color:"black", fontWeight:"bold", fontSize:10}}>
                        {data.item.name}
                    </Text>
                    <Text style={{fontWeight:"bold", color:Colors.lightBlack}}>
                        ${data.item.price}
                    </Text>
                </VStack>
                <Center>
                    <Button bg={Colors.main} _pressed={{bg:Colors.main}} _text={{color:"white"}}>
                     {data.item.cantidad}
                    </Button>
                </Center>
            </HStack>
        </Box>
    </Pressable>)
}

const hiddeniterms = (data) => {

    return(

        <Pressable
        w={50}
        roundedTopRight={10}
        roundedBottomRight={10}
        h="88%"
        ml="auto"
        justifyContent="center"
        bg={Colors.red}
        onPress={() => {
            const url = "usuarios/"+user+"/carrito"
            const docRef = doc(database, url, data.item.docu);
            deleteDoc(docRef);
            Alert.alert("Artículo eliminado satisfactoriamente.");

        }} 
        >
            <Center alignItems="center" space={2}>
                <FontAwesome name="trash" size={24} color="white"/>
            </Center>
        </Pressable>
    )
}

const CartItems = ({productos}) => {
    
  return (
    <Box mr={6}>
      <Swiper products={productos}/>
    </Box>
  )
}

export default CartItems