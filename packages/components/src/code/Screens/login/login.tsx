import React, { useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import Api from '../../provider/api/Api'

const Login = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    // getApi();
    // postApi();
  })

  const postApi = async () => {
    const data = {
      name: 'paul rudd',
      movies: ['I Love You Man', 'Role Models'],
    }
    console.log('postApi')
    const res = await Api.post('https://reqres.in/api/users', data)
    console.log('res', res)
  }
  // const getApi=async()=>{
  //     console.log('getApi');
  // const res = await Api.get('https://jsonplaceholder.typicode.com/todos/1')
  //   console.log("res",res)
  // }

  return (
    <View>
      <Input
        placeholder="INPUT WITH CUSTOM ICON"
        leftIcon={<Icon name="user" size={24} color="black" />}
      />

      <Input
        placeholder="Comment"
        leftIcon={{ type: 'font-awesome', name: 'comment' }}
        style={styles}
        //  onChangeText={value => this.setState({ comment: value })}
      />

      <Input
        placeholder="INPUT WITH ERROR MESSAGE"
        errorStyle={{ color: 'red' }}
        errorMessage="ENTER A VALID ERROR HERE"
      />

      {/* <Input placeholder="Password" secureTextEntry={true} /> */}

      {/* <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
      /> */}
    </View>
  )
}
const styles = StyleSheet.create({})

export default Login
