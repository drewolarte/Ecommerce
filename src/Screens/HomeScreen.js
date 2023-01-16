//rfce
import { Box } from 'native-base'
import React from 'react'
import HomeProducts from '../Components/HomeProducts'
import HomeSearch from '../Components/HomeSearch'
import Colors from '../data/Colors';

function HomeScreen() {
  return (
    <Box flex={1} bg={Colors.subGreen}>
        <HomeSearch/>
        <HomeProducts/>
    </Box>
  )
}

export default HomeScreen