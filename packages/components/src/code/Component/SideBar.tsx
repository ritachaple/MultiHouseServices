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
  ScrollView,
} from 'react-native'
import { Header, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { searchComplaintsApi } from '../CommnFncn/IntegrationAPI'
import { Checked, UnChecked } from '../Images/Checkbox'
import { Filter } from '../Images/Header'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import { CXP_COMPLAINT_LIST_CONTROLS } from '../provider/Const'
import Dropdown from './Dropdown'
import DropDownList from './DropDownList'
import {
  MediaDropdownList,
  MultipleDropdownList,
  StatusDropdownList,
  DropdownList,
} from './ReactSelect'

const SideBar = (props: any) => {
  const {
    statusDropdownList,
    priorityDropdownList,
    token,
    pageSize,
    pageIndex,
    startDate,
    endDate,
    onClose,
    clientDetails,
    userDetails,
  } = props

  const [mediaList, setMediaList] = useState([] as any)
  const [modalVisible, setModalVisible] = useState(false)
  const [isMediaDropdown, setmediaDropdown] = useState(false)
  const [media, setMedia] = useState([] as any)
  // const [mediaId, setMediaId] = useState([] as any)
  const [selMedia, setSelMediaList] = useState([] as any)
  const [selPriority, setSelPriority] = useState([] as any)
  const [setStatus, setSelStatus] = useState([] as any)
  const [showBotComplaints, setShowBotComplaints] = useState([] as any)
  const [brandPost, setBrandPost] = useState([] as any)
  const [spam, setSpam] = useState([] as any)
  const [deleted, setDeleted] = useState([] as any)
  const [handles, setHandles] = useState([] as any)
  const [selShowBotsComplaints, setSelShowBotsComplaints] = useState()
  const [selBrandPost, setSelBrandPost] = useState()
  const [selSpam, setSelSpam] = useState()
  const [selDeleted, setSelDeleted] = useState()
  const [selHandles, setSelHandles] = useState([] as any)

  const setModal = () => {
    setModalVisible(!modalVisible)
  }

  const onMediaPress = () => {
    setmediaDropdown(!isMediaDropdown)
    setModalVisible(!modalVisible)
    // setModal()
    // searchComplaintApi()
  }

  useEffect(() => {
    const mediaDetails = async () => {
      try {
        const res: any = await Api.get(`${configs.mediaList}`, token)
        if (res.status === 200) {
          // console.log('medialist', res.data.data);

          setMediaList(res.data.data)
          console.log('media details', res)
        }
      } catch (error) {
        console.error('Media Details', error)
      }
    }

    const dynamicFilter = async () => {
      try {
        const params = {
          client_id: clientDetails.client_id,
          group_id: CXP_COMPLAINT_LIST_CONTROLS,
        }
        // const res: any = await Api.get(`${configs.dynamicFilter}client_id=39&group_id=1`, token)
        const res: any = await Api.get(
          `${configs.dynamic_get_controls}`,
          token,
          params,
        )
        if (res.status === 200) {
          console.log('FilterRes', res)
          setShowBotComplaints(res.data.controls[0].lookup_data)
          setBrandPost(res.data.controls[1].lookup_data)
          setSpam(res.data.controls[2].lookup_data)
          setDeleted(res.data.controls[3].lookup_data)
          setHandles(res.data.controls[4].lookup_data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    dynamicFilter()
    mediaDetails()
  }, [token])

  const selectedItemItem = () => {
    console.log('selected Item')
  }

  // const setmediaId = (item: any, index: number) => {
  //   try {
  //     const isCheck = Boolean(
  //       mediaId.find((value: any) => {
  //         return value.medium_id === item.medium_id
  //       }),
  //     )
  //     const data: any = [...mediaId]
  //     if (!isCheck) {
  //       //  data.push(obj)
  //       data.splice(index, 0, { medium_id: item.medium_id })
  //     } else {
  //       const ind = data.indexOf(item.medium_id)
  //       data.splice(ind, 1)
  //     }
  //     setMediaId(data)
  //     console.log('mediumIdd', data)
  //   } catch (error) {
  //     console.log('setmediaId', error)
  //   }
  // }

  const onMediaSelect = (selData: any) => {
    try {
      // console.log("selmData", selData);

      // const selList = selData !== undefined && selData.length > 0 &&
      //   selData.map((item: any) => {
      //     return { "medium_id": item.value, "is_dm": false }
      //   })
      // console.log("selMediaList", selList);
      setSelMediaList(selData)

      // setmediaId(item, index)
      // const isCheck = Boolean(
      //   media.find((value: any) => {
      //     return value === item.medium_name
      //   }),
      // )

      // const data = [...media]
      // if (!isCheck) {
      //   data.splice(index, 0, item.medium_name)

      //   console.log('mediaselect', data)
      // } else {
      //   // remove item code
      //   const ind = data.indexOf(item.medium_name)
      //   data.splice(ind, 1)
      // }
      // setMedia(data)
      // props.setMediaFilter(data)
    } catch (error) {
      console.error('media select', error)
    }
    // onMediaPress()
  }

  const onPrioritySelect = (selData: any) => {
    // console.log('selPriority', selData)
    setSelPriority(selData)
  }

  const onStatausSelect = (selData: any) => {
    // console.log('statusSel', selData)
    setSelStatus(selData)
  }

  const onShowBotsComplaints = (val: any) => {
    setSelShowBotsComplaints(val.value)
    props.setFilterShowBotsComplaints(val.label)
    // console.log(val)
  }
  const onBrandPostSelect = (val: any) => {
    setSelBrandPost(val.value)
    props.setFilterBrandPost(val.label)
    // console.log(val)
  }
  const onSpamSelect = (val: any) => {
    setSelSpam(val.value)
    props.setFilterSpam(val.label)
    // console.log(val)
  }
  const onDeletedSelect = (val: any) => {
    setSelDeleted(val.value)
    props.setFilterDeleted(val.label)
    // console.log(val)
  }
  const onHandlesSelect = (val: any) => {
    // setSelHandles(val.value)
    const handleData: string[] = []
    handleData.push(val.value.toString())
    setSelHandles(handleData)
    // const setSelHandles = selHandles[0] = val.value
    // console.log("arr", arr)
    props.setFilterHandles(val.label)
  }

  const onSubmitFilter = () => {
    // selPriority
    // setStatus
    // const selMediaId = selMedia

    const selMediaId =
      selMedia !== undefined &&
      selMedia.length > 0 &&
      selMedia.map((item: any) => {
        return { medium_id: item.value, is_dm: false }
      })

    const setMediaName =
      selMedia !== undefined &&
      selMedia.length > 0 &&
      selMedia.map((item: any) => {
        return item.label
      })

    const setPriorityId =
      selPriority !== undefined &&
      selPriority.length > 0 &&
      selPriority.map((item: any) => {
        return item.value
      })

    const setPriorityName =
      selPriority !== undefined &&
      selPriority.length > 0 &&
      selPriority.map((item: any) => {
        return item.label
      })

    const setStatusId =
      setStatus !== undefined &&
      setStatus.length > 0 &&
      setStatus.map((item: any) => {
        return item.value
      })

    const setStatusName =
      setStatus !== undefined &&
      setStatus.length > 0 &&
      setStatus.map((item: any) => {
        return item.label
      })
    props.onClose()
    // console.log("selMediaId", selMediaId);
    // console.log("setMediaName", setMediaName);
    // console.log("setPriorityId", setPriorityId);
    // console.log("setPriorityName", setPriorityName);
    // console.log("setStatusId", setStatusId);
    // console.log("setStatusName", setStatusName);
    searchComplaintApi(selMediaId, setPriorityId, setStatusId)
    props.setMediaFilter(setMediaName)
    props.setPriorityFilter(setPriorityName)
    props.setStatusFilter(setStatusName)
    props.setFilterHeader()
  }

  const searchComplaintApi = async (
    mediaId: any,
    priority: any,
    status: any,
  ) => {
    try {
      const res: any = await searchComplaintsApi(
        token,
        pageSize,
        pageIndex,
        startDate,
        endDate,
        clientDetails && clientDetails.client_id,
        userDetails && userDetails.user_id,
        mediaId,
        priority,
        status,
        undefined,
        selShowBotsComplaints,
        selBrandPost,
        selSpam,
        selDeleted,
        selHandles,
      )
      if (res && res.status === 200) {
        props.setTikitData(res.data.data)
        props.setTotalRecords(res.data.total_records)
        // props.setPageIndex(pageIndex)
        // props.setPageSize(pageSize)
        // console.log('res.data', res.data.data)
      }
    } catch (error) {
      console.error(error)
    }
    // else {
    //   props.clearToken()
    // }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.dropdownStyle}>
          <Text style={styles.labeltext}>Medium</Text>
          <Pressable onPress={() => onMediaPress()}>
            <MediaDropdownList
              list={mediaList}
              onSelectValue={(val: any) => {
                onMediaSelect(val)
              }}
            />
          </Pressable>
        </View>
        <View style={styles.dropdownStyle}>
          <Text style={styles.labeltext}>Priority</Text>
          <MultipleDropdownList
            list={priorityDropdownList}
            onSelectValue={(val: any) => {
              onPrioritySelect(val)
            }}
          />
        </View>
        <View style={styles.dropdownStyle}>
          <Text style={styles.labeltext}>Status</Text>
          <StatusDropdownList
            list={statusDropdownList}
            onSelectValue={(val: any) => {
              onStatausSelect(val)
            }}
          />
        </View>
        <View style={styles.dropdownStyle}>
          <Text style={styles.labeltext}>Show Bots Complaints</Text>
          <DropdownList
            list={showBotComplaints}
            onSelectValue={(val: any) => {
              onShowBotsComplaints(val)
            }}
          />
        </View>
        <View style={styles.dropdownStyle}>
          <Text style={styles.labeltext}>Brand Post</Text>
          <DropdownList
            list={brandPost}
            onSelectValue={(val: any) => {
              onBrandPostSelect(val)
            }}
          />
        </View>
        <View style={styles.dropdownStyle}>
          <Text style={styles.labeltext}>Spam</Text>
          <DropdownList
            list={spam}
            onSelectValue={(val: any) => {
              onSpamSelect(val)
            }}
          />
        </View>
        <View style={styles.dropdownStyle}>
          <Text style={styles.labeltext}>Deleted</Text>
          <DropdownList
            list={deleted}
            onSelectValue={(val: any) => {
              onDeletedSelect(val)
            }}
          />
        </View>
        <View style={styles.dropdownStyle}>
          <Text style={styles.labeltext}>Handles</Text>
          <DropdownList
            list={handles}
            onSelectValue={(val: any) => {
              onHandlesSelect(val)
            }}
          />
        </View>
        <View style={{ marginHorizontal: '40%', marginVertical: '10%' }}>
          <Pressable onPress={onSubmitFilter} style={styles.buttonStyle}>
            <Text
              style={[
                styles.fontFamily,
                { justifyContent: 'center', color: '#fff' },
              ]}
            >
              Apply
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
    // </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    clientDetails: state.loginReducer.clientDetails,
    userDetails: state.loginReducer.userDetails,
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
    setPriorityFilter: (data: any) => {
      dispatch({ type: 'SELECTED_PRIORITY', payload: data })
    },
    setStatusFilter: (data: any) => {
      dispatch({ type: 'SELECTED_STATUS', payload: data })
    },
    setTotalRecords: (data: number) => {
      dispatch({ type: 'TOTAL_RECORDS', payload: data })
    },
    setTikitData: (data: any) => {
      dispatch({ type: 'TICKIT_LIST', payload: data })
    },
    setFilterHeader: () => {
      dispatch({ type: 'SET_FILTER_HEADER' })
    },
    setFilterShowBotsComplaints: (data: any) => {
      dispatch({ type: 'SHOW_BOTS_COMPLAINTS', payload: data })
    },
    setFilterBrandPost: (data: any) => {
      dispatch({ type: 'BRAND_POST', payload: data })
    },
    setFilterSpam: (data: any) => {
      dispatch({ type: 'SPAM', payload: data })
    },
    setFilterDeleted: (data: any) => {
      dispatch({ type: 'DELETED', payload: data })
    },
    setFilterHandles: (data: any) => {
      dispatch({ type: 'HANDLES', payload: data })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar)

const styles = StyleSheet.create({
  fontFamily: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    lineHeight: 28,
  },
  buttonStyle: {
    paddingVertical: '1%',
    paddingHorizontal: '15%',
    borderRadius: 25,
    borderColor: '#001163',
    backgroundColor: '#001163',
  },
  labeltext: {
    fontSize: 13,
    paddingVertical: '2%',
  },
  dropdownStyle: {
    marginVertical: '5%',
    marginHorizontal: '5%',
  },
})
