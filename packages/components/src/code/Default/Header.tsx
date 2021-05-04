import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import Unobot from '../Images/Unobot'
import UnobotText from '../Images/UnobotText'
import { DropdownList } from '../Component/ReactSelect'
import { searchComplaintsApi } from '../CommnFncn/IntegrationAPI'

const Header = (props: any) => {
  const {
    selectedTickit,
    navigation,
    token,
    pageSize,
    pageIndex,
    startDate,
    endDate,
    clientDetails,
    userDetails,
  } = props

  const [isMenu, setToggleMenu] = useState(false)
  const [SearchInput, setSearchInput] = useState()

  const menuList = [{ value: 'SignOut', text: 'SignOut' }]

  const onSelectMenu = (val: any) => {
    try {
      setToggleMenu(false)
      switch (val.value) {
        case 'SignOut':
          return logout()
        default:
          return null
      }
    } catch (error) {
      console.error(error)
    }
    return null
  }

  const onSearchInput = (value: any) => {
    // console.log("textChange", value);

    setSearchInput(value)
  }

  const searchComplaints = async () => {
    console.log('SearchInput', SearchInput)

    const res: any = await searchComplaintsApi(
      token,
      pageSize,
      pageIndex,
      startDate,
      endDate,
      clientDetails && clientDetails.client_id,
      userDetails && userDetails.user_id,
      undefined,
      undefined,
      undefined,
      SearchInput,
    )
    if (res && res.status === 200) {
      props.setTikitData(res.data.data)
      props.setTotalRecords(res.data.total_records)
      // console.log('res.data', res.data.data)
    }
    // else {
    //   props.clearToken()
    // }
  }

  const logout = () => {
    props.clearToken()
  }

  const submit = () => {
    searchComplaints()
    console.log('submit')
  }

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
          {selectedTickit && selectedTickit.complaint_id ? (
            <Text
              style={{
                fontFamily: 'Poppins-Light',
                fontSize: 18,
                color: '#FE46D5',
              }}
              onPress={() => {
                navigation.navigate('Interaction')
              }}
            >
              Interactions
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: 'Poppins-Light',
                fontSize: 18,
              }}
            >
              Interactions
            </Text>
          )}
          {selectedTickit && selectedTickit.complaint_id ? (
            <View style={{ flexDirection: 'row', paddingTop: '1%' }}>
              <Text style={{ color: '#5A607F', paddingTop: '1%' }}> /</Text>
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
              // onBlur={()=>{setstate(true)}}
              onChangeText={(value: any) => {
                onSearchInput(value)
              }}
              style={styles.inputStyle}
              placeholder="Search Tickets, Messages..."
              placeholderTextColor="#ADADAD"
              onSubmitEditing={submit}
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
            {!isMenu ? (
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome
                  style={{ padding: '10%' }}
                  name="user-circle"
                  size={25}
                  color="#B6B6B6"
                  onPress={() => {
                    setToggleMenu(true)
                  }}
                />
                <FontAwesome
                  style={{ padding: '18%', paddingLeft: 0 }}
                  name="angle-down"
                  size={18}
                  color="#B6B6B6"
                  onPress={() => {
                    setToggleMenu(true)
                  }}
                />
              </View>
            ) : (
              <View>
                <DropdownList
                  list={menuList}
                  onSelectValue={(val: any) => onSelectMenu(val)}
                />
              </View>
            )}
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
    pageSize: state.Pagination.initialState.pageSize,
    pageIndex: state.Pagination.initialState.pageIndex,
    startDate: state.tickitListData.startDate,
    endDate: state.tickitListData.endDate,
    clientDetails: state.loginReducer.clientDetails,
    userDetails: state.loginReducer.userDetails,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    clearToken: () => {
      dispatch({ type: 'CLEAR_LOGIN_TOKEN' })
    },
    setTotalRecords: (data: number) => {
      dispatch({ type: 'TOTAL_RECORDS', payload: data })
    },
    setTikitData: (data: any) => {
      dispatch({ type: 'TICKIT_LIST', payload: data })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

const styles = StyleSheet.create({
  inputStyle: {
    paddingHorizontal: '2%',
    fontFamily: 'Poppins-Light',
    // borderRadius: 36,
    outLine: 'none',
    width: '200px',
  },
  input1Style: {
    paddingHorizontal: '2%',
    fontFamily: 'Poppins-Light',
    boderColor: 'red',
  },
})
