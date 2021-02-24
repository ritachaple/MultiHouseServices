import React from 'react'
import { View, Text } from 'react-native'
import { Overlay, Tooltip } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const TooltipMessage = (props: any) => {
  const { message } = props
  return (
    <View style={{ flexDirection: 'row' }}>
      <Icon
        style={{ paddingHorizontal: 1, paddingTop: '1%' }}
        name="check-circle"
        size={10}
        color="#268748"
      />
      <Text
        numberOfLines={1}
        style={{ fontSize: 10, color: '#268748', fontWeight: 'bold' }}
      >
        {message}
      </Text>
    </View>
  )
}

export default TooltipMessage
