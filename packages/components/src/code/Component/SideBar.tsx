import React from 'react'
import { View, Text } from 'react-native'
import { Header, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropdownStaticData from './DropdownStaticData'

const SideBar = (props: any) => {
  const { onClosePress } = props

  const dropdownList = [
    'Select Type',
    'Pending',
    'Escalated',
    'Not Responded',
    'Awaiting',
  ]

  const setMediumValue = (value: any) => {}

  return (
    <View
      style={{
        width: '20%',
        marginTop: '1%',
        height: '100%',
        backgroundColor: 'whitesmoke',
        alignSelf: 'flex-end',
        borderTopLeftRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Header
        containerStyle={{
          backgroundColor: 'whitesmoke',
          height: '8%',
          borderTopLeftRadius: 5,
        }}
        leftComponent={<Icon name="filter" size={15} />}
        centerComponent={
          <Text style={{ marginRight: '50%' }}>All Filters</Text>
        }
        rightComponent={
          <Icon name="close" color="#000" size={15} onPress={onClosePress} />
        }
      />
      <Divider />
      <View style={{ marginVertical: '10%', marginHorizontal: '5%' }}>
        <Text style={{ fontSize: 13 }}>Medium</Text>
        {/* <DropdownStaticData 
    //  style={{flexDirection: 'row'}}
     list={dropdownList} setType={setMediumValue}
     defaultValue="Select Brand"
     dropdownName="Medium"
     /> */}
      </View>
    </View>
  )
}

export default SideBar
