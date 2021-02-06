import React, { useState } from 'react'
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
  const [DropdownType, setDropdownType] = useState('Select Type')
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

  const onDropdownSelect = (item: any) => {
    setDropdownType(item)
    props.setDisplayTickitType(item)
    setDropdownShow()
  }

  const setDropdownShow = () => {
    setIsDropdownShow(!isDropdownShow)
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: '20%',
      }}
    >
      {/* <View>Hello World</View> */}

      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        // onPress={()=>{setDropdownShow()}}
      >
        <Text style={styles.dropdownText}>Brand: {DropdownBrandType}</Text>
        <Icon
          style={{ paddingVertical: '2%' }}
          name="angle-down"
          size={15}
          color="#909091"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', marginLeft: '10%' }}
        onPress={() => {
          setDropdownShow()
        }}
      >
        <Text style={styles.dropdownText}>Type: {DropdownType}</Text>
        <Icon
          style={{ paddingVertical: '2%' }}
          name="angle-down"
          size={15}
          color="#909091"
        />
      </TouchableOpacity>

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

      <View style={{ backgroundColor: 'gray' }}>
        <Modal
          style={{ flex: 1 }}
          animationType="none"
          transparent={isDropdownShow}
          visible={isDropdownShow}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '50%',
              marginHorizontal: '40%',
              marginTop: '30%',
              marginBottom: 0,
              alignSelf: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                // borderRadius: 5,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                flex: 1,
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <FlatList
                style={{ paddingHorizontal: '2%' }}
                data={dropdownList}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        padding: '1%',
                        borderBottomWidth: 0.2,
                        borderBottomColor: 'gray',
                      }}
                    >
                      <Text onPress={() => onDropdownSelect(item)}>{item}</Text>
                    </View>
                  )
                }}
                keyExtractor={(index: any) => index.toString()}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setDisplayTickitType: (data: any) => {
      dispatch({ type: 'SET_TICKIT_TYPE', payload: data })
    },
  }
}

export default connect(null, mapDispatchToProps)(CenterComponent)

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
  dropdownText: {
    fontSize: 12,
    color: '#909091',
    fontWeight: '600',
  },
})
