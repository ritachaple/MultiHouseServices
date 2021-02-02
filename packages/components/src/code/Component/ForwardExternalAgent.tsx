import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'

const ForwardExternalAgent = (props: any) => {
  const { onPress } = props

  const onSendPress = async () => {
    try {
      // const body={

      // }
      const res: any = await Api.post(configs.forward_to_external_agent)
      console.log('ForwardExternalAgentRes', res)
    } catch (error) {
      console.log('ForwardExternalAgentError', error)
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
          // leftComponent={<View><Text>Forward To External Agent</Text></View>}
          centerComponent={
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>
                Forward To External Agent
              </Text>
            </View>
          }
          rightComponent={
            <Icon name="close" color="#fff" size={10} onPress={onPress} />
          }
        />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            paddingVertical: '3%',
            paddingHorizontal: '2%',
          }}
        >
          <TextInput
            style={{
              color: '#424242',
              // borderRadius: 5,
              paddingHorizontal: '1%',
              width: '80%',
              borderColor: 'gray',
              borderWidth: 1,
            }}
            value=""
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#5bc0de',
              borderWidth: 1,
              borderColor: '#286090',
              marginHorizontal: '10%',
              // marginVertical: '2%',
              alignContent: 'center',
              padding: '2%',
              borderRadius: 5,
              justifyContent: 'center',
            }}
            //   onPress={() => onSendPress()}
          >
            <Text style={{ fontSize: 10, alignSelf: 'center', color: '#fff' }}>
              Send
            </Text>
          </TouchableOpacity>
          {/* </TouchableOpacity> */}
        </View>
      </View>
    </View>
  )
}

export default ForwardExternalAgent

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
})
