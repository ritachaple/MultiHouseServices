import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native'
import { Header, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { Filter } from '../Images/Header'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import Dropdown from './Dropdown'
import DropDownList from './DropDownList'

const SideBar = (props: any) => {
  const { statusDropdownList, priorityDropdownList, token } = props
  const [mediaList, setMediaList] = useState([] as any)
  const [modalVisible, setModalVisible] = useState(false)
  const [isMediaDropdown, setmediaDropdown] = useState(false)
  const [media, setMedia] = useState('')

  const setModal = () => {
    setModalVisible(!modalVisible)
  }

  const onMediaPress = () => {
    setmediaDropdown(!isMediaDropdown)
    setModal()
  }

  useEffect(() => {
    const mediaDetails = async () => {
      try {
        const res: any = await Api.get(`${configs.mediaList}`, token)
        if (res.status === 200) {
          setMediaList(res.data.data)
          console.log('media details', res)
        }
      } catch (error) {
        console.error('Media Details', error)
      }
    }
    mediaDetails()
  }, [token])

  const selectedItemItem = () => {
    console.log('selected Item')
  }

  const onMediaSelect = (item: any) => {
    setMedia(item.medium_name)
    onMediaPress()
  }

  const flatList = (list: any) => {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={list}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                paddingHorizontal: '2%',
                paddingVertical: '0.5%',
                borderBottomWidth: 0.2,
                borderBottomColor: 'gray',
                backgroundColor: '#fff',
              }}
            >
              {isMediaDropdown && (
                <Text
                  onPress={() => {
                    onMediaSelect(item)
                  }}
                  style={styles.fontFamily}
                >
                  {item.medium_name}
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
        <Pressable onPress={() => onMediaPress()}>
          <TextInput
            style={{
              paddingLeft: 0,
              backgroundColor: '#fff',
              color: '#424242',
              // borderRadius: 5,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 4,
              paddingVertical: '1%',
            }}
            value={media}
          />
        </Pressable>
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
      <>
        <Modal
          style={{ flex: 1 }}
          animationType="none"
          transparent={modalVisible}
          visible={modalVisible}
        >
          <DropDownList>{isMediaDropdown && flatList(mediaList)}</DropDownList>
        </Modal>
      </>
    </>
    // </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    statusDropdownList: state.dropdownListData.statusDropdownList,
    priorityDropdownList: state.dropdownListData.priorityDropdownList,
  }
}

export default connect(mapStateToProps, null)(SideBar)

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
})
