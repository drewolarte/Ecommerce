import { Button } from 'native-base'
import React from 'react'

function Buttons({mt,bg,color,children,onPress}) {
  return (
    <Button
        width="full"
        height={55}
        mt={mt}
        rounded="full"
        bg={bg}
        _text={{
            color: color,
            fontWeight: "bold"
        }}
        _pressed={{bg:bg}}
        onPress={onPress}>
            {children}
    </Button>
  )
}

export default Buttons