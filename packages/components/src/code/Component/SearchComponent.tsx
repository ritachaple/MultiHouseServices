import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Picker,
} from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import ListComponent from './ListComponent'
// import Demo2 from './Demo2'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const SearchComplaints = () => {
  const [tickit, setTickit] = useState([])

  useEffect(() => {
    searchComplaintsApi()
  }, [])

  const searchComplaintsApi = async () => {
    try {
      const data = {
        client_id: 39,
        status: [],
        department: [],
        is_deleted: false,
        is_spam: false,
        to_date: '2021-01-07T07:48:16.916Z',
        from_date: '2020-12-24T07:48:16.916Z',
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
        <MenuProvider>
          <FlatList
            style={{ flex: 1 }}
            data={tickit}
            // renderItem={({ item={user_name:""} }) => <ListComponent user_name={item.user_name} />}
            renderItem={({ item }) => {
              console.log('renderItem item: ', item)

              return <ListComponent tickitItems={item} />
              // return <Demo2 />
            }}
            keyExtractor={(index: any) => index.toString()}
          />
        </MenuProvider>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:windowWidth,
    // width: windowHeight

    width: '100%',
    height: '100%',
  },
})

export default SearchComplaints
