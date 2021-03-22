import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import { searchComplaintsApi } from '../CommnFncn/IntegrationAPI'
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// @ts-ignore
import { DateRangePicker, DateRange } from 'react-date-range';
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
const TimePicker = ({ startDate, endDate }: { startDate: Date, endDate: Date }) => {
  console.log('TimePicker, ', startDate, endDate);

  return (<View>
    <View>
      <Text>From</Text>
      {format(startDate, 'dd LLL,yyyy')}
    </View>
    <View>
      <Text>To</Text>
      {format(endDate, 'dd LLL,yyyy')}
    </View>
  </View>)
}
const stDate = new Date()
stDate.setDate(stDate.getDate() - 15)

const Example = (props: any) => {
  const { token, pageSize, pageIndex } = props

  const [startDate, setStartDate] = useState(stDate)
  const [endDate, setEndDate] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  const [state, setState] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: 'selection'
    }
  ]);
  const [originaldatestate, setOriginaldatestate] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: 'selection'
    }
  ]);
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

  const handleSelect = (item: any) => {
    console.log('date selcted : ', item);
    setState([item.selection]); // changes only for view
  }
  const showDatePicker=()=>{
      setIsVisible(true);
  }
  const submitDatePicker=()=>{
    props.onSubmit(state);
    setIsVisible(false);
    setOriginaldatestate([...state]);
  }
  const hideDatePicker=()=>{
    setIsVisible(false);
    // props.onSubmit(originaldatestate);
    setState([...originaldatestate]); // changes only for view
  }
  return (
    <View>

 {isVisible ?<View>
        <View style={{ backgroundColor: '#fff', flexDirection: 'row', flex: 1 }}>
          {console.log('render : ', state)}

          {/* // <View style={{ flexDirection: 'row', paddingLeft: '4%' }}>
    //   <View style={styles.calenderStyle}> */}
          <View>
            <DateRange
              onChange={(item: any) => {
                console.log('onChange: ', item);
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
            />
          </View>
          <View>
            <TimePicker {...state[0]} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end',borderTopColor:'#E1E1E1',borderTopWidth:1,
      paddingVertical:20,backgroundColor:'#fff' }}>
          <TouchableOpacity onPress={hideDatePicker}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={submitDatePicker}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>:<TouchableOpacity onPress={showDatePicker}>{format(state[0].startDate, 'dd LLL,yyyy')}-{format(state[0].endDate, 'dd LLL,yyyy')}</TouchableOpacity>
}
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
    borderColor: '#F1F6FF',
    borderRadius: 100,
    marginHorizontal: '1%',
    color: '#5A607F',
  },
})
export default connect(mapStateToProps, mapDispatchToProps)(Example)
