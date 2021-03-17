import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Chat from './Chat'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import Pagination from './Pagination'
import DropDownList from './DropDownList'
import ListComponent from './ListComponent'
import { UnChecked, Checked } from '../Images/Checkbox'
import { searchComplaintsApi } from '../CommnFncn/IntegrationAPI'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const headerName = [
  'Id',
  'Subject',
  'Raised By',
  'Raised at',
  'Status',
  'Sentiment',
  'Priority',
  'Assignee',
]

const SearchComplaints = (props: any) => {
  const {
    tickitItems,
    isHeaderSelect,
    startDate,
    endDate,
    navigation,
    token,
    pageIndex,
    pageSize,
  } = props

  const [tickit, setTickit] = useState([])
  // const [totalRecords, setTotalRecords] = useState(0)
  const [showHeaderListModal, seHeaderListModal] = useState(false)

  const [selectedHeader, setSelectedHeader] = useState(headerName)
  const horizontalFlatlist = true

  useEffect(() => {
    const dynamicControls = async () => {
      try {
        const res: any = await Api.get(
          `${configs.dynamic_get_controls}`,
          props.token,
        )
        if (res.status === 200 && res.data.controls !== null) {
          // console.log(' priority dropdown data', res.data.controls[4])
          // setPriority(res.data.controls[4])
          props.setAssigneeDropdownList(res.data.controls[4].lookup_data)
          props.setpriorityDropdown(res.data.controls[5].lookup_data)
        }
      } catch (error) {
        console.log('dynamic Control error', error)
      }
    }

    const unsubscribe = props.navigation.addListener('focus', () => {
      const searchComplaints = async () => {
        const res: any = await searchComplaintsApi(
          token,
          pageSize,
          pageIndex,
          startDate,
          endDate,
        )
        if (res && res.status === 200) {
          setTickit(res.data.data)
          props.setTikitData(res.data.data)
          props.setTotalRecords(res.data.total_records)
          props.setPageIndex(pageIndex)
          props.setPageSize(pageSize)
          console.log('res.data', res.data.data)
        } else {
          props.clearToken()
        }
      }

      const clearData = async () => {
        props.clearHeaderData()
      }
      searchComplaints()
      clearData()
      dynamicControls()
    })
    return unsubscribe
  }, [props, pageIndex, pageSize, token, endDate, startDate])

  const onCheckBox = () => {
    props.headerSelect(!isHeaderSelect)
  }

  const onPlusClick = () => {
    seHeaderListModal(!showHeaderListModal)
  }

  const onDropdownSelect = (item: any, index: any) => {
    try {
      const check = Boolean(
        selectedHeader.find((value: any) => {
          return value === item
        }),
      )
      console.log('checkHeader', check)
      console.log('selectedHeader', selectedHeader)

      if (!check) {
        console.log('false')
        const data = [...selectedHeader]
        data.splice(index, 0, item)
        // console.log(data)
        setSelectedHeader(data)
      }
    } catch (error) {
      console.error('dropdown errro', error)
    }
  }

  const onSortPress = (item: any, sort: any, ind: any) => {
    try {
      const header = [...headerName]
      const data = [...selectedHeader]
      const index = data.indexOf(item)
      data.splice(index, 1)
      headerName.splice(ind, 1)
      if (sort === '+') {
        // await
        data.splice(index - 1, 0, item)

        headerName.splice(ind - 1, 0, item)
      } else if (sort === '-') {
        // data.splice(index, 1)
        data.splice(index + 1, 0, item)
        headerName.splice(ind + 1, 0, item)
      }

      console.log('sortingData', data)
      setSelectedHeader(data)
      // props.selectedItem(item)
    } catch (error) {
      console.error('sorting error')
    }
  }

  const removeItem = (item: any) => {
    try {
      const data = [...selectedHeader]
      const index = data.indexOf(item)
      // console.log("index",index);
      data.splice(index, 1)
      // console.log("after deleted data", data);
      setSelectedHeader(data)
    } catch (error) {
      console.error(error)
    }
  }

  const headerList = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomColor: '#dce3de',
          borderBottomWidth: 0.1,
          paddingHorizontal: '1%',
          // paddingLeft: '1%',
          paddingVertical: '1%',
        }}
      >
        <TouchableOpacity onPress={() => onCheckBox()}>
          {isHeaderSelect ? <Checked /> : <UnChecked />}
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            // paddingLeft: '2%'
          }}
        >
          <FlatList
            contentContainerStyle={{
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: '1%',
              alignContent: 'center',
              justifyContent: 'space-between',
            }}
            horizontal={horizontalFlatlist}
            data={selectedHeader}
            renderItem={({ item, index }) => {
              // let flex = 1
              //  if( item === "Subject"){
              //   flex = 2
              //  }else{
              //   flex=1
              //  }

              return (
                // { check?
                // <Text style={{ flex: flex, textAlign: 'center' }}>{item}</Text>:
                <Text
                  style={[
                    {
                      flex: 1,
                      fontSize: 12,
                      fontFamily: 'Poppins-Light',
                      color: '#5A607F',
                    },
                  ]}
                >
                  {item}
                </Text>
              )
            }}
            keyExtractor={(index: any) => index.toString()}
          />
        </View>

        <Icon
          style={{
            paddingTop: 3,
          }}
          onPress={() => onPlusClick()}
          name="plus"
          size={15}
          color="grey"
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            borderRadius: 3,
            backgroundColor: '#fff',
          }}
        >
          <FlatList
            style={{
              flex: 1,
            }}
            data={tickitItems}
            renderItem={({ item }) => {
              //  console.log('renderItem item: ', item)
              return (
                <ListComponent
                  tickitItems={item}
                  selectedHeader={selectedHeader}
                  navigation={navigation}
                />
              )
            }}
            ListHeaderComponent={() => headerList()}
            keyExtractor={(index: any) => index.toString()}
          />
        </View>
      </ScrollView>
      {/* <Pagination navigation={navigation} /> */}
      <>
        <Modal
          style={{ flex: 1 }}
          animationType="none"
          transparent={showHeaderListModal}
          visible={showHeaderListModal}
        >
          <DropDownList>
            <Icon
              name="remove"
              onPress={onPlusClick}
              style={{ marginLeft: '90%', paddingTop: '1%' }}
              size={12}
              color="#000"
            />
            <FlatList
              style={{ flex: 1 }}
              data={headerName}
              renderItem={({ item, index }) => {
                const isCheck = Boolean(
                  selectedHeader.find((value: any) => {
                    return value === item
                  }),
                )
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      // backgroundColor: isCheck ? '#3498DB' : '#fff',
                      backgroundColor: '#fff',
                      borderBottomWidth: 0.2,
                      borderBottomColor: 'gray',
                    }}
                  >
                    <View
                      style={{
                        flex: 7,
                        justifyContent: 'flex-start',
                        padding: '0.5%',
                        flexDirection: 'row',
                      }}
                    >
                      <View style={{ paddingHorizontal: '1%' }}>
                        {' '}
                        {isCheck ? <Checked /> : <UnChecked />}
                      </View>
                      <Text onPress={() => onDropdownSelect(item, index)}>
                        {item}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '20%',
                        justifyContent: 'space-around',
                        paddingRight: '2%',
                      }}
                    >
                      <View>
                        {index > 1 && (
                          <Icon
                            name="arrow-up"
                            onPress={() => onSortPress(item, '+', index)}
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              paddingTop: '1%',
                            }}
                            size={12}
                            color="#000"
                          />
                        )}
                      </View>
                      <View>
                        {selectedHeader.length - 1 !== index && index > 0 && (
                          <Icon
                            name="arrow-down"
                            onPress={() => onSortPress(item, '-', index)}
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              paddingTop: '1%',
                            }}
                            size={12}
                            color="#000"
                          />
                        )}
                      </View>
                      <View>
                        {isCheck && index > 0 && (
                          <Icon
                            name="remove"
                            onPress={() => removeItem(item)}
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              paddingTop: '1%',
                            }}
                            size={12}
                            color="#000"
                          />
                        )}
                      </View>
                    </View>
                  </View>
                )
              }}
              keyExtractor={(index: any) => index.toString()}
            />
          </DropDownList>
        </Modal>
      </>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    tickitItems: state.tickitListData.tickitList,
    isHeaderSelect: state.headerData.isHeaderSelect,
    pageSize: state.Pagination.initialState.pageSize,
    pageIndex: state.Pagination.initialState.pageIndex,
    startDate: state.tickitListData.startDate,
    endDate: state.tickitListData.endDate,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    clearHeaderData: () => {
      dispatch({ type: 'CLEAR_HEADER' })
    },
    setTikitData: (data: any) => {
      dispatch({ type: 'TICKIT_LIST', payload: data })
    },
    headerSelect: (isSelectClick: any) => {
      dispatch({ type: 'IS_HEADER_SELECT', payload: isSelectClick })
    },
    clearToken: () => {
      dispatch({ type: 'CLEAR_LOGIN_TOKEN' })
    },
    setpriorityDropdown: (data: any) => {
      dispatch({ type: 'PRIORITY_LIST', payload: data })
    },
    setAssigneeDropdownList: (data: any) => {
      dispatch({ type: 'ASSIGNEE_LIST', payload: data })
    },
    setTotalRecords: (data: number) => {
      dispatch({ type: 'TOTAL_RECORDS', payload: data })
    },
    setPageIndex: (pageIndex: number) => {
      dispatch({ type: 'PAGE_INDEX', payload: pageIndex })
    },
    setPageSize: (pageSize: number) => {
      dispatch({ type: 'PAGE_SIZE', payload: pageSize })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComplaints)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:windowWidth,
    // width: windowHeight

    width: '100%',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00a3fe',
    padding: 10,
    width: '5%',
    height: '5%',
  },
})
