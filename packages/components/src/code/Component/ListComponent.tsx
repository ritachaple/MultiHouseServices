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
  Pressable,
} from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Hoverable } from 'react-native-web-hover'
import { Tooltip } from 'react-native-elements'
import { connect } from 'react-redux'
import Api from '../provider/api/Api'
import TooltipMessage from './TooltipMessage'
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
import {
  searchComplaintsApi,
  logActivityApi,
} from '../CommnFncn/IntegrationAPI'
import {
  StatusDropdown,
  SentimentSelect,
  DropdownList,
  MultipleDropdownList,
} from './ReactSelect'

// import MultiSelect from "react-multi-select-component"

const sentimentList = [
  {
    id: 1,
    text: 'Positive',
    component: <PositiveSentiment />,
    url: 'https://unoboat.s3.ap-south-1.amazonaws.com/positive.svg',
  },
  {
    id: -1,
    text: 'Negative',
    component: <NegativeSentiment />,
    url: 'https://unoboat.s3.ap-south-1.amazonaws.com/negative.svg',
  },
  {
    id: 0,
    text: 'Neutral',
    component: <NeutralSentiment />,
    url: 'https://unoboat.s3.ap-south-1.amazonaws.com/neutral.svg',
  },
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
    pageSize,
    pageIndex,
    startDate,
    endDate,
  } = props

  const [message, setMessage] = useState('')
  const [isStatusDropdown, setStatusDropdown] = useState(false)
  const [isPriorityDropdown, setPriorityList] = useState(false)
  // const [isAssigneeList, setAssigneeList] = useState(false)
  const [isSentimentList, setSentimentList] = useState(false)
  const [statusName, setStatusName] = useState()
  const [isAssignList, setToggleAssignList] = useState(false)
  const [selAssignList, setSetAssignList] = useState([] as any)

  const tooltipRef: any = React.useRef(null)
  const fontWeight = tickitItems.is_read ? '100' : '700'

  // console.log('statusDropdown', statusDropdownList)

  useEffect(() => {
    const status =
      statusDropdownList !== undefined &&
      statusDropdownList.length > 0 &&
      statusDropdownList.find((item: any) => {
        return item.status_id === tickitItems.status_id
      })
    //  // console.log("statusName", status);
    if (status) {
      setStatusName(status.status_name)
    }
    setSetAssignList(tickitItems.assigned_to)
  }, [])

  const searchComplaints = async () => {
    try {
      const res: any = await searchComplaintsApi(
        token,
        pageSize,
        pageIndex,
        startDate,
        endDate,
      )
      if (res && res.status === 200) {
        props.setTikitData(res.data.data)
        props.setTotalRecords(res.data.total_records)
      } else {
        props.clearToken()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubjectTextPress = () => {
    props.setTickit(tickitItems)
    navigation.navigate('ChatScreen')
  }

  const setTooltip = (msg: any) => {
    setMessage(msg)
    tooltipRef.current.toggleTooltip()
  }

  const tickitStatusMenu = async (selTickit: any) => {
    setStatusName(selTickit.label)
    onCloseModal()
    try {
      const conversationText = `Complaint has been changed`
      const res: any = await setLogActivity(
        tickitItems.sentiment,
        tickitItems.sentiment_name,
        conversationText,
        selTickit.value,
        tickitItems.priority_id,
        selAssignList,
      )
      if (res.status === 200) {
        searchComplaints()
        console.log('status updated successfully')
      } else {
        console.log('status not updated')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onOpenToolTip = () => {
    setTimeout(function () {
      tooltipRef.current.toggleTooltip()
    }, 3000)
  }

  const onCloseModal = () => {
    setPriorityList(false)
    setStatusDropdown(false)
    // setAssigneeList(false)
    setSentimentList(false)
  }

  const onSentimentSelect = async (selSentiment: any) => {
    try {
      console.log('selSentiment', selSentiment)

      const conversationText = `Sentiment has been changed to ${selSentiment.text}`
      onCloseModal()
      const res: any = await setLogActivity(
        selSentiment.id,
        selSentiment.text,
        conversationText,
        tickitItems.status_id,
        tickitItems.priority_id,
        selAssignList,
      )
      if (res.status === 200) {
        // setTooltip('Sentiment updated successfully')
        searchComplaints()
        console.log(`Sentiment updated successfully`)
      } else {
        console.log('sentiment api error')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const setLogActivity = async (
    sentimentId: any,
    sentimentName: string,
    conversationText: string,
    statusId: any,
    priorityId: any,
    assignTo: any,
  ) => {
    let res: any = {}
    try {
      const data = {
        assigned_to: assignTo,
        created_on: tickitItems.created_on,
        custom_column: { due_date: null, policy_number: '1234' },
        user_name: tickitItems.user_name,
        customer_responded: tickitItems.customer_responded,
        is_dm: tickitItems.is_dm,
        department_id: null,
        response_allowed: false,
        blocked_by: null,
        medium_id: tickitItems.medium_id,
        sentiment_name: sentimentName,
        last_modified_on: tickitItems.last_modified_on,
        fake_factor: tickitItems.fake_factor,
        priority_id: priorityId,
        user_profile_picture_url: null,
        user_type: tickitItems.user_type,
        client_id: tickitItems.client_id,
        medium_username: tickitItems.medium_username,
        sentiment: sentimentId,
        cust_location: null,
        complaint_text: tickitItems.complaint_text,
        post_url: tickitItems.post_url,
        user_id: tickitItems.user_id,
        thread_count: tickitItems.thread_count,
        complaint_id: tickitItems.complaint_id,
        verified: false,
        is_parent_missing: false,
        follower_count: tickitItems.follower_count,
        status_id: statusId,
        issue_id: null,
        state_id: tickitItems.state_id,
        is_spam: false,
        is_read: true,
        fake_tagged_by: tickitItems.fake_tagged_by,
        fake_news_type: null,
        district: null,
        is_deleted: false,
        resolution_text: null,
        activity_id: null,
        conversation_text: `${conversationText}`,
        created_by: 'system',
        is_internal_user: true,
        is_internal: true,
        is_system_generated: true,
        is_user_reply: false,
        status_name: statusName,
      }
      res = await logActivityApi(data, token)
    } catch (error) {
      console.error(error)
    }
    console.log('logActivity', res)
    return res
  }

  const onAssigneeSelect = async (selData: any) => {
    try {
      // let assignTo: any = []
      const assignTo =
        selData !== undefined &&
        selData.length > 0 &&
        selData.map((item: any) => {
          return item.value
        })
      const conversationText = `Complaint has been assigned`
      setToggleAssignList(false)
      setSetAssignList(assignTo)
      const res: any = await setLogActivity(
        tickitItems.sentiment,
        tickitItems.sentiment_name,
        conversationText,
        tickitItems.status_id,
        tickitItems.priority_id,
        assignTo,
      )

      if (res.status === 200) {
        // setTooltip('Sentiment updated successfully')
        searchComplaints()
        console.log(`Complaint updated successfully`)
      } else {
        console.log('assignee api error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onPrioritySelect = async (selText: any) => {
    try {
      onCloseModal()
      const conversationText = `Complaint has been changed`
      const res: any = await setLogActivity(
        tickitItems.sentiment,
        tickitItems.sentiment_name,
        conversationText,
        tickitItems.status_id,
        selText.value,
        selAssignList,
      )
      if (res.status === 200) {
        searchComplaints()
        console.log('Complaint has been changed')
      } else {
        console.log('complaint not updated')
      }
    } catch (error) {
      console.error(error)
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
      props.setFilterHeader()
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
      setStatusDropdown(true)
    } catch (error) {
      console.error(error)
    }
  }

  const onPriorityPress = () => {
    setPriorityList(true)
  }

  const onAssigneePress = () => {
    // setAssigneeList(true)
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
    setSentimentList(!isSentimentList)
  }

  const mediaIcon = (mediumId: any) => {
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

    if (tickitItems && tickitItems.status_id !== null) {
      selectedStatus =
        statusDropdownList !== undefined &&
        statusDropdownList.length > 0 &&
        statusDropdownList.find((item: any) => {
          return item.status_id === tickitItems.status_id
        })
      // console.log('selectedStatus', selectedStatus)
    }
    // else {
    //   selectedStatus = null
    // }

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
        {/* {!isStatusDropdown ? (
          <TouchableOpacity
            onPress={() => onStatusSelect(hovered)}
            style={{ flexDirection: 'row', flex: 4 }}
          >
            {selectedStatus !== null ? (
              <View style={{ flex: 2 }}>
                <Text
                  style={[
                    styles.fontFamily,
                    { fontWeight, textAlign: 'center' },
                  ]}
                >
                  {selectedStatus.status_name}
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
        ) : ( */}
        <View style={{ flex: 3 }}>
          {selectedStatus !== undefined ? (
            <StatusDropdown
              list={statusDropdownList}
              onStatusSelect={(val: any) => tickitStatusMenu(val)}
              defaultValue={{
                value:
                  selectedStatus.status_id !== undefined
                    ? selectedStatus.status_id
                    : '',
                label: selectedStatus.status_name
                  ? selectedStatus.status_name
                  : '',
              }}
              value={{ label: selectedStatus.status_name }}
            />
          ) : (
            <StatusDropdown
              list={statusDropdownList}
              onStatusSelect={(val: any) => tickitStatusMenu(val)}
            />
          )}
        </View>
        {/* )} */}
      </View>
    )
  }

  const sentiIcon = (Sentiment: any) => {
    try {
      // console.log('SENTIMATE', Sentiment)
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
    let senti: any
    if (tickitItems.sentiment) {
      senti = sentimentList.find((item: any) => {
        return item.id === tickitItems.sentiment
      })
    } else {
      senti = {
        id: 2,
        url: 'https://unoboat.s3.ap-south-1.amazonaws.com/positive.svg',
      }
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
      >
        {/* {!isSentimentList ? (
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
          isSentimentList && ( */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: '20%',
            zIndex: 999999,
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', zIndex: 1000 }}>
            <SentimentSelect
              // defaultValue={sentiIcon(tickitItems.sentiment)}
              // defaultValue={{ value: senti.id, label: <img src={senti.url} /> }}
              list={sentimentList}
              onStatusSelect={(val: any) => onSentimentSelect(val)}
            />
          </View>
        </View>
        {/* ) */}
        {/* )} */}
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
            <DropdownList
              list={priorityDropdownList}
              onSelectValue={(value: any) => onPrioritySelect(value)}
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
        {!isAssignList ? (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Pressable
              style={{ flex: 1, flexDirection: 'row' }}
              onPress={() => setToggleAssignList(true)}
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
        ) : (
          //       <MultiSelect
          //   options={assigneeDropdownList}
          //   value={assigneeDropdownList}
          //   onChange={(val: any) => {
          //         onAssigneeSelect(val)
          //       }}
          //   labelledBy={"Select"}
          // />
          <MultipleDropdownList
            list={assigneeDropdownList}
            onSelectValue={(val: any) => {
              onAssigneeSelect(val)
            }}
          />
        )}
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

  return (
    <View style={styles.container}>
      <Hoverable>
        {({ hovered }) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingTop: '1%',
              paddingVertical: '1%',
              // backgroundColor: hovered ? 'whitesmoke' : 'none',
              backgroundColor: hovered ? '#F9F9F9' : 'none',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            {displayData()}

            {selectedHeader.map((elementInArray: any, index: any) =>
              checkHeader(elementInArray, hovered),
            )}

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
    pageSize: state.Pagination.initialState.pageSize,
    pageIndex: state.Pagination.initialState.pageIndex,
    startDate: state.tickitListData.startDate,
    endDate: state.tickitListData.endDate,
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
    setTotalRecords: (data: number) => {
      dispatch({ type: 'TOTAL_RECORDS', payload: data })
    },
    setFilterHeader: () => {
      dispatch({ type: 'SET_FILTER_HEADER' })
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: '#dce3de',
    borderBottomWidth: 0.1,
  },
  complaintId: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1,
    marginTop: '2%',
    alignItems: 'center',
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
    marginTop: '1%',
    rflow: 'hidden',
  },
  complaintTimeZone: {
    fontSize: 12,
    erSpacing: 0.1,
    marginTop: 1,
    arginLeft: '3%',
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
