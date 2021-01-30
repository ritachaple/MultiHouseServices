import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  Alert,
  StyleSheet,
} from 'react-native'
import { Header } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import BatchEditComplaints from './BatchEditComplaints'
import IconButton from './IconButton'

const SelectIcon = () => {
  const onEditClick = () => {
    setModalVisible(!modalVisible)
  }

  const [modalVisible, setModalVisible] = useState(false)

  const onCloseIconModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <View style={{ paddingLeft: '8%', flexDirection: 'row' }}>
      <View>
        <IconButton
          name="pencil"
          onPress={() => {
            onEditClick()
          }}
        />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="share" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="trash" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="hand-paper-o" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="chain" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="envelope-open-o" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="ban" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="archive" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="lastfm" />
      </View>

      <Modal
        animationType="fade"
        transparent={modalVisible}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}
      >
        <BatchEditComplaints
          onPress={() => {
            onCloseIconModal()
          }}
        />
      </Modal>
    </View>
  )
}

export default SelectIcon

const styles = StyleSheet.create({
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    // padding: 1,
    // alignItems: "center",
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
