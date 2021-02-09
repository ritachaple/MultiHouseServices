import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Toggle2 = () => {
  const [active, setActive] = useState(false)
  const Press = () => {
    setActive(!active)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          height: 20,
          width: 40,
          borderWidth: 1,
          borderRadius: 30,
          overflow: 'hidden',
        }}
      >
        <TouchableOpacity
          onPress={() => Press()}
          style={{
            height: 20,
            width: 20,
            alignContent: 'center',
            paddingVertical: '5%',
            // backgroundColor:active?"red":"green",
            backgroundColor: '#acb3bf',
            alignItems: 'center',
            justifyContent: 'center',
            left: active ? 20 : 0,
          }}
        >
          {/* <Text style={{fontSize:22,color:"#FFF"}}>{active?"OFF":"ON"}</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Toggle2
