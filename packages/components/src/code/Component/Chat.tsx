import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Modal,
} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Overlay, Divider, Input } from 'react-native-elements'
import { Hoverable } from 'react-native-web-hover'
import { connect } from 'react-redux'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import Toggle2 from './ToggleButton'
import DropDownList from './DropDownList'
import ChatModal from './ChatModal'

// const Chat = (complaintId: any) => {
const Chat = (props: any) => {
  const { complaintId, clientId, token } = props
  console.log('checkCID', complaintId)
  console.log('clientId', clientId)

  // const Id: any = complaintId.complaintId
  const [logActivity, setLogActivity] = useState([] as any)
  const [message, setMessage] = useState('')
  const [chatData, setChatData] = useState([])
  const [transalateData, setTransalateData] = useState([] as any)
  const [isTranslate, setIsTranslate] = useState(false)
  const [IsCannedResponse, setIsCannedResponse] = useState(false)
  const [DynamicCannedRes, setDynamicCannedRes] = useState([] as any)
  const [displayList, setdisplayList] = useState(false)
  const [AddressBook, setAddressBook] = useState([] as any)
  const [IsAddressBook, setIsAddressBook] = useState(false)
  const [EmailTemplate, setEmailTemplate] = useState([] as any)
  const [IsEmailTemplate, setIsEmailTemplate] = useState(false)
  const [DropdownList, setDropdownList] = useState([] as any)
  const [SelectedDropdownData, setSelectedDropdownData] = useState({
    DynamicCanned: '',
    AddressBook: 'Enter Email Address',
    EmailTemplate: 'Default',
  })
  const [msgModal, setMsgModel] = useState(false)

  const bodercolor = '#acb3bf'

  // const bottomBtn = [
  //   {
  //     iocnName:'',
  //     btnText:'Internal Note'
  //   },
  //   {
  //     iocnName:'',
  //     btnText:'Internal Note'
  //   },
  //   {
  //     iocnName:'',
  //     btnText:'Internal Note'
  //   }
  // ]

  useEffect(() => {
    const chatDetails = async () => {
      try {
        const res: any = await Api.get(
          `${configs.get_activity}${complaintId}/2`,
          token,
        )
        console.log('chatDetails', res)
        if (res.status === 200) {
          setChatData(res.data.data)
        }
      } catch (error) {
        console.log('chatDetailsError', error)
      }
    }

    const channedResponse = async () => {
      try {
        const body = {
          client_id: clientId,
          params: { address_book: {}, email_template: {}, canned_response: {} },
        }
        const res: any = await Api.post(
          `${configs.dynamic_canned_response}`,
          body,
          token,
        )
        console.log('dynamic canned Res', res)
        if (res.status === 200) {
          setDynamicCannedRes(res.data.data[0].val)
          setEmailTemplate(res.data.data[1].val)
          setAddressBook(res.data.data[2].val)
        }
      } catch (error) {
        console.log('dynamic Canned Error', error)
      }
    }

    chatDetails()
    channedResponse()
  }, [complaintId, clientId, token])

  const onSendMessage = async () => {
    try {
      if (message !== '') {
        const body = {
          custom_column: {
            policy_number: '',
            due_date: null,
          },
          blocked_by: null,
          department_id: null,
          assigned_to: null,
          priority_id: null,
          status_id: '1',
          fake_news_type: null,
          fake_factor: null,
          complaint_id: complaintId,
          activity_id: null,
          resolution_text: null,
          medium_id: 2,
          created_by: 'paytm',
          is_internal_user: true,
          is_internal: true,
          user_id: 5889,
          is_dm: false,
          medium_name: 'Twitter',
          conversation_text: message,
          parent_message_id: null,
          index: 2,
          attachments: [],
        }
        const res: any = await Api.post(`${configs.log_activity}`, body, token)
        console.log('messageRes', res)
        if (res.status === 200) {
          setMessage('')
          setLogActivity(res.data)
        }
      } else {
        Alert.alert('Please Type Message')
      }
    } catch (error) {
      console.log('sendMessageError', error)
    }
  }

  const onReplyClick = async (replyData: any) => {
    console.log('msgIcn', replyData)
    try {
      const data = {
        custom_column: {
          policy_number: '',
          due_date: null,
        },
        blocked_by: null,
        department_id: '62',
        assigned_to: null,
        priority_id: null,
        status_id: '4',
        fake_news_type: null,
        fake_factor: null,
        complaint_id: replyData.complaint_id,
        activity_id: null,
        resolution_text: null,
        medium_id: replyData.medium_id,
        created_by: 'paytm',
        is_internal_user: true,
        is_internal: false,
        user_id: replyData.user_id,
        is_dm: false,
        medium_name: replyData.created_by,
        conversation_text: replyData.conversation_text,
        parent_message_id: '1229740175414132736',
        index: 21,
        attachments: [],
      }
      const res: any = await Api.post(configs.log_activity, data, token)
      console.log('replyApiRes', res)
    } catch (error) {
      console.log('ReplyApiError', error)
    }
  }

  const translatePress = async (msg: any) => {
    try {
      const body = {
        text: msg,
        translateTo: 'en',
      }
      const res: any = await Api.post(configs.translate_text, body, token)
      console.log('translateApiRes', res)
      if (res.status === 200) {
        setTransalateData(res.data)
        setIsTranslate(!isTranslate)
      }
    } catch (error) {
      console.log('translateApiError', error)
    }
  }

  const selectedDropdownValue = (key: any, value: any) => {
    const data: any = { ...SelectedDropdownData }
    data[key] = value
    setSelectedDropdownData(data)
    if (IsCannedResponse) {
      setMessage(value)
      onDynamicCannedPress()
    } else if (IsAddressBook) {
      onAddressBookPress()
    } else {
      onEmailTemplatePress()
    }
  }

  const onDynamicCannedPress = async () => {
    setdisplayList(!displayList)
    setIsCannedResponse(!IsCannedResponse)
    setDropdownList(DynamicCannedRes)
  }

  const onAddressBookPress = () => {
    setdisplayList(!displayList)
    setIsAddressBook(!IsAddressBook)
    setDropdownList(AddressBook)
  }

  const onEmailTemplatePress = () => {
    setDropdownList(EmailTemplate)
    setdisplayList(!displayList)
    setIsEmailTemplate(!IsEmailTemplate)
  }

  const displayDropdownText = (item: any) => {
    let textValue = {}
    let key = ''
    if (IsEmailTemplate) {
      key = 'EmailTemplate'
      textValue = item.template_name
    } else if (IsAddressBook) {
      key = 'AddressBook'
      textValue = item.email_group_name
    } else {
      key = 'DynamicCanned'
      textValue = item.template_response_text
    }
    return (
      <Text
        style={{ paddingLeft: '1%' }}
        onPress={() => selectedDropdownValue(key, textValue)}
        // onPress={() => onSelectDropdown(textValue)}
      >
        {textValue}
      </Text>
    )
  }

  const msgIcon = (data: any) => {
    console.log('msgIcn', data)

    return (
      <>
        <View
          style={{ flexDirection: 'row', paddingLeft: '2%', paddingTop: '5%' }}
        >
          <Icon
            onPress={() => {
              onReplyClick(data)
            }}
            name="reply"
            size={15}
            color="#000"
          />
          <Icon
            style={{ marginLeft: 5 }}
            onPress={() => {
              translatePress(data.conversation_text)
            }}
            name="language"
            size={15}
            color="#000"
          />
        </View>
      </>
    )
  }

  const onForwardPress = async () => {
    try {
      const body = {
        complaint_id: [complaintId],
        forward_to: ['nchandivade@unoligo.com'],
        clientId: { clientId },
        email_template_id: 2,
      }
      const res: any = await Api.post(`${configs.tickit_forward}`, body)
      if (res.status === 200) {
        console.log(res.data.message)
      }
      console.log('ForwardApiRes', res)
    } catch (error) {
      console.log('ForwardApiError', error)
    }
  }

  const onCrmPress = async () => {
    try {
      const body = {
        queue_name: 'outgoing_message_queue',
        // "queue_message": "{"response_mode":"CRM","complaint_id":325906}"
      }
      const res: any = await Api.post(`${configs.add_message_to_queue}`, body)
      console.log('ResponseCodeRes', res)
    } catch (error) {
      console.log('AddtoQueueError', error)
    }
  }

  return (
    // <ScrollView>
    <View style={styles.container}>
      <View
        style={{
          // flex:0.1
          padding: '1%',
          flexDirection: 'row',
        }}
      >
        <Text>Conversations :</Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', paddingHorizontal: '2%' }}
          onPress={() => {}}
        >
          <View
            style={{
              padding: '5%',
              paddingHorizontal: '7%',
              marginHorizontal: '10%',
              backgroundColor: '#b3b3ff',
              borderRadius: 30,
            }}
          >
            <Feather name="globe" size={18} color="#fff" />
          </View>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', paddingHorizontal: '2%' }}
          onPress={() => {}}
        >
          <Entypo
            style={{ marginHorizontal: '10%' }}
            name="facebook-with-circle"
            size={20}
            color="#b3b3ff"
          />
          <Text>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', paddingHorizontal: '2%' }}
          onPress={() => {}}
        >
          <Entypo
            style={{ marginHorizontal: '10%' }}
            name="twitter-with-circle"
            size={20}
            color="#b3b3ff"
          />
          <Text>Twitter</Text>
        </TouchableOpacity>
      </View>
      <Divider style={{ backgroundColor: bodercolor }} />
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          style={styles.list}
          data={chatData}
          keyExtractor={(data: any) => {
            return data.parent_message_id
          }}
          renderItem={(data: any) => {
            const inMessage = data.item.is_user_reply === true
            const itemStyle = inMessage ? styles.itemIn : styles.itemOut
            const bgcolor = inMessage ? styles.colorIn : styles.colorOut
            const date: any = moment(data.item.created_on).format(
              'DD MM YYYY HH:mm',
            )

            return (
              <View>
                <View>
                  <Text style={[styles.time, itemStyle]}>{date}</Text>
                </View>

                <View style={[styles.item, itemStyle]}>
                  <View style={[styles.balloon, bgcolor]}>
                    <Text>{data.item.conversation_text}</Text>
                  </View>

                  {inMessage && msgIcon(data.item)}
                </View>
              </View>
            )
          }}
        />
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          borderRadius: 10,
          backgroundColor: '#d9d9d9',
          padding: '1%',
          width: '95%',
          alignSelf: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            padding: '0.5%',
            borderRadius: 20,
            flexDirection: 'row',
            marginRight: '1%',
          }}
        >
          <Entypo name="reply" size={18} color="#595959" />
          <Text style={{ fontSize: 12 }}>Reply</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setMsgModel(true)
          }}
          style={{
            backgroundColor: 'white',
            padding: '0.5%',
            borderRadius: 20,
            flexDirection: 'row',
            marginRight: '1%',
          }}
        >
          <Entypo name="forward" size={18} color="#595959" />
          <Text style={{ fontSize: 12 }}>Forward</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            padding: '0.5%',
            borderRadius: 20,
            flexDirection: 'row',
            marginRight: '1%',
          }}
        >
          <MaterialIcons name="notes" size={18} color="#595959" />
          <Text style={{ fontSize: 12 }}>Internal Note</Text>
        </TouchableOpacity>
      </View>
      <Divider style={{ backgroundColor: bodercolor }} />
      <Overlay
        overlayStyle={{ marginHorizontal: '3%' }}
        isVisible={msgModal}
        onBackdropPress={() => setMsgModel(!msgModal)}
      >
        <Modal
          style={{ position: 'absolute', top: 50 }}
          animationType="slide"
          transparent={msgModal}
          visible={msgModal}
        >
          <ChatModal />
        </Modal>
      </Overlay>
      {/* <View style={{ marginVertical: '1%', flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#eeeeeeed',
            borderRadius: 3,
            borderColor: bodercolor,
            borderWidth: 1,
            paddingVertical: '0.5%',
            // paddingHorizontal: "1%",
            flexDirection: 'row',
            width: '30%',
          }}
          onPress={() => {
            onAddressBookPress()
          }}
        >
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
            }}
          >
            <Icon
              style={{ alignSelf: 'center' }}
              name="envelope"
              size={10}
              color="#000"
            />
          </View>
          <Text>{SelectedDropdownData.AddressBook}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#eeeeeeed',
            borderRadius: 3,
            borderColor: bodercolor,
            borderWidth: 1,
            paddingVertical: '0.5%',
            marginHorizontal: '0.5%',
            // paddingHorizontal: "1%",
            flexDirection: 'row',
            justifyContent: 'center',
            width: '10%',
          }}
          onPress={() => {
            onEmailTemplatePress()
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{}}>{SelectedDropdownData.EmailTemplate} </Text>
            <Icon
              style={{ paddingTop: '7%' }}
              name="caret-down"
              size={10}
              color="#000"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#5b5b5b',
            borderRadius: 3,
            borderColor: bodercolor,
            borderWidth: 1,
            paddingVertical: '0.5%',
            marginLeft: '0.5%',
            justifyContent: 'center',
            flexDirection: 'row',
            width: '10%',
          }}
          onPress={() => {
            onForwardPress()
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#fff' }}>Forward </Text>
            <Icon
              style={{ paddingTop: '7%' }}
              name="share"
              size={10}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#5b5b5b',
            borderRadius: 3,
            borderColor: bodercolor,
            borderWidth: 1,
            paddingVertical: '0.5%',
            // marginHorizontal:"0.5%",
            justifyContent: 'center',
            flexDirection: 'row',
            width: '3%',
          }}
        >
          <Icon
            style={{ paddingTop: '7%' }}
            name="caret-down"
            size={10}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            borderRadius: 3,
            borderColor: bodercolor,
            borderWidth: 1,
            paddingVertical: '0.5%',
            marginHorizontal: '0.5%',
            // paddingHorizontal: "1%",
            justifyContent: 'center',
            flexDirection: 'row',
            width: '8%',
          }}
          onPress={() => onCrmPress()}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#fff' }}>CRM </Text>
            <Icon
              style={{ paddingTop: '7%' }}
              name="share"
              size={10}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
      </View>

      <Divider style={{ backgroundColor: bodercolor }} />

      <View style={{ marginVertical: '1%', flexDirection: 'row' }}>
        <View
          style={{
            paddingVertical: '0.5%',
            marginHorizontal: '0.5%',
          }}
        >
          <Text>Send To External</Text>
        </View>
        <View
          style={{
            paddingVertical: '0.5%',
            marginHorizontal: '0.5%',
          }}
        >
          <Toggle2 />
        </View>
        
        <View
          style={{
            paddingVertical: '0.5%',
            marginHorizontal: '0.5%',
          }}
        >
          <Text>Reply To :</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#eeeeeeed',
            borderRadius: 3,
            borderColor: bodercolor,
            borderWidth: 1,
            paddingVertical: '0.5%',
            marginHorizontal: '0.5%',
            // paddingHorizontal: "1%",
            flexDirection: 'row',
            justifyContent: 'center',
            width: '10%',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{}}>Twitter </Text>
            <Icon
              style={{ paddingTop: '7%' }}
              name="caret-down"
              size={10}
              color="#000"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#eeeeeeed',
            borderRadius: 3,
            borderColor: bodercolor,
            borderWidth: 1,
            paddingVertical: '0.5%',
            marginHorizontal: '0.5%',
            // paddingHorizontal: "1%",
            flexDirection: 'row',
            justifyContent: 'center',
            width: '50%',
          }}
          onPress={() => onDynamicCannedPress()}
        >
          <Text>{SelectedDropdownData.DynamicCanned}</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Write a message..."
            underlineColorAndroid="transparent"
            value={message}
            onChangeText={(msg: any) => setMessage(msg)}
          />
        </View>

        <TouchableOpacity style={styles.btnSend} onPress={onSendMessage}>
          <Image
            source={{
              uri: 'https://img.icons8.com/small/75/ffffff/filled-sent.png',
            }}
            style={styles.iconSend}
          />
        </TouchableOpacity>
      </View>
      <Overlay
        overlayStyle={{ marginHorizontal: '3%' }}
        isVisible={isTranslate}
        onBackdropPress={() => setIsTranslate(!isTranslate)}
      >
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', color: '#000' }}>
              Translated Text
            </Text>
            <Icon
              style={{ marginLeft: '3%', marginTop: '0.5%' }}
              name="language"
              size={15}
              color="#000"
            />
          </View>
          <Text
            style={{ paddingTop: '2%' }}
            onPress={() => setIsTranslate(!isTranslate)}
          >
            {transalateData.translated_text
              ? transalateData.translated_text
              : ''}
          </Text>
        </View>
      </Overlay>
      <Modal
        style={{ flex: 1 }}
        animationType="none"
        transparent={displayList}
        visible={displayList}
      >
        <DropDownList>
          <FlatList
            style={{ paddingHorizontal: '2%' }}
            data={DropdownList}
            renderItem={({ item, index }) => {
              return (
                <Hoverable>
                  {({ hovered }) => (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        paddingVertical: '0.5%',
                        borderBottomWidth: 0.2,
                        borderBottomColor: 'gray',
                        backgroundColor: hovered ? '#3498DB' : '#fff',
                      }}
                    >
                      {displayDropdownText(item)}
                    </View>
                  )}
                </Hoverable>
              )
            }}
            keyExtractor={(index: any) => index.toString()}
          />
        </DropDownList>
      </Modal>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
  }
}

export default connect(mapStateToProps)(Chat)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: '2%',
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    backgroundColor: '#00BFFF',
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputContainer: {
    // borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    // borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderColor: '#dce3de',
    // border: 'none',
    flex: 1,
  },
  balloon: {
    maxWidth: '90%',
    padding: 10,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start',
  },
  itemOut: {
    alignSelf: 'flex-end',
  },
  colorIn: {
    backgroundColor: '#eeeeee',
  },
  colorOut: {
    backgroundColor: '#13eb4d',
  },
  time: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#808080',
  },
  item: {
    marginBottom: '1%',
    flex: 1,
    flexDirection: 'row',

    borderRadius: 300,
    padding: 1,
  },
  input: {
    flex: 1,
    paddingLeft: 0,
    color: '#424242',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    width: '10%',
  },
})
