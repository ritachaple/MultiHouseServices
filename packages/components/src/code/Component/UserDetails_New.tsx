import React, { useState } from 'react'
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
import { connect, useStore } from 'react-redux'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'

const UserData = (props: any) => {
  const { token } = props

  const [userData, SetUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    locaiton: '',
    whatsappNumber: '',
    fecebookID: '',
    twitterID: '',
    instgramID: '',
    policyNumber: '',
  } as any)

  const storeDetails = (v: any, field: any) => {
    console.log('field', v)
    const str = { ...userData }
    str[field] = v
    console.log('details', str)
    SetUserData(str)
  }

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
          paddingHorizontal: '3%',
        }}
      >
        <Text style={{ fontSize: 22 }}>User Details</Text>
        <Icon name="window-close" size={20} />
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
          <InputField
            label="First Name"
            onChangeText={(v: any) => storeDetails(v, 'firstName')}
          />
          <InputField
            label="Last Name"
            onChangeText={(v: any) => storeDetails(v, 'lastName')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputField
            label="Email"
            onChangeText={(v: any) => storeDetails(v, 'email')}
          />
          <InputField
            label="Phone Number"
            onChangeText={(v: any) => storeDetails(v, 'phoneNumber')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputField
            label="Location"
            onChangeText={(v: any) => storeDetails(v, 'location')}
          />
          <InputField
            label="Whatsapp Number"
            onChangeText={(v: any) => storeDetails(v, 'whatsappNumber')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputField
            label="Facebook ID"
            onChangeText={(v: any) => storeDetails(v, 'fecebookID')}
          />
          <InputField
            label="Twitter ID"
            onChangeText={(v: any) => storeDetails(v, 'twitterID')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InputField
            label="Instagram ID"
            onChangeText={(v: any) => storeDetails(v, 'instgramID')}
          />
          <InputField
            label="Policy Number"
            onChangeText={(v: any) => storeDetails(v, 'policyNumber')}
          />
        </View>
        <View style={{ flex: 1, marginLeft: '53%', justifyContent: 'center' }}>
          <Text>Gender</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', marginRight: '5%' }}>
              <Icon name="circle-o" size={16} />
              <Text style={{ paddingLeft: '10%' }}>Male</Text>
            </View>
            <View style={{ flexDirection: 'row', marginRight: '5%' }}>
              <Icon name="circle-o" size={16} />
              <Text style={{ paddingLeft: '10%' }}>Female</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="circle-o" size={16} />
              <Text style={{ paddingLeft: '10%' }}>Other</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          // onPress={()=>console.log('userDetails:',userData)}
          onPress={onUpdateUser}
          style={{
            backgroundColor: '#6056b8',
            borderRadius: 3,
            borderColor: '#000',
            borderWidth: 1,
            paddingVertical: '0.5%',
            paddingHorizontal: '2%',
            flexDirection: 'row',
            // width: '9%'
          }}
        >
          <Text style={{ fontSize: 15, alignSelf: 'center', color: '#fff' }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
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
  const { label, placeholder, onChangeText } = props
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
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  )
}
