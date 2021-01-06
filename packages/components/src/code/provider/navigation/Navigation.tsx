import './GestureHandler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

const linking = {
  prefixes: [],
  config: {
    screens: {
      Login: 'Login',
      Dashboard: 'Dashboard',
    },
  },
}

const HomeScreen = (props: any) => {
  return (
    <View>
      <Text>Login</Text>
      <Button
        title="Go to DetailsScreen"
        onPress={() => props.navigation.navigate('Details')}
      />
    </View>
  )
}

const DetailsScreen = (props: any) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => props.navigation.navigate('Login')}
      />
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  )
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
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation
