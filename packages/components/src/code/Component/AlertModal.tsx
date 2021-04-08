import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
// import {  } from 'react-native-elements'

const AlertModal = (props: any) => {
  const { onPress, onSaveClick, message } = props
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View>
          <Text style={{ fontSize: 15, color: 'gray', paddingLeft: '3%' }}>
            Confirmation
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 12,
                color: 'gray',
                paddingLeft: '3%',
                paddingVertical: '2%',
              }}
            >
              {message}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginLeft: '40%',
            padding: '3%',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onSaveClick()
            }}
            style={[
              styles.modalButton,
              { backgroundColor: '#4d7be8', borderColor: '#4d7be8' },
            ]}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>OK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onPress()
            }}
            style={[
              styles.modalButton,
              { backgroundColor: '#fff', borderColor: '#8d8e91' },
            ]}
          >
            <Text style={[styles.buttonText, { color: '#4d7be8' }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default AlertModal

const styles = StyleSheet.create({
  modalView: {
    padding: '3%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    width: '35%',
    height: '40%',
    marginHorizontal: '30%',
    marginTop: '1%',
  },
  modalButton: {
    borderWidth: 1,
    marginRight: '10%',
    alignContent: 'center',
    // padding: '10%',
    paddingHorizontal: '20%',
    paddingVertical: '6%',
    borderRadius: 4,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 13,
  },
})
