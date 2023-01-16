import { useNavigation } from '@react-navigation/native';
import { Box, Flex, Heading, HStack, Image, Pressable, ScrollView, Spacer, Text} from 'native-base';
import React from 'react';
import products from "../data/Products";
import Rating from './Rating';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../data/Colors';

function HomeProducts() {
  const navigation = useNavigation()  
  return (
   <ScrollView flex={1} showsVerticalScrollIndicator={false}>
    <HStack space={0.4} mt={1} justifyContent="center" alignItems="center">
        <Heading fontSize={24} mb={2} mt={2} fontWeight="extrabold" color={Colors.main}>
                LOS MÁS VENDIDOS!
        </Heading>
        <MaterialCommunityIcons name="fire" size={24} color="#b80404" />
        <MaterialCommunityIcons name="fire" size={24} color="#b80404" />
        <MaterialCommunityIcons name="fire" size={24} color="#b80404" />
    </HStack>
    
    <Heading fontWeight="extrabold" color={Colors.main} fontSize={20} mb={2} mt={2} alignSelf="center" onPress={() => navigation.navigate("HomeWomen")}>
            MUJER
    </Heading>
    <Flex flexWrap="wrap"
          direction="row"
          justifyContent="space-between"
          px={6}>

        {products.mujer.slice(0,4).map((product) => (
                <Pressable
                    onPress={() => navigation.navigate("HomeWomen")}
                    key={product._id}
                    width="47%"
                    bg={"white"}
                    rounded='md'
                    shadow={2}
                    pt={0.3}
                    my={3}
                    pb={2}
                    overflow="hidden">
                        <Image source={{uri: product.image}}
                                alt={product.name}
                                width="full"
                                height={24}
                                resizeMode="contain"
                                />
                        <Box px={4} pt={1}>
                            <Heading size="sm" bold>
                                ${product.price}
                            </Heading>
                            <Text fontSize={10} mt={1} isTruncated width="full">
                                {product.name}
                            </Text>
                            {/* rating */}
                            <Rating value={product.rating}/>
                        </Box>

                </Pressable>
            ))}
            
    </Flex>

    <Heading fontWeight="extrabold" color={Colors.main} fontSize={20} mb={2} mt={2} alignSelf="center" onPress={() => navigation.navigate("HomeMen")}>
            HOMBRE
    </Heading>
    <Flex flexWrap="wrap"
          direction="row"
          justifyContent="space-between"
          px={6}>

        {products.hombre.slice(0,4).map((product) => (
                <Pressable
                    onPress={() => navigation.navigate("HomeMen")}
                    key={product._id}
                    width="47%"
                    bg={"white"}
                    rounded='md'
                    shadow={2}
                    pt={0.3}
                    my={3}
                    pb={2}
                    overflow="hidden">
                        <Image source={{uri: product.image}}
                                alt={product.name}
                                width="full"
                                height={24}
                                resizeMode="contain"
                                />
                        <Box px={4} pt={1}>
                            <Heading size="sm" bold>
                                ${product.price}
                            </Heading>
                            <Text fontSize={10} mt={1} isTruncated width="full">
                                {product.name}
                            </Text>
                            {/* rating */}
                            <Rating value={product.rating}/>
                        </Box>

                </Pressable>
            ))}
            
    </Flex>

    <Heading fontWeight="extrabold" color={Colors.main} fontSize={20} mb={2} mt={2} alignSelf="center" onPress={() => navigation.navigate("HomeChildren")}>
            INFANTIL
    </Heading>
    <Flex flexWrap="wrap"
          direction="row"
          justifyContent="space-between"
          px={6}>

        {products.infantil.slice(0,2).map((product) => (
                <Pressable
                    onPress={() => navigation.navigate("HomeChildren")}
                    key={product._id}
                    width="47%"
                    bg={"white"}
                    rounded='md'
                    shadow={2}
                    pt={0.3}
                    my={3}
                    pb={2}
                    overflow="hidden">
                        <Image source={{uri: product.image}}
                                alt={product.name}
                                width="full"
                                height={24}
                                resizeMode="contain"
                                />
                        <Box px={4} pt={1}>
                            <Heading size="sm" bold>
                                ${product.price}
                            </Heading>
                            <Text fontSize={10} mt={1} isTruncated width="full">
                                {product.name}
                            </Text>
                            {/* rating */}
                            <Rating value={product.rating}/>
                        </Box>

                </Pressable>
            ))}
            
    </Flex>

    <Flex flexWrap="wrap"
          direction="row"
          justifyContent="space-between"
          px={6}>

        {products.infantil.slice(10,12).map((product) => (
                <Pressable
                    onPress={() => navigation.navigate("HomeChildren")}
                    key={product._id}
                    width="47%"
                    bg={"white"}
                    rounded='md'
                    shadow={2}
                    pt={0.3}
                    my={3}
                    pb={2}
                    overflow="hidden">
                        <Image source={{uri: product.image}}
                                alt={product.name}
                                width="full"
                                height={24}
                                resizeMode="contain"
                                />
                        <Box px={4} pt={1}>
                            <Heading size="sm" bold>
                                ${product.price}
                            </Heading>
                            <Text fontSize={10} mt={1} isTruncated width="full">
                                {product.name}
                            </Text>
                            {/* rating */}
                            <Rating value={product.rating}/>
                        </Box>

                </Pressable>
            ))}
            
    </Flex>

   </ScrollView>
   
  );
}

export default HomeProducts;