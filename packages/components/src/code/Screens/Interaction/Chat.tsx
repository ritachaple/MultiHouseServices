import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import ModalScreen from '../../Component/ModalScreen'
import {
  RadioChecked,
  RadioUnchecked,
  OpenPost,
  Refresh,
  Spam,
  RightArrow,
  LeftArrow,
  MoveVerticle,
} from '../../Images/SelectCBoxIcon'
import Api from '../../provider/api/Api'
import { configs } from '../../provider/api/ApiUrl'

const ChatScreen = (props: any) => {
  const { token, clientId, complaintId, selectedTickit } = props

  const onMarkInfluencer = async (type: any) => {
    try {
      const body = {
        client_id: clientId,
        user_type: type,
      }
      const res: any = await Api.put(
        `${configs.mark_influencer_detractor}`,
        body,
        token,
      )
      console.log('mark influence res', res)
      if (res.status === 200) {
        console.log(`mark ${type} success`)
      }
    } catch (error) {
      console.error('mark enfluencer error', error)
    }
  }

  const fetchActivity = async () => {
    try {
      const res: any = await Api.get(
        `${configs.get_activity}${complaintId}/2`,
        token,
      )
      console.log('fetch activity', res)
      if (res.status === 200) {
        // setChatData(res.data.data)
        console.log('fetch activity api success')
      }
    } catch (error) {
      console.log('fetch activityError', error)
    }
  }

  const onMarkSpam = async () => {
    try {
      const body = {
        activity_id: null,
        conversation_text: 'Marked as Spam !',
        created_by: 'system',
        is_internal_user: true,
        is_internal: true,
        is_system_generated: true,
        user_id: selectedTickit.user_id,
        is_user_reply: false,
        department_id: selectedTickit.department_id,
        complaint_id: complaintId,
        medium_id: selectedTickit.medium_id,
        status_id: selectedTickit.status_id,
        is_spam: true,
      }
      const res: any = await Api.post(`${configs.log_activity}`, body, token)
      console.log('spam res', res)
      if (res.status === 200) {
        console.log('spam api success')
      }
    } catch (error) {
      console.error('spam api error', error)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#E5E5E5',
          height: '10%',
          paddingRight: '1%',
        }}
      >
        <View style={{ flex: 7 }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '50%',
              paddingLeft: '2%',
            }}
          >
            <View style={styles.headerButton}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  onMarkInfluencer('detractor')
                }}
              >
                <View style={styles.Icon}>
                  <RadioChecked />
                </View>
                <Text style={styles.ButtonText}>Detractor</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.headerButton}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                  onMarkInfluencer('influencer')
                }}
              >
                <View style={styles.Icon}>
                  <RadioUnchecked />
                </View>
                <Text style={styles.ButtonText}>Influencer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.headerButton}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={fetchActivity}
              >
                <View style={styles.Icon}>
                  <Refresh />
                </View>
                <Text style={styles.ButtonText}>Refresh</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.headerButton, { width: '20%' }]}>
              <View style={styles.Icon}>
                <OpenPost />
              </View>
              <Text style={styles.ButtonText}>View Post</Text>
            </View>
            <View style={styles.headerButton}>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={onMarkSpam}
              >
                <View style={styles.Icon}>
                  <Spam />
                </View>
                <Text style={styles.ButtonText}>Spam</Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: '3%' }}>
              <MoveVerticle />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '10%',
          }}
        >
          <View>
            <LeftArrow />
          </View>
          <View>
            <RightArrow />
          </View>
          {/* <Icon
              name="angle-left"
            //   onPress={() => onPageChanged('-')}
              size={20}
            />
             <Icon
              name="angle-right"
            //   onPress={() => onPageChanged('+')}
              size={20}
            /> */}
        </View>
      </View>
      <ModalScreen />
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    selectedTickit: state.tickitListData.selectedTickit
      ? state.tickitListData.selectedTickit
      : {},
    clientId: state.tickitListData.selectedTickit.client_id,
    complaintId: state.tickitListData.selectedTickit.complaint_id,
  }
}

export default connect(mapStateToProps)(ChatScreen)

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    marginVertical: '2%',
    flexDirection: 'row',
  },
  ButtonText: {
    color: '5A607F',
    fontFamily: 'Poppins-Black',
    fontSize: 12,
    lineHeight: 20,
  },
  Icon: {
    paddingRight: '6%',
    paddingTop: '4%',
  },
})
