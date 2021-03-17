import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Input } from 'react-native-elements'
import { connect } from 'react-redux'
import Api from '../../provider/api/Api'
import { configs } from '../../provider/api/ApiUrl'
import SideBar from '../../Component/SideBar'
import Whatsapp from '../../Component/ImageComponents/Whatsapp'
import Facebook from '../../Component/ImageComponents/Facebook'
import Twitter from '../../Component/ImageComponents/Twitter'
import UnoBot from '../../Component/ImageComponents/UnoBot'
import LinkedIn from '../../Component/ImageComponents/LinkedIn'

const smIcons = [
  {
    iconName: 'twitter-with-circle',
    iconSize: 30,
    iconColor: '#00acee',
  },
  {
    iconName: 'facebook-with-circle',
    iconSize: 30,
    iconColor: '#1877f2',
  },
  {
    iconName: 'linkedin-with-circle',
    iconSize: 30,
    iconColor: '#0e76a8',
  },
  {
    iconName: 'youtube-with-circle',
    iconSize: 30,
    iconColor: '#c4302b',
  },
  {
    iconName: '',
    iconSize: 30,
    iconColor: '',
  },
]

const Login = (props: any) => {
  // const Login = ({ navigation }: { navigation: any }) => {

  // const {navigation,}
  const [login, setLogin] = useState({ username: '', password: '' })
  const [isNext, setNext] = useState(false)

  const onInputChange = (value: any, field: any) => {
    const data: any = { ...login }
    data[field] = value
    setLogin(data)
  }

  const onLoginPress = async () => {
    try {
      const body = {
        // "username": "paytm",
        // "password": "Interactive!23"
        username: login.username,
        password: login.password,
      }
      console.log('body', login)

      const res: any = await Api.post(configs.loginApi, body)
      console.log('login Api res', res)

      if (res.status === 200) {
        console.log('token', res.data.token)
        props.setToken(res.data.token)
        props.navigation.navigate('Dashboard')
      }
    } catch (error) {
      console.log('Login Api Error', error)
    }
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        // alignContent: 'center',
        paddingHorizontal: '2%',
        paddingVertical: '1%',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.container, { flex: 3, paddingHorizontal: '5%' }]}>
          <View
            style={{
              width: '2%',
              alignSelf: 'center',
              paddingTop: '2%',
            }}
          >
            <UnoBot />
          </View>
          {isNext ? (
            <View style={[styles.outerView]}>
              <View style={[styles.innerView]}>
                <Text style={[styles.textFont]}>Password</Text>
                <TextInput
                  secureTextEntry
                  defaultValue=""
                  style={[styles.input, styles.textFont]}
                  placeholder="Enter Password"
                  onChangeText={(value) => {
                    onInputChange(value, 'password')
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    onLoginPress()
                  }}
                  style={[
                    styles.modalButton,
                    { backgroundColor: '#4d7be8', borderColor: '#4d7be8' },
                  ]}
                >
                  <Text style={[styles.buttonText, { color: '#fff' }]}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={[styles.outerView]}>
              {/* <View style={{flex:1}} /> */}
              <View style={[styles.innerView]}>
                <Text style={[styles.textFont]}>Email</Text>
                <TextInput
                  defaultValue=""
                  style={[styles.input, styles.textFont]}
                  placeholder="Enter Email"
                  onChangeText={(value) => {
                    onInputChange(value, 'username')
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => setNext(true)}
                style={[
                  styles.modalButton,
                  { backgroundColor: '#4d7be8', borderColor: '#4d7be8' },
                ]}
              >
                <Text style={[styles.buttonText, { color: '#fff' }]}>Next</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={{ marginTop: '10%' }}>
            <Text
              style={{
                color: '#a6a6a6',
                fontStyle: 'italic',
                alignSelf: 'center',
              }}
            >
              Need Help ?{' '}
              <TouchableOpacity>
                <Text style={{ textDecorationLine: 'underline' }}>Support</Text>
              </TouchableOpacity>{' '}
              is here
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                justifyContent: 'space-between',
                width: '35%',
                marginVertical: '2%',
              }}
            >
              <Whatsapp />
              <Twitter />
              <Facebook />
              <LinkedIn />
              {/* <Facebook/> */}
              {/* {smIcons.length > 0 ? (
                smIcons.map((item) => (
                  // <View style={{flexDirection:"row"}}>
                  <TouchableOpacity onPress={() => {}}>
                    <Entypo
                      name={item.iconName}
                      size={item.iconSize}
                      color={item.iconColor}
                    />
                  </TouchableOpacity>
                  // </View>
                ))
              ) : (
                <></>
              )} */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                width: '70%',
              }}
            >
              <TouchableOpacity>
                <Text style={[styles.textFont, styles.textFooter]}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.textFont,
                  styles.textFooter,
                  { marginHorizontal: '1%' },
                ]}
              >
                {'\u25CF'}
              </Text>
              <TouchableOpacity>
                <Text style={[styles.textFont, styles.textFooter]}>
                  Terms of Service
                </Text>{' '}
              </TouchableOpacity>
              <Text style={[styles.textFont, { marginHorizontal: '1%' }]}>
                {'\u25CF'}
              </Text>
              <TouchableOpacity>
                <Text style={[styles.textFont, styles.textFooter]}>
                  Copyright 2021.
                </Text>
              </TouchableOpacity>
              <Text style={[styles.textFont, styles.textFooter]}>
                {' '}
                All rights reserved
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.container, { flex: 2 }]}>
          <View
            style={{
              backgroundColor: 'skyblue',
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </View>
    </View>
    // <View
    //   style={{
    //     backgroundColor: 'white',
    //     flex: 1,
    //     alignContent: 'center',
    //     padding: '2%',
    //   }}
    // >
    //   <View style={{ flexDirection: 'row' }}>
    //     <View style={[styles.container, { flex: 3, padding: '5%' }]}>
    //       <View
    //         style={{
    //           // backgroundColor: 'red',
    //           height: '35%',
    //           // width: '40%',
    //           alignSelf: 'center',
    //         }}
    //       >
    //         <UnoBot />
    //       </View>
    //       <View>
    //         <Text>Email</Text>
    //         <TextInput
    //           style={styles.input}
    //           placeholder="Enter Email"
    //           onChangeText={(value) => {
    //             onInputChange(value, 'username')
    //           }}
    //         />
    //         <TouchableOpacity
    //           onPress={() => {
    //             onLoginPress()
    //           }}
    //           style={[
    //             styles.modalButton,
    //             { backgroundColor: '#4d7be8', borderColor: '#4d7be8' },
    //           ]}
    //         >
    //           <Text style={[styles.buttonText, { color: '#fff' }]}>Next</Text>
    //         </TouchableOpacity>
    //       </View>
    //       <View style={{ marginTop: '10%' }}>
    //         <Text
    //           style={{
    //             color: '#a6a6a6',
    //             fontStyle: 'italic',
    //             alignSelf: 'center',
    //           }}
    //         >
    //           Need Help ?{' '}
    //           <TouchableOpacity>
    //             <Text style={{ textDecorationLine: 'underline' }}>Support</Text>
    //           </TouchableOpacity>{' '}
    //           is here
    //         </Text>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             alignSelf: 'center',
    //             justifyContent: 'space-between',
    //             width: '35%',
    //             marginVertical: '2%',
    //           }}
    //         >
    //           <Whatsapp />
    //           <Twitter />
    //           <Facebook />
    //           <LinkedIn />
    //           {/* <Facebook/> */}
    //           {/* {smIcons.length > 0 ? (
    //             smIcons.map((item) => (
    //               // <View style={{flexDirection:"row"}}>
    //               <TouchableOpacity onPress={() => {}}>
    //                 <Entypo
    //                   name={item.iconName}
    //                   size={item.iconSize}
    //                   color={item.iconColor}
    //                 />
    //               </TouchableOpacity>
    //               // </View>
    //             ))
    //           ) : (
    //             <></>
    //           )} */}
    //         </View>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             alignSelf: 'center',
    //             width: '70%',
    //           }}
    //         >
    //           <TouchableOpacity>
    //             <Text>Privacy Policy</Text>
    //           </TouchableOpacity>
    //           <Text style={{ marginHorizontal: '1%' }}>{'\u25CF'}</Text>
    //           <TouchableOpacity>
    //             <Text>Terms of Service</Text>{' '}
    //           </TouchableOpacity>
    //           <Text style={{ marginHorizontal: '1%' }}>{'\u25CF'}</Text>
    //           <TouchableOpacity>Copyright 2021.</TouchableOpacity>
    //           <Text> All rights reserved</Text>
    //         </View>
    //       </View>
    //     </View>
    //     <View style={[styles.container, { flex: 2 }]}>
    //       <View
    //         style={{
    //           backgroundColor: 'skyblue',
    //           width: '100%',
    //           height: '100%',
    //         }}
    //       />
    //     </View>
    //   </View>
    // </View>
  )
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    setToken: (token: any) => {
      dispatch({ type: 'LOGIN_TOKEN', payload: token })
    },
  }
}

