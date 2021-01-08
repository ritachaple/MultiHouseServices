import React from 'react'
import { View, Button, StyleSheet } from 'react-native'

const GoBack = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.goBack}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  goBack: {
    padding: 1,
  },
})
export default GoBack
