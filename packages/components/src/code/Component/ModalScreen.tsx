import React, { useState, useEffect } from 'react'
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
// @ts-ignore
import { Calendar } from 'react-date-range';
import moment from 'moment'
import Chat from './Chat'
import Dropdown from './Dropdown'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import UserHistory from './UserHistory'
import UserData from './UserDetails_New'
import MultipleDropdown from './MultipleDropdown'
import { Interaction2Edit } from './DropdownSelect'

// import Datepicker from './DatePicker'

const ModalScreen = (props: any) => {
  const {
    closeModal,
    complaintId,
    clientId,
    token,
    userId,
    selectedTickit,
  } = props
  // console.log('selected tickit', selectedTickit.custom_column.policy_number)

  const [PendingWithDropdown, setPendingWithDropdown] = useState([] as any)
  const [Department, setDepartment] = useState([] as any)
  const [PolicyNo, setPolicyNo] = useState([] as any)
  const [AssignTo, setAssignTo] = useState([] as any)
  const [Priority, setPriority] = useState([] as any)
  const [DueDate, setDueDate] = useState(new Date())
  const [Status, setStatus] = useState([] as any)
  const [FakeNewsType, setFakeNewsType] = useState([] as any)
  const [FakeFactor, setFakeFactor] = useState([] as any)
  const [isConversation, setIsConversation] = useState(true)
  const [isCRM, setIsCRM] = useState(false)
  const [assignToData, setAssignToData] = useState([] as any)
  const [userDetails, setUserDetails] = useState(false)
  const [CalenderVisible, setCalenderVisible] = useState(false)

  useEffect(() => {
    const dynamicControls = async () => {
      try {
        const res: any = await Api.get(`${configs.dynamic_get_controls}`, token)
        console.log('dynamic control res', res)
        if (res.status === 200 && res.data.controls !== null) {
          setPendingWithDropdown(res.data.controls[0])
          setDepartment(res.data.controls[1])
          setPolicyNo(res.data.controls[2])
          setAssignTo(res.data.controls[4])
          setPriority(res.data.controls[5])
          setStatus(res.data.controls[7])
          // setDueDate(res.data.controls[6])
          // setFakeNewsType(res.data.controls[7])
          // setFakeFactor(res.data.controls[8])
        }
      } catch (error) {
        console.log('dynamic Control error', error)
      }
    }

    dynamicControls()
  }, [token])

  const selectedPendingItem = (item: any) => {
    console.log('selectedPendingItem', item)
  }

  const handleSelect = (date: any) => {
    setDueDate(date)
    setCalenderVisible(false)
    console.log("date", date); // native Date object
  }

  const pressConversation = () => {
    setIsCRM(false)
    setIsConversation(true)
  }
  const pressCRM = () => {
    setIsCRM(true)
    setIsConversation(false)
  }

  const fetchActivity = async () => {
    try {
      const res: any = await Api.get(
        `${configs.get_activity}${complaintId}/2`,
        token,
      )
      console.log('fetch activity', res)
      if (res.status === 200) {
        // setChatData(res.data.data)
        console.log('fetch activity api success')
      }
    } catch (error) {
      console.log('fetch activityError', error)
    }
  }

  const onMarkSpam = async () => {
    try {
      const body = {
        activity_id: null,
        conversation_text: 'Marked as Spam !',
        created_by: 'system',
        is_internal_user: true,
        is_internal: true,
        is_system_generated: true,
        user_id: 5889,
        is_user_reply: false,
        department_id: 59,
        complaint_id: complaintId,
        medium_id: 2,
        status_id: 1,
        is_spam: true,
      }
      const res: any = await Api.post(`${configs.log_activity}`, body, token)
      console.log('spam res', res)
      if (res.status === 200) {
        console.log('spam api success')
      }
    } catch (error) {
      console.error('spam api error', error)
    }
  }

  const onMarkInfluencer = async (type: any) => {
    try {
      const body = {
        client_id: clientId,
        user_type: type,
        // "user_type": "influencer"
      }
      const res: any = await Api.put(
        `${configs.mark_influencer_detractor}`,
        body,
        token,
      )
      console.log('mark influence res', res)
      if (res.status === 200) {
        console.log(`mark ${type} success`)
      }
    } catch (error) {
      console.error('mark enfluencer error', error)
    }
  }

  const onRatingLink = async () => {
    try {
      const param: any = {
        complaint_id: complaintId,
      }
      const res: any = await Api.get(`${configs.ratingLink}`, token, param)
      console.log('rating link api res', res)
      if (res.status === 200) {
        console.log('rating link api success')
      }
    } catch (error) {
      console.error('rating api error', error)
    }
  }

  const showUserDetails = async () => {
    setUserDetails(!userDetails)
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              // padding: '1%',
            }}
          >
            {/* <Text>#{complaintId}</Text> */}
          </View>
        </View>
        <View style={{ flexDirection: 'row', flex: 15 }}>
          <View style={{ flex: 5 }}>
            {isCRM &&
              (userDetails ? (
                <UserData userId={userId} onClose={showUserDetails} />
              ) : (
                <UserHistory showUserDetails={showUserDetails} />
              ))}
            {/* {isCRM ? <UserData userId={userId} onClose={showUserDetails}/> : null} */}

            {/* {isConversation ? ( */}
            <Chat complaintId={complaintId} clientId={clientId} />
            {/* ) : null} */}
          </View>
          <View style={styles.verticleLine} />
          <View
            style={{
              flex: 1,
              paddingHorizontal: '1%',
              backgroundColor: '#FBFBFB',
              // backgroundColor: "red",
              // marginRight: "2%",
              paddingBottom: '4%',
              //  marginHorizontal: '1%', paddingVertical: '2%'
            }}
          >
            <View style={{ paddingVertical: '5%' }}>
              <Text style={[styles.textStyle, { fontWeight: '700' }]}>
                Edit
              </Text>
            </View>
            <ScrollView
              style={{ paddingHorizontal: '3%', paddingVertical: '2%' }}
            >
              {/* <View>
                <Text>Pending With</Text>
                <Dropdown
                  dropdownList={PendingWithDropdown.lookup_data}
                  selectedItem={selectedPendingItem}
                />
              </View> */}
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Department
                </Text>
                {/* <Dropdown
                  dropdownList={Department.lookup_data}
                  selectedItem={selectedPendingItem}
                /> */}
                <Interaction2Edit
                  list={Department.lookup_data}
                  onSelectedItem={selectedPendingItem}
                />
              </View>
              {/* <View style={styles.dropdownViewStyle}>
                <Text>Policy No</Text>
                <Dropdown
                  dropdownList={PolicyNo.lookup_data}
                  selectedItem={selectedPendingItem}
                />
              </View> */}
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Assign To
                </Text>
                <Interaction2Edit
                  list={AssignTo.lookup_data}
                  onSelectedItem={selectedPendingItem}
                />

                {/* <MultipleDropdown
                  dropdownList={AssignTo.lookup_data}
                  selectedItem={selectedPendingItem}
                /> */}
              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Priority
                </Text>
                <Interaction2Edit
                  list={Priority.lookup_data}
                  onSelectedItem={selectedPendingItem}
                />

              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Status
                </Text>
                <Interaction2Edit
                  list={Status.lookup_data}
                  onSelectedItem={selectedPendingItem}
                />

              </View>
              <View style={styles.dropdownViewStyle}>
                <Text style={[styles.textStyle, styles.DropdownTextColor]}>
                  Due Date
                </Text>

                <View>
                  {CalenderVisible ?
                    <View >
                      <Calendar
                        style={{ width: "100%" }}
                        date={DueDate}
                        onChange={handleSelect}
                        showMonthAndYearPickers={false}
                      // maxDate={new Date()}
                      // minDate={new Date()}

                      />
                    </View> :
                    <View style={{
                      backgroundColor: "#fff",
                      padding: "4%",
                      borderRadius: 8,
                      borderColor: "#d6d9e6",
                      borderWidth: 1,

                    }}>
                      <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { setCalenderVisible(!CalenderVisible) }}>
                        <Text>{moment(DueDate).format("DD-MM-YYYY")}</Text>
                        {/* <Text>Date</Text> */}
                        <Icon style={styles.angleDown} name="angle-down" size={15} />
                      </TouchableOpacity>
                    </View>
                  }
                </View>
              </View>
              {/* <View style={styles.dropdownViewStyle}>
                <Text>Fake new Type</Text>
                <Dropdown
                  dropdownList={FakeNewsType.lookup_data}
                  selectedItem={selectedPendingItem}
                />
              </View>
              <View style={styles.dropdownViewStyle}>
                <Text>Fake Factor</Text>
                <Dropdown
                  dropdownList={FakeFactor.lookup_data}
                  selectedItem={selectedPendingItem}
                />
              </View> */}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    selectedTickit: state.tickitListData.selectedTickit
      ? state.tickitListData.selectedTickit
      : {},
  }
}

export default connect(mapStateToProps)(ModalScreen)

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
    // width: '100%',
  },
  modalView: {
    flex: 1,
    // margin: 20,
    backgroundColor: 'white',
    // borderRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#EDEDED',
  },
  textStyle: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    lineHeight: 28,
  },
  DropdownTextColor: {
    color: '#8A92BB',
  },
  dropdownViewStyle: {
    paddingVertical: '10%',
  },
  angleDown: {
    paddingTop: '1%',
    paddingLeft: '50%',
    // justifyContent: "flex-end"
  },
})
