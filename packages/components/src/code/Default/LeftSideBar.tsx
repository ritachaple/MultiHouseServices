import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Dashboard, Interactions, Reports, Channels } from '../Images/SideBar'

const LeftSideBar = () => {
  return (
    <View
      style={{
        width: '5.5%',
        backgroundColor: '#001163',
        paddingHorizontal: '1%',
        paddingVertical: '1%',
        flexDirection: 'column',
        // flex:1
      }}
    >
      <View style={{ paddingTop: '10%', alignSelf: 'center' }}>
        <View style={{ paddingHorizontal: '30%' }}>
          <Dashboard />
        </View>
        {/* <Icon
          // onPress={onFilterPress}
          style={{ alignSelf: 'center' }}
          name="building-o"
          size={20}
          color="#fff"
        /> */}
        <Text style={styles.textStyle}>Dashboard</Text>
      </View>

      <View style={{ paddingTop: '40%', alignSelf: 'center' }}>
        {/* <Icon
          // onPress={onFilterPress}
          style={{ alignSelf: 'center' }}
          name="wpforms"
          size={20}
          color="#fff"
        /> */}
        <View style={{ paddingHorizontal: '30%' }}>
          <Interactions />
        </View>
        <Text style={styles.textStyle}>Interaction</Text>
      </View>

      <View style={{ alignSelf: 'center', paddingTop: '40%' }}>
        {/* <Icon
          // onPress={onFilterPress}
          style={{ alignSelf: 'center' }}
          name="file-text-o"
          size={20}
          color="#fff"
        /> */}
        <View style={{ paddingHorizontal: '30%' }}>
          <Reports />
        </View>
        <Text style={styles.textStyle}>Reports</Text>
      </View>

      <View style={{ alignSelf: 'center', paddingTop: '40%' }}>
        {/* <Icon
          // onPress={onFilterPress}
          style={{ alignSelf: 'center' }}
          name="object-ungroup"
          size={20}
          color="#fff"
        /> */}

        <View style={{ paddingHorizontal: '30%' }}>
          <Channels />
        </View>
        <Text style={styles.textStyle}>Channels</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-Black',
    color: '#fff',
    fontSize: 12,
    paddingTop: '20%',
  },
})

export default LeftSideBar
