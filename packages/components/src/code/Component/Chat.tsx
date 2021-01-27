import React, { Component, useState } from 'react'
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
  Button,
} from 'react-native'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'

const data = [
  { id: 1, date: '9:50 am', type: 'in', message: 'Lorem ipsum dolor sit amet' },
  {
    id: 2,
    date: '9:50 am',
    type: 'out',
    message: 'Lorem ipsum dolor sit amet',
  },
  {
    id: 3,
    date: '9:50 am',
    type: 'in',
    message: 'Lorem ipsum dolor sit a met',
  },
  {
    id: 4,
    date: '9:50 am',
    type: 'in',
    message: 'Lorem ipsum dolor sit a met',
  },
  {
    id: 5,
    date: '9:50 am',
    type: 'out',
    message: 'Lorem ipsum dolor sit a met',
  },
  {
    id: 6,
    date: '9:50 am',
    type: 'out',
    message: 'Lorem ipsum dolor sit a met',
  },
  {
    id: 7,
    date: '9:50 am',
    type: 'in',
    message: 'Lorem ipsum dolor sit a met',
  },
  {
    id: 8,
    date: '9:50 am',
    type: 'in',
    message: 'Lorem ipsum dolor sit a met',
  },
  {
    id: 9,
    date: '9:50 am',
    type: 'in',
    message: 'Lorem ipsum dolor sit a met',
  },
]

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

const Chat = () => {
  const [message, setMessage] = useState('')
  const [dropdown, setDropdown] = useState('Select Value')
  const [logActivity, setLogActivity] = useState()

  const renderDate = (date: any) => {
    return <Text style={styles.time}>{date}</Text>
  }

  const setDropdownData = (index: any) => {
    setDropdown(tickitStatus[index])
  }

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
          complaint_id: 325906,
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

  return (
    // <ScrollView>
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(item: any) => {
            return item.id
          }}
          renderItem={(message1: any) => {
            const item = message1
            const inMessage = item.item.type === 'in'
            const itemStyle = inMessage ? styles.itemIn : styles.itemOut
            return (
              <View style={[styles.item, itemStyle]}>
                {!inMessage && renderDate(item.item.date)}
                <View style={[styles.balloon]}>
                  <Text>{item.item.message}</Text>
                </View>
                {inMessage && renderDate(item.item.date)}
              </View>
            )
          }}
        />
      </ScrollView>
      {/* <View>
          <Menu style={{ paddingTop: '3%' }}>
            <MenuTrigger>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  // style={{borderColor: 'gray'}}
                  // value={dropdown}
                  style={styles.input}
                  placeholder={dropdown}
                />
              </View>
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionWrapper: {},
                optionsContainer: {
                  width: '8%',
                  height: 'fitContent',
                  zIndex: 1,
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                },
                optionText: { fontSize: 10, zIndex: 100 },
              }}
            >
              <FlatList
                style={{ flex: 1 }}
                data={tickitStatus}
                renderItem={({ item, index }) => {
                  return (
                    <MenuOption
                      text={item}
                      onSelect={() => setDropdownData(index)}
                    />
                  )
                }}
                keyExtractor={(index: any) => index.toString()}
              />
            </MenuOptions>
          </Menu>
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
    // borderBottomColor: '#FFFFFF',
    borderColor: '#dce3de',
    border: 'none',
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start',
  },
  itemOut: {
    alignSelf: 'flex-end',
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize: 12,
    color: '#808080',
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    borderRadius: 300,
    padding: 5,
  },
  input: {
    flex: 1,
    // paddingTop: 10,
    // paddingRight: 10,
    // paddingBottom: 10,
    paddingLeft: 0,
    // backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    width: '10%',
  },
})
