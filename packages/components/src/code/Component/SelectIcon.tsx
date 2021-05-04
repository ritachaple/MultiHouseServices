import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  Alert,
  StyleSheet,
} from 'react-native'
import { Header } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { searchComplaintsApi } from '../CommnFncn/IntegrationAPI'
import {
  SpamUser,
  Forward,
  EditUser,
  DeleteUser,
  BlockUser,
  MarkUnread,
  MarkUndelete,
} from '../Images/SelectCBoxIcon'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'
import AlertModal from './AlertModal'
import BatchEditComplaints from './BatchEditComplaints'
import ForwardExternalAgent from './ForwardExternalAgent'
import IconButton from './IconButton'
import NotificationModal from './NotificationModal'

const SelectIcon = (props: any) => {
  const {
    storeSelectedTickits,
    selectedOneTickit,
    token,
    endDate,
    startDate,
    pageIndex,
    pageSize,
    clientDetails,
    userDetails,
  } = props

  const onEditClick = () => {
    setModalVisible(!modalVisible)
    setEditModalVisible(!editModalVisible)
  }

  const [modalVisible, setModalVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [shareModalVisible, setShareModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [blockModalVisible, setBlockModalVisible] = useState(false)
  const [mergeModalVisible, setMergeModalVisible] = useState(false)
  const [spamModalVisible, setSpamModalVisible] = useState(false)
  const [undeleteModalVisible, setUndeleteModal] = useState(false)
  const [unspamModalVisible, setUnspamModal] = useState(false)

  const onShareClick = () => {
    setModalVisible(!modalVisible)
    setShareModalVisible(!shareModalVisible)
  }

  const onDeleteClick = () => {
    setModalVisible(!modalVisible)
    setDeleteModalVisible(!deleteModalVisible)
  }

  const onBlockClick = () => {
    setModalVisible(!modalVisible)
    setBlockModalVisible(!blockModalVisible)
  }

  const onMergePress = () => {
    setModalVisible(!modalVisible)
    setMergeModalVisible(!mergeModalVisible)
  }

  const onSpamPress = () => {
    setModalVisible(!modalVisible)
    setSpamModalVisible(!spamModalVisible)
  }
  const onUnDeletePress = () => {
    setModalVisible(!modalVisible)
    setUndeleteModal(!undeleteModalVisible)
  }
  const onUnSpamPress = () => {
    setModalVisible(!modalVisible)
    setUnspamModal(!unspamModalVisible)
  }

  const onDeleteOk = async () => {
    onDeleteClick()
    try {
      const body = {
        complaint_id: storeSelectedTickits,
        user_id: 5889,
        is_delete: true,
      }
      const res: any = await Api.post(configs.delete_complaints, body, token)
      console.log('deleteRes', res)
      // if(res.status===200){
      // }
      //  onDeleteClick()
    } catch (error) {
      console.log('Delete Complainte Error')
    }
  }

  const onBlockOk = async () => {
    onBlockClick()
    try {
      const body = {
        complaint_id: storeSelectedTickits,
        client_id: 39,
      }
      const res: any = await Api.post(configs.block_user, body, token)
      console.log('blockRes', res)
      // if(res.status===200){
      // }
    } catch (error) {
      console.log('Block Complainte Error')
    }
  }

  const searchComplaints = async () => {
    // setProgres(100)
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
      // setTickit(res.data.data)
      // setProgres(0)
      props.setTikitData(res.data.data)
      props.setTotalRecords(res.data.total_records)
      props.setPageIndex(pageIndex)
      props.setPageSize(pageSize)
      console.log('res.data', res.data.data)
    } else {
      props.clearToken()
    }
  }

  const onMergeOk = async () => {
    // onMergePress()
    try {
      const body = storeSelectedTickits

      const res: any = await Api.post(
        configs.mark_complaint_unread,
        body,
        token,
      )
      console.log('Mark Complaint', res)
      if (res.status === 200) {
        props.clearStoreSelectedTickit()
        props.clearHeaderFilter()
        searchComplaints()
      }
    } catch (error) {
      console.log('Mark Complaint Error', error)
    }
  }

  return (
    <View
      style={{
        paddingLeft: '8%',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <View style={styles.borderBox}>
        {/* <IconButton
          name="pencil"
          onPress={() => {
            onEditClick()
          }}
        /> */}
        <TouchableOpacity
          onPress={() => {
            onEditClick()
          }}
        >
          <EditUser />
        </TouchableOpacity>
      </View>
      <View style={[styles.borderBox, { marginLeft: '8%' }]}>
        {/* <IconButton
          name="share"
          onPress={() => {
            onShareClick()
          }}
        /> */}
        <TouchableOpacity
          onPress={() => {
            onShareClick()
          }}
        >
          <Forward />
        </TouchableOpacity>
      </View>
      <View style={[styles.borderBox, { marginLeft: '8%' }]}>
        {/* <IconButton
          name="trash"
          onPress={() => {
            onDeleteClick()
          }}
        /> */}
        <TouchableOpacity
          onPress={() => {
            onDeleteClick()
          }}
        >
          <DeleteUser />
        </TouchableOpacity>
      </View>
      <View style={[styles.borderBox, { marginLeft: '8%' }]}>
        <TouchableOpacity
          onPress={() => {
            onBlockClick()
          }}
        >
          <BlockUser />
        </TouchableOpacity>
      </View>
      <View style={[styles.borderBox, { marginLeft: '8%' }]}>
        <TouchableOpacity
          onPress={() => {
            // onSpamPress()
            onMergeOk()
          }}
        >
          <MarkUnread />
        </TouchableOpacity>
      </View>
      <View style={[styles.borderBox, { marginLeft: '8%' }]}>
        <TouchableOpacity
          onPress={() => {
            // onUnDeletePress()
            onSpamPress()
          }}
        >
          <SpamUser />
        </TouchableOpacity>
      </View>
      <View style={[styles.borderBox, { marginLeft: '8%' }]}>
        <TouchableOpacity
          onPress={() => {
            // onUnSpamPress()
            onUnDeletePress()
          }}
        >
          <MarkUndelete />
        </TouchableOpacity>
      </View>
      {/* <View style={[styles.borderBox,{ marginLeft:"8%" }]}>
        <IconButton
          name="chain"
          onPress={() => {
            onMergePress()
          }}
        />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="envelope-open-o" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="ban" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="archive" />
      </View>
      <View style={{ paddingLeft: '4%' }}>
        <IconButton name="lastfm" />
      </View> */}

      <Modal
        animationType="fade"
        transparent={modalVisible}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}
      >
        {editModalVisible ? (
          <BatchEditComplaints
            onPress={() => {
              onEditClick()
            }}
          />
        ) : null}

        {shareModalVisible ? (
          <ForwardExternalAgent
            onPress={() => {
              onShareClick()
            }}
          />
        ) : null}

        {deleteModalVisible ? (
          <AlertModal
            message="Are you sure you want to delete these tickets?"
            onPress={() => {
              onDeleteClick()
            }}
            onSaveClick={() => {
              onDeleteOk()
            }}
          />
        ) : null}

        {blockModalVisible ? (
          <AlertModal
            message="Are you sure you want to block these user?"
            onPress={() => {
              onBlockClick()
            }}
            onSaveClick={() => {
              onBlockOk()
            }}
          />
        ) : null}

        {/* {mergeModalVisible ? (
          <NotificationModal
            onCancelPress={() => {
              onMergePress()
            }}
            onOkPress={() => {
              onMergeOk()
            }}
            okBtnName="Merge"
            cancelBtnName="Skip Merge"
            message="Selected complaints will be merged. Proceed with merge?"
            title="Merge Notification"
          />
        ) : null} */}

        {spamModalVisible && (
          <NotificationModal
            onCancelPress={() => {
              onSpamPress()
            }}
            onOkPress={() => {
              onSpamPress()
            }}
            okBtnName="Spam"
            cancelBtnName="Cancel"
            message="Selected complaints will be mark as Spam. Proceed with Spam?"
            title="Mark Spam"
          />
        )}
        {undeleteModalVisible && (
          <NotificationModal
            onCancelPress={() => {
              onUnDeletePress()
            }}
            onOkPress={() => {
              onUnDeletePress()
            }}
            okBtnName="Undelete"
            cancelBtnName="Cancel"
            message="Selected complaints will be restored. Proceed with Undelete?"
            title="Undelete Notification"
          />
        )}
        {unspamModalVisible && (
          <NotificationModal
            onCancelPress={() => {
              onUnSpamPress()
            }}
            onOkPress={() => {
              onUnSpamPress()
            }}
            okBtnName="Unspam"
            cancelBtnName="Cancel"
            message="Selected complaints will be Unspammed. Proceed with Unspam?"
            title="Unspam Notification"
          />
        )}
      </Modal>
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    selectedOneTickit: state.headerData.oneTickitSelect,
    storeSelectedTickits: state.tickitListData.storeSelectedTickits
      ? state.tickitListData.storeSelectedTickits
      : ([] as any),
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
    clearStoreSelectedTickit: () => {
      dispatch({ type: 'CLEAR_STORE_SELECTED_TICKIT' })
    },
    clearHeaderFilter: () => {
      dispatch({ type: 'CLEAR_FILTER_HEADER' })
    },
    setTikitData: (data: any) => {
      dispatch({ type: 'TICKIT_LIST', payload: data })
    },
    setPageIndex: (pageIndex: number) => {
      dispatch({ type: 'PAGE_INDEX', payload: pageIndex })
    },
    setPageSize: (pageSize: number) => {
      dispatch({ type: 'PAGE_SIZE', payload: pageSize })
    },
    setTotalRecords: (data: number) => {
      dispatch({ type: 'TOTAL_RECORDS', payload: data })
    },
    clearToken: () => {
      dispatch({ type: 'CLEAR_LOGIN_TOKEN' })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectIcon)

const styles = StyleSheet.create({
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    // padding: 1,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  borderBox: {
    backgroundColor: '#fff',
    width: '25%',
    height: 39,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
})
