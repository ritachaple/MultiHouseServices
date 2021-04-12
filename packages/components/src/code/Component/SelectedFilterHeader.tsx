import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import SelectIcon from './SelectIcon'
import { searchComplaintsApi } from '../CommnFncn/IntegrationAPI'

const SelectedFilterHeader = (props: any) => {
  const {
    isHeaderSelect,
    selectedOneTickit,
    status,
    priority,
    medium,
    token,
    pageSize,
    pageIndex,
    startDate,
    endDate,
  } = props

  const [filter, setFilter] = useState(true)

  useEffect(() => {
    // clearMedium()
  }, [])

  const clearFilter = () => {
    searchComplaints()
    props.clearMedium()
    props.clearStatus()
    props.clearPriority()
    props.clearHeaderFilter()
    setFilter(false)
  }

  const searchComplaints = async () => {
    const res: any = await searchComplaintsApi(
      token,
      pageSize,
      pageIndex,
      startDate,
      endDate,
    )
    if (res && res.status === 200) {
      // setTickit(res.data.data)
      props.setTikitData(res.data.data)
      props.setTotalRecords(res.data.total_records)
      // props.setPageIndex(pageIndex)
      // props.setPageSize(pageSize)
      console.log('res.data', res.data.data)
    } else {
      props.clearToken()
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#F1F6FF',
        // height: '9%',
        // padding: '0.5',
        paddingHorizontal: '0.5',
        // paddingTop: 4,
        paddingBottom: '0.5',
        // paddingLeft: '4%',
        borderTopColor: '#F1F6FF',
      }}
    >
      {isHeaderSelect || selectedOneTickit ? (
        <View style={{ marginLeft: '8%' }}>
          <SelectIcon />
        </View>
      ) : (
        filter && (
          <View
            style={{
              // paddingVertical:"1%",
              flexDirection: 'row',
              paddingLeft: '1%',
              // alignContent:"center",
              // paddingTop:"1%"
            }}
          >
            <View style={{ marginVertical: '5%' }}>
              <Text
                style={[styles.textStyle, { color: '#000', fontWeight: '400' }]}
              >
                Applied Filters :
              </Text>
            </View>
            <View style={styles.filterBox}>
              <Text style={styles.textStyle}>Medium: </Text>
              <View style={{ flexDirection: 'row' }}>
                {medium !== undefined && medium.length > 0 ? (
                  medium.slice(0, 2).map((item: any, i: number) => {
                    return (
                      <Text style={[styles.textStyle, styles.selectedFilter]}>
                        {item}
                      </Text>
                    )
                  })
                ) : (
                  <Text style={[styles.textStyle, styles.selectedFilter]}>
                    All
                  </Text>
                )}
              </View>
              <Icon
                style={[styles.iconStyle, styles.textStyle]}
                name="close"
                color="#4d4d4d"
                size={15}
                onPress={() => {
                  props.clearMedium()
                }}
              />
            </View>
            <View style={styles.filterBox}>
              <Text style={styles.textStyle}>Priority:</Text>
              <View style={{ flexDirection: 'row' }}>
                {priority !== undefined && priority.length > 0 ? (
                  priority.map((item: any, i: number) => {
                    return (
                      <Text style={[styles.textStyle, styles.selectedFilter]}>
                        {item}
                      </Text>
                    )
                  })
                ) : (
                  <Text style={[styles.textStyle, styles.selectedFilter]}>
                    All
                  </Text>
                )}
              </View>
              {/* <Text style={[styles.textStyle, styles.selectedFilter]}>

                {priority || 'All'}
              </Text> */}
              <Icon
                style={[styles.iconStyle, styles.textStyle]}
                name="close"
                color="#4d4d4d"
                size={15}
                onPress={() => {
                  props.clearPriority()
                }}
              />
            </View>
            <View style={styles.filterBox}>
              <Text style={styles.textStyle}>Status:</Text>
              {/* <Text style={[styles.textStyle, styles.selectedFilter]}>
                {status || 'All'}
              </Text> */}
              <View style={{ flexDirection: 'row' }}>
                {status !== undefined && status.length > 0 ? (
                  status.map((item: any, i: number) => {
                    return (
                      <Text style={[styles.textStyle, styles.selectedFilter]}>
                        {item}
                      </Text>
                    )
                  })
                ) : (
                  <Text style={[styles.textStyle, styles.selectedFilter]}>
                    All
                  </Text>
                )}
              </View>
              <Icon
                style={[styles.iconStyle, styles.textStyle]}
                name="close"
                color="#4d4d4d"
                size={15}
                onPress={() => {
                  props.clearStatus()
                }}
              />
            </View>

            <View style={{ marginVertical: '5%' }}>
              <TouchableOpacity
                onPress={() => {
                  clearFilter()
                }}
              >
                <Text
                  style={[
                    styles.textStyle,
                    { color: '#1968FF', fontWeight: '400' },
                  ]}
                >
                  clear filters
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      )}
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    isHeaderSelect: state.headerData.isHeaderSelect,
    selectedOneTickit: state.headerData.oneTickitSelect,
    medium: state.Filter.medium,
    priority: state.Filter.priority,
    status: state.Filter.status,
    pageSize: state.Pagination.initialState.pageSize,
    pageIndex: state.Pagination.initialState.pageIndex,
    startDate: state.tickitListData.startDate,
    endDate: state.tickitListData.endDate,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    clearMedium: () => {
      dispatch({ type: 'CLEAR_SELECTED_MEDIUM' })
    },
    clearPriority: () => {
      dispatch({ type: 'CLEAR_SELECTED_PRIORITY' })
    },
    clearStatus: () => {
      dispatch({ type: 'CLEAR_SELECTED_STATUS' })
    },
    setTotalRecords: (data: number) => {
      dispatch({ type: 'TOTAL_RECORDS', payload: data })
    },
    setTikitData: (data: any) => {
      dispatch({ type: 'TICKIT_LIST', payload: data })
    },
    clearHeaderFilter: () => {
      dispatch({ type: 'CLEAR_FILTER_HEADER' })
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedFilterHeader)

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
  filterBox: {
    borderRadius: 50,
    borderColor: '#CCD8EB',
    borderWidth: 1,
    alignContent: 'center',
    paddingHorizontal: '7%',
    paddingVertical: '2%',
    marginVertical: '3%',
    marginHorizontal: '4%',
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'space-around',
  },
  iconStyle: {
    paddingHorizontal: '10%',
    paddingTop: '2%',
  },
  selectedFilter: {
    paddingHorizontal: '3%',
    fontWeight: '700',
    // paddingTop:"1%"
    // alignContent:"center"
    // paddingVertical:"1%"
  },
})
