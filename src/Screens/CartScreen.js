//rfce
import { useNavigation } from '@react-navigation/native';
import { Box, Center, HStack, ScrollView, Button, Text } from 'native-base';
import React, { useEffect, useState } from 'react'
import Buttons from '../Components/Buttons';
import CartItems from '../Components/CartItems';
import Colors from '../data/Colors';
import { async } from '@firebase/util';
import { collection, onSnapshot, query } from 'firebase/firestore';
import database from '../config/Firebase';

function CartScreen({route}) {
  const navigation = useNavigation();
  const product = route.params
  const [usuarioDb, setUsarioDb] = useState([]);
  const user = global.user;
  let total = 0;

    useEffect(() => {
    const url = "usuarios/"+user+"/carrito"
    const collectionRef = collection(database, url);
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setUsarioDb(
        querySnapshot.docs.map(doc =>({
            docu: doc.id,
            _id: doc.data()._id,
            name: doc.data().name,
            image: doc.data().image,
            description: doc.data().description,
            price: doc.data().price,
            countInStock: doc.data().countInStock,
            rating: doc.data().rating,
            numReviews: doc.data().numReviews,
            cantidad:doc.data().cantidad
        }))
      )
    })
    return unsubscribe;
  },[]);


  usuarioDb.forEach((producto) => {
    total = total + (producto.cantidad * producto.price);
  })

  const precio = "$"+total

  return (
    <Box flex={1} safeAreaTop bg={Colors.subGreen}>
        {/* Header */}
        <Box bg={Colors.main} py={5} mb={8}>
          {/* HEADER */}
          <Center >
            <Text color="white" fontSize={14} fontWeight="extrabold">
              CART
            </Text>
          </Center>
        </Box>
        {/* IF CART IS EMPTY
        <CartEmpty/> */}

        {/* CART ITEMS */}
        
          
          <ScrollView showsVerticalScrollIndicator={false} >
          <CartItems productos={usuarioDb}/>
          {/* TOTAL */}
          <Center mt={5} >
            <HStack rounded={50} justifyContent="space-between" bg="white" shadow={2} w="90%" pl={5} h={45} alignItems="center">
              <Text>
                TOTAL
              </Text>
              <Button px={10} h="45" w="80%" rounded={50} bg={Colors.main} _text={{color:"white", fontWeight:"semibold"}} _pressed={{bg:Colors.main}}>
                {precio}
              </Button>
            </HStack>
          </Center>

          {/* CHECK OUT */}
          <Center px={5}>
            <Buttons onPress={() => navigation.navigate("Shipping")} bg="black" color="white" mt={10}>
              CHECKOUT
            </Buttons>
          </Center>
        </ScrollView>
    </Box>
  )
}

export default CartScreen;