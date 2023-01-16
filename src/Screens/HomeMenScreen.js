import { useNavigation } from '@react-navigation/native';
import { Box, Flex, Heading, HStack, Image, Pressable, ScrollView, Text} from 'native-base';
import React from 'react';
import products from "../data/Products";
import Rating from '../Components/Rating';
import HomeSearch from '../Components/HomeSearch';
import Colors from '../data/Colors';


function HomeMenProducts() {
  const navigation = useNavigation()  
  return (
    <Box flex={1} bg={Colors.subGreen}>
        <HomeSearch/>
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
            <HStack space={0.4} mt={1} justifyContent="center" alignItems="center">
                <Heading fontWeight="extrabold" color={Colors.main} fontSize={24} mb={2} mt={2}>
                        HOMBRE
                </Heading>
            </HStack>
            
            <Flex flexWrap="wrap"
                direction="row"
                justifyContent="space-between"
                px={6}>

                {products.hombre.map((product) => (
                        <Pressable
                            onPress={() => navigation.navigate("Single", product)}
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
   </Box>
  );
}

export default HomeMenProducts;