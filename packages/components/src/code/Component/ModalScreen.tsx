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
import Chat from './Chat'
import Dropdown from './Dropdown'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import UserHistory from './UserHistory'
import UserData from './UserDetails_New'
import MultipleDropdown from './MultipleDropdown'
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
  const [DueDate, setDueDate] = useState([] as any)
  const [Status, setStatus] = useState([] as any)
  const [FakeNewsType, setFakeNewsType] = useState([] as any)
  const [FakeFactor, setFakeFactor] = useState([] as any)
  const [isConversation, setIsConversation] = useState(true)
  const [isCRM, setIsCRM] = useState(false)
  const [assignToData, setAssignToData] = useState([] as any)
  const [userDetails, setUserDetails] = useState(false)

  useEffect(() => {
    const dynamicControls = async () => {
      try {
        const res: any = await Api.get(`${configs.dynamic_get_controls}`, token)
        console.log('dynamic control res', res)
        if (res.status === 200 && res.data.controls !== null) {
          setPendingWithDropdown(res.data.controls[0])
          setDepartment(res.data.controls[1])
          setPolicyNo(res.data.controls[2])
          setAssignTo(res.data.controls[3])
          setPriority(res.data.controls[4])
          setStatus(res.data.controls[5])
          setDueDate(res.data.controls[6])
          setFakeNewsType(res.data.controls[7])
          setFakeFactor(res.data.controls[8])
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
          {/* <View
            style={{
              // flex: 1,
              padding: '1%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: '#dce3de',
              borderBottomWidth: 0.1,
              width: '30%',
            }}
          > */}
          {/* <Icon name="remove" size={20} onPress={closeModal} />
            <Icon name="refresh" size={20} onPress={fetchActivity} />
            <Icon name="ban" size={20} onPress={onMarkSpam} />
            <Icon name="eye" size={20} />
            <TouchableOpacity
              style={{
                backgroundColor: '#fff ',
                borderRadius: 3,
                borderColor: '#000',
                borderWidth: 1,
                paddingVertical: '0.5%',
                paddingHorizontal: 5,
                flexDirection: 'row',
                width: '20%',
              }}
              onPress={() => {
                onMarkInfluencer('influencer')
              }}
            >
              <Icon
                style={{ alignSelf: 'center', paddingHorizontal: '10%' }}
                name="square-o"
                size={10}
                color="#000"
              />
              <Text
                style={{ fontSize: 10, alignSelf: 'center', color: '#000' }}
              >
                Influencer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                borderRadius: 3,
                borderColor: '#000',
                borderWidth: 1,
                paddingVertical: '0.5%',
                paddingHorizontal: 5,
                flexDirection: 'row',
                width: '20%',
              }}
              onPress={() => {
                onMarkInfluencer('detractor')
              }}
            >
              <Icon
                style={{ alignSelf: 'center', paddingHorizontal: '10%' }}
                name="check-square-o"
                size={10}
                color="#000"
              />
              <Text
                style={{ fontSize: 10, alignSelf: 'center', color: '#000' }}
              >
                Detractor
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                borderRadius: 3,
                borderColor: '#000',
                borderWidth: 1,
                paddingVertical: '0.5%',
                paddingHorizontal: 5,
                flexDirection: 'row',
                width: '20%',
              }}
              onPress={() => {
                onRatingLink()
              }}
            >
              <Icon
                style={{ alignSelf: 'center', paddingHorizontal: '10%' }}
                name="star-half-o"
                size={10}
                color="#000"
              />
              <Text
                style={{ fontSize: 10, alignSelf: 'center', color: '#000' }}
              >
                Rating
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: '1%',
            }}
          >
            <View style={{ flexDirection: 'row', marginHorizontal: '8%' }}>
              <Icon name="arrow-left" size={15} />
              <TouchableOpacity
                onPress={() => pressConversation()}
                style={{ marginHorizontal: '7%' }}
              >
                <Text
                  style={{
                    color: isConversation === true ? '#6b9ff2' : '#0a0a0a',
                  }}
                >
                  Conversation
                </Text>
              </TouchableOpacity>
              <Icon name="arrow-right" size={15} />
            </View>
            <TouchableOpacity
              onPress={() => pressCRM()}
              style={{ marginHorizontal: '8%' }}
            >
              <Text style={{ color: isCRM === true ? '#6b9ff2' : '#0a0a0a' }}>
                CRM
              </Text>
            </TouchableOpacity> */}
          {/* </View> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: '1%',
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

            {isConversation ? (
              <Chat complaintId={complaintId} clientId={clientId} />
            ) : null}
          </View>
          <View style={styles.verticleLine} />
          <View
            style={{
              flex: 1,

              //  marginHorizontal: '1%', paddingVertical: '2%'
            }}
          >
            <ScrollView
              style={{ paddingHorizontal: '3%', paddingVertical: '4%' }}
            >
              <View>
                <Text>Pending With</Text>
                <Dropdown
                  dropdownList={PendingWithDropdown.lookup_data}
                  selectedItem={selectedPendingItem}
                />
              </View>
              <View style={{ paddingTop: '7%' }}>
                <Text>Department</Text>
                <Dropdown
                  dropdownList={Department.lookup_data}
                  selectedItem={selectedPendingItem}
                />
              </View>
              <View style={{ paddingTop: '7%' }}>
                <Text>Policy No</Text>
                <Dropdown
                  dropdownList={PolicyNo.lookup_data}
                  selectedItem={selectedPendingItem}
                />
              </View>
              <View style={{ paddingTop: '7%' }}>
                <Text>Assign To</Text>
                {/* <Dropdown
                  dropdownList={AssignTo.lookup_data}
                  selectedItem={selectedPendingItem}
                /> */}
                {/* <TouchableOpacity 
                      // onPress={onInputPress}
                      >
        <TextInput
          style={{    paddingLeft: 0,
            // backgroundColor: '#fff',
            color: '#424242',
            // borderRadius: 5,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 4,
            paddingVertical: '1%',}}
          placeholder="Select Data"
          // value={textField}
        />
      </TouchableOpacity> */}

                <MultipleDropdown
                  dropdownList={AssignTo.lookup_data}
                  selectedItem={selectedPendingItem}
                />
              </View>
              <View style={{ paddingTop: '7%' }}>
                <Text>Priority</Text>
                <Dropdown
                  dropdownList={Priority.lookup_data}
                  selectedItem={selectedPendingItem}
                />
              </View>
              <View style={{ paddingTop: '7%' }}>
                <Text>Status</Text>
                <Dropdown
                  dropdownList={Status.lookup_data}
                  lseectedItem={selectedPendingItem}
                />
              </View>
              <View style={{ paddingTop: '7%' }}>
                <Text>Due Date</Text>
                {/* <Dropdown
                  dropdownList={PolicyNo.lookup_data}
                  selectedItem={selectedPendingItem}
                /> */}
                {/* <Datepicker /> */}
              </View>
              <View style={{ paddingTop: '7%' }}>
                <Text>Fake new Type</Text>
                <Dropdown
                  dropdownList={FakeNewsType.lookup_data}
                  selectedItem={selectedPendingItem}
                />
              </View>
              <View style={{ paddingTop: '7%' }}>
                <Text>Fake Factor</Text>
                <Dropdown
                  dropdownList={FakeFactor.lookup_data}
                  selectedItem={selectedPendingItem}
                />
              </View>
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
    backgroundColor: '#909090',
  },
})
