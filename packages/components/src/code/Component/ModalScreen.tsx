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
import UsersDetails from './UsersDetails'

const ModalScreen = (props: any) => {
  const { closeModal, complaintId, clientId, token } = props

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
    return setIsCRM(false)
    setIsConversation(true)
  }
  const pressCRM = () => {
    return setIsCRM(true)
    setIsConversation(false)
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View
            style={{
              // flex: 1,
              padding: '1%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              borderBottomColor: '#dce3de',
              borderBottomWidth: 0.1,
            }}
          >
            <Icon name="window-close" size={20} onPress={closeModal} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: '1%',
            }}
          >
            <TouchableOpacity
              onPress={() => pressConversation()}
              style={{ marginHorizontal: '5%' }}
            >
              <Text
                style={{
                  color: isConversation === true ? '#6b9ff2' : '#0a0a0a',
                }}
              >
                Conversation
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pressCRM()}
              style={{ marginHorizontal: '5%' }}
            >
              <Text style={{ color: isCRM === true ? '#6b9ff2' : '#0a0a0a' }}>
                CRM
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: '1%',
            }}
          >
            #{complaintId}
          </View>
        </View>
        <View style={{ flexDirection: 'row', flex: 15 }}>
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
                <Dropdown
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
                  selectedItem={selectedPendingItem}
                />
              </View>
              <View style={{ paddingTop: '7%' }}>
                <Text>Due Date</Text>
                <Dropdown
                  dropdownList={PolicyNo.lookup_data}
                  selectedItem={selectedPendingItem}
                />
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
          <View style={styles.verticleLine} />
          <View style={{ flex: 5 }}>
            {isCRM ? <UsersDetails /> : null}
            {isConversation ? (
              <Chat complaintId={complaintId} clientId={clientId} />
            ) : null}
          </View>
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
  }
}

export default connect(mapStateToProps)(ModalScreen)

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    flex: 1,
    margin: 20,
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
