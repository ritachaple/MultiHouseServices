import React from 'react'
import { View } from 'react-native'

import Header from './Header'
import LeftSideBar from './LeftSideBar'

const Default = (props: any) => {
  const { children, navigation } = props

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <LeftSideBar navigation={navigation} />
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    </View>
  )
}

// export default connect(mapStateToProps)(Navigation)

export default Default
