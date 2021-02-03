import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const RightComponent = (props: any) => {
  const { onFilterPress } = props
  return (
    <View style={{ flexDirection: 'row' }}>
      <Icon
        onPress={onFilterPress}
        style={{ paddingHorizontal: 10 }}
        name="filter"
        size={15}
        color="#000"
      />
      <Icon
        style={{ paddingRight: 20 }}
        name="ellipsis-h"
        size={15}
        color="#000"
      />
    </View>
  )
}

export default RightComponent

const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 10,
    alignSelf: 'center',
    color: '#000',
  },
})
