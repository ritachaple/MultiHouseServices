import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Template, ViewList } from '../Images/FilterHeader'
import { Filter } from '../Images/Header'

const RightComponent = (props: any) => {
  const { onFilterPress } = props
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
      }}
    >
      <View style={{ paddingRight: '20%' }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: 43,
            height: 39,
            borderWidth: 1,
            borderColor: '#D7D7D7',
            borderRadius: 6,
            justifyContent: 'center',
            paddingHorizontal: '35%',
          }}
        >
          <Filter />
        </View>
      </View>
      <View
        style={{
          borderLeftColor: '#DEDEDE',
          borderLeftWidth: 2,
          paddingRight: '20%',
        }}
      />
      <View style={{ paddingRight: '10%', flexDirection: 'row' }}>
        <View
          style={{
            backgroundColor: '#fff',
            width: 43,
            height: 39,
            borderWidth: 1,
            borderColor: '#D7D7D7',
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            justifyContent: 'center',
            paddingHorizontal: '12%',
          }}
        >
          <Template />
        </View>
        <View
          style={{
            backgroundColor: '#001163',
            width: 43,
            height: 39,
            borderWidth: 1,
            borderColor: '#D7D7D7',
            justifyContent: 'center',
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            borderLeftColor: '#001163',
            paddingHorizontal: '8%',
          }}
        >
          <ViewList />
        </View>
      </View>

      <View
        style={{ paddingRight: '20%', paddingLeft: '10%', paddingTop: '10%' }}
      >
        <Icon style={{}} name="ellipsis-v" size={15} color="#000" />
      </View>
    </View>
  )
}

export default RightComponent

const styles = StyleSheet.create({
  appButtonText: {
    fontSize: 10,
    alignSelf: 'center',
    color: '#000',
  },
})
