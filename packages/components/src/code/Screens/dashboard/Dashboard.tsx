import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import GoBack from '../../Component/GoBack'
import SearchComplaints from '../../Component/SearchComponent'

const Dashboard = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      {/* <Text>Dashboard</Text> */}
      <SearchComplaints />
      <GoBack navigation={navigation} />
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
