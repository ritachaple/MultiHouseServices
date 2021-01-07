import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
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
      <Text>Login</Text>
      <Button
        title="Go to Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
      />
    </View>
  )
}

export default Login
