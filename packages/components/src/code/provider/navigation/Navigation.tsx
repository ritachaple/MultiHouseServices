import './GestureHandler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from '../../screens/dashboard/Dashboard'
import Login from '../../screens/login/login'

const linking = {
  prefixes: [],
  config: {
    screens: {
      Login: 'Login',
      Dashboard: 'Dashboard',
    },
  },
}

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Login"
        headerMode="none"
        screenOptions={{ animationEnabled: true }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation
