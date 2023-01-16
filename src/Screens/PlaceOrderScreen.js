//rfce
import { Box, ScrollView, Heading } from 'native-base'
import React, { useEffect, useState } from 'react'
import OrderInfo from '../Components/OrderInfo'
import {FontAwesome, FontAwesome5, Ionicons} from '@expo/vector-icons' 
import OrderItem from '../Components/OrderItem'
import PlaceOrderModel from '../Components/PlaceOrderModel'
import Colors from '../data/Colors';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import database from '../config/Firebase';

function PlaceOrderScreen({route}) {
  const usuario = route.params;
  const user = global.user;
  const [usuarioDb, setUsarioDb] = useState([]);
  let nombre = "";
  let correo = ""

  let date = new Date()
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let fecha = day+"/"+month+"/"+year

  const direccion ={...usuario,fecha: fecha}

  useEffect(() => {
    const collectionRef = collection(database, "usuarios");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setUsarioDb(
        querySnapshot.docs.map(doc =>({
          id:doc.id,
          userName:doc.data().userName,
          email:doc.data().email,
          password:doc.data().password,
        }))
      )
    })
    return unsubscribe;
  },[]);

  usuarioDb.forEach((elemento) => {
    if(elemento.id===user){
      nombre = elemento.userName;
      correo = elemento.email;
    }
    
  })

  return (
    <Box bg={Colors.subGreen} flex={1} safeArea pt={6}>
      <Box>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          >
              <OrderInfo 
              title="CLIENTE"
              subTitle={nombre}
              text={correo}
              icon={<FontAwesome name="user" size={30} color="white" />}
              />
              <OrderInfo 
              title="DATOS DE ENTREGA"
              subTitle={usuario.ciudad}
              text={usuario.direccion}
              icon={<Ionicons name="location-sharp" size={30} color="white" />}
              />
              <OrderInfo 
              title="DATOS ADICIONALES"
              subTitle={usuario.telefono}
              text={fecha}
              icon={<FontAwesome name="send-o" size={30} color="white" />}
              />
        </ScrollView>
      </Box>
      {/* ORDER ITEM */}
      <Box px={6} flex={1} pb={3}>
        <Heading fontWeight="extrabold" fontSize={15} isTruncated my={4}>
          PRODUCTOS
        </Heading>
        <OrderItem />
        {/* TOTAL  */}
        <PlaceOrderModel dir={direccion}/>
      </Box>
    </Box>
  )
}

export default PlaceOrderScreen