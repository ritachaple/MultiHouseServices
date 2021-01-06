import './GestureHandler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { CheckBox, Input, PricingCard } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

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
        title="Go to DetailsScreen test"
        onPress={() => props.navigation.navigate('Details')}
      />
      <Input placeholder="BASIC INPUT" />
      <Input
        placeholder="INPUT WITH ICON"
        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
      />
      <Input
        placeholder="INPUT WITH CUSTOM ICON"
        leftIcon={<Icon name="user" size={24} color="black" />}
      />
      <Input
        placeholder="Comment"
        leftIcon={{ type: 'font-awesome', name: 'comment' }}
        //  style={styles}
        //  onChangeText={value => )}
      />
      <Input
        placeholder="INPUT WITH ERROR MESSAGE"
        errorStyle={{ color: 'red' }}
        errorMessage="ENTER A VALID ERROR HERE"
      />
      <Input placeholder="Password" secureTextEntry />
      <PricingCard
        color="#4f9deb"
        title="Free"
        price="$0"
        info={['1 User', 'Basic Support', 'All Core Features']}
        button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
      />
      ;
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
