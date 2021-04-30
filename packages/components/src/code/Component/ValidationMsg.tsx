import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const ValidationMsg = (props: any) => {
  const { displayMsg, message, customeStyle } = props
  const [state, setState] = useState(displayMsg)

  useEffect(() => {
    const interval = setInterval(() => {
      setState(false)
      props.validationMsg()
    }, 6000)
    return () => clearInterval(interval)
  })

  return (
    <View>
      {state && (
        <View style={[styles.centeredView, customeStyle]}>
          <View style={styles.modalView}>
            <View>
              <Text style={[styles.textStyle, { color: '#990000' }]}>
                {message}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default ValidationMsg

const styles = StyleSheet.create({
  modalView: {
    padding: '2%',
    borderRadius: 4,
    backgroundColor: '#ffe6e6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
  },
  centeredView: {
    position: 'absolute',
    top: '10%',
    // right: "-5%",
    left: 0,
    // right: 30,
    // width: '35%',
    minWidth: '20%',
    maxWidth: '40%',
    height: '40%',
    marginLeft: '40%',
  },

  textStyle: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
})
