import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Hoverable } from 'react-native-web-hover'
import { Tooltip } from 'react-native-elements'
import { connect } from 'react-redux'
import Api from '../provider/api/Api'
import ModalScreen from './ModalScreen'
import TooltipMessage from './TooltipMessage'
import DropDownList from './DropDownList'
import SelectBoxList from './SelectBoxList'
import { configs } from '../provider/api/ApiUrl'
import { Twitter, Facebook, Email, WhatsApp } from '../Images/MediaIcon'
import { UnChecked, Checked } from '../Images/Checkbox'
import { Urgent, Low, High, Medium, Default } from '../Images/Priority'
import { AssignUser } from '../Images/AssignUser'
import {
  DefaultSentiment,
  NegativeSentiment,
  PositiveSentiment,
  NeutralSentiment,
} from '../Images/SentimentIcon'
import { Interaction2Edit } from './DropdownSelect'

// const colors = ['red', 'green', 'orange']

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

const sentimentList = [
  { id: '1', text: 'Positive', component: <PositiveSentiment /> },
  { id: '-1', text: 'Negative', component: <NegativeSentiment /> },
  { id: '0', text: 'Neutral', component: <NeutralSentiment /> },
]

const List = (props: any) => {
  const {
    isHeaderSelect,
    tickitItems,
    token,
    selectedOneTickit,
    storeSelectedTickits,
    selectedHeader,
    statusDropdownList,
    priorityDropdownList,
    assigneeDropdownList,
    navigation,
    tickitList,
  } = props
  // console.log(tickitItems)

  const [checkbox, setCheckbox] = useState(false)
  const [message, setMessage] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [isChatScreen, setIsChatScreen] = useState(false)
  const [tickitStatusList, setTickitStatusList] = useState([])
  const [isDropdownList, setIsDropdownList] = useState(false)
  const [isStatusDropdown, setStatusDropdown] = useState(false)
  const [isPriorityDropdown, setPriorityList] = useState(false)
  const [isAssigneeList, setAssigneeList] = useState(false)
  const [isSentimentList, setSentimentList] = useState(false)
  // const [dropdownStyle, setDropdownStyle] = useState({
  //   left: '0',
  //   right: '0',
  //   top: '0',
  //   bottom: '0',
  // })

  const tooltipRef: any = React.useRef(null)
  const fontWeight = tickitItems.is_read ? '100' : '700'

  const onSubjectTextPress = () => {
    props.setTickit(tickitItems)
    navigation.navigate('ChatScreen')
  }

  const SelectedStatus = (data: any) => {
    console.log('statusSelected', data)
  }

  // const setDropdownData = (index: any) => {
  //   setDropdown(tickitStatus[index])
  // }

  const setTooltip = (msg: any) => {
    setMessage(msg)
    tooltipRef.current.toggleTooltip()
  }

  const tickitStatusMenu = async (index: any, statusName: string) => {
    // setTickIcon(tickitIcon[index])

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
      // setTooltip('Status updated Successfully !!!')
      onCloseModal()
    }
  }

  const onOpenToolTip = () => {
    setTimeout(function () {
      tooltipRef.current.toggleTooltip()
    }, 3000)
  }

  const onCloseModal = () => {
    setModalVisible(false)
    // setIsChatScreen(false)
    setIsDropdownList(false)
    setPriorityList(false)
    setStatusDropdown(false)
    setAssigneeList(false)
    setSentimentList(false)
  }

  const onSentimetIconClick = async (selData: any) => {
    const selectedData: any = sentimentList.find((item) => {
      return item.text === selData
    })
    onCloseModal()
    const data = {
      assigned_to: null,
      created_on: tickitItems.created_on,
      custom_column: { due_date: null, policy_number: '1234' },
      user_name: tickitItems.user_name,
      customer_responded: tickitItems.customer_responded,
      is_dm: tickitItems.is_dm,
      department_id: null,
      response_allowed: false,
      blocked_by: null,
      medium_id: tickitItems.medium_id,
      sentiment_name: selectedData.text,
      last_modified_on: tickitItems.last_modified_on,
      fake_factor: tickitItems.fake_factor,
      priority_id: tickitItems.priority_id,
      user_profile_picture_url: null,
      user_type: tickitItems.user_type,
      client_id: tickitItems.client_id,
      medium_username: tickitItems.medium_username,
      sentiment: selectedData.id,
      cust_location: null,
      complaint_text: tickitItems.complaint_text,
      post_url: tickitItems.post_url,
      user_id: tickitItems.user_id,
      thread_count: tickitItems.thread_count,
      complaint_id: tickitItems.complaint_id,
      verified: false,
      is_parent_missing: false,
      follower_count: tickitItems.follower_count,
      status_id: tickitItems.status_id,
      issue_id: null,
      state_id: tickitItems.status_id,
      is_spam: false,
      is_read: true,
      fake_tagged_by: tickitItems.fake_tagged_by,
      fake_news_type: null,
      district: null,
      is_deleted: false,
      resolution_text: null,
      activity_id: null,
      conversation_text: `Sentiment has been changed to ${selectedData.text}`,
      created_by: 'system',
      is_internal_user: true,
      is_internal: true,
      is_system_generated: true,
      is_user_reply: false,
      status_name: 'Pending',
    }
    const res: any = await Api.post(configs.log_activity, data, token)
    if (res.status === 200) {
      // setTooltip('Sentiment updated successfully')
    }

    // console.log('sentiment Icon Res', res)
  }

  const onAssigneeClick = async (item: any) => {
    // setTooltip('Sentiment updated successfully')
    // console.log("tickitItem",tickitItems)
    console.log('item1', item)
    onCloseModal()
    const data = {
      assigned_to: [5889],
      created_on: tickitItems.created_on,
      custom_column: { due_date: null, policy_number: '1234' },
      user_name: tickitItems.user_name,
      customer_responded: tickitItems.customer_responded,
      is_dm: tickitItems.is_dm,
      department_id: null,
      response_allowed: false,
      blocked_by: null,
      medium_id: tickitItems.medium_id,
      sentiment_name: tickitItems.sentiment_name,
      last_modified_on: tickitItems.last_modified_on,
      fake_factor: tickitItems.fake_factor,
      priority_id: tickitItems.priority_id,
      user_profile_picture_url: null,
      user_type: tickitItems.user_type,
      client_id: tickitItems.client_id,
      medium_username: tickitItems.medium_username,
      sentiment: tickitItems.tickitItems,
      cust_location: null,
      complaint_text: tickitItems.complaint_text,
      post_url: tickitItems.post_url,
      user_id: tickitItems.user_id,
      thread_count: tickitItems.thread_count,
      complaint_id: tickitItems.complaint_id,
      verified: false,
      is_parent_missing: false,
      follower_count: tickitItems.follower_count,
      status_id: tickitItems.status_id,
      issue_id: null,
      state_id: tickitItems.status_id,
      is_spam: false,
      is_read: true,
      fake_tagged_by: tickitItems.fake_tagged_by,
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
      status_name: 'Assigned',
    }
    const res: any = await Api.post(configs.log_activity, data, token)
    if (res.status === 200) {
      // setTooltip('Assignee updated successfully')
    }

    // console.log('sentiment Icon Res', res)
  }

  const onPrioritySelect = async (selText: string) => {
    const priority: any = priorityDropdownList.find((item: any) => {
      return item.text === selText
    })
    console.log('selText', selText)

    onCloseModal()
    const data = {
      assigned_to: [5889],
      created_on: tickitItems.created_on,
      custom_column: { due_date: null, policy_number: '1234' },
      user_name: tickitItems.user_name,
      customer_responded: tickitItems.customer_responded,
      is_dm: tickitItems.is_dm,
      department_id: null,
      response_allowed: false,
      blocked_by: null,
      medium_id: tickitItems.medium_id,
      sentiment_name: tickitItems.sentiment_name,
      last_modified_on: tickitItems.last_modified_on,
      fake_factor: tickitItems.fake_factor,
      priority_id: priority.status_id,
      user_profile_picture_url: null,
      user_type: tickitItems.user_type,
      client_id: tickitItems.client_id,
      medium_username: tickitItems.medium_username,
      sentiment: tickitItems.tickitItems,
      cust_location: null,
      complaint_text: tickitItems.complaint_text,
      post_url: tickitItems.post_url,
      user_id: tickitItems.user_id,
      thread_count: tickitItems.thread_count,
      complaint_id: tickitItems.complaint_id,
      verified: false,
      is_parent_missing: false,
      follower_count: tickitItems.follower_count,
      status_id: tickitItems.status_id,
      issue_id: null,
      state_id: tickitItems.status_id,
      is_spam: false,
      is_read: true,
      fake_tagged_by: tickitItems.fake_tagged_by,
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
      status_name: priority.text,
    }
    const res: any = await Api.post(configs.log_activity, data, token)
    if (res.status === 200) {
      // setTooltip('Assignee updated successfully')
    }
  }

  const onCheckboxClick = (Id: any) => {
    try {
      let tickits = [...storeSelectedTickits]
      const checkId = Boolean(
        tickits.find((value: any, index: number) => {
          return value === Id
        }),
      )
      if (checkId) {
        const index = tickits
          .map(function (item) {
            return item
          })
          .indexOf(Id)
        tickits.splice(index, 1)
      } else {
        tickits = [Id, ...tickits]
      }
      //  // console.log('selectCheckbox', tickits)
      props.setSelectedTickit(tickits)
      if (tickits.length > 0) {
        props.OneTickitSelect(true)
      } else {
        props.OneTickitSelect(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onStatusSelect = (hovered: any) => {
    try {
      // // if(hovered){
      // console.log('onStatusClick')
      setModalVisible(true)
      setIsDropdownList(true)
      setStatusDropdown(true)
      // }
    } catch (error) {
      console.error(error)
    }
  }

  const onPriorityPress = () => {
    // setModalVisible(!modalVisible)
    // setIsDropdownList(!isDropdownList)
    setPriorityList(true)
  }
  const onAssigneePress = () => {
    setModalVisible(!modalVisible)
    setIsDropdownList(!isDropdownList)
    setAssigneeList(true)
  }

  const findIndexOfTickit = () => {
    const ind = tickitList
      .map(function (item: any) {
        return item.complaint_id
      })
      .indexOf(tickitItems.complaint_id)
    return ind
  }

  const onSentimentPress = async () => {
    // const ind = await findIndexOfTickit()
    // const data:any = {...dropdownStyle}
    // data.left = "60%"
    // data.right= "20%"
    // // data.bottom ="15%"
    // if(ind > 0){
    //  const tp =  ind *4
    //   data.top=`${tp+18}%`
    //   data.bottom =`${15-tp}`
    // }else{
    //   data.top="18%"
    // }
    // setDropdownStyle(data)
    // setModalVisible(!modalVisible)
    setIsDropdownList(!isDropdownList)
    setSentimentList(!isSentimentList)
  }

  const mediaIcon = (mediumId: any) => {
    // console.log('mediumId', mediumId)

    try {
      switch (mediumId) {
        case 1:
          return <Facebook />
          break
        case 2:
          return <Twitter />
          break
        case 4:
          return <Email />
          break
        case 18:
          return <WhatsApp />
          break
        default:
          return null
          break
      }
    } catch (error) {
      console.error('media Icon Error', error)
    }
    return null
  }

  const Subject = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingRight: '1%',
          flexDirection: 'row',
          // backgroundColor: 'red',
        }}
      >
        <View style={{ paddingRight: '5%' }}>
          {mediaIcon(tickitItems.medium_id)}
        </View>
        <Text
          // onPress={() => toggleOverlay(tickitItems)}
          onPress={() => onSubjectTextPress()}
          style={[styles.complaintText, styles.fontFamily, { fontWeight }]}
          numberOfLines={1}
        >
          {tickitItems.complaint_text}
        </Text>
      </View>
    )
  }

  const raisedBy = () => {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: 'yellow'
        }}
      >
        <Text style={[styles.fontFamily, { fontWeight }]}>
          {tickitItems.user_name}
        </Text>
      </View>
    )
  }

  const raisedAt = () => {
    return (
      <View
        style={{
          flex: 1,
          // backgroundColor:"gray"
          // paddingLeft: '1%',
        }}
      >
        <Text
          style={[styles.complaintTimeZone, styles.fontFamily, { fontWeight }]}
        >
          {/* {moment(tickitItems.last_modified_on).format('DD MMM YYYY, h:mm a')} */}
          {moment(tickitItems.created_on).format('DD MMM YYYY, h:mm a')}
        </Text>
      </View>
    )
  }

  const Status = (hovered: any) => {
    let selectedStatus

    if (tickitItems.state_id !== null) {
      selectedStatus = statusDropdownList[tickitItems.status_id].status_name
    } else {
      selectedStatus = null
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingRight: 0,

          // backgroundColor: 'green',
        }}
      >
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => onStatusSelect(hovered)}
          style={{ flexDirection: 'row', flex: 4 }}
        >
          {selectedStatus !== null ? (
            <View style={{ flex: 2 }}>
              <Text
                style={[styles.fontFamily, { fontWeight, textAlign: 'center' }]}
              >
                {selectedStatus}
              </Text>
            </View>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          <View style={{ flex: 1 }}>
            {hovered ? (
              <Icon style={styles.angleDown} name="angle-down" size={15} />
            ) : null}
          </View>
          <View style={{ flex: 1 }} />
        </TouchableOpacity>
        {/* <DropDownPicker
          items={[
            { label: 'UK', value: 'uk' },
            { label: 'France', value: 'france' },
            { label: 'Germany', value: 'germany' },
          ]}
          placeholder="Select a country"
          containerStyle={{height: 40}}
          style={{ backgroundColor: '#ffffff' }}
          dropDownStyle={{ backgroundColor: 'white' }}
        /> */}
      </View>
    )
  }

  const handleonchange = (value: any) => {
    console.log('value: ', value)

    setSentimentList(!isSentimentList)
  }
  const sentiIcon = (Sentiment: any) => {
    try {
      switch (Sentiment) {
        case 1:
          return <PositiveSentiment />
          break
        case -1:
          return <NegativeSentiment />
          break
        case 0:
          return <NeutralSentiment />
          break
        default:
          return <DefaultSentiment />
      }
    } catch (error) {
      console.error(error)
    }
    return <DefaultSentiment />
  }

  const Sentiment = (hovered: any) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
      >
        {!isSentimentList ? (
          <TouchableOpacity
            onPress={() => onSentimentPress()}
            style={{ flex: 1, flexDirection: 'row', paddingHorizontal: '20%' }}
          >
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {sentiIcon(tickitItems.sentiment)}
            </View>
            <View style={{ flex: 1 }}>
              {hovered && (
                <Icon
                  name="angle-down"
                  style={[styles.angleDown, { paddingTop: '15%' }]}
                  size={15}
                />
              )}
            </View>
          </TouchableOpacity>
        ) : (
          isSentimentList && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingHorizontal: '20%',
              }}
            >
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <SelectBoxList
                  data={sentimentList}
                  handleonchange={(value: any) => {
                    onSentimetIconClick(value)
                  }}
                />
              </View>
            </View>
          )
        )}
      </View>
    )
  }

  const setPriority = (priorityId: any) => {
    try {
      switch (priorityId) {
        case 1:
          return <Urgent />
        case 2:
          return <High />
        case 3:
          return <Medium />
        case 4:
          return <Low />
        default:
          return <Default />
      }
    } catch (error) {
      console.error(error)
    }
    return <Default />
  }

  const Priority = (hovered: any) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          // backgroundColor: 'pink'
        }}
      >
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }}>
          {!isPriorityDropdown ? (
            <Pressable
              style={{ flex: 1, flexDirection: 'row' }}
              onPress={() => onPriorityPress()}
            >
              {setPriority(tickitItems.priority_id)}
              {hovered && (
                <Icon name="angle-down" style={styles.angleDown} size={15} />
              )}
            </Pressable>
          ) : (
            <Interaction2Edit
              list={priorityDropdownList}
              onSelectedItem={(value: any) => onPrioritySelect(value)}
            />
          )}
        </View>
      </View>
    )
  }

  const Assignee = (hovered: any) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginRight: '2%',
          // backgroundColor: 'red'
        }}
      >
        <View style={{ flex: 3 }} />
        {/* <Text >{tickitItems.user_name}</Text> */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Pressable
            style={{ flex: 1, flexDirection: 'row' }}
            onPress={onAssigneePress}
          >
            {/* <Icon style={{ flex: 3 }} name="user-circle" size={15} /> */}
            <AssignUser />
            {hovered && (
              <Icon
                style={{ paddingHorizontal: '6%', paddingTop: '14%' }}
                name="angle-down"
                size={15}
              />
            )}
          </Pressable>
        </View>
        {/* <View style={{ flex: 1 }} /> */}
      </View>
    )
  }

  const displayData = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row', paddingLeft: '1%' }}>
        <View
          style={{
            paddingTop: '2%',
          }}
        >
          {isHeaderSelect ||
          Boolean(
            storeSelectedTickits.find((value: any) => {
              return value === tickitItems.complaint_id
            }),
          ) ? (
            <TouchableOpacity
              onPress={() => onCheckboxClick(tickitItems.complaint_id)}
            >
              <Checked />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => onCheckboxClick(tickitItems.complaint_id)}
            >
              <UnChecked />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ paddingLeft: '10%' }}>
          <Text style={[styles.fontFamily, { fontSize: 15, fontWeight }]}>
            #{tickitItems.complaint_id}
          </Text>
        </View>
      </View>
    )
  }

  const checkHeader = (name: any, hovered: any) => {
    try {
      switch (name) {
        case 'Subject':
          return Subject()
          break

        case 'Status':
          return Status(hovered)
          break

        case 'Sentiment':
          return Sentiment(hovered)
          break

        case 'Priority':
          return Priority(hovered)
          break

        case 'Assignee':
          return Assignee(hovered)
          break

        case 'Raised By':
          return raisedBy()
          break

        case 'Raised at':
          return raisedAt()
          break

        default:
          return null
          break
      }
    } catch (error) {
      console.error('tickitList', error)
    }

    return null
  }

  const flatlist = (list: any) => {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={list}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                // justifyContent: 'flex-start'
                paddingHorizontal: '2%',
                paddingVertical: '0.5%',
                borderBottomWidth: 0.2,
                borderBottomColor: 'gray',
                // backgroundColor: hovered ? '#3498DB' : '#fff',
                backgroundColor: '#fff',
              }}
            >
              {isStatusDropdown && (
                <Text
                  style={[styles.fontFamily]}
                  onPress={() => tickitStatusMenu(index, item.status_name)}
                >
                  {item.status_name && item.status_name}
                </Text>
              )}

              {isPriorityDropdown && <Text>{item.text && item.text}</Text>}
              {isAssigneeList && (
                <Text
                  style={[styles.fontFamily]}
                  onPress={() => onAssigneeClick(item)}
                >
                  {item.text && item.text}
                </Text>
              )}
              {isSentimentList && (
                <Text
                  style={[styles.fontFamily]}
                  onPress={() => onSentimetIconClick(item)}
                >
                  {/* {item.text && item.text} */}
                  {item.component && item.component}
                </Text>
              )}
            </View>
          )
        }}
        keyExtractor={(index: any) => index.toString()}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Hoverable>
        {({ hovered }) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingTop: '1%',
              // alignContent:"center",
              // alignItems:"center",
              paddingVertical: '1%',
              backgroundColor: hovered ? 'whitesmoke' : 'none',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            {displayData()}

            {selectedHeader.map((elementInArray: any, index: any) =>
              checkHeader(elementInArray, hovered),
            )}

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

            <>
              <Modal
                style={{ flex: 1 }}
                animationType="none"
                transparent={modalVisible}
                visible={modalVisible}
              >
                {isDropdownList ? (
                  <DropDownList
                  // style={{
                  //   marginLeft: dropdownStyle.left,
                  //   marginRight: dropdownStyle.right,
                  //   marginTop: dropdownStyle.top,
                  //   marginBottom: dropdownStyle.bottom,
                  //   // width:"30%"
                  // }}
                  >
                    <Icon
                      name="remove"
                      onPress={onCloseModal}
                      style={{ marginLeft: '95%', paddingTop: '1%' }}
                      size={12}
                      color="#000"
                    />
                    {isStatusDropdown && flatlist(statusDropdownList)}
                    {/* {isPriorityDropdown && flatlist(priorityDropdownList)}
                    {isAssigneeList && flatlist(assigneeDropdownList)} */}
                    {isSentimentList && flatlist(sentimentList)}
                  </DropDownList>
                ) : null}
                {/* {isChatScreen ? (
                  <ModalScreen
                    closeModal={() => onCloseModal()}
                    complaintId={tickitItems.complaint_id}
                    clientId={tickitItems.client_id}
                    userId={tickitItems.user_id}
                  />
                ) : null} */}
              </Modal>
            </>

            {/* <Tooltip
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
            /> */}
          </View>
        )}
      </Hoverable>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isHeaderSelect: state.headerData.isHeaderSelect,
    token: state.loginReducer.token,
    selectedOneTickit: state.headerData.oneTickitSelect,
    statusDropdownList: state.dropdownListData.statusDropdownList,
    priorityDropdownList: state.dropdownListData.priorityDropdownList,
    assigneeDropdownList: state.dropdownListData.assigneeDropdownList,
    storeSelectedTickits: state.tickitListData.storeSelectedTickits
      ? state.tickitListData.storeSelectedTickits
      : ([] as any),
    tickitList: state.tickitListData.tickitList,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTikitData: (data: any) => {
      dispatch({ type: 'TICKIT_LIST', payload: data })
    },
    setTickit: (data: any) => {
      dispatch({ type: 'TICKIT_SELECT', payload: data })
    },
    OneTickitSelect: (data: any) => {
      dispatch({ type: 'ONE_TICKIT_SELECT', payload: data })
    },
    setSelectedTickit: (data: any) => {
      dispatch({ type: 'STORE_SELECTED_TICKIT', payload: data })
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: '1%',
    borderBottomColor: '#dce3de',
    borderBottomWidth: 0.1,
    // zIndex: 0,
    // backgroundColor:"blue"

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
  iconSize: {
    height: '100',
    width: '100',
  },
  fontFamily: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
  angleDown: {
    paddingTop: '5%',
    paddingHorizontal: '5%',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
