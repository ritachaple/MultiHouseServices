import React from 'react'
import { View, Modal, TouchableOpacity, Text, TextInput } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Divider } from 'react-native-elements'

const bodercolor = '#acb3bf'

const ChatModal = () => {
  return (
    <View
      style={{
        width: '80%',
        height: '35%',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: '2%',
      }}
    >
      <View
        style={{
          backgroundColor: 'lightgray',
          flexDirection: 'row',
          paddingVertical: '1%',
          borderTopLeftRadius: 10,
          borderTopEndRadius: 10,
          flex: 1,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderRightWidth: 1,
            borderRightColor: '#000',
            paddingHorizontal: '1%',
          }}
        >
          <Text>Forward to</Text>
          <Entypo name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>
        <View
          style={{ flexDirection: 'row', flex: 0.9, paddingHorizontal: '1%' }}
        >
          <Text>To:</Text>
          <TextInput
            style={{ paddingHorizontal: '1%', flex: 1 }}
            placeholder="type your group name or comma saperated email ID"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 0.15,
            justifyContent: 'space-evenly',
          }}
        >
          <TouchableOpacity>
            <Text>Cc</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Bcc</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Subject</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider style={{ backgroundColor: bodercolor }} />
      <View style={{ flex: 8 }} />
      <Divider style={{ backgroundColor: bodercolor }} />
      <View style={{ flex: 1, paddingVertical: '1%', flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderRadius: 20,
            backgroundColor: 'blue',
            width: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '1%',
          }}
        >
          <Text style={{ color: '#fff' }}>Forward</Text>
          <Entypo name="chevron-down" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'blue',
            width: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '1%',
          }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
        <View
          style={{
            marginLeft: '1%',
            flexDirection: 'row',
            borderRightWidth: 2,
            justifyContent: 'space-evenly',
            flex: 2,
          }}
        >
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="message-text-outline"
              size={20}
              color="#000"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="attach" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="smile" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="star-half-o" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 4,
            justifyContent: 'space-evenly',
          }}
        >
          <TouchableOpacity>
            <Foundation name="bold" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Foundation name="italic" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Foundation name="underline" size={25} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text>Verdana</Text> {/* font family */}
            <Entypo name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text>13</Text> {/* font size */}
            <Entypo name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text style={{ textDecorationLine: 'underline' }}>A</Text>
            <Entypo name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="list-ul" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="list-ol" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="insert-link" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: 'row', flex: 4, justifyContent: 'flex-end' }}
        >
          <Text style={{ paddingHorizontal: '5%' }}>Draft Saved!</Text>
          <TouchableOpacity
            style={{ paddingHorizontal: '5%', borderLeftWidth: 2 }}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
export default ChatModal
