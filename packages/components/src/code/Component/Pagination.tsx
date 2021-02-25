import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Pagination = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '30%',
          backgroundColor: 'pink',
          justifyContent: 'space-around',
        }}
      >
        <View>
          <Text>Rows Per Page</Text>
        </View>
        <View>
          <Text>1</Text>
        </View>
        <View>
          <Text>1</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    paddingHorizontal: '3%',
    paddingVertical: '1%',
  },
})
export default Pagination
