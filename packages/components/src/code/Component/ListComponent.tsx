import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  CheckBox,
  Modal,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Hoverable } from 'react-native-web-hover'
import { Overlay, Tooltip, Button } from 'react-native-elements'
// import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import Chat from './Chat'
import ModalScreen from './ModalScreen'

const colors = ['red', 'green', 'blue', 'black']
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

const tickitIcon = [
  'hourglass-half',
  'user',
  'check-circle',
  'times-rectangle',
  'angle-double-up',
  'unlock-alt',
  'ban',
  'circle',
]

const List = ({ tickitItems }: { tickitItems: any }) => {
  const [tickIcon, setTickIcon] = useState('hourglass-half')
  const [checkbox, setCheckbox] = useState(false)
  const [message, setMessage] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [tickitStatusList, setTickitStatusList] = useState([])

  const tooltipRef: any = React.useRef(null)

  useEffect(() => {
    getStatusDropdownData()
  }, [])

  const getStatusDropdownData = async () => {
    const res: any = await Api.get(`${configs.get_status}39`)
    console.log('tickitStatusRes', res)

    if (res) {
      setTickitStatusList(res.data)
    }
  }

  const toggleOverlay = () => {
    setModalVisible(!modalVisible)
  }

  // const setDropdownData = (index: any) => {
  //   setDropdown(tickitStatus[index])
  // }

  const setTooltip = (msg: any) => {
    setMessage(msg)
    tooltipRef.current.toggleTooltip()
  }
  const tickitStatusMenu = async (index: any, statusName: string) => {
    setTickIcon(tickitIcon[index])
    const data = {
      assigned_to: [5889],
      created_on: '2020-10-02 06:30:33.000000',
      custom_column: { due_date: null, policy_number: '1234' },
      user_name: 'uno ',
      customer_responded: true,
      is_dm: false,
      department_id: null,
      response_allowed: false,
      blocked_by: null,
      medium_id: 2,
      sentiment_name: 'Positive',
      last_modified_on: '2021-01-07 16:49:21.007326',
      fake_factor: null,
      priority_id: null,
      user_profile_picture_url: null,
      user_type: null,
      client_id: 39,
      medium_username: 'uno80261966',
      sentiment: 1,
      cust_location: null,
      complaint_text: '@s_merilent unoligo',
      post_url: 'https://twitter.com/uno80261966/status/1311916460441169921',
      user_id: 5889,
      thread_count: 2,
      complaint_id: 325769,
      verified: false,
      is_parent_missing: false,
      follower_count: null,
      status_id: '2',
      issue_id: null,
      state_id: null,
      is_spam: false,
      is_read: true,
      fake_tagged_by: 5889,
      fake_news_type: null,
      district: null,
      is_deleted: false,
      resolution_text: null,
      activity_id: null,
      conversation_text: 'Complaint has been assigned',
      created_by: 'system',
      is_internal_user: true,
      is_internal: true,
      is_system_generated: true,
      is_user_reply: false,
      status_name: statusName,
      division_id: null,
    }
    const res: any = await Api.post(configs.log_activity, data)
    if (res.status === 200) {
      setTooltip('Status updayted Successfully !!!')
    }
  }

  const onOpenToolTip = () => {
    setTimeout(function () {
      tooltipRef.current.toggleTooltip()
    }, 3000)
  }

  const onCloseModal = () => {
    setModalVisible(!modalVisible)
  }

  const onSentimetIconClick = async (sentiment: string) => {
    // setTooltip('Sentiment updated successfully')

    const data = {
      assigned_to: null,
      created_on: '2020-10-02 06:30:33.000000',
      custom_column: { due_date: null, policy_number: '1234' },
      user_name: 'uno ',
      customer_responded: true,
      is_dm: false,
      department_id: null,
      response_allowed: false,
      blocked_by: null,
      medium_id: 2,
      sentiment_name: sentiment,
      last_modified_on: '2021-01-07 16:49:21.007326',
      fake_factor: null,
      priority_id: null,
      user_profile_picture_url: null,
      user_type: null,
      client_id: 39,
      medium_username: 'uno80261966',
      sentiment: 1,
      cust_location: null,
      complaint_text: '@s_merilent unoligo',
      post_url: 'https://twitter.com/uno80261966/status/1311916460441169921',
      user_id: 5889,
      thread_count: 2,
      complaint_id: 325769,
      verified: false,
      is_parent_missing: false,
      follower_count: null,
      status_id: 1,
      issue_id: null,
      state_id: null,
      is_spam: false,
      is_read: true,
      fake_tagged_by: 5889,
      fake_news_type: null,
      district: null,
      is_deleted: false,
      resolution_text: null,
      activity_id: null,
      conversation_text: 'Sentiment has been changed to Positive',
      created_by: 'system',
      is_internal_user: true,
      is_internal: true,
      is_system_generated: true,
      is_user_reply: false,
      status_name: 'Pending',
    }
    const res: any = await Api.post(configs.log_activity, data)
    if (res.status === 200) {
      setTooltip('Sentiment updated successfully')
    }

    console.log('sentiment Icon Res', res)
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.complaintId}>
          {/* <Icon name="twitter" size={15} color="#000" /> */}
          {/* <Icon name="facebook-square" size={15} color="#000"/> */}

          <Hoverable>
            {({ hovered }) =>
              hovered ? (
                <CheckBox value={checkbox} style={styles.checkbox} />
              ) : (
                <Icon name="twitter" size={15} color="#000" />
              )
            }
          </Hoverable>
          <Text>#{tickitItems.complaint_id}</Text>
        </View>

        <View style={{ flex: 5, paddingLeft: '2%' }}>
          <Hoverable>
            {({ hovered }) => (
              <Text
                onPress={toggleOverlay}
                style={[
                  styles.complaintText,
                  { textDecorationLine: hovered ? 'underline' : 'none' },
                ]}
                numberOfLines={1}
              >
                {tickitItems.complaint_text}
              </Text>
            )}
          </Hoverable>
          <View style={styles.moreDetails}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.username}>{tickitItems.user_name}</Text>
              <Text style={styles.complaintTimeZone}>
                Created:
                {moment(tickitItems.created_on).format('DD MMM YYYY, h:mm a')}
              </Text>
              <Text style={styles.complaintTimeZone}>
                Updated:{' '}
                {moment(tickitItems.last_modified_on).format(
                  'DD MMM YYYY, h:mm a',
                )}
              </Text>
              <Text style={styles.viewLink}>View</Text>
            </View>

            <View>
              <Text style={styles.postLink}>Post</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.category}>Cartegory :</Text>
              <View style={styles.ovalShape}>
                <Text
                  style={[styles.category, { color: 'white', fontSize: 7 }]}
                >
                  Acp name
                </Text>
              </View>
              {tickitItems.fake_factor !== null ? (
                <View style={{ flexDirection: 'row', paddingLeft: '1%' }}>
                  <Text style={styles.category}>Fake Factor:</Text>
                  <View style={styles.fakeFactorShape}>
                    <Text
                      style={[styles.category, { color: 'white', fontSize: 7 }]}
                    >
                      Half true
                    </Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>

        {/* DropDown  */}

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

        <View style={styles.iconStyle}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ paddingRight: '10%' }}>
              <Hoverable>
                {({ hovered }) => (
                  <Icon
                    name="smile-o"
                    size={15}
                    onPress={() => {
                      onSentimetIconClick('Positive')
                    }}
                    color={hovered ? 'green' : 'grey'}
                  />
                )}
              </Hoverable>
            </View>
            <View style={{ paddingRight: '10%' }}>
              <Hoverable>
                {({ hovered }) => (
                  <Icon
                    name="meh-o"
                    size={15}
                    onPress={() => {
                      onSentimetIconClick('Neutral')
                    }}
                    color={hovered ? '#dbab16' : 'grey'}
                  />
                )}
              </Hoverable>
            </View>
            <Hoverable>
              {({ hovered }) => (
                <Icon
                  style={{ paddingRight: '10%' }}
                  name="frown-o"
                  size={15}
                  onPress={() => {
                    onSentimetIconClick('Negative')
                  }}
                  color={hovered ? 'red' : 'grey'}
                />
              )}
            </Hoverable>
          </View>

          <Icon
            name="square"
            style={{ paddingTop: '1%' }}
            size={12}
            color={
              colors[tickitItems.priority_id]
                ? colors[tickitItems.priority_id]
                : 'yellow'
            }
          />
          <View>
            <Icon name="navicon" size={15} color="gray" />
            <Text style={styles.threadCount}>{tickitItems.thread_count}</Text>
          </View>

          <>
            <View>
              {/* <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => {
                  toggleOverlay()
                }}
              > */}
              {/* <Text>Dropdown list</Text> */}
              {/* <Icon name="angle-up" size={10} color="gray" />
              </TouchableOpacity> */}
            </View>
          </>

          <View>
            <Menu>
              <MenuTrigger>
                <Icon name={tickIcon} size={15} color="gray" />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionWrapper: {},
                  optionsContainer: {
                    width: '6%',
                    height: 'fitContent',
                    zIndex: 1,
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                  },
                  optionText: { fontSize: 8, zIndex: 100 },
                }}
              >
                <FlatList
                  style={{ flex: 1 }}
                  data={tickitStatusList}
                  renderItem={({ item, index }) => {
                    return (
                      <MenuOption
                        text={item.status_name}
                        onSelect={() =>
                          tickitStatusMenu(index, item.status_name)
                        }
                      />
                    )
                  }}
                  keyExtractor={(index: any) => index.toString()}
                />
              </MenuOptions>
            </Menu>
          </View>
          <></>
          {/* <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text>Hello from Overlay!</Text>

 {/* <View>
              <Button 
              icon={
                <CheckBox value={checkbox} style={styles.checkbox} />
              }
              style={{padding:1,backgroundColor:'#fff', height:'9',
                                 
                 }} title="influencer"  type="clear"  
                 titleStyle={{ color: 'black', borderColor:'black',
                 fontSize: 10,borderWidth: 1,padding:9, borderRadius:3, width:100}}/>
          </View> */}
          {/* </Overlay> */}

          <>
            <Modal
              style={{ flex: 1 }}
              animationType="slide"
              transparent={modalVisible}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.')
              }}
            >
              <ModalScreen
                closeModal={() => onCloseModal()}
                complaintId={tickitItems.complaint_id}
              />
            </Modal>
          </>

          <Tooltip
            containerStyle={{
              backgroundColor: '#d7fcd4',
              height: '10%',
              marginTop: 2,
              borderRadius: 4,
            }}
            ref={tooltipRef}
            withOverlay={false}
            onOpen={onOpenToolTip}
            // toggleOnPress={true}
            // pointerColor="none"
            // closeOnlyOnBackdropPress={false}
            popover={
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  style={{ paddingHorizontal: 1 }}
                  name="check-circle"
                  size={10}
                  color="#268748"
                />
                <Text
                  style={{ fontSize: 8, color: '#268748', fontWeight: 'bold' }}
                >
                  {message}
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '1%',
    borderBottomColor: '#dce3de',
    borderBottomWidth: 0.1,
    zIndex: 0,
    // flexDirection:"row"
  },
  complaintId: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1,
    // marginTop: "2%",
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  moreDetails: {
    color: '#3d9189',
    marginTop: '0.2%',
    // marginRight: '5%',
    paddingBottom: 1,
  },
  category: {
    color: '#aaa',
    letterSpacing: 0.1,
    fontSize: 8,
    justifyContent: 'center',
    paddingRight: 1,
  },
  username: {
    fontSize: 9,
    color: '#3d9189',
    // overflow: 'visible',
    marginTop: 1,
    // marginRight: 5,
  },
  complaintText: {
    color: '#333',
    fontSize: 12,
    // lineHeight: 1,
    marginTop: '1%',
    // marginHorizontal: 5,
    // overflow: 'hidden'
  },
  complaintTimeZone: {
    fontSize: 8,
    color: '#aaa',
    letterSpacing: 0.1,
    marginTop: 1,
    // marginRight: 5,
    marginLeft: '3%',
  },
  viewLink: {
    fontSize: 8,
    color: '#337ab7',
    marginLeft: '3%',
  },
  postLink: {
    fontSize: 8,
    color: '#337ab7',
  },
  ovalShape: {
    padding: 1,
    backgroundColor: '#5bc0de',
    borderRadius: 20,
    paddingHorizontal: '2%',
  },
  fakeFactorShape: {
    padding: 1,
    backgroundColor: '#D44638',
    borderRadius: 20,
  },
  iconStyle: {
    flex: 2,
    flexDirection: 'row',
    paddingTop: '2%',
    paddingLeft: '4%',
    paddingRight: '2%',
    justifyContent: 'space-between',
  },
  checkbox: {
    // borderColor: 'none',
    height: 10,
    width: 10,
  },
  threadCount: {
    color: '#000',
    fontSize: 8,
    position: 'absolute',
    top: '-5%',
    right: '-50%',
  },

  //  modal style

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  // dropdown style

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

export default List
