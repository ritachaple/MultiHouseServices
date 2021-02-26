import React from 'react'
import { View } from 'react-native'
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
