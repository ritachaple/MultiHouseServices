import React from 'react'
import { View, Text } from 'react-native'
import IconButton from './IconButton'

const SelectIcon = () => {
  const onEditClick = () => {}

  return (
    <View style={{ paddingLeft: '8%', flexDirection: 'row' }}>
      <View>
        <IconButton
          name="pencil"
          onPress={() => {
            onEditClick()
          }}
        />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="share" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="trash" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="hand-paper-o" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="chain" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="envelope-open-o" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="ban" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="archive" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="lastfm" />
      </View>
    </View>
  )
}

export default SelectIcon
