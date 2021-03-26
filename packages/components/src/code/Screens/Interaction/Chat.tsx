import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import ModalScreen from '../../Component/ModalScreen'
import Default from '../../Default/Default'
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
  const {
    token,
    clientId,
    complaintId,
    selectedTickit,
    tickitList,
    navigation,
    clearSelectedTickit,
  } = props

  const [index, setIndex] = useState()
  const [isInfluencer, setIsInfluencer] = useState('')

  useEffect(() => {
    const findIndexOfTickit = () => {
      const ind = tickitList
        .map(function (item: any) {
          return item.complaint_id
        })
        .indexOf(complaintId)
      setIndex(ind)
    }

    findIndexOfTickit()
  }, [props, complaintId, tickitList])

  // const clearTickit = () => {
  //   clearSelectedTickit()
  // }

  // useEffect(() => {

  //   return () => {
  //     clearTickit()
  //   }
  // },[])

  const onMarkInfluencer = async (type: any) => {
    try {
      const body = {
        client_id: clientId,
        user_type: type,
      }
      setIsInfluencer(type)
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

  const findIndexOfTickit = () => {
    const ind = tickitList
      .map(function (item: any) {
        return item.complaint_id
      })
      .indexOf(complaintId)
    setIndex(ind)
    return ind
  }

  const onPreviousTickit = async () => {
    const ind = await findIndexOfTickit()
    // console.log('index', ind)
    props.setTickit(tickitList[ind - 1])
  }

  const onNextTickit = async () => {
    const ind = await findIndexOfTickit()
    // console.log('index', ind)
    props.setTickit(tickitList[ind + 1])
  }

  const viewPost = async () => {
    const url = selectedTickit.post_url ? selectedTickit.post_url : null
    // window.open(url, '_blank');
    // return url
    window.open(
      url,
      'targetWindow',
      'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes, width=800,height=700,left=460',
    )
    return false
  }

  return (
    <Default navigation={navigation}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#F1F6FF',
            height: '10%',
            paddingRight: '2%',
          }}
        >
          <View style={{ flex: 13 }}>
            <View
              style={{
                justifyContent: 'space-between',
                // justifyContent: 'space-around',
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
                    {isInfluencer === 'detractor' ? (
                      <RadioChecked />
                    ) : (
                      <RadioUnchecked />
                    )}
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
                    {isInfluencer === 'influencer' ? (
                      <RadioChecked />
                    ) : (
                      <RadioUnchecked />
                    )}
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
              <View style={[styles.headerButton]}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={viewPost}
                >
                  <View style={styles.Icon}>
                    <OpenPost />
                  </View>
                  <View>
                    <Text style={styles.ButtonText}>View Post</Text>
                  </View>
                </TouchableOpacity>
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
              flex: 1,
              justifyContent: 'space-evenly',
            }}
          >
            <View style={styles.ArrowIcon}>
              {index === 0 ? (
                <Icon
                  style={{ opacity: 0.2 }}
                  name="angle-left"
                  color="#585353"
                  size={20}
                />
              ) : (
                <Icon
                  name="angle-left"
                  color="#585353"
                  onPress={() => onPreviousTickit()}
                  size={20}
                />
              )}
            </View>
            <View style={styles.ArrowIcon}>
              {index === tickitList.length - 1 ? (
                <Icon
                  style={{ opacity: 0.2 }}
                  name="angle-right"
                  color="#585353"
                  size={20}
                />
              ) : (
                <Icon
                  name="angle-right"
                  color="#585353"
                  onPress={() => onNextTickit()}
                  size={20}
                />
              )}
            </View>
          </View>
        </View>
        <ModalScreen />
      </View>
    </Default>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
    selectedTickit: state.tickitListData.selectedTickit
      ? state.tickitListData.selectedTickit
      : {},
    clientId:
      state.tickitListData.selectedTickit &&
      state.tickitListData.selectedTickit.client_id,
    complaintId:
      state.tickitListData.selectedTickit &&
      state.tickitListData.selectedTickit.complaint_id,
    tickitList: state.tickitListData.tickitList,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTickit: (data: any) => {
      dispatch({ type: 'TICKIT_SELECT', payload: data })
    },
    clearSelectedTickit: () => {
      dispatch({ type: 'CLEAR_SELECTED_TICKIT' })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)

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
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    lineHeight: 20,
  },
  Icon: {
    paddingRight: '6%',
    paddingTop: '4%',
  },
  ArrowIcon: {
    borderColor: '#DCDCDC',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    paddingHorizontal: '15%',
    paddingVertical: '5%',
    marginVertical: '10%',
    marginHorizontal: '10%',
    elevation: 7,
    borderRadius: 6,
  },
})
