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
import { searchComplaintsApi } from '../CommnFncn/IntegrationAPI'
import { Checked, UnChecked } from '../Images/Checkbox'
import { Filter } from '../Images/Header'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import Dropdown from './Dropdown'
import DropDownList from './DropDownList'

const SideBar = (props: any) => {
  const {
    statusDropdownList,
    priorityDropdownList,
    token,
    pageSize,
    pageIndex,
    startDate,
    endDate,
  } = props

  const [mediaList, setMediaList] = useState([] as any)
  const [modalVisible, setModalVisible] = useState(false)
  const [isMediaDropdown, setmediaDropdown] = useState(false)
  const [media, setMedia] = useState([] as any)
  const [mediaId, setMediaId] = useState([] as any)

  const setModal = () => {
    setModalVisible(!modalVisible)
  }

  const onMediaPress = () => {
    setmediaDropdown(!isMediaDropdown)
    setModalVisible(!modalVisible)
    // setModal()
    searchComplaintApi()
  }

  const searchComplaintApi = async () => {
    const res: any = await searchComplaintsApi(
      token,
      pageSize,
      pageIndex,
      startDate,
      endDate,
      mediaId,
    )
    if (res && res.status === 200) {
      props.setTikitData(res.data.data)
      props.setTotalRecords(res.data.total_records)
      // props.setPageIndex(pageIndex)
      // props.setPageSize(pageSize)
      // console.log('res.data', res.data.data)
    } else {
      props.clearToken()
    }
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

  const setmediaId = (item: any, index: number) => {
    try {
      const isCheck = Boolean(
        mediaId.find((value: any) => {
          return value.medium_id === item.medium_id
        }),
      )
      const data: any = [...mediaId]
      if (!isCheck) {
        //  data.push(obj)
        data.splice(index, 0, { medium_id: item.medium_id })
      } else {
        const ind = data.indexOf(item.medium_id)
        data.splice(ind, 1)
      }
      setMediaId(data)
      console.log('mediumIdd', data)
    } catch (error) {
      console.log('setmediaId', error)
    }
  }

  const onMediaSelect = (item: any, index: number) => {
    try {
      setmediaId(item, index)
      const isCheck = Boolean(
        media.find((value: any) => {
          return value === item.medium_name
        }),
      )

      const data = [...media]
      if (!isCheck) {
        data.splice(index, 0, item.medium_name)

        console.log('mediaselect', data)
      } else {
        // remove item code
        const ind = data.indexOf(item.medium_name)
        data.splice(ind, 1)
      }
      setMedia(data)
      props.setMediaFilter(data)
    } catch (error) {
      console.error('media select', error)
    }
    // onMediaPress()
  }

  const flatList = (list: any) => {
    return (
      <View>
        <Icon
          name="remove"
          onPress={onMediaPress}
          style={{ marginLeft: '90%', paddingTop: '1%' }}
          size={12}
          color="#000"
        />
        <FlatList
          style={{ flex: 1 }}
          data={list}
          renderItem={({ item, index }) => {
            const isCheck = Boolean(
              media.find((value: any) => {
                return value === item.medium_name
              }),
            )
            return (
              <View
                style={{
                  paddingHorizontal: '2%',
                  paddingVertical: '0.5%',
                  borderBottomWidth: 0.2,
                  borderBottomColor: 'gray',
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                }}
              >
                {isMediaDropdown && (
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => {
                        onMediaSelect(item, index)
                      }}
                    >
                      {isCheck ? <Checked /> : <UnChecked />}
                    </TouchableOpacity>
                    <Text style={styles.fontFamily}>{item.medium_name}</Text>
                  </View>
                )}
              </View>
            )
          }}
          keyExtractor={(index: any) => index.toString()}
        />
      </View>
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
            // value={media}
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
    pageSize: state.Pagination.initialState.pageSize,
    pageIndex: state.Pagination.initialState.pageIndex,
    startDate: state.tickitListData.startDate,
    endDate: state.tickitListData.endDate,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMediaFilter: (data: any) => {
      dispatch({ type: 'SELECTED_MEDIUM', payload: data })
    },
    setTotalRecords: (data: number) => {
      dispatch({ type: 'TOTAL_RECORDS', payload: data })
    },
    setTikitData: (data: any) => {
      dispatch({ type: 'TICKIT_LIST', payload: data })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar)

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
})
