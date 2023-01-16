import { Box, HStack, Input, Pressable, Image } from 'native-base';
import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../data/Colors';
import { height } from 'styled-system';
import { async } from '@firebase/util';
import { collection, onSnapshot, query } from 'firebase/firestore';
import database from '../config/Firebase';

function HomeSearch() {
  const navigation = useNavigation() 
  const [usuarioDb, setUsarioDb] = useState([]);
  const user = global.user;
  
  useEffect(() => {
    const url = "usuarios/"+user+"/carrito"
    const collectionRef = collection(database, url);
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setUsarioDb(
        querySnapshot.docs.map(doc =>({
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

  let cantidad = 0;

  usuarioDb.forEach((producto) => {
    cantidad++;
  })

  return (
   <HStack 
    space={3}
    width="full"
    px={6}
    bg={Colors.main}
    py={4}
    justifyContent="space-around"
    alignItems="center"
    safeAreaTop>
        {/* <Input 
            placeholder='Nike, Puma, Adidas ...'
            width="85%"
            bg={"white"}
            h={12}
            variant="filled"
            borderWidth={0}
            _focus={{
                bg: 'white'
            }}>

        </Input> */}

        <Image source={require('../../assets/icon.png')}
           alt="profile"
           w={12}
           h={50}
        />

        <Image mr={2} source={require('../../assets/tierra_santa.png')}
           alt="profile"
           style={styles.tierrasanta}
        />
        
        <Pressable mt={4} onPress={() => navigation.navigate("Cart")}>
            <FontAwesome5 name="shopping-basket" size={24} color="white" />
            <Box
                px={1}
                rounded="full"
                position="absolute"
                top={-13}
                left={2}
                bg={'red.600'}
                _text={{
                    color: 'white',
                    fontSize: '11px'
                }}>
                    {cantidad}
            </Box>
        </Pressable>

   </HStack>
  )
}

const styles = StyleSheet.create({
    tierrasanta: {
        width: '60%',
        height: '70%'
    }
})

export default HomeSearch