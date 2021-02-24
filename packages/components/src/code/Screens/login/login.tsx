import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import { connect } from 'react-redux'
import Api from '../../provider/api/Api'
import { configs } from '../../provider/api/ApiUrl'
import SideBar from '../../Component/SideBar'

const Login = (props: any) => {
  // const Login = ({ navigation }: { navigation: any }) => {

  // const {navigation,}
  const [login, setLogin] = useState({ username: '', password: '' })

  const onInputChange = (value: any, field: any) => {
    const data: any = { ...login }
    data[field] = value
    setLogin(data)
  }

  const onLoginPress = async () => {
    try {
      const body = {
        // "username": "paytm",
        // "password": "Interactive!23"
        username: login.username,
        password: login.password,
      }
      console.log('body', login)

      const res: any = await Api.post(configs.loginApi, body)
      console.log('login Api res', res)

      if (res.status === 200) {
        console.log('token', res.data.token)
        props.setToken(res.data.token)
        props.navigation.navigate('Dashboard')
      }
    } catch (error) {
      console.log('Login Api Error', error)
    }
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.container}>
        <Input
          placeholder="Enter Email"
          onChangeText={(value) => {
            onInputChange(value, 'username')
          }}
          leftIcon={<Icon name="user" size={24} color="black" />}
        />

        <Input
          onChangeText={(value) => {
            onInputChange(value, 'password')
          }}
          secureTextEntry
          placeholder="Enter Password"
          leftIcon={<Icon name="lock" size={24} color="black" />}
        />

        <TouchableOpacity
          onPress={() => {
            onLoginPress()
          }}
          style={[
            styles.modalButton,
            { backgroundColor: '#4d7be8', borderColor: '#4d7be8' },
          ]}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    setToken: (token: any) => {
      dispatch({ type: 'LOGIN_TOKEN', payload: token })
    },
  }
}

export default connect(null, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: '70%',
    borderWidth: 1,
    marginHorizontal: '25%',
    marginVertical: '10%',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: '2%',
    paddingVertical: '2%',
  },
  modalButton: {
    borderWidth: 1,
    // marginRight: '20%',
    marginHorizontal: '40%',
    marginVertical: '5%',
    alignContent: 'center',
    // padding: '10%',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    borderRadius: 4,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 13,
  },
})
