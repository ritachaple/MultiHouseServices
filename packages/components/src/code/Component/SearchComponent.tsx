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
import Pagination from './Pagination'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const ListHeader = (props: any) => {
  const { isHeaderSelect } = props
  const horizontalFlatlist = true

  const headerName = [
    'Id',
    'subject',
    'raise By',
    'raise at',
    'status',
    'sentiment',
    'priority',
    'assignee',
  ]
  const onCheckboxClick = () => {
    props.onCheckBox()
  }

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
        }}
        onPress={() => onCheckboxClick()}
        name={isHeaderSelect ? 'check-square-o' : 'square-o'}
        size={15}
        color="grey"
      />
      <FlatList
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'row',
          paddingHorizontal: '1%',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
        horizontal={horizontalFlatlist}
        data={headerName}
        renderItem={({ item, index }) => {
          return <Text style={{ flex: 1 }}>{item}</Text>
        }}
        keyExtractor={(index: any) => index.toString()}
      />
      <Icon
        style={{
          paddingTop: 3,
        }}
        // onPress={() => onCheckboxClick()}
        name="plus"
        size={15}
        color="grey"
      />
    </View>
  )
}

const SearchComplaints = (props: any) => {
  const { tickitItems, isHeaderSelect } = props
  const [tickit, setTickit] = useState([])
  const [totalRecords, setTotalRecords] = useState(0)

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      const searchComplaintsApi = async () => {
        try {
          const data = {
            client_id: 39,
            status: [],
            department: [],
            is_deleted: false,
            is_spam: false,
            to_date: '2021-02-24T11:24:06.108Z',
            from_date: '2021-02-10T09:24:06.108Z',
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

          const res: any = await Api.post(
            configs.search_complaints,
            data,
            `${props.token}`,
          )
          console.log('searchcomplaintsRes', res)
          if (res) {
            setTickit(res.data.data)
            props.setTikitData(res.data.data)
            setTotalRecords(res.data.total_records)
            //  const  data= JSON.stringify(res)
            console.log('res.data', res.data.data)
          }
        } catch (error) {
          console.log('error: ', error)
        }
      }

      const clearData = async () => {
        props.clearHeaderData()
      }
      searchComplaintsApi()
      clearData()
    })
    return unsubscribe
  }, [props])

  const onCheckBox = () => {
    props.headerSelect(!isHeaderSelect)
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            // marginHorizontal: '2%',
            borderRadius: 3,
            backgroundColor: '#fff',
          }}
        >
          <FlatList
            style={{
              flex: 1,
            }}
            data={tickitItems}
            renderItem={({ item }) => {
              // console.log('renderItem item: ', item)
              return <ListComponent tickitItems={item} />
            }}
            ListHeaderComponent={() => (
              <ListHeader
                onCheckBox={onCheckBox}
                isHeaderSelect={isHeaderSelect}
              />
            )}
            keyExtractor={(index: any) => index.toString()}
          />
        </View>
      </ScrollView>
      <Pagination totalRecords={totalRecords} />
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    tickitItems: state.tickitListData.tickitList,
    isHeaderSelect: state.headerData.isHeaderSelect,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    clearHeaderData: () => {
      dispatch({ type: 'CLEAR_HEADER' })
    },
    setTikitData: (data: any) => {
      dispatch({ type: 'TICKIT_LIST', payload: data })
    },
    headerSelect: (isSelectClick: any) =>
      dispatch({ type: 'IS_HEADER_SELECT', payload: isSelectClick }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComplaints)

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
