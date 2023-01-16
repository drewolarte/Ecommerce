import { Text } from 'native-base';
import React, { useState } from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Order from './Order';
import Profile from './Profile';
import Colors from '../../data/Colors';


const renderScene = SceneMap({
    first: Profile,
    second: Order,
});

export default function Tabs() {
    const layout = useWindowDimensions();
    const [index,setIndex] = useState(0);
    const [routes] = useState([
        {
            key: "first",
            title: "PERFIL",
        },
        {
            key: "second",
            title:"ORDENES",
        }
    ]);

    const renderTabsBar = (props) => (
        <TabBar 
            {...props}
            tabStyle={styles.tabStyle}
            indicatorStyle={{backgroundColor: "black"}}
            activeColor="#b80404"
            inactiveColor='white'
            renderLabel={({route, color}) => ( 
                <Text style={{color, ...styles.text}}>{route.title}</Text>
            )}
        />
    );
  return (
    <TabView 
        navigationState={{index,routes}} 
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={renderTabsBar}
        />
  );
}

const styles = StyleSheet.create({
    tabStyle: {
        backgroundColor: "black",
    },
    text: {
        fontSize: 13,
        fontWeight: "900",
    },
});