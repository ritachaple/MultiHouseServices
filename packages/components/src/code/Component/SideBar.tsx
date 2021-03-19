import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Header, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Filter } from '../Images/Header'
import Dropdown from './Dropdown'
import DropdownStaticData from './DropdownStaticData'

const SideBar = (props: any) => {
  const { statusDropdownList, priorityDropdownList } = props
  const { onFilterPress } = props
  const dropdownList = [
    'Select Type',
    'Pending',
    'Escalated',
    'Not Responded',
    'Awaiting',
  ]

  const onclose = () => {
    console.log('return')

    // props.onClose()
  }
  const selectedItemItem = () => {
    console.log('selected Item')
  }

  return (
    // <View
    //   style={{
    //     width: '20%',
    //     marginTop: '4%',
    //     height: '100%',
    //     backgroundColor: '#FBFBFB',
    //     alignSelf: 'flex-end',
    //     borderTopLeftRadius: 5,
    //     shadowColor: '#000',
    //     shadowOffset: {
    //       width: 0,
    //       height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 5,
    //   }}
    // >
    //   <Header
    //     containerStyle={{
    //       backgroundColor: '#FBFBFB',
    //       height: '8%',
    //       borderTopLeftRadius: 5,
    //     }}
    //     leftComponent={<Filter />}
    //     // leftComponent={<Icon name="filter" size={15} />}
    //     centerComponent={
    //       <Text style={{ marginRight: '50%' }}>All Filters</Text>
    //     }
    //     rightComponent={
    //       <TouchableOpacity onPress={onclose}>
    //         <Icon name="close" color="#000" size={15} />
    //       </TouchableOpacity>
    //     }
    //   />
    //   <Divider />
    <>
      <View style={{ marginVertical: '10%', marginHorizontal: '5%' }}>
        <Text style={{ fontSize: 13 }}>Medium</Text>
      </View>
      <View style={{ marginVertical: '5%', marginHorizontal: '5%' }}>
        <Text style={{ fontSize: 13, paddingVertical: '2%' }}>Priority</Text>
        <Dropdown
          dropdownList={priorityDropdownList}
          selectedItem={selectedItemItem}
        />
      </View>
      <View style={{ marginVertical: '5%', marginHorizontal: '5%' }}>
        <Text style={{ fontSize: 13, paddingVertical: '2%' }}>Status</Text>
        <Dropdown
          dropdownList={statusDropdownList}
          selectedItem={selectedItemItem}
        />
      </View>
    </>
    // </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    statusDropdownList: state.dropdownListData.statusDropdownList,
    priorityDropdownList: state.dropdownListData.priorityDropdownList,
  }
}

export default connect(mapStateToProps, null)(SideBar)
