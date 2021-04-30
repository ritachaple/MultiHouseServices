import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'

const TimePicker = (props: any) => {
  const { startDate, endDate, startTime, endTime, name } = props
  const [options, setOptions] = useState([])
  // console.log('TimePicker, ', startDate, endDate)

  // propTypes: {
  // 	defaultValue: React.PropTypes.string,
  // 	onChange: React.PropTypes.func,
  // 	name: React.PropTypes.string,
  // 	beginLimit: React.PropTypes.string,
  // 	endLimit: React.PropTypes.string,
  // 	step: React.PropTypes.number
  // },

  const isEarlierThanEndLimit = (
    timeValue: any,
    endLimit: any,
    lastValue: any,
  ) => {
    const timeValueIsEarlier =
      moment(timeValue, 'h:mm A').diff(moment(endLimit, 'h:mm A')) < 0
    // console.log('timeValueIsEarlier: ',timeValueIsEarlier,' mm: ',moment(timeValue, 'h:mm A'),' end: ',moment(endLimit, 'h:mm A'));

    const timeValueIsLaterThanLastValue =
      lastValue === undefined
        ? true
        : moment(lastValue, 'h:mm A').diff(moment(timeValue, 'h:mm A')) < 0
    return timeValueIsEarlier && timeValueIsLaterThanLastValue
  }
  useEffect(() => {
    const { beginLimit, endLimit: endL, step: stp } = props
    let timeValue = beginLimit || '12:00 AM'
    let lastValue
    const endLimit = endL || '11:59 PM'
    const step = stp || 15
    const optionsSelect: any = []

    optionsSelect.push(<option value={timeValue}>{timeValue}</option>)

    while (isEarlierThanEndLimit(timeValue, endLimit, lastValue)) {
      lastValue = timeValue
      // console.log(
      //   timeValue,
      //   moment(timeValue, 'h:mm A').diff(moment(endLimit, 'h:mm A'), 'minutes'),
      // )
      timeValue = moment(timeValue, 'h:mm A')
        .add(step, 'minutes')
        .format('h:mm A')
      optionsSelect.push(
        <option key={timeValue} value={timeValue}>
          {timeValue}
        </option>,
      )
    }
    setOptions(optionsSelect)
  }, [])

  return (
    // return(
    <View>
      {/* <View style={{
        borderStyle: '1px solid ',
      }} ></View> */}
      <View style={{ paddingTop: '35%' }}>
        <Image
          source={{
            uri: 'https://unoboat.s3.ap-south-1.amazonaws.com/yelloflag.svg',
          }}
          style={{ width: '80%', height: '100%' }}
        />
        &nbsp;
      </View>
      <View style={{ paddingTop: '55%' }}>
        <Text
          style={{
            position: 'relative',
            color: '#001163',
            fontFamily: 'Poppins-Light',
            fontWeight: 'bold',
            // fontSize: '12px',
          }}
        >
          From
        </Text>
        <Text>{moment(startDate).format('DD MMM,yyyy')}</Text>
        <select
          className="cal-time-dropdown"
          defaultValue={startTime}
          onChange={(e) => {
            props.onChange(e, true)
          }}
          name={name}
          value={startTime}
        >
          {options}
        </select>
      </View>
      <View>
        <Text
          style={{
            position: 'relative',
            color: '#001163',
            fontFamily: 'Poppins-Light',
            fontWeight: 'bold',
            // fontSize: '12px',
          }}
        >
          To
        </Text>
        <Text
          style={{
            // position: 'relative',
            color: '#001163',
            fontFamily: 'Poppins-Light',
            fontWeight: 'bold',
            // fontSize: '12px',
          }}
        >
          {moment(endDate).format('DD MMM,yyyy')}
        </Text>
        <select
          className="cal-time-dropdown"
          defaultValue={endTime}
          onChange={(e) => {
            props.onChange(e, false)
          }}
          name={name}
          value={endTime}
        >
          {options}
        </select>
      </View>
    </View>

    // )
  )
}

export default TimePicker
const styles = StyleSheet.create({
  fromStyle: {
    position: 'absolute',
    fontFamily: 'Poppins-Light',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '28px',
    display: 'flex',
    alignItems: 'center',
  },
})