export default connect(null, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  container: {
    // backgroundColor:"white",
    // width: '100%',
    height: '140%',
    // flex:1
    // borderWidth: 1,
    // marginHorizontal: '25%',
    // marginVertical: '10%',
    // borderRadius: 4,
    // justifyContent: 'center',
    // paddingHorizontal: '2%',
    // paddingVertical: '2%',
  },
  // container: {
  //   // backgroundColor:"white",
  //   // width: '100%',
  //   height: '140%',
  //   // borderWidth: 1,
  //   // marginHorizontal: '25%',
  //   // marginVertical: '10%',
  //   // borderRadius: 4,
  //   justifyContent: 'center',
  //   // paddingHorizontal: '2%',
  //   // paddingVertical: '2%',
  // },
  modalButton: {
    borderWidth: 1,
    // marginRight: '20%',
    marginHorizontal: '40%',
    marginVertical: '5%',
    alignSelf: 'center',
    // padding: '10%',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    borderRadius: 4,
    marginLeft: '60%',
    marginTop: '10%',
    // justifyContent:"space-around"
    // justifyContent: 'center',
  },
  buttonText: {
    fontSize: 13,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#d9d9d9',
  },
  textFont: {
    fontFamily: 'Poppins-Black',
    fontSize: 12,
    lineHeight: 28,
  },
  textFooter: {
    color: 'gray',
  },
  outerView: {
    paddingTop: '8%',
    paddingHorizontal: '10%',
  },
  innerView: {
    paddingLeft: '25%',
  },
})
