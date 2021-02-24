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
import { connect } from 'react-redux'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import Chat from './Chat'
import ModalScreen from './ModalScreen'
import TooltipMessage from './TooltipMessage'
// import DatePicker from './DatePicker'

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

const List = (props: any) => {
  // const List = ({ tickitItems, props }: { tickitItems: any, props:any }) => {

  const { isHeaderSelect, tickitItems, token } = props
  console.log('isHeader', isHeaderSelect)

  const [tickIcon, setTickIcon] = useState('hourglass-half')
  const [checkbox, setCheckbox] = useState(false)
  const [message, setMessage] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [tickitStatusList, setTickitStatusList] = useState([])

  const tooltipRef: any = React.useRef(null)

  useEffect(() => {
    const getStatusDropdownData = async () => {
      const res: any = await Api.get(
        `${configs.get_status}39`,
        `${props.token}`,
      )
      console.log('tickitStatusRes', res)

      if (res) {
        setTickitStatusList(res.data)
      }
    }

    getStatusDropdownData()
  }, [props])

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
    const res: any = await Api.post(configs.log_activity, data, token)
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

  const onSentimetIconClick = async (
    sentiment: string,
    sentimentId: number,
    tickit: any,
  ) => {
    // setTooltip('Sentiment updated successfully')

    const data = {
      assigned_to: null,
      created_on: tickit.created_on,
      custom_column: { due_date: null, policy_number: '1234' },
      user_name: tickit.user_name,
      customer_responded: tickit.customer_responded,
      is_dm: tickit.is_dm,
      department_id: null,
      response_allowed: false,
      blocked_by: null,
      medium_id: tickit.medium_id,
      sentiment_name: sentiment,
      last_modified_on: tickit.last_modified_on,
      fake_factor: tickit.fake_factor,
      priority_id: tickit.priority_id,
      user_profile_picture_url: null,
      user_type: tickit.user_type,
      client_id: tickit.client_id,
      medium_username: tickit.medium_username,
      sentiment: sentimentId,
      cust_location: null,
      complaint_text: tickit.complaint_text,
      post_url: tickit.post_url,
      user_id: tickit.user_id,
      thread_count: tickit.thread_count,
      complaint_id: tickit.complaint_id,
      verified: false,
      is_parent_missing: false,
      follower_count: tickit.follower_count,
      status_id: tickit.status_id,
      issue_id: null,
      state_id: tickit.status_id,
      is_spam: false,
      is_read: true,
      fake_tagged_by: tickit.fake_tagged_by,
      fake_news_type: null,
      district: null,
      is_deleted: false,
      resolution_text: null,
      activity_id: null,
      conversation_text: `Sentiment has been changed to ${sentiment}`,
      created_by: 'system',
      is_internal_user: true,
      is_internal: true,
      is_system_generated: true,
      is_user_reply: false,
      status_name: 'Pending',
    }
    const res: any = await Api.post(configs.log_activity, data, token)
    if (res.status === 200) {
      setTooltip('Sentiment updated successfully')
    }

    console.log('sentiment Icon Res', res)
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingTop: '1%',
          // backgroundColor: 'gray',
        }}
      >
        <View
          style={{
            flex: 1,
            paddingLeft: '1%',
            // backgroundColor: 'red',
            paddingTop: '1%',
          }}
        >
          {isHeaderSelect ? (
            <Icon
              name={isHeaderSelect ? 'check-square-o' : 'square-o'}
              size={13}
              color="#000"
            />
          ) : (
            <Hoverable>
              {({ hovered }) => (
                <Icon
                  name={hovered ? 'check-square-o' : 'square-o'}
                  size={13}
                  color="#000"
                />
              )}
            </Hoverable>
          )}
        </View>
        <View
          style={{
            flex: 2,
            // backgroundColor: 'green'
          }}
        >
          <Text style={{ fontSize: 15 }}>#{tickitItems.complaint_id}</Text>
        </View>

        <View
          style={{
            flex: 2,
            paddingTop: 1,
            // backgroundColor: 'red',
            // paddingLeft: '1%',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: '#26a35e',
            }}
          >
            <Icon
              style={{ textAlign: 'center', paddingTop: '30%' }}
              // iconStyle={{justifyContent:"center"}}

              name="whatsapp"
              size={13}
              color="#fff"
            />
          </View>
        </View>

        <View
          style={{
            flex: 6,
            // paddingLeft: '3%' ,
            // backgroundColor: 'green',
          }}
        >
          <Hoverable>
            {({ hovered }) => (
              <Text
                onPress={toggleOverlay}
                style={[
                  styles.complaintText,
                  { textDecorationLine: hovered ? 'underline' : 'none' },
                ]}
                numberOfLines={2}
              >
                {tickitItems.complaint_text}
              </Text>
            )}
          </Hoverable>
          <View style={styles.moreDetails}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.username}>{tickitItems.user_name}</Text>
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

        <View
          style={{
            flex: 3,
            paddingLeft: '1%',
            // backgroundColor: 'red'
          }}
        >
          <Text style={styles.complaintTimeZone}>
            {moment(tickitItems.created_on).format('DD MMM YYYY, h:mm a')}
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            // backgroundColor: 'green'
          }}
        >
          <Text style={styles.complaintTimeZone}>
            {moment(tickitItems.last_modified_on).format('DD MMM YYYY, h:mm a')}
          </Text>
        </View>

        {/* <View style={[styles.iconStyle,{backgroundColor:"red",}]}> */}
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            // justifyContent: 'space-between',
            paddingLeft: '4%',
            // alignContent:"center"
            // backgroundColor: 'red',
          }}
        >
          <View style={{ paddingRight: '2%' }}>
            {tickitItems.sentiment_name === 'Positive' ? (
              <Icon
                name="smile-o"
                size={15}
                onPress={() => {
                  onSentimetIconClick('Positive', 1, tickitItems)
                }}
                color="green"
              />
            ) : (
              <Hoverable>
                {({ hovered }) => (
                  <Icon
                    name="smile-o"
                    size={15}
                    onPress={() => {
                      onSentimetIconClick('Positive', 1, tickitItems)
                    }}
                    color={hovered ? 'green' : 'grey'}
                  />
                )}
              </Hoverable>
            )}
          </View>
          <View style={{ paddingRight: '2%' }}>
            {tickitItems.sentiment_name === 'Neutral' ? (
              <Icon
                name="meh-o"
                size={15}
                onPress={() => {
                  onSentimetIconClick('Neutral', 0, tickitItems)
                }}
                color="#dbab16"
              />
            ) : (
              <Hoverable>
                {({ hovered }) => (
                  <Icon
                    name="meh-o"
                    size={15}
                    onPress={() => {
                      onSentimetIconClick('Neutral', 0, tickitItems)
                    }}
                    color={hovered ? '#dbab16' : 'grey'}
                  />
                )}
              </Hoverable>
            )}
          </View>

          {tickitItems.sentiment_name === 'Negative' ? (
            <Icon
              name="smile-o"
              size={15}
              onPress={() => {
                onSentimetIconClick('Negative', -1, tickitItems)
              }}
              color="red"
            />
          ) : (
            <Hoverable>
              {({ hovered }) => (
                <Icon
                  // style={{ paddingRight: '10%' }}
                  name="frown-o"
                  size={15}
                  onPress={() => {
                    onSentimetIconClick('Negative', -1, tickitItems)
                  }}
                  color={hovered ? 'red' : 'grey'}
                />
              )}
            </Hoverable>
          )}
        </View>
        {/* <View style={{flex:1}}>

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
                  </View> */}

        <View style={{ flex: 2, alignItems: 'center' }}>
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
                      onSelect={() => tickitStatusMenu(index, item.status_name)}
                    />
                  )
                }}
                keyExtractor={(index: any) => index.toString()}
              />
            </MenuOptions>
          </Menu>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ marginLeft: '50%' }}>{tickitItems.thread_count}</Text>
        </View>

        <View style={{ flex: 3 }} />

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
              clientId={tickitItems.client_id}
              userId={tickitItems.user_id}
            />
          </Modal>
        </>

        <Tooltip
          containerStyle={{
            backgroundColor: '#d7fcd4',
            height: '15%',
            width: '13%',
            marginTop: 2,
            borderRadius: 4,
          }}
          ref={tooltipRef}
          withOverlay={false}
          onOpen={onOpenToolTip}
          popover={<TooltipMessage message={message} />}
        />
      </View>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isHeaderSelect: state.headerData.isHeaderSelect,
    token: state.loginReducer.token,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTikitData: (data: any) => {
      dispatch({ type: 'TICKIT_LIST', payload: data })
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '1%',
    borderBottomColor: '#dce3de',
    borderBottomWidth: 0.1,
    zIndex: 0,

    // marginHorizontal: '2%',
    // borderRadius: 3,
  },
  complaintId: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1,
    marginTop: '2%',
    alignItems: 'center',
    // justifyContent: 'center',
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
    fontSize: 12,
    // color: '#aaa',
    // letterSpacing: 0.1,
    marginTop: 1,
    // marginRight: 5,
    // marginLeft: '3%',
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

export default connect(mapStateToProps, mapDispatchToProps)(List)
