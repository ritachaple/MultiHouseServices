import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import { searchComplaintsApi } from '../CommnFncn/IntegrationAPI'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const stDate = new Date()
stDate.setDate(stDate.getDate() - 15)

const Example = (props: any) => {
  const { token, pageSize, pageIndex } = props

  const [startDate, setStartDate] = useState(stDate)
  const [endDate, setEndDate] = useState(new Date())

  useEffect(() => {
    const ed = endDate.toISOString()
    const sd = startDate.toISOString()
    props.storeEndDate(ed)
    props.storeStartDate(sd)
  }, [props, startDate, endDate])

  const onStartDate = (date: any) => {
    // console.log("date",date);
    const sd = date.toISOString()
    // console.log("date1",date1);
    setStartDate(date)
    props.storeStartDate(sd)
  }

  const tickitList = async () => {
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
      props.setPageIndex(pageIndex)
      props.setPageSize(pageSize)
      // console.log('res.data', res.data.data)
    } else {
      props.clearToken()
    }
  }

  const onEndDate = (date: any) => {
    const ed = date.toISOString()
    setEndDate(date)
    props.storeEndDate(ed)
    tickitList()
  }

  return (
    <View style={{ flexDirection: 'row', paddingLeft: '4%' }}>
      <View style={styles.calenderStyle}>
        <DatePicker
          selected={startDate}
          onChange={(date) => onStartDate(date)}
          timeInputLabel="Time:"
          dateFormat="dd MMM, yyyy h:mm aa"
          showTimeInput
        />
      </View>
      <View style={styles.calenderStyle}>
        <DatePicker
          minDate={startDate}
          selected={endDate}
          onChange={(date) => onEndDate(date)}
          timeInputLabel="Time:"
          dateFormat="dd MMM, yyyy h:mm aa"
          showTimeInput
        />
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
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    storeStartDate: (data: any) => {
      dispatch({ type: 'START_DATE', payload: data })
    },
    storeEndDate: (data: any) => {
      dispatch({ type: 'END_DATE', payload: data })
    },
    setTikitData: (data: any) => {
      dispatch({ type: 'TICKIT_LIST', payload: data })
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

const styles = StyleSheet.create({
  calenderStyle: {
    paddingHorizontal: '1%',
    paddingVertical: '1%',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderRadius: 100,
    marginHorizontal: '1%',
    color: '#5A607F',
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Example)
