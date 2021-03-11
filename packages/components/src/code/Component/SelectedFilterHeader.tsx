import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import SelectIcon from './SelectIcon'

const SelectedFilterHeader = (props: any) => {
  const { isHeaderSelect, selectedOneTickit } = props

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#E5E5E5',
        height: '9%',
        padding: '0.5',
        paddingLeft: '8%',
        borderTopColor: '#E5E5E5',
      }}
    >
      <View>{(isHeaderSelect || selectedOneTickit) && <SelectIcon />}</View>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isHeaderSelect: state.headerData.isHeaderSelect,
    selectedOneTickit: state.headerData.oneTickitSelect,
  }
}

export default connect(mapStateToProps)(SelectedFilterHeader)
