import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const IconButton = (props: any) => {
  const { onPress, name } = props
  return (
    <View>
      <Button
        onPress={onPress}
        style={{ height: '5%', paddingTop: '1%' }}
        icon={<Icon name={name} size={10} color="white" />}
      />
    </View>
  )
}

export default IconButton
