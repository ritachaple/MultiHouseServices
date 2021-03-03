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
  const { tickitItems, isHeaderSelect } = props
  const [tickit, setTickit] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)
  const [showHeaderListModal, seHeaderListModal] = useState(false)

  const [selectedHeader, setSelectedHeader] = useState(headerName)
  const horizontalFlatlist = true

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      const searchComplaintsApi = async () => {
        try {
          const data = {
            client_id: 39,
            status: [],
            department: [],
            is_deleted: false,
            is_spam: false,
            to_date: '2021-02-24T11:24:06.108Z',
            from_date: '2021-02-10T09:24:06.108Z',
            custom_filter: null,
            customer_responded: null,
            page_size: 50,
            assigned_to: [],
            order_by: '1',
            sort_order: 'DESC',
            search_text: '',
            page_index: 1,
            agent_id: 5889,
          }
          // console.log('search_complaintsRes1')

          const res: any = await Api.post(
            configs.search_complaints,
            data,
            `${props.token}`,
          )
          // console.log('searchcomplaintsRes', res)
          if (res && res.status === 200) {
            setTickit(res.data.data)
            props.setTikitData(res.data.data)
            setTotalRecords(res.data.total_records)
            // console.log('res.data', res.data.data)
          } else {
            props.clearToken()
          }
        } catch (error) {
          console.log('error: ', error)
        }
      }

      const clearData = async () => {
        props.clearHeaderData()
      }
      searchComplaintsApi()
      clearData()
    })
    return unsubscribe
  }, [props])

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
          return value !== item
        }),
      )
      if (!check) {
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
          paddingVertical: '1%',
        }}
      >
        <Icon
          style={{
            paddingTop: 2,
          }}
          onPress={() => onCheckBox()}
          name={isHeaderSelect ? 'check-square-o' : 'square-o'}
          size={15}
          color="grey"
        />
        <View style={{ flex: 1, paddingLeft: '2%' }}>
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
              return (
                <Text style={{ flex: 1, textAlign: 'center' }}>{item}</Text>
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
              // //console.log('renderItem item: ', item)
              return (
                <ListComponent
                  tickitItems={item}
                  selectedHeader={selectedHeader}
                />
              )
            }}
            ListHeaderComponent={() => headerList()}
            keyExtractor={(index: any) => index.toString()}
          />
        </View>
      </ScrollView>
      <Pagination totalRecords={totalRecords} />
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
                      backgroundColor: isCheck ? '#3498DB' : '#fff',
                      borderBottomWidth: 0.2,
                      borderBottomColor: 'gray',
                    }}
                  >
                    <View
                      style={{
                        flex: 7,
                        justifyContent: 'flex-start',
                        padding: '0.5%',
                      }}
                    >
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
