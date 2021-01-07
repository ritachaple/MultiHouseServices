import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, FlatList, Text } from 'react-native'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import ListComponent from './ListComponent'

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
        to_date: '2021-01-06T12:21:25.060Z',
        from_date: '2020-12-23T12:21:25.061Z',
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

      const headers = {
        headers: {
          Accept: 'application/json, text/plain',
          'Accept-Language': 'en,en-US;q=0.9,en-GB;q=0.8',
          Connection: 'keep-alive',
          'Content-Type': 'application/json;charset=UTF-8',
          Cookie:
            'ARRAffinity=7a2d82d3e8632b22a3a102b4349fdda715ee7ac9651d369119133a1f1b3957a2; ARRAffinitySameSite=7a2d82d3e8632b22a3a102b4349fdda715ee7ac9651d369119133a1f1b3957a2',
          Origin: 'https://cxpdev.merilent.com',
          Referer: 'https://cxpdev.merilent.com/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        },
      }
      console.log('search_complaintsRes1')

      const res: any = await Api.post(configs.search_complaints, data, headers)
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

  // const renderRow = (item:{user_name:String}) => {

  //     <ListComponent data={item} />
  // };

  //  const renderRow=(item:{})=>{
  //   <Text>{item.user_name}</Text>
  //   }

  // const keyExtractor = (item:{}, index:number) => index;

  return (
    <SafeAreaView>
      <FlatList
        data={tickit}
        // renderItem={({ item={user_name:""} }) => <ListComponent user_name={item.user_name} />}
        renderItem={({ item }) => {
          console.log('renderItem item: ', item)

          return <ListComponent item={item} />
        }}
        keyExtractor={(index: any) => index.toString()}
      />
    </SafeAreaView>
  )
}

export default SearchComplaints
