import React from 'react'
import { View, Text } from 'react-native'

export const Interaction2Edit = (props: any) => {
  const { list, onSelectedItem } = props

  return (
    <View>
      <select
        className="dropdown-input"
        onChange={(val) => {
          onSelectedItem(val.target.value)
        }}
      >
        {list !== undefined &&
          list.length > 0 &&
          list.map((item: any) => <option>{item.text}</option>)}
      </select>
    </View>
  )
}
