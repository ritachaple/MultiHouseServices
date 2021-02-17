import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { State } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'

const UserData = (props: any) => {
  const { token } = props

  const onUpdateUser = async () => {
    try {
      const body = {
        gender: 'F',
        twitter_id: 'KashyapGargee',
        user_id: 200360,
        email_id: '',
        location: 'Guwahati, India',
        facebook_id: '',
        first_name: 'Gargee',
        instagram_id: '',
        phone_number: '',
        whatsapp_number: '',
        last_name: 'Kashyap',
        custom_column: {
          policy_number: '',
        },
      }
      const res: any = await Api.put(`${configs.userUpdate}`, body, token)
      console.log('update user Res', res)
      if (res.status === 200) {
        console.log('user update successfully')
      }
    } catch (error) {
      console.error('update user Error', error)
    }
  }
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor:"steelblue",
        // padding: '1%',
        paddingVertical: '5%',
        paddingHorizontal: '10%',
        borderWidth: 1,
        borderRadius: 10,
        margin: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text>User Details</Text>
        <Icon onPress={onUpdateUser} name="window-close" size={20} />
      </View>
      <View
        style={{
          flex: 5,
          // justifyContent:"center",
          // alignItems:"center"
          // backgroundColor:"green"
        }}
      >
        {/* <TextInput placeholder="hello" style={{backgroundColor:'white', }}></TextInput> */}
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputField label="First Name" placeholder="First Name" />
          <InputField label="Last Name" placeholder="Last Name" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputField label="Email" placeholder="Email" />
          <InputField label="Phone Number" placeholder="Phone Number" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputField label="Location" placeholder="Location" />
          <InputField label="Whatsapp Number" placeholder="Whatsapp Number" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputField label="Facebook ID" placeholder="Facebook ID" />
          <InputField label="Twitter ID" placeholder="Twitter ID" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputField label="Instagram ID" placeholder="Instagram ID" />
          <InputField label="Policy Number" placeholder="Policy Number" />
        </View>
        {/* <View style={{flexDirection:'row',flex:1 ,justifyContent: 'space-between', alignItems:"center" }}>
            </View> */}
      </View>
      <View style={{ flex: 1 }} />
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
  }
}

export default connect(mapStateToProps)(UserData)

export const InputField = (props: any) => {
  const { label, placeholder } = props
  return (
    <View style={{ flex: 1, padding: '3%' }}>
      <Text>{label}</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 3,
          padding: '2%',
          width: '100%',
          // backgroundColor:
        }}
        placeholder={placeholder}
      />
    </View>
  )
}
