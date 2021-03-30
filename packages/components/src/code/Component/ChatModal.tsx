import React, { useState } from 'react'
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Divider } from 'react-native-elements'

// @ts-ignore
import { Editor } from 'react-draft-wysiwyg'
// @ts-ignore
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const bodercolor = '#acb3bf'

const ChatModal = (props: any) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  // const onCancel = { props }

  const onEditorStateChange = () => {}

  return (
    <View
      style={{
        width: '72%',
        height: '35%',
        backgroundColor: '#fff',
        borderRadius: 8,
        // marginHorizontal: '10%',
        marginRight: '10%',
        marginLeft: '7%',
        marginTop: '25%',
        // marginTop: '28%',
        borderWidth: 1,
        borderColor: '#D6D9E6',
      }}
    >
      <View
        style={{
          backgroundColor: '#F1F6FF',
          flexDirection: 'row',
          paddingVertical: '1%',
          borderTopLeftRadius: 8,
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
          <Text>Forward</Text>
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
        {/* <TouchableOpacity
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
          <Text style={[styles.textStyle, { color: '#fff' }]}>Forward</Text>
          <Entypo name="chevron-down" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            // styles.buttonStyle
            {
              flexDirection: 'row',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: 'blue',
              width: '10%',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '1%',
            },
          ]}
          onPress={() => props.onCancel()}
        >
          <Text style={[styles.textStyle]}>Cancel</Text>
        </TouchableOpacity> */}
        <View
          style={{
            marginLeft: '1%',
            flexDirection: 'row',
            borderRightWidth: 2,
            justifyContent: 'space-evenly',
            // flex: 6,
          }}
        >
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />

          {/* <TouchableOpacity>
            <MaterialCommunityIcons
              name="message-text-outline"
              size={20}
              color="#000"
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity>
            <Ionicons name="attach" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="smile" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="star-half-o" size={20} color="#000" />
          </TouchableOpacity> */}
        </View>

        {/* <View
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
            <Text>Verdana</Text>
            <Entypo name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Text>13</Text> 
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


        </View> */}
        {/* <View
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
        </View> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    paddingVertical: '1%',
    paddingHorizontal: '5%',
    borderRadius: 25,
  },
  textStyle: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    lineHeight: 28,
  },
})
export default ChatModal
