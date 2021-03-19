import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import SelectIcon from './SelectIcon'

const SelectedFilterHeader = (props: any) => {
  const { isHeaderSelect, selectedOneTickit } = props

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#F1F6FF',
        // height: '9%',
        padding: '0.5',
        // paddingLeft: '4%',
        borderTopColor: '#F1F6FF',
      }}
    >
      {isHeaderSelect || selectedOneTickit ? (
        <View style={{ marginLeft: '8%' }}>
          <SelectIcon />
        </View>
      ) : (
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
            <Text style={styles.textStyle}>Medium</Text>
          </View>
          <View style={styles.filterBox}>
            <Text style={styles.textStyle}>Medium</Text>
          </View>
          <View style={styles.filterBox}>
            <Text style={styles.textStyle}>Medium</Text>
          </View>
        </View>
      )}
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
    paddingVertical: '3%',
    marginVertical: '3%',
    marginHorizontal: '4%',
  },
})
