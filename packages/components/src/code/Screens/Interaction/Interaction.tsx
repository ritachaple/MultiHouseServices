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
  TouchableOpacity,
} from 'react-native'
import { Header, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import SearchComplaints from '../../Component/SearchComponent'
import SelectIcon from '../../Component/SelectIcon'
import CenterComponent from '../../Component/CenterComponent'
import RightComponent from '../../Component/RightComponent'
import SideBar from '../../Component/SideBar'
import SelectedFilterHeader from '../../Component/SelectedFilterHeader'
import Default from '../../Default/Default'
import { Filter } from '../../Images/Header'

const Interaction = (props: any) => {
  const { navigation, isHeaderSelect, selectedOneTickit } = props

  const [isSelectClick, setIsSelectClick] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      props.clearSelectedTickit()
    })
    return unsubscribe
  }, [props, navigation])

  const onFilterPress = () => {
    console.log('filter press')
    setIsSidebarOpen(!isSidebarOpen)
  }

  const checkReduxData = () => {
    props.companyListData()
  }

  const onSelectIconPress = () => {
    setIsSelectClick(!isSelectClick)
    props.headerSelect(!isSelectClick)
  }

  return (
    <Default navigation={navigation}>
      <View style={styles.container}>
        <View
          style={{
            // backgroundColor: 'red',
            flex: 1,
            flexDirection: 'row',

            // alignItems: 'stretch',
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: '#F1F6FF',
                height: '9%',
                // paddingRight: '0%',
                borderBottomColor: '#F1F6FF',
                zIndex: 999,
                flexDirection: 'row',
                // justifyContent: 'space-around',
                paddingVertical: '1%',
                paddingHorizontal: '1%',
              }}
            >
              <View
                // style={{ width: "40%" }}
                style={{
                  alignSelf: 'flex-start',
                  width: '70%',
                  flexDirection: 'row',
                }}
              >
                <CenterComponent style={{ width: '20%' }} />
              </View>
              <View
                style={{
                  // alignSelf: "flex-end",
                  // width: "20%",
                  paddingLeft: '15%',
                  justifyContent: 'space-evenly',
                  // marginRight: "1%"
                  // paddingVertical:"1%"
                }}
              >
                <RightComponent
                  onFilterPress={() => {
                    onFilterPress()
                  }}
                />
              </View>
            </View>
            <View style={{ height: '10%' }}>
              <SelectedFilterHeader />
            </View>
            <SearchComplaints navigation={navigation} />
            <Modal
              style={{ flex: 1 }}
              animationType="none"
              transparent={isSidebarOpen}
              visible={isSidebarOpen}
            >
              <View
                style={{
                  width: '20%',
                  marginTop: '4%',
                  height: '100%',
                  backgroundColor: '#FBFBFB',
                  alignSelf: 'flex-end',
                  borderTopLeftRadius: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Header
                  containerStyle={{
                    backgroundColor: '#FBFBFB',
                    height: '8%',
                    borderTopLeftRadius: 5,
                  }}
                  leftComponent={<Filter />}
                  // leftComponent={<Icon name="filter" size={15} />}
                  centerComponent={
                    <Text style={{ marginRight: '50%' }}>All Filters</Text>
                  }
                  rightComponent={
                    <TouchableOpacity
                      onPress={() => {
                        setIsSidebarOpen(false)
                      }}
                    >
                      <Icon name="close" color="#000" size={15} />
                    </TouchableOpacity>
                  }
                />
                <Divider />
                <SideBar />
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </Default>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F6FF',
    // paddingHorizontal: '2%',
  },
  header: {
    backgroundColor: '#018786',
    height: '6%',
    borderBottomColor: '#018786',
  },
})

const mapStateToProps = (state: any) => {
  return {
    isHeaderSelect: state.headerData.isHeaderSelect,
    selectedOneTickit: state.headerData.oneTickitSelect,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    companyListData: () =>
      dispatch({ type: 'CHECK_DATA', payload: 'check data' }),
    headerSelect: (isSelectClick: any) =>
      dispatch({ type: 'IS_HEADER_SELECT', payload: isSelectClick }),
    clearSelectedTickit: () => {
      dispatch({ type: 'CLEAR_SELECTED_TICKIT' })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Interaction)
