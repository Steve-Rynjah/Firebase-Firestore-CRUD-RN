import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {DisplayScreen} from './src/screen/Display.screen'
import {AddScreen} from './src/screen/Add.screen'
import {ListItemView} from './src/components/listItem.component'

const Stack = createStackNavigator()

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DISPLAY" component={DisplayScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ADD" component={AddScreen} options={{headerShown: false}}/>
        <Stack.Screen name="LIST" component={ListItemView} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}