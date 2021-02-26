import React from 'react'
import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        height: '6%',
        padding: '0.5%',
        paddingRight: '3%',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: '2%',
          borderRightWidth: 2,
          borderRightColor: 'black',
        }}
      >
        <Icon
          style={{ paddingHorizontal: '10%' }}
          name="logo-dribbble"
          size={20}
        />
        <Text style={{ fontSize: 16 }}>UnoBot</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: '2%',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <Text style={{ fontWeight: '700' }}>All Tickets</Text>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 15,
            width: '25%',
          }}
        >
          <Icon style={{ padding: '2%' }} name="search" size={15} />
          <TextInput placeholder="Search Messages..." />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <AntDesign
            style={{ padding: '10%' }}
            name="questioncircleo"
            size={16}
          />
          <FontAwesome style={{ padding: '10%' }} name="bell-o" size={16} />
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              style={{ padding: '10%' }}
              name="user-circle"
              size={25}
            />
            <FontAwesome
              style={{ padding: '18%', paddingLeft: 0 }}
              name="angle-down"
              size={18}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Header
