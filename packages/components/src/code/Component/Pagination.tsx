import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { searchComplaintsApi } from '../CommnFncn/IntegrationAPI'
import DropDownList from './DropDownList'

const Pagination = (props: any) => {
  const { pageSize, totalRecords, pageIndex, token, navigation } = props

  const [totalPageCount, setTotalPageCount] = useState(0)
  const [isModal, setModalOpen] = useState(false)
  const [noOfPages, setNoOfPages] = useState([] as any)

  useEffect(() => {
    // const unsubscribe = props.navigation.addListener('focus', () => {
    const totalPages = () => {
      const noOfPage: number = Math.ceil(totalRecords / pageSize)
      console.log('nonoOfPage', noOfPage)
      const count = []
      for (let itr = 1; itr < noOfPage + 1; itr + 1) {
        count.push(itr)
      }
      setNoOfPages(count)

      setTotalPageCount(noOfPage)
    }

    totalPages()
    // })
    // return unsubscribe
  }, [props, totalRecords, pageSize])

  const searchComplaints = async (pageInd: number, pgSize: number) => {
    try {
      const res: any = await searchComplaintsApi(token, pgSize, pageInd)
      if (res && res.status === 200) {
        props.setTikitData(res.data.data)
        props.setTotalRecords(res.data.total_records)
        // totalPages()
        // console.log('res.data', res.data.data)
      } else {
        props.clearToken()
      }
    } catch (error) {
      console.error('tickitList', error)
    }
  }

  const onPreviousPress = () => {
    searchComplaints(pageIndex - 1, pageSize)
    props.setPageIndex(pageIndex - 1)
  }

  const onNextPage = () => {
    searchComplaints(pageIndex + 1, pageSize)
    props.setPageIndex(pageIndex + 1)
  }

  const onPageIndexPress = () => {
    setModalOpen(!isModal)
  }

  const onPageSizePress = (page: number) => {
    onPageIndexPress()
    searchComplaints(page, pageSize)
    props.setPageIndex(page)
  }

  // const [pageIndex, setCurrentPage] = useState(1)

  // const onPageChanged = (operator: any) => {
  //   onPageChanged
  // }

  // const [totalRecords, setTotalRecords] = useState()
  return (
    <View style={[styles.container]}>
      {/* <View style={{ alignItems: 'flex-start' }}>
        <View
          style={{
            flexDirection: 'row',
            width: '25%',
            //   backgroundColor: 'pink',
            justifyContent: 'space-around',
          }}
        >
        <Text>{pageSize}</Text>
        </View>
      </View> */}
      <View style={{ flex: 5 }}>
        <Text> Total Records : {totalRecords}</Text>
      </View>
      <View style={[styles.rightContaint, { flex: 3, paddingRight: '2%' }]}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            //   backgroundColor: 'pink',
            justifyContent: 'space-around',
          }}
        >
          <View style={{ paddingTop: '1%' }}>
            <Pressable
              style={{ flexDirection: 'row' }}
              onPress={() => {
                onPageIndexPress()
              }}
            >
              <Text>Page</Text>
              <Text>{pageIndex}</Text>
              <Icon style={{ paddingTop: '8%' }} name="angle-down" size={15} />
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: '1%' }}>
            <Text>Rows Per Page</Text>
            <Text>{pageSize}</Text>
            <Icon style={{ paddingTop: '4%' }} name="angle-down" size={15} />
          </View>

          <View style={{ paddingTop: '1%' }}>
            <Text>1-10 of {totalRecords}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '10%',
              justifyContent: 'space-between',
            }}
          >
            <View style={styles.ArrowStyle}>
              {/* <Pressable disabled={ true: false}
         
         > */}
              {pageIndex === 1 ? (
                <Icon
                  style={{ opacity: 0.2 }}
                  name="angle-left"
                  color="#585353"
                  // onPress={() => onPreviousPress()}
                  size={20}
                />
              ) : (
                <Icon
                  name="angle-left"
                  color="#585353"
                  onPress={() => onPreviousPress()}
                  size={20}
                />
              )}
            </View>
            <View style={styles.ArrowStyle}>
              {/* {pageIndex === totalPageCount ? (
                <Icon
                  style={{ opacity: 0.2 }}
                  name="angle-right"
                  color="#585353"
                  size={20}
                />
              ) : ( */}
              <Icon
                name="angle-right"
                color="#585353"
                onPress={() => onNextPage()}
                size={20}
              />
              {/* )} */}
            </View>
          </View>
        </View>
      </View>
      <Modal
        style={{ flex: 1 }}
        animationType="none"
        transparent={isModal}
        visible={isModal}
      >
        <DropDownList>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 5 }} />
            <View style={{ flex: 1 }}>
              <Icon
                name="remove"
                onPress={() => onPageIndexPress()}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingTop: '1%',
                }}
                size={12}
                color="#000"
              />
            </View>
          </View>
          <FlatList
            style={{ flex: 1 }}
            data={noOfPages}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
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
                      paddingHorizontal: '1%',
                    }}
                  >
                    <Text
                      onPress={() => {
                        onPageSizePress(item)
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                </View>
              )
            }}
          />
        </DropDownList>
      </Modal>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    pageSize: state.Pagination.pageSize
      ? state.Pagination.pageSize
      : state.Pagination.initialState.pageSize,
    pageIndex: state.Pagination.pageIndex
      ? state.Pagination.pageIndex
      : state.Pagination.initialState.pageIndex,
    totalRecords: state.Pagination.totalRecords,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTikitData: (data: any) => {
      dispatch({ type: 'TICKIT_LIST', payload: data })
    },
    clearToken: () => {
      dispatch({ type: 'CLEAR_LOGIN_TOKEN' })
    },
    setPageIndex: (pageIndex: number) => {
      dispatch({ type: 'PAGE_INDEX', payload: pageIndex })
    },
    setPageSize: (pageSize: number) => {
      dispatch({ type: 'PAGE_SIZE', payload: pageSize })
    },
    setTotalRecords: (data: number) => {
      dispatch({ type: 'TOTAL_RECORDS', payload: data })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)

const styles = StyleSheet.create({
  rightContaint: {
    alignItems: 'flex-end',
  },
  container: {
    // flex:1,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    flexDirection: 'row',
    // textAlignVertical:"center"
  },
  ArrowStyle: {
    borderColor: '#DCDCDC',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: '30%',
    paddingVertical: '2%',
    marginHorizontal: '10%',
    elevation: 7,
    borderRadius: 6,
  },
})
