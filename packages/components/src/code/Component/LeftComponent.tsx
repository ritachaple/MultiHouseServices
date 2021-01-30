import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const LeftComponent = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Icon name="reorder" size={15} color="#000" />
      <View style={{ paddingLeft: '30%' }}>
        <Text style={[styles.appButtonText]}>Select All</Text>
        <Icon
          style={{ alignSelf: 'center', paddingHorizontal: 2 }}
          name="square-o"
          size={10}
          color="#000"
        />
      </View>
    </View>
  )
}

export default LeftComponent

const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 10,
    alignSelf: 'center',
    color: '#000',
  },
})
