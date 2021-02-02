import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Header, Divider } from 'react-native-elements'

const NotificationModal = (props: any) => {
  const {
    onCancelPress,
    onOkPress,
    okBtnName,
    cancelBtnName,
    message,
    title,
  } = props
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Header
          containerStyle={{
            backgroundColor: '#018786',
            borderBottomColor: '#018786',
            borderTopEndRadius: 5,
            borderTopStartRadius: 5,
          }}
          centerComponent={
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>{title}</Text>
            </View>
          }
        />

        <View>
          <Text
            style={{
              fontSize: 12,
              marginHorizontal: '3%',
              paddingVertical: '3%',
            }}
          >
            {message}
          </Text>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginLeft: '20%',
            padding: '3%',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              onCancelPress()
            }}
            style={[
              styles.modalButton,
              { backgroundColor: '#fff', borderColor: '#8d8e91' },
            ]}
          >
            <Text style={[styles.buttonText, { color: '#4d7be8' }]}>
              {cancelBtnName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onOkPress()
            }}
            style={[
              styles.modalButton,
              { backgroundColor: '#4d7be8', borderColor: '#4d7be8' },
            ]}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>
              {okBtnName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default NotificationModal

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
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    width: '30%',
    height: '30%',
    marginHorizontal: '30%',
    marginTop: '5%',
  },
  appButtonText: {
    fontSize: 10,
    alignSelf: 'center',
    color: '#fff',
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
    fontSize: 10,
  },
})
