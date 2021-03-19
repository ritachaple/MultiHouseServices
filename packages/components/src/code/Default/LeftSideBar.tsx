import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useRoute } from '@react-navigation/native'
import { Badge } from 'react-native-elements'
import { connect } from 'react-redux'
import {
  Dashboard,
  Interactions,
  Reports,
  Channels,
  ActiveInteractions,
} from '../Images/SideBar'

const LeftSideBar = (props: any) => {
  // const {navigation } = navigation
  // console.log("navigationn",navigation.navigation.state.routeName);

  const route = useRoute()
  console.log('route', route.name)

  const { navigation, totalRecords } = props

  const onDashboard = () => {
    navigation.navigate('ChatScreen')
  }

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
        <View style={styles.defaultScreen}>
          {/* <Pressable onPress={()=>onDashboard()}> */}
          <Dashboard />
          {/* </ Pressable> */}
        </View>

        <Text style={styles.textStyle}>Dashboard</Text>
      </View>

      <View style={{ paddingTop: '40%', alignSelf: 'center' }}>
        {route.name === 'Interaction' ? (
          <View
            // style={{ paddingHorizontal: '30%' }}
            style={styles.activeScreen}
          >
            <Pressable
              onPress={() => {
                navigation.navigate('Interaction')
              }}
            >
              <ActiveInteractions />
              <Badge
                value={totalRecords && totalRecords}
                badgeStyle={{
                  borderColor: '#FE46D5',
                  backgroundColor: '#FE46D5',
                }}
                containerStyle={{ position: 'absolute', top: 8, right: -21 }}
              />
            </Pressable>
          </View>
        ) : (
          <View style={styles.defaultScreen}>
            <Pressable
              onPress={() => {
                navigation.navigate('Interaction')
              }}
            >
              <Interactions />
            </Pressable>
          </View>
        )}
        <Text style={styles.textStyle}>Interaction</Text>
        {/* mayur changes */}
        {/* <View style={{ alignSelf: 'center', paddingTop: '40%' }}>
        <View432 
          style={{
            backgroundColor: '#fff',
            borderRadius: 30,
            paddingVertical: '12%',
            paddingHorizontal: '15%',
            alignSelf: 'center',
          }}
        >
          <Icon
            // onPress={onFilterPress}
            style={{ alignSelf: 'center' }}
            name="wpforms"
            size={20}
            color="#000"
          />
        </View>
        <Text style={{ color: '#fff', fontSize: 12 }}>Interaction</Text> */}
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

const mapStateToProps = (state: any) => {
  return {
    totalRecords: state.Pagination.totalRecords,
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'Poppins-Light',
    color: '#fff',
    fontSize: 12,
    paddingTop: '20%',
  },
  activeScreen: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: '12%',
    paddingHorizontal: '15%',
    alignSelf: 'center',
  },
  defaultScreen: {
    paddingHorizontal: '30%',
  },
})

export default connect(mapStateToProps)(LeftSideBar)
