import React from 'react'
import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import Unobot from '../Images/Unobot'
import UnobotText from '../Images/UnobotText'

const Header = (props: any) => {
  const { selectedTickit } = props

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: '9%',

        paddingVertical: '0.4%',
        paddingHorizontal: '0.5%',
      }}
    >
      <View
        style={{
          paddingHorizontal: '1%',
          borderRightWidth: 2,
          borderRightColor: '#F1F6FF',
          paddingTop: '0.4%',
          justifyContent: 'center',
          width: '5%',
        }}
      >
        <View style={{ height: '35%' }}>
          <Unobot />
        </View>
        <View style={{ height: '40%', paddingTop: '10%', alignSelf: 'center' }}>
          <UnobotText />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: '1.5%',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <View
          style={{
            // justifyContent: 'center',
            flexDirection: 'row',
            paddingVertical: '1%',
          }}
        >
          <Text
            style={{
              fontFamily: 'Poppins-Light',
              fontSize: 18,
              color:
                selectedTickit && selectedTickit.complaint_id
                  ? '#FE46D5'
                  : 'none',
            }}
          >
            Interactions
          </Text>
          {selectedTickit && selectedTickit.complaint_id ? (
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#5A607F' }}> /</Text>
              <Text
                style={{
                  color: '#5A607F',
                  paddingTop: '1%',
                  fontFamily: 'Poppins-Light',
                  fontSize: 16,
                }}
              >
                {' '}
                #
                {selectedTickit &&
                  selectedTickit.complaint_id &&
                  selectedTickit.complaint_id}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={{ width: '20%', justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderRadius: 36,
              borderColor: '#DFDFDF',
              backgroundColor: '#FAFAFA',
              paddingHorizontal: '3%',
            }}
          >
            <Icon
              style={{ padding: '2%' }}
              name="search"
              color="#B6B6B6"
              size={15}
            />
            <TextInput
              style={{ paddingHorizontal: '2%', fontFamily: 'Poppins-Light' }}
              placeholder="Search Tickets, Messages..."
              placeholderTextColor="#ADADAD"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingRight: '2%',
            paddingVertical: '0.5%',
          }}
        >
          <AntDesign
            style={{ padding: '10%' }}
            name="questioncircleo"
            size={16}
            color="#B6B6B6"
          />
          <FontAwesome
            style={{ padding: '10%' }}
            name="bell-o"
            color="#B6B6B6"
            size={16}
          />

          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              style={{ padding: '10%' }}
              name="user-circle"
              size={25}
              color="#B6B6B6"
            />
            <FontAwesome
              style={{ padding: '18%', paddingLeft: 0 }}
              name="angle-down"
              size={18}
              color="#B6B6B6"
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    selectedTickit: state.tickitListData.selectedTickit,
  }
}

export default connect(mapStateToProps)(Header)
