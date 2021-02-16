import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const UserData = () => {
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

export default UserData

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
