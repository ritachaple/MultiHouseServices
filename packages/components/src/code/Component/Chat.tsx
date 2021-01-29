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
} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Overlay } from 'react-native-elements'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'

const tickitStatus = [
  'Pending',
  'Assigned',
  'Resolve',
  'Closed',
  'Escalated',
  'Reopened',
  'Blocked',
  'Qwerty3',
]

const Chat = (complaintId: any) => {
  const Id: any = complaintId.complaintId
  const [message, setMessage] = useState('')
  const [logActivity, setLogActivity] = useState()
  const [chatData, setChatData] = useState([])
  const [transalateData, setTransalateData] = useState([] as any)
  const [isTranslate, setIsTranslate] = useState(false)

  useEffect(() => {
    const chatDetails = async () => {
      try {
        // const res: any = await Api.get(`${configs.get_activity}325940/2`)
        const res: any = await Api.get(`${configs.get_activity}${Id}/2`)
        console.log('chatDetails', res)
        if (res.status === 200) {
          setChatData(res.data.data)
        }
      } catch (error) {
        console.log('chatDetailsError', error)
      }
    }
    chatDetails()
  }, [Id])

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
          complaint_id: Id,
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
        const res: any = await Api.post(`${configs.log_activity}`, body)
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
      const res: any = await Api.post(configs.log_activity, data)
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
      const res: any = await Api.post(configs.translate_text, body)
      console.log('translateApiRes', res)
      if (res.status === 200) {
        setTransalateData(res.data)
        setIsTranslate(!isTranslate)
      }
    } catch (error) {
      console.log('translateApiError', error)
    }
  }

  const msgIcon = (data: any) => {
    return (
      <>
        <View
          style={{ flexDirection: 'row', paddingLeft: '2%', paddingTop: '5%' }}
        >
          <Icon
            onPress={() => {
              onReplyClick(data.item)
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

  return (
    // <ScrollView>
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          style={styles.list}
          data={chatData}
          keyExtractor={(data: any) => {
            return data.parent_message_id
          }}
          renderItem={(data: any) => {
            // const data = chatData
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
        isVisible={isTranslate}
        onBackdropPress={() => setIsTranslate(!isTranslate)}
      >
        <>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: 'bold', color: '#000' }}>
              Translated Text
            </Text>
            <Icon
              style={{ marginLeft: '3%', marginTop: '2%' }}
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
        </>
      </Overlay>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    border: 'none',
    flex: 1,
  },
  balloon: {
    maxWidth: '100%',
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
