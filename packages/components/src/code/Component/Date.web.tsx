import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
// @ts-ignore
import { DateRange } from 'react-date-range'
import { searchComplaintsApi } from '../CommnFncn/IntegrationAPI'
import TimePicker from './TimePicker.web'

// CSS Modules, react-datepicker-cssmodules.css

const stDate = new Date()
stDate.setDate(stDate.getDate() - 15)

const ct = moment(stDate).format('hh:mm a')

const Example = (props: any) => {
  const { token, pageSize, pageIndex, clientDetails, userDetails } = props

  const [startDate, setStartDate] = useState(stDate)
  const [endDate, setEndDate] = useState(new Date())
  const [selectedDateTime, setSelectedDateTime] = useState(0)
  // const [startTime, setStartTime] = useState('12:00 AM')
  // const [endTime, setEndTime] = useState('12:00 PM')
  const [startTime, setStartTime] = useState(ct)
  const [endTime, setEndTime] = useState(ct)

  const [isVisible, setIsVisible] = useState(false)

  const [state, setState] = useState([
    {
      startDate,
      endDate,
      key: 'selection',
    },
  ])
  const [originaldatestate, setOriginaldatestate] = useState([
    {
      startDate,
      endDate,
      key: 'selection',
    },
  ])
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
      startDate.toISOString(),
      endDate.toISOString(),
      clientDetails && clientDetails.client_id,
      userDetails && userDetails.user_id,
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

  const handleSelect = (item: any) => {
    console.log('date selcted : ', item)
    setState([item.selection]) // changes only for view
    const sdd = item.selection.startDate
    const edd = item.selection.endDate
    // console.log("sdd", sdd.toISOString());
    // setStartDate(sdd.toISOString())
    // setEndDate(edd.toISOString())
    setStartDate(sdd)
    setEndDate(edd)
  }

  const showDatePicker = () => {
    setIsVisible(true)
  }
  const submitDatePicker = () => {
    props.onSubmit(state)
    setIsVisible(false)
    setOriginaldatestate([...state])
    const sd = state[0].startDate
    const ed = state[0].endDate
    // console.log("startDate", startDate.toISOString());
    tickitList()

    props.storeEndDate(ed.toISOString())
    props.storeStartDate(sd.toISOString())
  }
  const hideDatePicker = () => {
    setIsVisible(false)
    // props.onSubmit(originaldatestate);
    setState([...originaldatestate]) // changes only for view
  }
  const updateTime = (event: any, isStartDate: boolean) => {
    // console.log(
    //   'updateTime TimePicker onChange: ',
    //   event.target.value,
    //   ' isStartDate: ',
    //   isStartDate,
    // )
    if (isStartDate) {
      setStartTime(event.target.value)
    } else {
      setEndTime(event.target.value)
    }
  }
  return (
    <View style={{}}>
      {isVisible ? (
        <View
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 8,
            padding: '2%',
            width: '110%',
            elevation: 6,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            backgroundColor: '#fff',
          }}
        >
          <View style={{ flexDirection: 'row', flex: 1 }}>
            {console.log('render : ', state)}

            {/* // <View style={{ flexDirection: 'row', paddingLeft: '4%' }}>
    //   <View style={styles.calenderStyle}> */}
            <View>
              <DateRange
                // style={{fontFamily: 'Poppins-Light'}}
                onChange={(item: any) => {
                  console.log('onChange: ', item)
                  handleSelect(item)
                }}
                showSelectionPreview={false}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={state}
                direction="horizontal"
                showMonthAndYearPickers={false}
                showPreview={false}
                showDateDisplay={false}
                inputRanges={[]}
                staticRanges={[]}
                maxDate={new Date()}
              />
            </View>
            <View>
              <TimePicker
                {...state[0]}
                startTime={startTime}
                endTime={endTime}
                onChange={updateTime}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              borderTopColor: '#E1E1E1',
              borderTopWidth: 1,
              paddingVertical: 20,
              backgroundColor: '#fff',
              paddingRight: '10%',
            }}
          >
            <TouchableOpacity
              onPress={hideDatePicker}
              style={styles.buttonStyle}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={submitDatePicker}
              style={[styles.buttonStyle, styles.submitButton]}
            >
              <Text style={[styles.textStyle, { color: '#fff' }]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            borderColor: '#F1F6FF',
            backgroundColor: '#fff',
            width: '110%',
            borderWidth: 1,
            borderRadius: 100,
            paddingVertical: '4%',
            paddingHorizontal: '4%',

            // fontFamily: 'Poppins-Light',
          }}
        >
          <TouchableOpacity onPress={showDatePicker}>
            {/* <View></View> */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  flex: 12,
                }}
              >
                <Image
                  source={{
                    uri:
                      'https://unoboat.s3.ap-south-1.amazonaws.com/calendar.svg',
                  }}
                  style={{
                    width: '15px',
                    height: '15px',
                    // paddingRight: '15px',
                    marginHorizontal: 4,
                  }}
                />
                {moment(state[0].startDate).format('DD MMM,yyyy')},{startTime} -{' '}
                {moment(state[0].endDate).format('DD MMM,yyyy')},{endTime}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
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
    clientDetails: state.loginReducer.clientDetails,
    userDetails: state.loginReducer.userDetails,
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
    borderColor: '#F1F6FF',
    borderRadius: 100,
    marginHorizontal: '1%',
    color: '#5A607F',
  },
  buttonStyle: {
    paddingVertical: '1%',
    paddingHorizontal: '5%',
    borderRadius: 25,
  },
  submitButton: {
    borderColor: '#001163',
    backgroundColor: '#001163',
  },
  textStyle: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    lineHeight: 28,
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Example)
