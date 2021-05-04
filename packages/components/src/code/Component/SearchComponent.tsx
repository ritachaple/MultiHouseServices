import React, { useEffect, useState } from 'react'
import {
  View,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
// @ts-ignore
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
// @ts-ignore
import styled from 'styled-components'

import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import Pagination from './Pagination'
import DropDownList from './DropDownList'
import ListComponent from './ListComponent'
import { UnChecked, Checked } from '../Images/Checkbox'
import { searchComplaintsApi } from '../CommnFncn/IntegrationAPI'
import { Plus } from '../Images/Header'
import Loader from './Loader'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const headerName = [
  'Id',
  'Subject',
  'Raised By',
  'Raised at',
  'Status',
  'Sentiment',
  'Priority',
  'Assignee',
]

const toDo: any = [
  {
    id: '1',
    title: 'HeaderList',
    // list: headerName,
    column: {
      id: 'column-1',
      list: headerName,
    },
  },
]

const Container = styled.div`
  width: 100%;
  position: static;
`

const SearchComplaints = (props: any) => {
  const {
    tickitItems,
    isHeaderSelect,
    startDate,
    endDate,
    navigation,
    token,
    pageIndex,
    pageSize,
    clientDetails,
    userDetails,
  } = props

  const [tickit, setTickit] = useState([])
  const [showHeaderListModal, seHeaderListModal] = useState(false)
  // const [headerListData, setHeaderList] = useState([] as any)

  // const [selectedHeader, setSelectedHeader] = useState(headerName)
  const [selectedHeader, setSelectedHeader] = useState(toDo[0].column.list)
  const [headerStatListData, setStaticHeaderList] = useState(headerName)
  const [progres, setProgres] = useState(100)
  const horizontalFlatlist = true

  // const Header1 = (props: any) => {
  const Header1 = () => {
    // const data = toDoo.toDoo
    // console.log('data', data)

    // const StyleContainer = styled.div`
    //   width: 100%;
    //   display: flex;
    //   flex-direction: column;
    // `
    const StyleContainer = styled.div`
      flex-grow: 1;

      display: flex;
    `

    const taskHendler = () => {
      // console.log('item', items)

      const StyledContainer = styled.div`
        margin: 1% 5%;
        display: flex;
        position: 'fixed';
      `

      return (
        selectedHeader !== undefined &&
        selectedHeader.length > 0 &&
        selectedHeader.map(
          (item: any, index: number) => (
            // <View style={{ flexDirection: "row" }}>
            /* <Text style={{ marginHorizontal: 65 }}>{item}</Text> */

            <View
              style={{
                flex: 1,
                // paddingLeft: '2%'
                paddingHorizontal: '2%',
              }}
            >
              <Draggable draggableId={`${index}`} index={index}>
                {(provided: any, snapshot: any) => (
                  <StyledContainer
                    // style={{ flexDirection: 'row', }}
                    // id="styled-cont"
                    // ref={provided.innerRef}
                    // isDragging={snapshot.isDragging}
                    // {...provided.draggableProps}
                    // {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                  >
                    {/* {item} */}

                    <Text
                      style={{
                        flex: 1,
                        fontSize: 12,
                        fontFamily: 'Poppins-Light',
                        color: '#5A607F',
                      }}
                    >
                      {item}
                    </Text>
                  </StyledContainer>
                )}
              </Draggable>
            </View>
          ),

          // </View>
        )
      )
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        {/* {taskHendler(toDo.list)} */}
        <Droppable droppableId="dropableId" direction="horizontal">
          {(provided: any, snapshot: any) => (
            <StyleContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              // ref={provided.innerRef}
              // {...provided.droppableProps}
            >
              <View
                style={{
                  // flexDirection: 'row',
                  // width: '100%',
                  // justifyContent: 'space-around',
                  flex: 1,
                  flexDirection: 'row',
                  borderBottomColor: '#dce3de',
                  borderBottomWidth: 0.1,
                  paddingHorizontal: '1%',
                  // paddingLeft: '1%',
                  paddingVertical: '1%',
                }}
              >
                <TouchableOpacity onPress={() => onCheckBox()}>
                  {isHeaderSelect ? <Checked /> : <UnChecked />}
                </TouchableOpacity>

                {taskHendler()}
                <TouchableOpacity
                  style={{ width: '1%' }}
                  onPress={() => {
                    onPlusClick()
                  }}
                >
                  <Plus />
                </TouchableOpacity>
              </View>
              {provided.placeholder}
            </StyleContainer>
          )}
        </Droppable>
      </View>
    )
  }

  useEffect(() => {
    const dynamicControls = async () => {
      try {
        const res: any = await Api.get(
          `${configs.dynamic_get_controls}`,
          props.token,
        )
        if (res.status === 200 && res.data.controls !== null) {
          // console.log(' priority dropdown data', res.data.controls[4])
          // setPriority(res.data.controls[4])
          props.setAssigneeDropdownList(res.data.controls[4].lookup_data)
          props.setpriorityDropdown(res.data.controls[5].lookup_data)
        }
      } catch (error) {
        console.log('dynamic Control error', error)
      }
    }

    const HeadingList = async () => {
      try {
        const res: any = await Api.get(`${configs.headerList}`, props.token)
        if (res.status === 200) {
          // console.log('HeadingList', res)
          // setHeaderList(res.data.message)
          console.log('HeadingList', res.data.message)
        }
      } catch (error) {
        console.log('dynamic Control error', error)
      }
    }

    const unsubscribe = props.navigation.addListener('focus', () => {
      const searchComplaints = async () => {
        setProgres(100)
        const res: any = await searchComplaintsApi(
          token,
          pageSize,
          pageIndex,
          startDate,
          endDate,
          clientDetails && clientDetails.client_id,
          userDetails && userDetails.user_id,
        )
        if (res && res.status === 200) {
          setTickit(res.data.data)
          setProgres(0)
          props.setTikitData(res.data.data)
          props.setTotalRecords(res.data.total_records)
          props.setPageIndex(pageIndex)
          props.setPageSize(pageSize)
          console.log('res.data', res.data.data)
        } else {
          props.clearToken()
        }
      }

      const clearData = async () => {
        props.clearHeaderData()
      }
      searchComplaints()
      clearData()
      HeadingList()
      dynamicControls()
    })
    return unsubscribe
  }, [props, pageIndex, pageSize, token, endDate, startDate])

  const onCheckBox = () => {
    props.headerSelect(!isHeaderSelect)
    props.setFilterHeader()
  }

  const onPlusClick = () => {
    console.log('clickclose')

    seHeaderListModal(!showHeaderListModal)
  }

  const onDropdownSelect = (item: any, index: any) => {
    try {
      const check = Boolean(
        selectedHeader.find((value: any) => {
          return value === item
        }),
      )
      // console.log('checkHeader', check)

      const list = [...headerStatListData]
      if (!check) {
        // console.log('false')
        const data = [...selectedHeader]
        // data.splice(index, 0, item)
        // console.log("selectedHeader.length", selectedHeader.length);
        const indx =
          selectedHeader && selectedHeader.length > 0 && selectedHeader.length
        data.splice(index, 0, item)
        // list.splice(index, 1)
        setSelectedHeader(data)
        // if (indx) {
        //   list.splice(indx, 0, item)
        //   // console.log("listdata11", data)
        // }
      } else {
        const unchecked = list.splice(index, 1)
        // console.log("unchecked", unchecked);
        // list.splice(headerStatListData.length, 0, unchecked[0])
        removeItem(item)
      }
      // setStaticHeaderList(list)
    } catch (error) {
      console.error('dropdown errro', error)
    }
    // console.log('selectedHeader', selectedHeader)
  }

  const onSortPress = (item: any, sort: any, ind: any) => {
    try {
      const header = [...headerName]
      const data = [...selectedHeader]
      const index = data.indexOf(item)
      data.splice(index, 1)
      headerName.splice(ind, 1)
      if (sort === '+') {
        data.splice(index - 1, 0, item)

        headerName.splice(ind - 1, 0, item)
      } else if (sort === '-') {
        // data.splice(index, 1)
        data.splice(index + 1, 0, item)
        headerName.splice(ind + 1, 0, item)
      }

      console.log('sortingData', data)
      setSelectedHeader(data)
      // props.selectedItem(item)
    } catch (error) {
      console.error('sorting error')
    }
  }

  const removeItem = (item: any) => {
    try {
      const data = [...selectedHeader]
      const index = data.indexOf(item)
      // console.log("index",index);
      data.splice(index, 1)
      // console.log("after deleted data", data);
      setSelectedHeader(data)
    } catch (error) {
      console.error(error)
    }
  }

  const headerList = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderBottomColor: '#dce3de',
          borderBottomWidth: 0.1,
          paddingHorizontal: '1%',
          // paddingLeft: '1%',
          paddingVertical: '1%',
        }}
      >
        <TouchableOpacity onPress={() => onCheckBox()}>
          {isHeaderSelect ? <Checked /> : <UnChecked />}
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            // paddingLeft: '2%'
          }}
        >
          <FlatList
            contentContainerStyle={{
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: '1%',
              alignContent: 'center',
              justifyContent: 'space-between',
            }}
            horizontal={horizontalFlatlist}
            data={selectedHeader}
            renderItem={({ item, index }) => {
              // let flex = 1
              //  if( item === "Subject"){
              //   flex = 2
              //  }else{
              //   flex=1
              //  }

              return (
                // { check?
                // <Text style={{ flex: flex, textAlign: 'center' }}>{item}</Text>:
                <Text
                  style={[
                    {
                      flex: 1,
                      fontSize: 12,
                      fontFamily: 'Poppins-Light',
                      color: '#5A607F',
                    },
                  ]}
                >
                  {item}
                </Text>
              )
            }}
            keyExtractor={(index: any) => index.toString()}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            onPlusClick()
          }}
        >
          <Plus />
        </TouchableOpacity>
        {/* <Icon
          style={{
            paddingTop: 3,
          }}
          onPress={() => onPlusClick()}
          name="plus"
          size={15}
          color="grey"
        /> */}
      </View>
    )
  }

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      // setSelectedHeader(selectedHeader)
      return
    }

    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   // setSelectedHeader(selectedHeader)
    //   return;
    // }

    if (destination && destination.index !== source.index) {
      const sourceIdx = parseInt(result.source.index, 10)
      const destIdx = parseInt(result.destination.index, 10)
      const draggedLink = selectedHeader[sourceIdx]

      const newList = selectedHeader.slice()
      newList.splice(sourceIdx, 1)
      newList.splice(destIdx, 0, draggedLink)
      setSelectedHeader(newList)
    }
  }

  return (
    <View style={styles.container}>
      <Loader progres={progres} />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            borderRadius: 3,
            backgroundColor: '#fff',
          }}
        >
          {/* {headerList()} */}

          <DragDropContext onDragEnd={onDragEnd}>
            <Container>
              <Header1 />
            </Container>
          </DragDropContext>

          <FlatList
            style={{
              flex: 1,
            }}
            data={tickitItems}
            renderItem={({ item }) => {
              return (
                <View>
                  <ListComponent
                    tickitItems={item}
                    selectedHeader={selectedHeader}
                    navigation={navigation}
                  />
                </View>
              )
            }}
            // ListHeaderComponent={() => headerList()}
            keyExtractor={(index: any) => index.toString()}
          />
        </View>
      </ScrollView>
      <Pagination navigation={navigation} />
      <>
        <Modal
          style={{ flex: 1 }}
          animationType="none"
          transparent={showHeaderListModal}
          visible={showHeaderListModal}
          onRequestClose={() => {
            onPlusClick()
          }}
        >
          <DropDownList
            style={{
              marginLeft: '75%',
              marginRight: '1%',
              marginTop: '15%',
              marginBottom: '15%',
              // width:"30%"
            }}
          >
            <Icon
              name="remove"
              onPress={onPlusClick}
              style={{ marginLeft: '90%', paddingTop: '1%' }}
              size={12}
              color="#000"
            />
            <FlatList
              style={{ flex: 1 }}
              data={headerStatListData}
              renderItem={({ item, index }) => {
                const isCheck = Boolean(
                  selectedHeader.find((value: any) => {
                    return value === item
                  }),
                )
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      // backgroundColor: isCheck ? '#3498DB' : '#fff',
                      backgroundColor: '#fff',
                      // borderBottomWidth: 0.2,
                      // borderBottomColor: 'gray',
                    }}
                  >
                    <View
                      style={{
                        flex: 7,
                        justifyContent: 'flex-start',
                        padding: '0.5%',
                        flexDirection: 'row',
                      }}
                    >
                      <View style={{ flexDirection: 'row', flex: 3 }}>
                        <View style={{ paddingHorizontal: '1%' }}>
                          {' '}
                          <TouchableOpacity
                            onPress={() => onDropdownSelect(item, index)}
                          >
                            {isCheck ? <Checked /> : <UnChecked />}
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={styles.fontFamily}
                          // onPress={() => onDropdownSelect(item, index)}
                        >
                          {item}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: '20%',
                        justifyContent: 'space-around',
                        paddingRight: '10%',
                      }}
                    >
                      {/* <View
                        style={{ paddingHorizontal: '20%', paddingTop: '20%' }}
                      >
                        {index > 0 && (
                          <Icon
                            name="angle-up"
                            onPress={() => onSortPress(item, '+', index)}
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              // paddingTop: '1%',
                            }}
                            size={12}
                            color="#000"
                          />
                        )}
                      </View> */}
                      {/* <View
                        style={{ paddingHorizontal: '20%', paddingTop: '20%' }}
                      >
                        {selectedHeader.length - 1 !== index && (
                          <Icon
                            name="angle-down"
                            onPress={() => onSortPress(item, '-', index)}
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              // paddingTop: '40%',
                            }}
                            size={12}
                            color="#000"
                          />
                        )}
                      </View> */}
                    </View>
                    <View style={{ flex: 2 }} />
                  </View>
                )
              }}
              keyExtractor={(index: any) => index.toString()}
            />
          </DropDownList>
        </Modal>
      </>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    tickitItems: state.tickitListData.tickitList,
    isHeaderSelect: state.headerData.isHeaderSelect,
    pageSize: state.Pagination.initialState.pageSize,
    pageIndex: state.Pagination.initialState.pageIndex,
    startDate: state.tickitListData.startDate,
    endDate: state.tickitListData.endDate,
    clientDetails: state.loginReducer.clientDetails,
    userDetails: state.loginReducer.userDetails,
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
    headerSelect: (isSelectClick: any) => {
      dispatch({ type: 'IS_HEADER_SELECT', payload: isSelectClick })
    },
    clearToken: () => {
      dispatch({ type: 'CLEAR_LOGIN_TOKEN' })
    },
    setpriorityDropdown: (data: any) => {
      dispatch({ type: 'PRIORITY_LIST', payload: data })
    },
    setAssigneeDropdownList: (data: any) => {
      dispatch({ type: 'ASSIGNEE_LIST', payload: data })
    },
    setTotalRecords: (data: number) => {
      dispatch({ type: 'TOTAL_RECORDS', payload: data })
    },
    setPageIndex: (pageIndex: number) => {
      dispatch({ type: 'PAGE_INDEX', payload: pageIndex })
    },
    setPageSize: (pageSize: number) => {
      dispatch({ type: 'PAGE_SIZE', payload: pageSize })
    },
    setFilterHeader: () => {
      dispatch({ type: 'SET_FILTER_HEADER' })
    },
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
  fontFamily: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
})
