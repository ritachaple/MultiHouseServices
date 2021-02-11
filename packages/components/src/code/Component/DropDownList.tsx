import React from 'react'
import { View, Text, ScrollView } from 'react-native'

const DropDownList = (props: any) => {
  const { children } = props
  console.log('dropdown props', props)

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '50%',
        marginHorizontal: '40%',
        marginTop: '33%',
        marginBottom: 0,
        alignSelf: 'center',
        elevation: 8,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          // borderRadius: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <ScrollView>{children}</ScrollView>
      </View>
    </View>
  )
}

export default DropDownList
