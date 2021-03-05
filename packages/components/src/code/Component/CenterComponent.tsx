import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconButton from './IconButton'
import DropdownStaticData from './DropdownStaticData'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'

const OutlineButton = (props: any) => {
  const { isButtonClick, onPress, title } = props
  const buttonStyle = isButtonClick
    ? styles.appButtonClick
    : styles.appButtonContainer
  const textStyle = isButtonClick ? styles.textClickColor : styles.textColor

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Icon
        style={{ alignSelf: 'center', paddingHorizontal: 2 }}
        name={isButtonClick ? 'check-square-o' : 'square-o'}
        size={10}
        color={isButtonClick ? '#fff' : '#000'}
      />
      <Text style={[styles.appButtonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const CenterComponent = (props: any) => {
  const { token } = props

  const [status, setStatus] = useState([] as any)

  useEffect(() => {
    const getStatusDropdownData = async () => {
      const res: any = await Api.get(`${configs.get_status}39`, `${token}`)
      // console.log('tickitStatusRes', res)

      if (res) {
        props.setStatusDropdownList(res.data)
      } else {
        props.clearToken()
      }
    }
    getStatusDropdownData()
  }, [token, props])

  const dropdownList = [
    'Select Type',
    'Pending',
    'Escalated',
    'Not Responded',
    'Awaiting',
  ]

  const [isPendingButtonClick, setIsPendingButtonClick] = useState(false)
  const [isAwaitingButtonClick, setIsAwaitingClick] = useState(false)
  const [isEscalatedButtonClick, setIsEscalatedClick] = useState(false)
  const [isNotRespondedButtonClick, setIsNotRespondedClick] = useState(false)
  const [isDropdownShow, setIsDropdownShow] = useState(false)
  const [DropdownType, setDropdownType] = useState('Select')
  const [DropdownBrandType, setDropdownBrandType] = useState('Select Brand')

  const onAwaitingPress = () => {
    setIsAwaitingClick(!isAwaitingButtonClick)
  }

  const onPendingPress = () => {
    setIsPendingButtonClick(!isPendingButtonClick)
  }
  const onEscalatedPress = () => {
    setIsEscalatedClick(!isEscalatedButtonClick)
  }

  const onNotRespondedPress = () => {
    setIsNotRespondedClick(!isNotRespondedButtonClick)
  }

  const setTIckitValue = (item: any) => {
    props.setDisplayTickitType(item)
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: '70%',
      }}
    >
      {/* <View>Hello World</View> */}

      <DropdownStaticData
        //  style={{flexDirection: 'row'}}
        list={dropdownList}
        setType={setTIckitValue}
        defaultValue="Select Brand"
        dropdownName="Brand"
      />

      <DropdownStaticData
        //  style={{ paddingLeft:"1%"}}
        list={dropdownList}
        setType={setTIckitValue}
        defaultValue="Select Type"
        dropdownName="Type"
      />

      {/* <View style={{ flexDirection: 'row' }}>
        <OutlineButton
          isButtonClick={isPendingButtonClick}
          onPress={() => {
            onPendingPress()
          }}
          title="Pending"
        />
      </View>
      <View style={{ paddingLeft: '1%', flexDirection: 'row' }}>
        <OutlineButton
          isButtonClick={isEscalatedButtonClick}
          onPress={() => {
            onEscalatedPress()
          }}
          title="Escalated"
        />
      </View>
      <View style={{ paddingLeft: '1%', flexDirection: 'row' }}>
        <OutlineButton
          isButtonClick={isNotRespondedButtonClick}
          onPress={() => {
            onNotRespondedPress()
          }}
          title="Not Responded"
        />
      </View>
      <View style={{ paddingLeft: '1%', flexDirection: 'row' }}>
        <OutlineButton
          isButtonClick={isAwaitingButtonClick}
          onPress={() => {
            onAwaitingPress()
          }}
          title="Awaiting"
        />
      </View> */}
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDisplayTickitType: (data: any) => {
      dispatch({ type: 'SET_TICKIT_TYPE', payload: data })
    },
    setStatusDropdownList: (data: any) => {
      dispatch({ type: 'SET_STATUS_DROPDOWN_LIST', payload: data })
    },
    clearToken: () => {
      dispatch({ type: 'CLEAR_LOGIN_TOKEN' })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterComponent)

const styles = StyleSheet.create({
  // ...
  appButtonContainer: {
    backgroundColor: '#fff',
    borderRadius: 3,
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  appButtonClick: {
    backgroundColor: '#204d74',
    borderRadius: 3,
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 5,
    flexDirection: 'row',
    color: '#fff',
  },
  appButtonText: {
    fontSize: 10,
    alignSelf: 'center',
  },
  textColor: {
    color: '#000',
  },
  textClickColor: {
    color: '#fff',
  },
})
