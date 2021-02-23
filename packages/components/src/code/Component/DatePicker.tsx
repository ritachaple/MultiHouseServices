import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import moment from 'moment'
// import I18n from 'react-native-i18n';
import { Calendar } from 'react-native-calendars'

const DatePicker = () => {
  //  let date= new Date()
  //   date = moment(date).format('YYYY-MM-DD')
  const [dob, setdob] = useState('2021-02-23')
  const [selectedYear, setselectedYear] = useState('')
  const [selected, setselected] = useState('')
  const [showBirthPicker, setshowBirthPicker] = useState(false)

  const showBirthYear = () => {
    try {
      const date = moment(selectedYear).format('YYYY-MM-DD')
      setselected(date)
      setshowBirthPicker(true)
    } catch (error) {
      console.error(error)
    }
  }

  const onDayPress = (dayy: any) => {
    try {
      const day = moment(dayy.dateString).format('DD')
      const month = moment(dayy.dateString).format('MM')
      const year = moment(dayy.dateString).format('YYYY')
      const selectYear = `${year}-${month}-${day}`
      setselected(dayy.dateString)
      setselectedYear(selectYear)
      setdob(selectYear)
    } catch (error) {
      console.error(error)
    }
  }

  const onCloseModal = () => {
    try {
      setshowBirthPicker(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => {
          showBirthYear()
        }}
      >
        <Text
          style={[
            dob !== '0000-00-00' && dob !== null && dob !== ''
              ? { color: 'black' }
              : { color: '#d3d3d3' },
            {
              paddingVertical: 20,
            },
          ]}
        >
          {dob !== '0000-00-00' && dob !== null && dob !== '' ? dob : dob}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={showBirthPicker}
        //   onBackdropPress={()=>{
        //     this.onCloseModal();
        //   }}
        style={{
          marginHorizontal: '12%',
        }}
      >
        <View style={{ backgroundColor: '#fff' }}>
          <Calendar
            // style={[styles.calendar]}
            minDate="1944-12-31"
            maxDate="2022-12-31"
            current={new Date()}
            hideExtraDays
            onDayPress={onDayPress}
            // language={i18n.locale}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
            onOkPress={() => {
              onCloseModal()
            }}
          />
        </View>
      </Modal>
    </View>
  )
}

export default DatePicker
