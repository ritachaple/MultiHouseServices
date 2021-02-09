import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button, StyleSheet, Modal } from 'react-native'
import { Header } from 'react-native-elements'
import GoBack from '../../Component/GoBack'
import SearchComplaints from '../../Component/SearchComponent'
import SelectIcon from '../../Component/SelectIcon'
import LeftComponent from '../../Component/LeftComponent'
import CenterComponent from '../../Component/CenterComponent'
import RightComponent from '../../Component/RightComponent'
import SideBar from '../../Component/SideBar'
import LeftSideBar from '../../Component/LeftSideBar'

// const Dashboard = ({navigation}: { navigation:any }) => {
const Dashboard = (props: any) => {
  const { navigation } = props

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
      <Header containerStyle={[styles.header]} />
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
            leftComponent={
              <LeftComponent
                isCheckboxSelect={isSelectClick}
                onSelectPress={() => {
                  onSelectIconPress()
                }}
              />
            }
            centerComponent={
              isSelectClick ? <SelectIcon /> : <CenterComponent />
            }
            rightComponent={
              <RightComponent
                onFilterPress={() => {
                  onFilterPress()
                }}
              />
            }
          />
          <SearchComplaints />

          <GoBack navigation={navigation} />
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
