import './GestureHandler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from '../../Screens/dashboard/Dashboard'
import Login from '../../Screens/login/login'
import Default from '../../Default/Default'
// import Webview from '../../Screens/webview/Webview'
import Interaction from '../../Screens/Interaction/Interaction'
import ChatScreen from '../../Screens/Interaction/Chat'

const linking = {
  prefixes: [],
  config: {
    screens: {
      Login: 'Login',
      Dashboard: 'Dashboard',
      Interaction: 'Interaction',
      ChatScreen: 'ChatScreen',
      // Webview: 'Webview',
    },
  },
}

const Stack = createStackNavigator()
const Auth = createStackNavigator()

const AuthScreens = () => (
  <Auth.Navigator
    // initialRouteName="Login"
    headerMode="none"
    screenOptions={{ animationEnabled: true }}
  >
    <Auth.Screen name="Login" component={Login} />
  </Auth.Navigator>
)

const AppScreens = () => (
  // <Default >
  <Stack.Navigator
    initialRouteName="Interaction"
    headerMode="none"
    screenOptions={{ animationEnabled: true }}
  >
    {/* <Stack.Screen name="Login" component={Login} /> */}

    <Stack.Screen name="Interaction" component={Interaction} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
    {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
    {/* <Stack.Screen name="Webview" component={Webview} /> */}
  </Stack.Navigator>
  /* </Default>  */
)

const Navigation = (props: any) => {
  const { token } = props
  return (
    <NavigationContainer linking={linking}>
      {token === '' ? <AuthScreens /> : <AppScreens />}
      {/* <AuthScreens /> */}
    </NavigationContainer>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
  }
}
export default connect(mapStateToProps)(Navigation)
