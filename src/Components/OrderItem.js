import { FlatList, Pressable, Box, HStack, Center, Image, VStack, Text, Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import products from '../data/Products'
import Colors from '../data/Colors';
import { collection, onSnapshot, query } from 'firebase/firestore';
import database from '../config/Firebase';

export default function OrderItem() {
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

  return (
    <FlatList 
        showsVerticalScrollIndicator={false}
        data={usuarioDb}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => (
          <Pressable>
            <Box mb={3}>
                <HStack 
                    alignItems="center"
                    bg="white"
                    shadow={1}
                    rounded={10}
                    overflow="hidden"
                    >
                    <Center w="25%" bg={Colors.deepGray}>
                        <Image source={{uri: item.image}} alt={item.name} w="full" h={24} resizeMode="contain" />
                     </Center>
                     <VStack w="60%" px={2}>
                        <Text isTruncated color="black" bold fontSize={12}>
                            {item.name}
                        </Text>
                        <Text color={Colors.lightBlack} mt={2} bold>
                            ${item.price}
                        </Text>
                     </VStack>
                     <Center>
                        <Button
                            bg={Colors.main}
                            _pressed={{bg:Colors.main}}
                            _text={{
                                color: "white"
                            }}
                            >
                                {item.cantidad}
                        </Button>
                     </Center>
                </HStack>
            </Box>
          </Pressable>  
        ) }
        />
  )
}