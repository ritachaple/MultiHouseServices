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

// const Dashboard = ({navigation}: { navigation:any }) => {
const Dashboard = (props: any) => {
  const { navigation, isHeaderSelect, selectedOneTickit } = props

  const [isSelectClick, setIsSelectClick] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
      <View
        style={{
          // backgroundColor: 'red',
          flex: 1,
          flexDirection: 'row',
          // alignItems: 'stretch',
        }}
      >
        <View style={{ flex: 1 }}>
          <Header
            containerStyle={{ backgroundColor: 'whitesmoke', height: '7%' }}
            placement="left"
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
