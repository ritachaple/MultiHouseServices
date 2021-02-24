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
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import GoBack from '../../Component/GoBack'
import SearchComplaints from '../../Component/SearchComponent'
import SelectIcon from '../../Component/SelectIcon'
import LeftComponent from '../../Component/LeftComponent'
import CenterComponent from '../../Component/CenterComponent'
import RightComponent from '../../Component/RightComponent'
import SideBar from '../../Component/SideBar'
import LeftSideBar from '../../Component/LeftSideBar'

// const Dashboard = ({navigation}: { navigation:any }) => {
const Dashboard = (props: any) => {
  const { navigation, isHeaderSelect, selectedOneTickit } = props

  const [isSelectClick, setIsSelectClick] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  // useEffect(() => {
  //   // console.log('props', props)
  //   // props.companyListData()
  //   checkReduxData()
  // }, [])

  const onFilterPress = () => {
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
    <View style={styles.container}>
      {/* <Header containerStyle={[styles.header,{backgroundColor:"white",}]}/> */}
      <Head />
      <View
        style={{
          // backgroundColor: 'red',
          flex: 1,
          flexDirection: 'row',
          // alignItems: 'stretch',
        }}
      >
        <LeftSideBar />
        <View style={{ flex: 1 }}>
          <Header
            containerStyle={{ backgroundColor: 'whitesmoke', height: '7%' }}
            placement="left"
            // leftComponent={
            //   <LeftComponent
            //     isCheckboxSelect={isSelectClick}
            //     onSelectPress={() => {
            //       onSelectIconPress()
            //     }}
            //   />
            // }
            centerComponent={
              isHeaderSelect || selectedOneTickit ? (
                <SelectIcon />
              ) : (
                <CenterComponent />
              )
            }
            rightComponent={
              <RightComponent
                onFilterPress={() => {
                  onFilterPress()
                }}
              />
            }
          />
          <SearchComplaints navigation={navigation} />
          {/* <Head/> */}
          {/* <GoBack navigation={navigation} /> */}
          <Header containerStyle={styles.header} />
          <Modal
            style={{ flex: 1 }}
            animationType="none"
            transparent={isSidebarOpen}
            visible={isSidebarOpen}
          >
            <SideBar
              onClosePress={() => {
                onFilterPress()
              }}
            />
          </Modal>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export const Head = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        height: '6%',
        padding: '0.5%',
        paddingRight: '3%',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: '2%',
          borderRightWidth: 2,
          borderRightColor: 'black',
        }}
      >
        <Icon
          style={{ paddingHorizontal: '10%' }}
          name="logo-dribbble"
          size={20}
        />
        <Text style={{ fontSize: 16 }}>UnoBot</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: '2%',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <Text style={{ fontWeight: '700' }}>All Tickets</Text>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 15,
            width: '25%',
          }}
        >
          <Icon style={{ padding: '2%' }} name="search" size={15} />
          <TextInput placeholder="Search Messages..." />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <AntDesign
            style={{ padding: '10%' }}
            name="questioncircleo"
            size={16}
          />
          <FontAwesome style={{ padding: '10%' }} name="bell-o" size={16} />
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome
              style={{ padding: '10%' }}
              name="user-circle"
              size={25}
            />
            <FontAwesome
              style={{ padding: '18%', paddingLeft: 0 }}
              name="angle-down"
              size={18}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
