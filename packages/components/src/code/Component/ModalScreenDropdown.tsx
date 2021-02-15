import React from 'react'
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
} from 'react-native'
import Dropdown from './Dropdown'

const ModalScreenDropdown = (props: any) => {
  const {
    PendingWithDropdown,
    selectedPendingItem,
    Department,
    PolicyNo,
    AssignTo,
    Priority,
    Status,
    FakeNewsType,
    FakeFactor,
  } = props

  return (
    //    <View
    //         style={{
    //           flex: 1,
    //           //  marginHorizontal: '1%', paddingVertical: '2%'
    //         }}
    //       >
    <ScrollView style={{ paddingHorizontal: '3%', paddingVertical: '4%' }}>
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
    //   </View>
  )
}

export default ModalScreenDropdown
