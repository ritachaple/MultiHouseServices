import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const LeftSideBar = () => {
  return (
    <View
      style={{
        width: '5%',
        backgroundColor: '#1a2857',
        paddingHorizontal: '1%',
        paddingVertical: '1%',
        flexDirection: 'column',
        // flex:1
      }}
    >
      <View style={{ alignSelf: 'center', paddingTop: '10%' }}>
        <Icon
          // onPress={onFilterPress}
          style={{ alignSelf: 'center' }}
          name="building-o"
          size={20}
          color="#fff"
        />
        <Text style={{ color: '#fff', fontSize: 12 }}>Dashboard</Text>
      </View>

      <View style={{ alignSelf: 'center', paddingTop: '40%' }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 30,
            paddingVertical: '12%',
            paddingHorizontal: '15%',
            alignSelf: 'center',
          }}
        >
          <Icon
            // onPress={onFilterPress}
            style={{ alignSelf: 'center' }}
            name="wpforms"
            size={20}
            color="#000"
          />
        </View>
        <Text style={{ color: '#fff', fontSize: 12 }}>Interaction</Text>
      </View>

      <View style={{ alignSelf: 'center', paddingTop: '40%' }}>
        <Icon
          // onPress={onFilterPress}
          style={{ alignSelf: 'center' }}
          name="file-text-o"
          size={20}
          color="#fff"
        />
        <Text style={{ color: '#fff', fontSize: 12 }}>Reports</Text>
      </View>

      <View style={{ alignSelf: 'center', paddingTop: '40%' }}>
        <Icon
          // onPress={onFilterPress}
          style={{ alignSelf: 'center' }}
          name="object-ungroup"
          size={20}
          color="#fff"
        />
        <Text style={{ color: '#fff', fontSize: 12 }}>Channels</Text>
      </View>
    </View>
  )
}

export default LeftSideBar
