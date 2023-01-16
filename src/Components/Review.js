import React, { useState } from 'react'
import { Box, CheckIcon, FormControl, Heading, Select, TextArea, VStack, Text } from 'native-base'
import Rating from './Rating'
import Message from './Notifications/Message'
import Buttons from './Buttons'
import Colors from '../data/Colors';

export default function Review() {
  const [ratings, setRatings] = useState(""); 
  return (
    <Box my={9}>
        <Heading bold fontSize={15} mb={2}>
            REVIEW
        </Heading>

        {/* IF THERE IS NO REVIEW */}

        <Message 
                colorText={Colors.main} 
                bg={Colors.deepGray} 
                negrita="bold" 
                children={"NO REVIEW"}/>

        {/* REVIEW */}

        <Box p={3} bg={Colors.deepGray} mt={5} rounded={5}>
            <Heading fontSize={15} color="black">
                User Doe
            </Heading>
            <Rating value={4}/>
            <Text my={2} fontSize={11}> Jan 12 2022</Text>
            <Message 
                colorText="black" 
                bg="white" 
                size={10} 
                children={"NativeBase v1.x : NativeBase started out as an open source framework that enabled developers to build high-quality mobile apps using React Native."}/>
        </Box>

        {/*WRITE REVIEW*/}
        <Box mt={6}>
            <Heading fontSize={15} bold mb={4}>
                REVIEW THIS PRODUCT
            </Heading>
            <VStack space={6}>
                <FormControl>
                    <FormControl.Label
                    //  Estilos de texto 
                    _text={{
                        fontSize:"12px",
                        fontWeight:"bold",
                    }}>
                        Rating
                    </FormControl.Label>
                    <Select 
                        bg={Colors.subGreen}
                        borderWidth={0}
                        rounded={5}
                        py={3}
                        placeholder="Choose Rate"
                        _selectedItem={{
                            bg:Colors.subGreen,
                            endIcon: <CheckIcon size={5} />,
                        }}
                        selectedValue={ratings}
                        onValueChange={(e) => setRatings(e)}
                        
                    >
                        <Select.Item style={{justifyContent:"center", alignItems: "center"}} label="1 - Poor" value="1"/>
                        <Select.Item style={{justifyContent:"center", alignItems: "center"}} label="2 - Fair" value="2"/>
                        <Select.Item style={{justifyContent:"center", alignItems: "center"}} label="3 - Good" value="3"/>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormControl.Label
                    _text={{
                        fontSize:"12px",
                        fontWeight:"bold",
                    }}>
                        Comment
                    </FormControl.Label>
                    <TextArea
                        h={100}
                        w="full"
                        placeholder='This product is good .....'
                        borderWidth={0}
                        bg={Colors.subGreen}
                        py={4}
                    />
                </FormControl>
                <Buttons bg={Colors.main} color="white">
                    SUBMIT
                </Buttons>

                {/*IF NOT LOGIN*/}
                
                {/*<Message 
                colorText="white" 
                bg="black"  
                children={"Please 'Login' to write a review"}/>*/}

            </VStack>

        </Box>
        

    </Box>
  )
}