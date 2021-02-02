import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const LeftComponent = (props: any) => {
  const { onSelectPress, isCheckboxSelect } = props
  return (
    <View style={{ flexDirection: 'row' }}>
      <Icon name="reorder" size={15} color="#000" />
      <View style={{ paddingLeft: '30%' }}>
        <Text style={[styles.appButtonText]}>
          {isCheckboxSelect ? 'Selected All' : 'Select All'}
        </Text>
        <Icon
          onPress={onSelectPress}
          style={{ alignSelf: 'center', paddingHorizontal: 2 }}
          name={isCheckboxSelect ? 'check-square-o' : 'square-o'}
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
