//rfce
import { Box, ScrollView, Heading } from 'native-base'
import React from 'react'
import OrderInfo from '../Components/OrderInfo'
import { FontAwesome5, Ionicons} from '@expo/vector-icons' 
import OrderItem from '../Components/OrderItem'
import OrderModel from '../Components/OrderModel'
import Colors from '../data/Colors';

function OrderScreen() {
  return (
    <Box bg={Colors.subGreen} flex={1} safeArea pt={6}>
      <Box>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          >
              <OrderInfo 
              title="SHIPPING INFO"
              success
              subTitle="Shipping: Tanzania"
              text="Pay Method: PayPal"
              icon={<FontAwesome5 name="shipping-fast" size={30} color="white" />}
              />
              <OrderInfo 
              title="DELIVER TO"
              danger
              subTitle="Address:"
              text="Arusha Tz, Ngaramtoni Crater, P.O BOX 1234"
              icon={<Ionicons name="location-sharp" size={30} color="white" />}
              />
        </ScrollView>
      </Box>
      {/* ORDER ITEM */}
      <Box px={6} flex={1} pb={3}>
        <Heading bold fontSize={15} isTruncated my={4}>
          PRODUCTS
        </Heading>
        <OrderItem />
        {/* TOTAL  */}
        <OrderModel />
      </Box>
    </Box>
  )
}

export default OrderScreen