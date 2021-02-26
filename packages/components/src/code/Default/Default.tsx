import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Image,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Header from './Header'
import LeftSideBar from './LeftSideBar'

const Default = (props: any) => {
  const { children } = props
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <LeftSideBar />

        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </View>
  )
}

export default Default
