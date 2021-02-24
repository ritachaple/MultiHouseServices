import React from 'react'
import { View, Text, TextInput } from 'react-native'

const InputField = (props: any) => {
  const {
    label,
    placeholder,
    onChangeText,
    defaultValue,
    secureTextEntry = false,
  } = props
  return (
    <View style={{ flex: 1, padding: '3%' }}>
      <Text>{label}</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 3,
          padding: '2%',
          width: '100%',
          // backgroundColor:
        }}
        secureTextEntry={secureTextEntry}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  )
}

export default InputField
