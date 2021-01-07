import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import SearchComplaints from '../Component/SearchComponent'

const Dashboard = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* <Text>Dashboard</Text> */}
      <SearchComplaints />
      {/* <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        /> */}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '2%',
  },
})

export default Dashboard
