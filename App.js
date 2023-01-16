import { NativeBaseProvider, StatusBar } from "native-base";
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/Screens/LoginScreen'
import RegisterScreen from './src/Screens/RegisterScreen'
import OrderScreen from './src/Screens/OrderScreen'
import BottomNav from './src/Navigations/BottomNav'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import database from "../ecommerce/src/config/Firebase";
import {useState,useEffect} from 'react';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Stack = createNativeStackNavigator();

export default function App() {

  const [products, setProducts] = useState([]);
  

  useEffect(() => {
      const collectionRef = collection(database, 'productos');
      const q = query(collectionRef);
      const unsubscribe = onSnapshot(q, querySnapshot => {
        setProducts(
          querySnapshot.docs.map(doc =>({
            id:doc.id,
            zapatos:doc.data().Zapatos,
            camisetas:doc.data().Camisetas,
            accesorios:doc.data().Accesorios,
          }))
        )
      })
      return unsubscribe;
  },[]);

  return (
    
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
            <Stack.Screen name="Bottom" component={BottomNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}