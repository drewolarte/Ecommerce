import { Box, Button, FlatList, HStack, ScrollView, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Pressable } from 'react-native'
import Colors from '../../data/Colors';
import { collection, onSnapshot, query, addDoc, deleteDoc, doc } from 'firebase/firestore';
import database from '../../config/Firebase';

export default function Order() {
    const [usuarioDb, setUsarioDb] = useState([]);
    const user = global.user;

    useEffect(() => {
        const url = "usuarios/"+user+"/historial"
        const collectionRef = collection(database, url);
        const q = query(collectionRef);
        const unsubscribe = onSnapshot(q, querySnapshot => {
          setUsarioDb(
            querySnapshot.docs.map(doc =>({
                docu: doc.id,
                total: doc.data().total,
                direccion: doc.data().direccion,
                ciudad: doc.data().ciudad,
                telefono: doc.data().telefono,
                fecha: doc.data().fecha,
            }))
          )
        })
        return unsubscribe;
      },[]);
      
  return (
    <Box h="full" bg="white" pt={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList 
        showsVerticalScrollIndicator={false}
        data={usuarioDb}
        keyExtractor={(item) => item.docu}
        renderItem={({item}) => (
            <Pressable>
                <HStack
                    space={4}
                    justifyContent="space-between"
                    alignItems="center"
                    bg={Colors.subGreen}
                    py={5}
                    px={2}>
                        <Text fontSize={9} color={Colors.blue} isTruncated marginLeft={5}>
                            {item.docu.slice(10)}
                        </Text>
                        <Text fontSize={12} bold color="black" isTruncated>
                            PAGADO
                        </Text>
                        <Text fontSize={11} italic color="black" isTruncated>
                            {item.fecha}
                        </Text>
                        <Button
                            px={7}
                            py={1.5}
                            rounded={50}
                            bg={Colors.main}
                            _text={{
                                color: "white",
                            }}
                            _pressed={{
                                bg: Colors.main,
                            }}>
                                {"$"+item.total}
                        </Button>
                </HStack>
            </Pressable>
        )}/>
            
        </ScrollView>
    </Box>
  )
}