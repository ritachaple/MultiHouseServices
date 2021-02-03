import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
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

const CenterComponent = () => {
  const [isPendingButtonClick, setIsPendingButtonClick] = useState(false)
  const [isAwaitingButtonClick, setIsAwaitingClick] = useState(false)
  const [isEscalatedButtonClick, setIsEscalatedClick] = useState(false)
  const [isNotRespondedButtonClick, setIsNotRespondedClick] = useState(false)

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

  return (
    // <View style={{
    //     flexDirection: 'row',
    //   }}>
    // <View>
    //         {/* <IconButton
    //           name="archive"
    //         // onPress={onDeletePress}
    //         /> */}
    //         <IconButton name="arrow-circle-right" />
    // </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: '70%',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
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
      </View>
    </View>
    // </View>
  )
}

export default CenterComponent

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
