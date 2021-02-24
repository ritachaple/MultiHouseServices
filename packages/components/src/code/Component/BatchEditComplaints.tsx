import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import Dropdown from './Dropdown'

const BatchEditComplaints = (props: any) => {
  const { onPress, token } = props

  const [controlOption, setControlOption] = useState([])
  const [statusOption, setStatusOption] = useState({} as any)
  const [assignToOption, setAssignToOption] = useState({} as any)
  const [priorityOption, setPriorityOption] = useState({} as any)
  const [dueDate, setDueDate] = useState([])

  useEffect(() => {
    const batchUpdateControlOption = async () => {
      try {
        const res: any = await Api.get(
          configs.batch_update_control_option,
          token,
        )
        console.log('batchUpdateOptionRes', res)
        if (res.status) {
          // setControlOption(res.data);
          setStatusOption(res.data.controls[0])
          setAssignToOption(res.data.controls[1])
          setPriorityOption(res.data.controls[2])
          setDueDate(res.data.controls[3])

          // console.log("statusOption",res.data.controls[1].lookup_data);
        }
      } catch (error) {
        console.log('batchUpdateControlOptionError', error)
      }
    }

    batchUpdateControlOption()
  }, [token])

  const selectedStatusItem = (item: any) => {
    console.log('item', item)
  }

  const selectedAssignOption = (item: any) => {
    console.log('optionitem', item)
  }

  const selectedPriorityOption = (item: any) => {
    console.log('priorityitem', item)
  }

  const onSavePress = async () => {
    try {
      const body = {
        static_field: { status_id: '1', priority_id: '1' },
        dynamic_field: {},
        complaint_id: [310747, 325938],
      }
      const res: any = await Api.post(configs.batch_complaint_update, body)
      if (res.status === 200) {
        console.log('EditComplaintsRes', res)
      }
    } catch (error) {
      console.log('editComplaintsError', error)
    }
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Header
          containerStyle={{
            backgroundColor: '#018786',
            borderBottomColor: '#018786',
            borderTopEndRadius: 5,
            borderTopStartRadius: 5,
          }}
          leftComponent={<Icon name="pencil" color="#fff" size={10} />}
          centerComponent={
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ color: '#fff', fontSize: 10 }}>
                Batch Edit Complaints
              </Text>
            </View>
          }
          rightComponent={
            <Icon name="close" color="#fff" size={10} onPress={onPress} />
          }
        />
        <View style={{ paddingHorizontal: '4%' }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingHorizontal: '2%' }}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 10,
                  paddingLeft: '2%',
                }}
              >
                assign
              </Text>
              <Dropdown
                dropdownList={statusOption.lookup_data}
                selectedItem={selectedStatusItem}
              />
            </View>
            <View style={{ paddingHorizontal: '2%' }}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 10,
                  paddingLeft: '2%',
                }}
              >
                Assigned To
              </Text>
              <Dropdown
                dropdownList={statusOption.lookup_data}
                selectedItem={selectedAssignOption}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ paddingHorizontal: '2%' }}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 10,
                  paddingLeft: '2%',
                }}
              >
                Priority
              </Text>
              <Dropdown
                dropdownList={priorityOption.lookup_data}
                selectedItem={selectedPriorityOption}
              />
            </View>
            <View style={{ paddingHorizontal: '2%' }}>
              <Text
                style={{
                  alignSelf: 'flex-start',
                  fontSize: 10,
                  paddingLeft: '2%',
                }}
              >
                Due Date
              </Text>
              <Dropdown
                dropdownList={priorityOption.lookup_data}
                selectedItem={selectedPriorityOption}
              />
            </View>
            {/* <Dropdown /> */}
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#286090',
            borderWidth: 1,
            borderColor: '#286090',
            marginHorizontal: '40%',
            marginVertical: '2%',
            alignContent: 'center',
            padding: '1%',
            borderRadius: 5,
            justifyContent: 'center',
          }}
        >
          <Text onPress={() => onSavePress()} style={[styles.appButtonText]}>
            save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
  }
}

export default connect(mapStateToProps)(BatchEditComplaints)

const styles = StyleSheet.create({
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,

    // padding: 1,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    width: '30%',
    height: '30%',
    marginHorizontal: '30%',
    marginTop: '5%',
  },
  appButtonText: {
    fontSize: 10,
    alignSelf: 'center',
    color: '#fff',
  },
})
