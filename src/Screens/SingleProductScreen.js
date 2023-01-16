//rfce
import { Box, ScrollView, Image, Heading, HStack, Spacer, Text } from 'native-base'
import React, {useRef, useState} from 'react'
import Rating from '../Components/Rating';
import NumericInput from 'react-native-numeric-input';
import Buttons from '../Components/Buttons';
import Review from '../Components/Review';
import { useNavigation } from '@react-navigation/native';
import Colors from '../data/Colors';
import database from '../config/Firebase';
import { Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { async } from '@firebase/util';


function SingleProductScreen({route}) {
  const navigation = useNavigation();
  const product = route.params;
  const newItem = useRef(undefined);
  
  const user = global.user

  const boton = (num) => {
    newItem.current ={_id: product._id,name: product.name, image:product.image,description:product.description,price:product.price,countInStock:product.countInStock,rating:product.rating,numReviews:product.numReviews, cantidad:num}
  }

  async function onSend(error) {
    try {
      const url = "usuarios/"+user+"/carrito"
      await addDoc(collection(database, url), newItem.current);
      Alert.alert("Artículo registrado satisfactoriamente.");
      navigation.navigate("Cart")
    } catch (error) {
    }
  }
  
  return (
    <Box safeArea flex={1} bg={"white"}>
        <ScrollView px={5} showsVerticalScrollIndicator={false}>
          <Image source={{uri:product.image}} 
          alt="Image" 
          w="full" h={300} 
          resizeMode="contain"/>
          <Heading bold fontSize={15} mb={2} lineHeight={22}>
            {product.name}
          </Heading>
          <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
          <HStack space={2} alignItems="center" my={5}>
            {product.countInStock > 0 ? (
                <NumericInput  
                totalWidth={140} 
                totalHeight={30} 
                iconSize={25}
                step={1}
                maxValue={product.countInStock}
                minValue={0}
                borderColor={Colors.deepGray}
                rounded
                textColor="black"
                iconStyle={{color: "white"}}
                rightButtonBackgroundColor={Colors.main}
                leftButtonBackgroundColor={Colors.main}
                onChange={boton}
                />
            ) : (
              <Heading bold color={Colors.red} italic fontSize={12}>
                Out of stock
              </Heading>
            )}
            <Spacer/>
            <Heading bold color="black" fontSize={19}>
              ${product.price}
            </Heading>
          </HStack>
          <Text lineHeight={24} fontSize={12}>
              {product.description}
          </Text>
          <Buttons  onPress={() => {
                                      newItem.current!==undefined ? onSend() : Alert.alert("Debe seleccionar la cantidad de la prenda.");
                                  }} 
          bg={Colors.main} color="white" mt={10}>
            ADD TO CART
          </Buttons>
          {/*REVIEW*/}
          {/* <Review/> Versióin 2*/} 
        </ScrollView>
    </Box>
  )
}

export default SingleProductScreen