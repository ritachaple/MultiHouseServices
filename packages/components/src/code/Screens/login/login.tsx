import React, { useEffect, useState, useMemo } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Modal,
} from 'react-native'
import { connect } from 'react-redux'
import Api from '../../provider/api/Api'
import { configs } from '../../provider/api/ApiUrl'
import Whatsapp from '../../Component/ImageComponents/Whatsapp'
import Twitter from '../../Component/ImageComponents/Twitter'
import UnoBot from '../../Component/ImageComponents/UnoBot'
import LinkedIn from '../../Component/ImageComponents/LinkedIn'
import { LoginFacebook } from '../../Images/MediaIcon'
import ValidationMsg from '../../Component/ValidationMsg'
import Loader from '../../Component/Loader'

const Login = (props: any) => {
  // const Login = ({ navigation }: { navigation: any }) => {

  // const {navigation,}
  const [login, setLogin] = useState({ username: '', password: '' })
  const [isNext, setNext] = useState(false)
  const [progres, setProgres] = useState(0)

  const [msg, setMsg] = useState('')
  const [openValidationMsg, setOpenValidationMsg] = useState(false)

  const onInputChange = (value: any, field: any) => {
    const data: any = { ...login }
    data[field] = value
    setLogin(data)
  }

  const onLoginPress = async () => {
    try {
      setProgres(100)
      if (login.username && login.password) {
        const body = {
          username: login.username,
          password: login.password,
        }
        console.log('body', login)

        const res: any = await Api.post(configs.loginApi, body)
        console.log('login Api res', res)

        if (res.status === 200) {
          console.log('token', res.data.token)
          props.setToken(res.data.token)
          setProgres(0)
          props.navigation.navigate('Interaction')
        } else {
          setProgres(0)
          validationError('Login Error!!!')
        }
      } else {
        setProgres(0)
        validationError('Please Enter Username and Password!!!')
      }
    } catch (error) {
      validationError('Login Error!!!')
      console.log('Login Api Error', error)
    }
  }

  const validationError = (mssg: string) => {
    setMsg(mssg)
    setOpenValidationMsg(true)
  }

  const hideValidationMsg = () => {
    setOpenValidationMsg(false)
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
      <Loader progres={progres} />
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
          {!isNext && (
            <View style={[styles.outerView]}>
              {/* <View style={{flex:1}} /> */}
              <View style={[styles.innerView]}>
                <Text style={[styles.textFont]}>Username</Text>
                <TextInput
                  defaultValue=""
                  style={[styles.input, styles.textFont]}
                  placeholder="Enter Username"
                  onChangeText={(value) => {
                    onInputChange(value, 'username')
                  }}
                  onSubmitEditing={() => setNext(true)}
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

          {isNext && (
            <View style={[styles.outerView]}>
              {/* <View style={{flex:1}} /> */}
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
                  onSubmitEditing={() => onLoginPress()}
                />
              </View>
              <TouchableOpacity
                onPress={() => onLoginPress()}
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
          )}

          {openValidationMsg && (
            <ValidationMsg
              message={msg}
              validationMsg={hideValidationMsg}
              displayMsg={openValidationMsg}
              customeStyle={{ width: '35%' }}
            />
          )}

          <View style={{ marginTop: '18%', marginLeft: '15%' }}>
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
              <LoginFacebook />
              <LinkedIn />
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignSelf: 'center',
                // width: '0%',
                paddingLeft: '23%',
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
          <Image
            source={{
              uri:
                'https://unoboat.s3.ap-south-1.amazonaws.com/main-login-_1_.svg',
            }}
            style={{ width: '100%', height: '75%' }}
          />
        </View>
      </View>
    </View>
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
    height: '140%',
  },
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
    paddingHorizontal: '2%',
    outLine: 'none',
  },
  textFont: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    lineHeight: 28,
    outLine: 'none',
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
