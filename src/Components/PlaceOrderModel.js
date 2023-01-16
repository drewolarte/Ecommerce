import { useNavigation } from '@react-navigation/native'
import { Box, Center, HStack, Modal, Text, VStack, Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import Buttons from '../Components/Buttons'
import Colors from '../data/Colors';
import { collection, onSnapshot, query, addDoc, deleteDoc, doc } from 'firebase/firestore';
import database from '../config/Firebase';
import { async } from '@firebase/util';
import { Alert } from 'react-native';

export default function PlaceOrderModel({dir}) {
  const navigation = useNavigation();
  const [usuarioDb, setUsarioDb] = useState([]);
  const user = global.user;
  const [showModel,setShowModel] = useState(false);
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

  const impuesto=total*0.19
  const subtotal=total-impuesto

  const historial = {...dir,productos:usuarioDb,total:total}

  async function onSend(error) {
    try {
      const url = "usuarios/"+user+"/historial"
      await addDoc(collection(database, url), historial);
      Alert.alert("Compra realizada satisfactoriamente.");
    } catch (error) {
    }
  }

  const OrdersInfos = [
    {
        title: "Subtotal",
        price: subtotal,
        color: "black",
    },
    {
        title: "IVA (19%)",
        price: impuesto,
        color: "black",
    },
    {
        title: "Total",
        price: total,
        color: Colors.main,
    },
]
  return (
    <Center>
        <Buttons
            onPress={() => setShowModel(true)}
            bg="black"
            color="white"
            mt={5}
            >
                MOSTRAR TOTAL
        </Buttons>
        <Modal isOpen={showModel} onClose={() => setShowModel(false)} size="lg">
            <Modal.Content maxWidth={350}>
                <Modal.CloseButton />
                <Modal.Header>Orden</Modal.Header>
                <Modal.Body>
                    <VStack space={7}>
                        {OrdersInfos.map((i,index) => (
                            <HStack alignItems="center" justifyContent="space-between" key={index}>
                                <Text fontWeight="medium">{i.title}</Text>
                                <Text color={i.color === Colors.main ? Colors.main : "black"} bold>${i.price}</Text>
                            </HStack>
                        ))}
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        flex={1}
                        bg={Colors.main}
                        h={45}
                        _text={{
                            color:"white"
                        }}
                        onPress={() =>{
                            onSend();
                            const url = "usuarios/"+user+"/carrito"
                            usuarioDb.forEach((producto) => {
                                const docRef = doc(database, url, producto.docu);
                                deleteDoc(docRef);
                              })
                            navigation.navigate("Profile");
                            setShowModel(false);
                        }} 
                        _pressed={{
                            bg: Colors.main
                        }}
                        >
                            REALIZAR ORDEN
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>
  )
}