import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Chat from './Chat'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import ListComponent from './ListComponent'
// import IconButton from './IconButton'
// import { Icon } from 'react-native-elements'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const ListHeader = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#dce3de',
        borderBottomWidth: 0.1,
        paddingHorizontal: '1%',
        paddingVertical: '1%',
      }}
    >
      <Icon
        style={{
          paddingTop: 2,
          flex: 1,
        }}
        name="square-o"
        size={15}
        color="grey"
      />
      <Text
        style={{
          paddingLeft: '1%',
          flex: 2,
        }}
      >
        Tickit Id
      </Text>
      <Text
        style={{
          paddingLeft: '2%',
          flex: 2,
        }}
      >
        Medium
      </Text>
      <Text
        style={{
          paddingLeft: '6%',
          flex: 6,
        }}
      >
        Subject
      </Text>
      {/* <Text
        style={{
          // paddingLeft: '9%',
          flex: 2,
        }}
      >
        from
      </Text> */}
      {/* <Text style={{ paddingLeft: ',flex:120%' }}> From</Text> */}
      <Text
        style={{
          paddingRight: '3%',
          flex: 3,
        }}
      >
        Created Date
      </Text>
      <Text
        style={{
          paddingRight: '4%',
          flex: 3,
        }}
      >
        Updated Date
      </Text>
      <Text style={{ flex: 2, paddingRight: '5%' }}> Sentiment</Text>
      <Text style={{ paddingRight: '2%', flex: 2 }}> Status</Text>
      <Text style={{ flex: 2 }}> Count</Text>
      <Text style={{ flex: 3 }}> Assigned To</Text>
    </View>
  )
}

const SearchComplaints = (props: any) => {
  const [tickit, setTickit] = useState([])

  useEffect(() => {
    const clearData = async () => {
      props.clearHeaderData()
    }
    searchComplaintsApi()
    clearData()
  }, [props])

  const searchComplaintsApi = async () => {
    try {
      const data = {
        client_id: 39,
        status: [],
        department: [],
        is_deleted: false,
        is_spam: false,
        to_date: '2021-02-08T07:52:06.919Z',
        from_date: '2021-01-25T07:52:06.920Z',
        custom_filter: null,
        customer_responded: null,
        page_size: 50,
        assigned_to: [],
        order_by: '1',
        sort_order: 'DESC',
        search_text: '',
        page_index: 1,
        agent_id: 5889,
      }
      console.log('search_complaintsRes1')

      const res: any = await Api.post(configs.search_complaints, data)
      console.log('searchcomplaintsRes', res)
      if (res) {
        setTickit(res.data.data)
        //  const  data= JSON.stringify(res)
        console.log('res.data', res.data.data)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 3,
              flexDirection: 'row',
              // paddingTop: '1%',
              justifyContent: 'space-evenly',
             
            }}
          >
          </View>
        </View> */}

        {/* <Chat/> */}
        <MenuProvider>
          <View
            style={{
              marginHorizontal: '2%',
              borderRadius: 3,
              backgroundColor: '#fff',
            }}
          >
            <FlatList
              style={{
                flex: 1,
                // marginHorizontal: '2%',
                // borderRadius: 3,
              }}
              data={tickit}
              // renderItem={({ item={user_name:""} }) => <ListComponent user_name={item.user_name} />}
              renderItem={({ item }) => {
                console.log('renderItem item: ', item)

                return <ListComponent tickitItems={item} />
              }}
              ListHeaderComponent={() => <ListHeader />}
              keyExtractor={(index: any) => index.toString()}
            />
          </View>
        </MenuProvider>
      </ScrollView>
    </View>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    clearHeaderData: () => {
      dispatch({ type: 'CLEAR_HEADER' })
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:windowWidth,
    // width: windowHeight

    width: '100%',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00a3fe',
    padding: 10,
    width: '5%',
    height: '5%',
  },
})

export default connect(null, mapDispatchToProps)(SearchComplaints)
