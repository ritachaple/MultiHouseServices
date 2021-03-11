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

const SelectIcon = () => {
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

  const onDeleteOk = async () => {
    onDeleteClick()
    try {
      const body = {
        complaint_id: [325833],
        user_id: 5889,
        is_delete: true,
      }
      const res: any = await Api.post(configs.delete_complaints, body)
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
        complaint_id: [325871],
        client_id: 39,
      }
      const res: any = await Api.post(configs.block_user, body)
      console.log('blockRes', res)
      // if(res.status===200){
      // }
    } catch (error) {
      console.log('Block Complainte Error')
    }
  }

  const onMergeOk = async () => {
    onMergePress()
    try {
      const body = ['325938']

      const res: any = await Api.post(configs.mark_complaint_unread, body)
      console.log('Mark Complaint', res)
      // if(res.status===200){
      // }
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
        // onPress={() => {
        //     onBlockClick()
        //   }}
        >
          <MarkUnread />
        </TouchableOpacity>
      </View>
      <View style={[styles.borderBox, { marginLeft: '8%' }]}>
        <TouchableOpacity
        // onPress={() => {
        //     onBlockClick()
        //   }}
        >
          <SpamUser />
        </TouchableOpacity>
      </View>
      <View style={[styles.borderBox, { marginLeft: '8%' }]}>
        <TouchableOpacity
        // onPress={() => {
        //     onBlockClick()
        //   }}
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

        {mergeModalVisible ? (
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
        ) : null}
      </Modal>
    </View>
  )
}

export default SelectIcon

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
