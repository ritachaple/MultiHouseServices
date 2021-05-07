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
import { connect } from 'react-redux'

// @ts-ignore
import { EditorState, Modifier, convertToRaw, ContentState } from 'draft-js'
// @ts-ignore
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// @ts-ignore
import draftToHtml from 'draftjs-to-html'
// @ts-ignore
import htmlToDraft from 'html-to-draftjs'
import { ValidateNotification } from './ValidationMsg'

const bodercolor = '#acb3bf'

// const inlineToolbarPlugin = createInlineToolbarPlugin({
//   structure: [props: any => <MyButton {...props} createComment={(text: any) => alert(text)} />]
// });

const ChatModal = (props: any) => {
  const { onCancel, onForwardPress, filterDetails } = props

  const html = '<p></p>'
  // const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>'
  const contentBlock = htmlToDraft(html)
  let editorStat
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
    )
    editorStat = EditorState.createWithContent(contentState)
  } else {
    editorStat = null
  }
  const [editorState, seteditorState] = useState(editorStat)
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('Enter msg')
  const [openValidationMsg, setOpenValidationMsg] = useState(false)

  const onEditorStateChange = (value: any) => {
    seteditorState(value)
  }

  const editorLabels = {
    // Generic
    'generic.add': 'Add',
    'generic.cancel': 'Cancel',
    // Emoji
    'components.controls.emoji.emoji': 'Emoji',
    // BlockType
    // 'components.controls.blocktype.h1': 'Heading 1',
    'components.controls.blocktype.h2': 'Heading 2',
    'components.controls.blocktype.h3': 'Heading 3',
    'components.controls.blocktype.h4': 'Heading 4',
    'components.controls.blocktype.h5': 'Heading 5',
    'components.controls.blocktype.h6': 'Heading 6',
    'components.controls.blocktype.blockquote': 'Blockquote',
    'components.controls.blocktype.code': 'Code',
    'components.controls.blocktype.blocktype': 'Block Type',
    'components.controls.blocktype.normal': 'Normal',

    // Color Picker
    'components.controls.colorpicker.colorpicker': 'Color Picker',
    'components.controls.colorpicker.text': 'Text',
    'components.controls.colorpicker.background': 'Highlight',

    // Embedded
    'components.controls.embedded.embedded': 'Embedded',
    'components.controls.embedded.embeddedlink': 'Embedded Link',
    'components.controls.embedded.enterlink': 'Enter link',

    // FontFamily
    'components.controls.fontfamily.fontfamily': 'Font',

    // FontSize
    'components.controls.fontsize.fontsize': 'Font Size',

    // History
    'components.controls.history.history': 'History',
    'components.controls.history.undo': 'Undo',
    'components.controls.history.redo': 'Redo',

    // Image
    'components.controls.image.image': 'Image',
    'components.controls.image.fileUpload': 'File Upload',
    'components.controls.image.byURL': 'URL',
    'components.controls.image.dropFileText':
      'Drop the file or click to upload',

    // Inline
    'components.controls.inline.bold': 'Bold',
    'components.controls.inline.italic': 'Italic',
    'components.controls.inline.underline': 'Underline',
    'components.controls.inline.strikethrough': 'Strikethrough',
    'components.controls.inline.monospace': 'Monospace',
    'components.controls.inline.superscript': 'Superscript',
    'components.controls.inline.subscript': 'Subscript',

    // Link
    'components.controls.link.linkTitle': 'Link Title',
    'components.controls.link.linkTarget': 'Link Target',
    'components.controls.link.linkTargetOption': 'Open link in new window',
    'components.controls.link.link': 'Link',
    'components.controls.link.unlink': 'Unlink',

    // List
    'components.controls.list.list': 'List',
    'components.controls.list.unordered': 'Unordered',
    'components.controls.list.ordered': 'Ordered',
    'components.controls.list.indent': 'Indent',
    'components.controls.list.outdent': 'Outdent',

    // Remove
    'components.controls.remove.remove': 'Remove',

    // TextAlign
    'components.controls.textalign.textalign': 'Text Align',
    'components.controls.textalign.left': 'Left',
    'components.controls.textalign.center': 'Center',
    'components.controls.textalign.right': 'Right',
    'components.controls.textalign.justify': 'Justify',
  }

  const toolbar = {
    options: ['inline', 'link', 'embedded', 'image', 'remove', 'history'],
    inline: {
      options: ['bold', 'italic', 'underline'],
      className: 'editor-opacity',
    },
    link: { className: 'editor-opacity' },
    embedded: { className: 'editor-opacity' },
    image: { className: 'editor-opacity' },
    remove: { className: 'editor-opacity' },
    history: { className: 'editor-opacity' },
  }

  const hideValidationMsg = () => {
    setOpenValidationMsg(false)
  }

  const CancelButton = () => {
    return (
      <View>
        <TouchableOpacity
          style={{
            // flexDirection: 'row',
            borderRadius: 20,
            backgroundColor: '#fff',
            width: '160%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: '2%',
            position: 'relative',
            left: '60%',
            borderColor: '#001163',
            borderWidth: 1,
            // marginLeft: '1%',
          }}
          onPress={onCancel}
        >
          <Text style={[styles.textStyle, { color: '#5A607F' }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const SubmitButton = () => {
    const validationError = (mssg: string) => {
      setMsg(mssg)
      setOpenValidationMsg(true)
    }

    const checkFilterFields = () => {
      // filterDetails.OMC && filterDetails.Priority && filterDetails.SBU
      if (!filterDetails.OMC) {
        props.setChatOMC()
      }
      if (!filterDetails.Priority) {
        props.setChatPriority()
      }
      if (!filterDetails.SBU) {
        props.setChatSBU()
      }
    }

    function validateEmail(mailId: any) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(mailId)
    }

    const forwardMail = () => {
      // const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (email !== undefined) {
        if (validateEmail(email)) {
          if (
            filterDetails &&
            filterDetails.OMC &&
            filterDetails.Priority &&
            filterDetails.SBU
          ) {
            props.onForwardPress()
          } else {
            checkFilterFields()
            validationError('Please select required fields')
          }
        } else {
          validationError('Please enter a valid email address')
        }
      } else {
        validationError('Please enter a valid email address')
      }
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginRight: '10%' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderRadius: 20,
              backgroundColor: '#001163',
              width: '130%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: '2%',
              // marginLeft: '1%',
            }}
            onPress={forwardMail}
          >
            <Text style={[styles.textStyle, { color: '#fff' }]}>Forward</Text>
            <Entypo
              style={{ paddingLeft: '5%' }}
              name="chevron-down"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const onInputChange = (value: any) => {
    setEmail(value)
    props.onSetEmail(value)
  }

  return (
    <View
      style={{
        width: '72%',
        height: '35%',
        backgroundColor: '#FFF8F8',
        borderRadius: 8,
        // marginHorizontal: '10%',
        marginRight: '10%',
        marginLeft: '7%',
        // marginTop: '10%',
        marginTop: '28%',
        borderWidth: 1,
        borderColor: '#D6D6D6',
      }}
    >
      <View
        style={{
          backgroundColor: '#F1F6FF',
          flexDirection: 'row',
          // paddingTop: '1%',
          // paddingBottom: '1%',
          paddingVertical: '2%',
          // borderTopLeftRadius: 8,
          borderTopEndRadius: 8,
          alignContent: 'center',
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            // borderRightWidth: 1,
            // borderRightColor: '#000',
            paddingHorizontal: '1%',
          }}
        >
          <Text style={[styles.textStyle, { alignSelf: 'center' }]}>
            Forward
          </Text>
          <Entypo
            style={{ paddingTop: '5%', alignSelf: 'center' }}
            name="chevron-down"
            size={15}
            color="#585353"
          />
        </View>
        <View
          style={{ flexDirection: 'row', flex: 0.9, paddingHorizontal: '1%' }}
        >
          <Text style={[styles.textStyle, { alignSelf: 'center' }]}>To:</Text>
          <TextInput
            style={[
              styles.textStyle,
              {
                paddingHorizontal: '1%',
                alignSelf: 'center',
                flex: 1,
                height: 20,
              },
            ]}
            placeholder="type your group name or comma saperated email ID"
            placeholderTextColor="#A8A8A8"
            onChangeText={(value) => {
              onInputChange(value)
            }}
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
      {/* <Divider style={{ backgroundColor: bodercolor }} /> */}

      <View
      // style={{ flexDirection: "row" }}
      >
        {/* <View>Submit</View> */}
        <div className="editor">
          <Editor
            toolbarClassName="toolbarClass"
            editorState={editorState}
            onEditorStateChange={(value: any) => onEditorStateChange(value)}
            wrapperClassName="wrapperClass"
            editorClassName="editorClass"
            localization={{
              locale: 'ko',
              translations: editorLabels,
            }}
            toolbarCustomButtons={[<SubmitButton />, <CancelButton />]}
            // toolbarCustomButtons={[<MyButton />]}
            toolbar={toolbar}
          />
          {/* <MyButton /> */}
        </div>
      </View>
      {openValidationMsg && (
        <ValidateNotification
          message={msg}
          validationMsg={hideValidationMsg}
          displayMsg={openValidationMsg}
          customeStyle={{ width: '35%' }}
        />
      )}
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    filterDetails: state.Filter.chatScreenFilter,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setChatOMC: () => {
      dispatch({ type: 'CHAT_OMC_FILTER' })
    },
    setChatPriority: () => {
      dispatch({ type: 'CHAT_PRIORITY_FILTER' })
    },
    setChatSBU: () => {
      dispatch({ type: 'CHAT_SBU_FILTER' })
    },
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatModal)
