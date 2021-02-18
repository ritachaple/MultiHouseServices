import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect, useStore } from 'react-redux'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'

const UserData = (props: any) => {
  const { token } = props

  const [userData, SetUserData] = useState({
    gender: '',
    twitter_id: '',
    user_id: '',
    email_id: '',
    location: '',
    facebook_id: '',
    first_name: '',
    instagram_id: '',
    phone_number: '',
    whatsapp_number: '',
    last_name: '',
    custom_column: {},
  } as any)

  const [selected, setselected] = useState(userData.gender)

  const selectGender = [
    {
      id: 1,
      type: 'M',
      name: 'Male',
    },
    {
      id: 2,
      type: 'F',
      name: 'Female',
    },
    {
      id: 3,
      type: 'O',
      name: 'Other',
    },
  ]

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res: any = await Api.get(`${configs.getUserDetails}`, token)
        if (res.status === 200) {
          console.log('user details success', res)
          SetUserData(res.data.data)
        }
      } catch (error) {
        console.error('user details error', error)
      }
    }

    getUserDetails()
  }, [token])

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
        gender: userData.gender,
        twitter_id: userData.twitter_id,
        user_id: userData.user_id,
        email_id: userData.email_id,
        location: userData.location,
        facebook_id: userData.facebook_id,
        first_name: userData.first_name,
        instagram_id: userData.instagram_id,
        phone_number: userData.phone_number,
        whatsapp_number: userData.whatsapp_number,
        last_name: userData.last_name,
        custom_column: userData.custom_column,
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
        paddingVertical: '2%',
        paddingHorizontal: '10%',
        borderWidth: 1,
        borderRadius: 10,
        margin: '3%',
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
          flex: 9,
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
            paddingVertical: '2%',
          }}
        >
          <InputField
            label="First Name"
            defaultValue={userData.first_name ? userData.first_name : ''}
            onChangeText={(v: any) => storeDetails(v, 'first_name')}
          />
          <InputField
            label="Last Name"
            defaultValue={userData.last_name ? userData.last_name : ''}
            onChangeText={(v: any) => storeDetails(v, 'last_name')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: '2%',
          }}
        >
          <InputField
            label="Email"
            defaultValue={userData.email_id ? userData.email_id : ''}
            onChangeText={(v: any) => storeDetails(v, 'email_id')}
          />
          <InputField
            label="Phone Number"
            defaultValue={userData.phone_number ? userData.phone_number : ''}
            onChangeText={(v: any) => storeDetails(v, 'phone_number')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: '2%',
          }}
        >
          <InputField
            label="Location"
            defaultValue={userData.location ? userData.location : ''}
            onChangeText={(v: any) => storeDetails(v, 'location')}
          />
          <InputField
            label="Whatsapp Number"
            defaultValue={
              userData.whatsapp_number ? userData.whatsapp_number : ''
            }
            onChangeText={(v: any) => storeDetails(v, 'whatsapp_number')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: '2%',
          }}
        >
          <InputField
            label="Facebook ID"
            defaultValue={userData.facebook_id ? userData.facebook_id : ''}
            onChangeText={(v: any) => storeDetails(v, 'facebook_id')}
          />
          <InputField
            label="Twitter ID"
            defaultValue={userData.twitter_id ? userData.twitter_id : ''}
            onChangeText={(v: any) => storeDetails(v, 'twitter_id')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: '2%',
          }}
        >
          <InputField
            label="Instagram ID"
            defaultValue={userData.instagram_id ? userData.instagram_id : ''}
            onChangeText={(v: any) => storeDetails(v, 'instagram_id')}
          />
          <InputField
            label="Policy Number"
            defaultValue={userData.policyNumber ? userData.policyNumber : ''}
            onChangeText={(v: any) => storeDetails(v, 'policyNumber')}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: '53%',
            justifyContent: 'center',
            paddingVertical: '2%',
          }}
        >
          <Text>Gender</Text>
          <View style={{ flexDirection: 'row' }}>
            {selectGender.length > 0 ? (
              selectGender.map((item) => (
                <View style={{ flexDirection: 'row', marginRight: '5%' }}>
                  <Icon
                    name={selected === item.type ? 'dot-circle-o' : 'circle-o'}
                    size={16}
                    key={item.type}
                    onPress={() => setselected(item.type)}
                  />
                  <Text style={{ paddingLeft: '10%' }}>{item.name}</Text>
                </View>
              ))
            ) : (
              <></>
            )}
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
  const { label, placeholder, onChangeText, defaultValue } = props
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
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  )
}
