import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from '../Screens/HomeScreen'
import SingleProductScreen from '../Screens/SingleProductScreen'
import ShippingScreen from '../Screens/ShippingScreen'
import PaymentScreen from '../Screens/PaymentScreen'
import PlaceOrderScreen from '../Screens/PlaceOrderScreen'
import HomeMenProducts from '../Screens/HomeMenScreen'
import HomeWomenProducts from '../Screens/HomeWomenScreen'
import HomeChildrenProducts from '../Screens/HomeChildrenScreen'
import ProfileScreen from '../Screens/ProfileScreen'

const Stack = createNativeStackNavigator();
const StackNav = () => {
    return (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="HomeWomen" component={HomeWomenProducts} />
            <Stack.Screen name="HomeMen" component={HomeMenProducts} />
            <Stack.Screen name="HomeChildren" component={HomeChildrenProducts} />
            <Stack.Screen name="Single" component={SingleProductScreen} />
            <Stack.Screen name="Shipping" component={ShippingScreen} />
            <Stack.Screen name="Checkout" component={PaymentScreen} />
            <Stack.Screen name="PlaceOrder" component={PlaceOrderScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default StackNav;