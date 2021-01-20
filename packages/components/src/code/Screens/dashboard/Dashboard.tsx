import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button, StyleSheet } from 'react-native'
import GoBack from '../../Component/GoBack'
import SearchComplaints from '../../Component/SearchComponent'

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
      {/* <Text>Dashboard</Text> */}
      <SearchComplaints />
      <GoBack navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '2%',
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
