import './GestureHandler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from '../../Screens/dashboard/Dashboard'
import Login from '../../Screens/login/login'
import Webview from '../../Screens/webview/Webview'

const linking = {
  prefixes: [],
  config: {
    screens: {
      Login: 'Login',
      Dashboard: 'Dashboard',
      Webview: 'Webview',
    },
  },
}

const Stack = createStackNavigator()

const Navigation = (props: any) => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Login"
        headerMode="none"
        screenOptions={{ animationEnabled: true }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Webview" component={Webview} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation
