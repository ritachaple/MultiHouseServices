import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'

const BatchEditComplaints = (props: any) => {
  const { onPress } = props

  const [controlOption, setControlOption] = useState([])

  useEffect(() => {
    batchUpdateControlOption()
  }, [])

  const batchUpdateControlOption = async () => {
    try {
      const res: any = await Api.get(configs.batch_update_control_option)
      console.log('batchUpdateOptionRes', res)
      if (res.status) {
        setControlOption(res.data)
      }
    } catch (error) {
      console.log('batchUpdateControlOptionError', error)
    }
  }

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
          leftComponent={<Icon name="pencil" color="#fff" size={10} />}
          centerComponent={
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ color: '#fff', fontSize: 10 }}>
                Batch Edit Complaints
              </Text>
            </View>
          }
          rightComponent={
            <Icon name="close" color="#fff" size={10} onPress={onPress} />
          }
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#286090',
            borderWidth: 1,
            borderColor: '#286090',
            marginHorizontal: '40%',
            marginVertical: '2%',
            alignContent: 'center',
            padding: '1%',
            borderRadius: 5,
            justifyContent: 'center',
          }}
        >
          <Text style={[styles.appButtonText]}>save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BatchEditComplaints

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
})
