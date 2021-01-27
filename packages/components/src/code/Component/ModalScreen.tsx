import React, { useState } from 'react'
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Divider } from 'react-native-elements'
import Chat from './Chat'

const ModalScreen = (props: any) => {
  const { closeModal } = props
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View
          style={{
            flex: 1,
            padding: '1%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            borderBottomColor: '#dce3de',
            borderBottomWidth: 0.1,
          }}
        >
          <Icon name="window-close" size={20} onPress={closeModal} />
        </View>
        <View style={{ flexDirection: 'row', flex: 15 }}>
          <View style={{ flex: 1 }}>Dropdown</View>
          <View style={styles.verticleLine} />
          <View style={{ flex: 5 }}>
            <Chat />
          </View>
        </View>
      </View>
    </View>
  )
}

export default ModalScreen

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    // borderRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
})
