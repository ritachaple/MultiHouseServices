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
  Pressable,
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
// import * as _ from 'lodash'
// import _ from 'lodash'
import { configs } from '../provider/api/ApiUrl'
import Toggle2 from './ToggleButton'
import DropDownList from './DropDownList'
import ForwardModal from './ForwardModal'
import {
  AllMedia,
  Twitter2,
  Facebook2,
  Facebook,
  WhatsApp2,
  EmailInterac2,
  ConvertedText,
  Reply,
  Twitter,
  Email,
  WhatsApp,
  Instagram,
  Knowlarity,
  SMS,
  GoogleMyBusiness,
  PlayStore,
  YouTube,
} from '../Images/MediaIcon'
import InternalNotes from './InternalNotes'
import ReplyModal from './ReplyModal'
import { CXP_CHAT_SCREEN_CONTROLS } from '../provider/Const'
// const _ = require('lodash')
const lodash = require('lodash')

const Chat = (props: any) => {
  const { clientId, token, selectedTickit, clientDetails, userDetails } = props
  // console.log('checkCID', complaintId)
  // console.log('clientId', clientId)

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
  const [selectedMedia, setSelectedMedia] = useState('all')
  // const [selectedMedia, setSelectedMedia] = useState('Twitter')
  const [msgModal, setMsgModel] = useState(false)
  const [isFecebookMedia, setFacebookMedia] = useState(false)
  const [isEmailMedia, setEmailMedia] = useState(false)
  const [isTwitterMedia, setTwitterMedia] = useState(false)
  const [isWhatsAppMedia, setWatsAppMedia] = useState(false)
  const [selectedMediaId, setSelectedMediaId] = useState(0)
  const [chatDataCopy, setChatDataCopy] = useState([] as any)
  const [email, setEmail] = useState()
  const [isForward, setIsForward] = useState(false)
  const [isInternalNote, setIsInternalNote] = useState(false)
  const [isReply, setReplyModal] = useState(false)
  const [replyName, setReplyName] = useState('')
  const [userName, setUserName] = useState('')

  const bodercolor = '#acb3bf'

  const fontWeight = 600

  const chatDetails = async () => {
    try {
      const res: any = await Api.get(
        `${configs.get_activity}${selectedTickit.complaint_id}/${CXP_CHAT_SCREEN_CONTROLS}`,
        token,
      )
      console.log('chatDetails', res)
      if (res.status === 200) {
        // const sortedArray = lodash.orderBy(
        //   res.data.data,
        //   (item: any) => {
        //     return moment(item.created_on)
        //   },
        //   ['asc'],
        // )
        // console.log('sortedArray', sortedArray)
        // setChatData(sortedArray)
        // setChatDataCopy(sortedArray)
        // checkMedia(sortedArray)
      }
    } catch (error) {
      console.log('chatDetailsError', error)
    }
  }

  const checkMedia = (data: any) => {
    data.map((item: any) => displayMedia(item))
  }

  const channedResponse = async () => {
    try {
      const body = {
        client_id: selectedTickit.client_id,
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
  useEffect(() => {
    chatDetails()
    channedResponse()
    return () => {
      closeMediaIcon()
    }
  }, [selectedTickit])

  // useEffect(() => {
  //   return () => {
  //     closeMediaIcon()
  //   }
  // }, [])

  const closeMediaIcon = () => {
    setWatsAppMedia(false)
    setTwitterMedia(false)
    setEmailMedia(false)
    setFacebookMedia(false)
    setSelectedMedia('all')
  }

  const onMediaClick = (name: string) => {
    setSelectedMedia(name)
    const filterList =
      chatDataCopy !== undefined &&
      chatDataCopy.length > 0 &&
      chatDataCopy.filter((item: any) => {
        return item.medium_name === name
      })
    console.log('filterList', filterList)
    setChatData(filterList)
  }

  const onSetAllMedia = (name: string) => {
    setSelectedMedia(name)
    setChatData(chatDataCopy)
  }

  const AllMediaView = () => {
    return (
      <View style={[styles.mediaIconBox]}>
        <TouchableOpacity
          style={{
            paddingHorizontal: '2%',
          }}
          onPress={() => {
            // setSelectedMedia('all')
            onSetAllMedia('all')
          }}
        >
          <View>
            <AllMedia />
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 11,
                lineHeight: 18,
                fontWeight: selectedMedia === 'all' ? '600' : '400',
              },
            ]}
          >
            All Mediums
          </Text>
        </View>
      </View>
    )
  }

  const EmailMedia = () => {
    return (
      <View style={styles.mediaIconBox}>
        <TouchableOpacity
          style={{
            paddingHorizontal: '2%',
          }}
          onPress={() => {
            // setSelectedMedia('Email')
            onMediaClick('Email')
          }}
        >
          <View>
            <EmailInterac2 />
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 11,
                lineHeight: 18,
                fontWeight: selectedMedia === 'Email' ? '600' : '400',
              },
            ]}
          >
            Email
          </Text>
        </View>
      </View>
    )
  }

  const FacebookMedia = () => {
    return (
      <View style={styles.mediaIconBox}>
        <TouchableOpacity
          style={{
            paddingHorizontal: '2%',
          }}
          onPress={() => {
            // setSelectedMedia('Facebook')
            onMediaClick('Facebook')
          }}
        >
          <View>
            <Facebook2 />
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 11,
                lineHeight: 18,
                fontWeight: selectedMedia === 'Facebook' ? '600' : '400',
              },
            ]}
          >
            Facebook
          </Text>
        </View>
      </View>
    )
  }

  const TwitterMedia = () => {
    return (
      <View style={styles.mediaIconBox}>
        <TouchableOpacity
          style={{
            paddingHorizontal: '2%',
          }}
          onPress={() => {
            setSelectedMedia('Twitter')
            onMediaClick('Twitter')
          }}
        >
          <View style={{ marginLeft: '35%' }}>
            <Twitter2 />
            {/* <Image
      source={{
        uri: 'https://unoboat.s3.ap-south-1.amazonaws.com/icons/social/twitter.svg',
      }}
      style={{ width: '15px', height: '15px' }}
    /> */}
          </View>
          <View>
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 11,
                  lineHeight: 18,
                  fontWeight: selectedMedia === 'Twitter' ? '600' : '400',
                },
              ]}
            >
              Twitter
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const WhatsAppMedia = () => {
    return (
      <View style={styles.mediaIconBox}>
        <TouchableOpacity
          style={{
            paddingHorizontal: '2%',
          }}
          onPress={() => {
            // setSelectedMedia('WhatsApp')
            onMediaClick('WhatsApp')
          }}
        >
          <View>
            <WhatsApp2 />
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={[
              styles.textStyle,
              {
                fontSize: 11,
                lineHeight: 18,
                fontWeight: selectedMedia === 'WhatsApp' ? '600' : '400',
              },
            ]}
          >
            Whats App
          </Text>
        </View>
      </View>
    )
  }

  const onSendMessage = async (msg: string, isInternal: any) => {
    // console.log("msg", rplymsg);
    try {
      // if (message !== '') {
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
        complaint_id: selectedTickit.complaint_id,
        activity_id: null,
        resolution_text: null,
        medium_id: 2,
        created_by: clientDetails.client_name,
        is_internal_user: true,
        is_internal: isInternal,
        user_id: userDetails.user_id,
        is_dm: false,
        medium_name: 'Twitter',
        conversation_text: msg,
        parent_message_id: null,
        index: 2,
        attachments: [],
      }
      const res: any = await Api.post(`${configs.log_activity}`, body, token)
      console.log('messageRes', res)
      if (res.status === 200) {
        setMessage('')
        setLogActivity(res.data)
        chatDetails()
      }
      onCloseModal()
      // } else {
      //   Alert.alert('Please Type Message')
      // }
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
        created_by: clientDetails.client_name,
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

  const dateFormat = (date: any) => {
    return moment(date).format(`ddd,DD MMM YYYY [At] HH:mm A`)
  }

  const msgIcon = (data: any) => {
    // console.log('msgIcn', data)

    return (
      <>
        <View
          style={{ flexDirection: 'row', paddingLeft: '2%', paddingTop: '3%' }}
        >
          {/* <Icon
            onPress={() => {
              onReplyClick(data)
            }}
            name="reply"
            size={15}
            color="#000"
          /> */}
          <View>
            <Pressable
              onPress={() => {
                onReplyClick(data)
              }}
            >
              <Reply />
            </Pressable>
          </View>
          {/* <Icon
            style={{ marginLeft: 5 }}
            onPress={() => {
              translatePress(data.conversation_text)
            }}
            name="language"
            size={15}
            color="#000"
          /> */}
          <View style={{ paddingLeft: '10%' }}>
            <Pressable
              onPress={() => {
                translatePress(data.conversation_text)
              }}
            >
              <ConvertedText />
            </Pressable>
          </View>
        </View>
      </>
    )
  }

  const MediaImageOnProfile = (mediumName: string) => {
    try {
      switch (mediumName) {
        case 'Facebook':
          return <Facebook />
          break
        case 'Twitter':
          return <Twitter />
          break
        case 'SMS':
          return <SMS />
          break
        case 'Email':
          return <Email />
          break
        case 'YouTube':
          return <YouTube />
          break
        case 'Instagram':
          // return <Twitter3 />
          return <Instagram />
          break
        case 'GoogleMyBusiness':
          return <GoogleMyBusiness />
          break
        case 'WhatsApp':
          return <WhatsApp />
          break
        case 'PlayStore':
          return <PlayStore />
          break
        case 'Knowlarity':
          return <Knowlarity />
          break

        default:
          return null
          break
      }
    } catch (error) {
      console.error()
    }
    return null
  }

  const onForwardPress = async () => {
    try {
      const body = {
        complaint_id: [selectedTickit.complaint_id],
        // "forward_to": ["nchandivade@unoligo.com"],
        forward_to: [email],
        client_id: selectedTickit.client_id,
        email_template_id: 2,
      }
      const res: any = await Api.post(`${configs.tickit_forward}`, body, token)
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

  // data.find((item:any)=>{
  //   return item.medium_name
  // })

  const displayMedia = (data: any) => {
    // console.log("displayData", data);
    // console.log("displayDataid", data.medium_name);
    try {
      switch (data.medium_name) {
        case 'Facebook':
          setFacebookMedia(true)
          break
        case 'Email':
          setEmailMedia(true)
          break
        case 'Instagram':
          break
        case 'Twitter':
          setTwitterMedia(true)

          break
        case 'WhatsApp':
          setWatsAppMedia(true)

          break

        default:
          break
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onForward = () => {
    setMsgModel(true)
    setIsForward(true)
  }

  const onInternalNote = () => {
    setMsgModel(true)
    setIsInternalNote(true)
  }

  const onCloseModal = () => {
    setMsgModel(false)
    setIsForward(false)
    setIsInternalNote(false)
    setReplyModal(false)
  }

  const onSendEmail = (value: any) => {
    setEmail(value)
    // console.log("email", value);
  }

  const onReplyModalClick = () => {
    setReplyModal(true)
    setMsgModel(true)
  }

  return (
    // <ScrollView>
    <View style={styles.container}>
      <View
        style={{
          // flex:0.1
          // padding: '1%',
          flexDirection: 'row',
          paddingVertical: '1%',
        }}
      >
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={[
              styles.textStyle,
              { lineHeight: 28, color: '#000', textAlignVertical: 'center' },
            ]}
          >
            Conversations :
          </Text>
        </View>

        <AllMediaView />
        {isEmailMedia && <EmailMedia />}
        {isFecebookMedia && <FacebookMedia />}
        {isTwitterMedia && <TwitterMedia />}
        {isWhatsAppMedia && <WhatsAppMedia />}
      </View>
      <Divider style={{ backgroundColor: '#EDEDED' }} />
      <ScrollView style={{ flex: 1 }}>
        {console.log('selectedMedia: ', selectedMedia)}
        <FlatList
          // style={styles.list}
          key={selectedMedia}
          data={chatData}
          keyExtractor={(data: any) => {
            return data.parent_message_id
          }}
          // extraData={selectedMediaId}
          renderItem={(data: any) => {
            // { console.log('renderItem: ', data) }
            return (
              <View
                style={{ flex: 1, paddingVertical: '1%', paddingTop: '2%' }}
              >
                {data.item && data.item.is_user_reply ? (
                  <View>
                    {/* { console.log('selectedMediaItem: ', selectedMedia)}
                    { console.log('cond1: ', selectedMedia === data.item.medium_name)}
                    { console.log('cond2: ', selectedMedia === 'all')}
                    { console.log('cons: ', ((selectedMedia === data.item.medium_name) || (selectedMedia === 'all')))} */}

                    {/* {((selectedMedia === data.item.medium_name) || (selectedMedia === 'all')) ? ( */}
                    {setReplyName(data.item.user_name)}
                    <View>
                      <View
                        style={{
                          paddingHorizontal: '1%',
                          flexDirection: 'row',
                        }}
                      >
                        <View>
                          <Image
                            source={{
                              uri: data.item.user_profile_picture_url,
                            }}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                            }}
                          />
                          <View
                            style={{
                              position: 'relative',
                              top: '-25%',
                              right: '-40%',
                            }}
                          >
                            {MediaImageOnProfile(data.item.medium_name)}
                          </View>
                        </View>
                        <View style={{ paddingHorizontal: '1%' }}>
                          {data.item.user_name !== null ? (
                            <Text
                              style={[
                                styles.textStyle,
                                { fontWeight: '700', color: '#FE46D5' },
                              ]}
                            >
                              {data.item.user_name}{' '}
                            </Text>
                          ) : (
                            <Text> </Text>
                          )}
                          {/* <Text style={[styles.textStyle, { fontWeight: "700", color: "#FE46D5" }]}>Rita</Text> */}
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={[styles.textStyle, { color: '#8A92BB' }]}
                            >
                              {moment(data.item.created_on).fromNow()}
                            </Text>
                            <Text
                              style={[
                                styles.textStyle,
                                { color: '#8A92BB', paddingLeft: 2 },
                              ]}
                            >
                              ({dateFormat(data.item.created_on)})
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: 'row', marginRight: '10%' }}
                      >
                        <View style={[styles.msgContainer]}>
                          <View
                            style={[
                              styles.conversationMsg,
                              {
                                backgroundColor: '#F4F4F4',
                                alignSelf: 'flex-start',
                                flexDirection: 'row',
                                borderColor: '#F4F4F4',
                              },
                            ]}
                          >
                            <Text>{data.item.conversation_text}</Text>
                          </View>
                        </View>
                        {msgIcon(data.item)}
                      </View>
                    </View>
                    {/* ) :
                      <></>
                    } */}
                  </View>
                ) : (
                  <View
                    style={[{ marginRight: '2%', justifyContent: 'flex-end' }]}
                  >
                    {/* {((selectedMedia === data.item.medium_name)
                      ||
                      (selectedMedia === 'all')
                    )
                      && ( */}
                    {/* {setUserName(data.item.created_by)} */}
                    <>
                      <View
                        style={{
                          paddingHorizontal: '1%',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <View>
                          <Image
                            source={{
                              // uri: 'https://cxp.azureedge.net/static/content/icon/avatar_2x.png'
                              uri: data.item.user_profile_picture_url,
                            }}
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                            }}
                          />
                          {/* {MediaImageOnProfile(data.item.medium_name)} */}

                          {data.item.medium_name !== null ? (
                            <View
                              style={{
                                position: 'relative',
                                top: '-25%',
                                right: '-40%',
                              }}
                            >
                              {MediaImageOnProfile(data.item.medium_name)}
                            </View>
                          ) : (
                            <View style={{ marginVertical: '1%' }} />
                          )}
                        </View>
                        <View style={{ paddingHorizontal: '1%' }}>
                          {data.item.created_by !== null ? (
                            <Text
                              style={[
                                styles.textStyle,
                                { fontWeight: '700', color: '#FE46D5' },
                              ]}
                            >
                              {data.item.created_by}{' '}
                            </Text>
                          ) : (
                            <Text> </Text>
                          )}
                          {/* <Text style={[styles.textStyle, { fontWeight: "700", color: "#FE46D5" }]}>Rita</Text> */}
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              style={[styles.textStyle, { color: '#8A92BB' }]}
                            >
                              {moment(data.item.created_on).fromNow()}
                            </Text>
                            <Text
                              style={[
                                styles.textStyle,
                                { color: '#8A92BB', paddingLeft: 2 },
                              ]}
                            >
                              ({dateFormat(data.item.created_on)})
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={[styles.msgContainer]}>
                        <View
                          style={[
                            styles.conversationMsg,
                            {
                              backgroundColor: '#F1F6FF',
                              marginLeft: '50%',
                              borderColor: '#F1F6FF',
                              justifyContent: 'flex-end',
                              //  "transform": "matrix(-1, 0, 0, 1, 0, 0)"
                              // width: "40%"
                            },
                          ]}
                        >
                          <Text>{data.item.conversation_text}</Text>
                        </View>
                      </View>
                    </>
                    {/* )} */}
                  </View>
                )}
              </View>
            )
          }}
        />
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          borderRadius: 10,
          backgroundColor: '#F6F6F6',
          padding: '1%',
          width: '100%',
          alignSelf: 'center',
          // paddingVertical: "2%"
          marginVertical: '2%',
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
          onPress={() => {
            onReplyModalClick()
          }}
        >
          {/* <Entypo name="reply" size={18} color="#595959" />
           */}
          <Image
            source={{
              uri:
                'https://unoboat.s3.ap-south-1.amazonaws.com/replyButton.svg',
            }}
            style={{ width: '18px', height: '18px', margin: '1%' }}
          />
          &nbsp;&nbsp;
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Poppins-Light',
              padding: '1.5%',
            }}
          >
            Reply
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onForward()
          }}
          style={{
            backgroundColor: 'white',
            padding: '0.5%',
            borderRadius: 20,
            flexDirection: 'row',
            marginRight: '1%',
          }}
        >
          {/* <Entypo name="forward" size={18} color="#595959" /> */}
          <Image
            source={{
              uri:
                'https://unoboat.s3.ap-south-1.amazonaws.com/ForwardButton.svg',
            }}
            style={{ width: '18px', height: '18px' }}
          />
          &nbsp;&nbsp;
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Poppins-Light',
              padding: '1.5%',
            }}
          >
            Forward
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            padding: '0.5%',
            borderRadius: 20,
            flexDirection: 'row',
            width: '125px',
            marginRight: '1%',
          }}
          onPress={() => {
            onInternalNote()
          }}
        >
          {/* <MaterialIcons name="notes" size={18} color="#595959" />&nbsp;&nbsp; */}
          <Image
            source={{
              uri: 'https://unoboat.s3.ap-south-1.amazonaws.com/notes.svg',
            }}
            style={{ width: '18px', height: '18px' }}
          />
          &nbsp;&nbsp;
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Poppins-Light',
              padding: '1.5%',
            }}
          >
            Internal Note
          </Text>
        </TouchableOpacity>
      </View>
      <Divider style={{ backgroundColor: bodercolor }} />
      {/* <Overlay
        overlayStyle={{ marginHorizontal: '3%' }}
        isVisible={msgModal}
        onBackdropPress={() => setMsgModel(!msgModal)}
      > */}
      <Modal
        style={{ position: 'absolute', top: 50 }}
        animationType="slide"
        transparent={msgModal}
        visible={msgModal}
      >
        {isForward && (
          <ForwardModal
            onCancel={() => {
              onCloseModal()
            }}
            onForwardPress={() => {
              onForwardPress()
            }}
            onSetEmail={onSendEmail}
          />
        )}

        {isInternalNote && (
          <InternalNotes
            onCancel={() => {
              onCloseModal()
            }}
            onSendMessage={onSendMessage}
          />
        )}

        {isReply && (
          <ReplyModal
            onCancel={() => {
              onCloseModal()
            }}
            onSendMessage={onSendMessage}
            replyName={replyName}
          />
        )}
      </Modal>
      {/* </Overlay> */}
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

      {/* <View style={styles.footer}>
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
      </View> */}
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
    selectedTickit: state.tickitListData.selectedTickit,
    clientDetails: state.loginReducer.clientDetails,
    userDetails: state.loginReducer.userDetails,
  }
}

export default connect(mapStateToProps)(Chat)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '2%',
  },
  list: {
    // paddingHorizontal: 17,
    paddingHorizontal: '2%',
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
    maxWidth: '100%',
    padding: 10,
    borderRadius: 20,
  },
  msgIn: {
    alignSelf: 'flex-start',
    // paddingRight: "10%"
  },
  msgOut: {
    alignSelf: 'flex-end',
    // paddingLeft: "20%"
    marginLeft: '10%',
  },
  colorIn: {
    backgroundColor: '#F4F4F4',
    // backgroundColor: '#eeeeee',
  },
  colorOut: {
    backgroundColor: '#F1F6FF',
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
  textStyle: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    fontWeight: '400',
  },
  mediaIconBox: {
    alignItems: 'center',
    paddingHorizontal: '2%',
  },
  conversationMsg: {
    flex: 1,
    borderWidth: 1,
    padding: '1%',
    borderRadius: 20,
    paddingHorizontal: '2%',
    paddingVertical: '1%',
  },
  msgContainer: {
    marginBottom: '1%',
    // flex: 1,
    // padding: "1%"
  },
})
