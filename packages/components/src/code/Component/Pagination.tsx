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
import { PaginationList } from './ReactSelect'

const rowPerPage = [10, 15, 20, 25, 30]

const Pagination = (props: any) => {
  const {
    pageSize,
    totalRecords,
    pageIndex = 1,
    token,
    navigation,
    startDate,
    endDate,
  } = props

  const [totalPageCount, setTotalPageCount] = useState(0)
  const [noOfPages, setNoOfPages] = useState([] as any)
  const [isNoOfPages, setToglePagesList] = useState(false)
  const [isRowsPerPage, setToggleRowsList] = useState(false)

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      totalPages(pageSize)
    })
    return unsubscribe
  }, [])

  const totalPages = (pgsize: number) => {
    const noOfPage: number = Math.ceil(totalRecords / pgsize)
    const array = [...Array(noOfPage + 1).keys()]
    array.shift()
    setNoOfPages(array)
    setTotalPageCount(noOfPage)
  }

  const searchComplaints = async (pageInd: number, pgSize: number) => {
    try {
      const res: any = await searchComplaintsApi(
        token,
        pgSize,
        pageInd,
        startDate,
        endDate,
      )
      if (res && res.status === 200) {
        props.setTikitData(res.data.data)
        props.setTotalRecords(res.data.total_records)
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

  const onPageSizePress = (page: any) => {
    console.log('pagesindex', page)
    setToglePagesList(false)
    searchComplaints(page.value, pageSize)
    props.setPageIndex(page.value)
  }

  const onRowsSelect = async (selData: any) => {
    props.setPageSize(selData.value)
    setToggleRowsList(false)
    await searchComplaints(pageIndex, selData.value)
    totalPages(selData.value)
  }

  return (
    <View style={[styles.container]}>
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
          <View style={{ paddingTop: '1%', flexDirection: 'row' }}>
            <Text>Page</Text>
            {!isNoOfPages ? (
              <Pressable
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  setToglePagesList(true)
                }}
              >
                <Text>{pageIndex}</Text>
                <Icon
                  style={{ paddingTop: '8%' }}
                  name="angle-down"
                  size={15}
                />
              </Pressable>
            ) : (
              <PaginationList
                list={noOfPages}
                onSelectValue={(value: any) => onPageSizePress(value)}
              />
            )}
          </View>
          <View style={{ flexDirection: 'row', paddingTop: '1%' }}>
            <View>
              <Text>Rows Per Page</Text>
            </View>
            {!isRowsPerPage ? (
              <Pressable
                style={{ flexDirection: 'row', paddingHorizontal: '1%' }}
                onPress={() => {
                  setToggleRowsList(true)
                }}
              >
                <Text>{pageSize}</Text>
                <Icon
                  style={{ paddingTop: '4%' }}
                  name="angle-down"
                  size={15}
                />
              </Pressable>
            ) : (
              <PaginationList
                list={rowPerPage}
                onSelectValue={(value: any) => onRowsSelect(value)}
              />
            )}
          </View>

          <View style={{ paddingTop: '1%' }}>
            <Text>
              {pageIndex}-{pageSize} of {totalRecords}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '10%',
              justifyContent: 'space-between',
            }}
          >
            <View style={styles.ArrowStyle}>
              {pageIndex === 1 ? (
                <Icon
                  style={{ opacity: 0.2 }}
                  name="angle-left"
                  color="#585353"
                  onPress={() => onPreviousPress()}
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
              {pageIndex === totalPageCount ? (
                <Icon
                  style={{ opacity: 0.2 }}
                  name="angle-right"
                  color="#585353"
                  size={20}
                />
              ) : (
                <Icon
                  name="angle-right"
                  color="#585353"
                  onPress={() => onNextPage()}
                  size={20}
                />
              )}
            </View>
          </View>
        </View>
      </View>
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
    startDate: state.tickitListData.startDate,
    endDate: state.tickitListData.endDate,
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
