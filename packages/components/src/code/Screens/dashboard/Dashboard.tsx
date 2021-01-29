import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import GoBack from '../../Component/GoBack'
import SearchComplaints from '../../Component/SearchComponent'
import CenterComponent from '../../Component/CenterComponent'
import RightComponent from '../../Component/RightComponent'

// const Dashboard = ({ props }: { props: any}) => {
// const Dashboard = ({navigation}: { navigation:any }) => {
const Dashboard = (props: any) => {
  const { navigation } = props

  // useEffect(() => {
  //   // console.log('props', props)
  //   // props.companyListData()
  //   checkReduxData()
  // }, [])

  const checkReduxData = () => {
    props.companyListData()
  }

  return (
    <View style={styles.container}>
      <Header containerStyle={styles.header} />
      <Header
        containerStyle={{ backgroundColor: 'whitesmoke', height: '10%' }}
        placement="left"
        leftComponent={{ icon: 'menu', color: '#000' }}
        centerComponent={<CenterComponent />}
        rightComponent={<RightComponent />}
      />
      <SearchComplaints />
      <GoBack navigation={navigation} />
      <Header containerStyle={styles.header} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    data: state.checkData,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    companyListData: () =>
      dispatch({ type: 'CHECK_DATA', payload: 'check data' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
// export default Dashboard
