import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const IconButton = (props: any) => {
  return (
    <View>
      <Button
        onPress={props}
        style={{ height: '5%', paddingTop: '1%' }}
        icon={<Icon name={props} size={10} color="white" />}
      />
    </View>
  )
}

export default IconButton
