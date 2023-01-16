import React from 'react'
import { Center, Text } from 'native-base'

export default function Message({bg,colorText,children,size,negrita}) {
  return (
    <Center bg={bg} p={4} roundend={5}>
        <Text fontSize={size} style={{color:colorText, fontWeight:negrita}}>
            {children}
        </Text>
    </Center>
  )
}