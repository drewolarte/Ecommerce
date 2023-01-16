//rfce
import { Center, Heading, Image, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import Tabs from '../Components/Profile/Tabs'
import Colors from '../data/Colors';
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import database from '../config/Firebase';

function ProfileScreen() {

  const user = global.user;
  const [usuarioDb, setUsarioDb] = useState([]);
  const usuario = "usuarios/"+user;
  let nombre = "";
  let correo = ""

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

  return (
    <>
        <Center bg={Colors.main} pt={10} pb={6}>
          <Image source={{uri:"https://cdn-icons-png.flaticon.com/512/668/668709.png"}}
           alt="profile"
           w={24}
           h={24}
           resizeMode="cover" />
          <Heading bold fontSize={15} isTruncated my={2} color="white">
            {usuarioDb.forEach((elemento) => {
              if(elemento.id===user){
                nombre = elemento.userName;
              }
              
            })}
            {nombre}
          </Heading>
          <Text italic fontSize={10} color="white">
            {usuarioDb.forEach((elemento) => {
              if(elemento.id===user){
                correo = elemento.email;
              }
            })}
            {correo}
          </Text>
        </Center>
        {/* TABS  */}
        <Tabs />
    </>
  )
}

export default ProfileScreen