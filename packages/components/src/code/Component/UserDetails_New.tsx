import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

const UserData = () => {
  return (
    <View
      style={{
        // backgroundColor:"steelblue",
        flex: 1,
        padding: '1%',
      }}
    >
      <View>
        <InputField label="" placeholder="" />
        <InputField label="" placeholder="" />
      </View>
    </View>
  )
}

export default UserData

export const InputField = (props: any) => {
  const { label, placeholder } = props
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 3,
          padding: '0.5%',
          width: '30%',
          // backgroundColor:
        }}
        placeholder={placeholder}
      />
    </View>
  )
}
