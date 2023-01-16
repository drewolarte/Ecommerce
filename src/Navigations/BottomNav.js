import React from 'react'
import { StyleSheet } from 'react-native'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { Center, Text } from 'native-base'
import HomeScreen from '../Screens/HomeScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import CartScreen from '../Screens/CartScreen'
import StackNav from './StackNav'
import { Entypo, AntDesign, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../data/Colors'


const Tab = createBottomTabNavigator();
const BottomNav = () => {
    return (
        <Tab.Navigator 
            backBehaviour="Main" 
            initialRouteName="Main" 
            screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {...styles.tab},
            headerShown: false,
            tabBarHideOnKeyBoard: true
        }}>
            <Tab.Screen name="Main" 
                component={StackNav} 
                options={{
                tabBarIcon: ({focused}) => (
                    <Center>
                        {focused ? (
                            <Entypo name="home" size={24} color={Colors.main} />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
                        )}
                    </Center>
                )
            }}>
            </Tab.Screen>
            {/* Cart */}
            <Tab.Screen name="Cart" 
                component={CartScreen} 
                options={{
                tabBarIcon: ({focused}) => (
                    <Center>
                        {focused ? (
                            <FontAwesome5 name="shopping-basket" size={24} color={Colors.main} />
                        ) : (
                            <MaterialCommunityIcons name="shopping-outline" size={24} color="black" />
                        )}
                    </Center>
                )
            }}>
            </Tab.Screen>
            {/* Profile */}
            <Tab.Screen name="Profile" 
                component={ProfileScreen} 
                options={{
                tabBarIcon: ({focused}) => (
                    <Center>
                        {focused ? (
                            <FontAwesome name="user" size={24} color={Colors.main} />
                        ) : (
                            <AntDesign name="user" size={24} color="black" />
                        )}
                    </Center>
                )
            }}>
            </Tab.Screen>
        </Tab.Navigator>
    );     
};

const styles = StyleSheet.create({
    tab:{
        elevation:0,
        backgroundColor: "white",
        height: 60,
    }
});

export default BottomNav