import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { Divider, ListItem, Avatar } from 'react-native-elements'
import Api from '../provider/api/Api'
import { configs } from '../provider/api/ApiUrl'

const UserHistory = (props: any) => {
  const { token } = props

  const [userDetails, setUserDetails] = useState([] as any)

  useEffect(() => {
    const usersDetailsApi = async () => {
      try {
        const res: any = await Api.get(`${configs.userDetails}`, token)
        console.log('UserDetailsRes', res)
        if (res.status) {
          setUserDetails(res.data.data)
        }
      } catch (error) {
        console.log('usersDetailsApiError', error)
      }
    }

    usersDetailsApi()
  }, [token])

  const onUserDetailsClick = () => {
    props.showUserDetails()
  }

  return (
    <View style={{ flex: 1, padding: '1%' }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#6056b8',
          borderRadius: 3,
          borderColor: '#000',
          borderWidth: 1,
          paddingVertical: '0.5%',
          paddingHorizontal: 5,
          flexDirection: 'row',
          width: '9%',
        }}
        onPress={onUserDetailsClick}
      >
        <Text style={{ fontSize: 10, alignSelf: 'center', color: '#fff' }}>
          User Details
        </Text>
        <Icon
          style={{ alignSelf: 'center', paddingHorizontal: '10%' }}
          name="pencil"
          size={10}
          color="#fff"
        />
      </TouchableOpacity>
      <Divider style={{ marginTop: '1%' }} />
      <View
        style={{
          paddingHorizontal: '40%',
          alignContent: 'center',
          paddingVertical: '1%',
        }}
      >
        <Text>Users History</Text>
      </View>
      <Divider />
      <FlatList
        style={{
          flex: 1,
        }}
        data={userDetails}
        renderItem={({ item }) => {
          console.log('renderItem item: ', item)

          return (
            <View style={{ flexDirection: 'row', paddingVertical: '2%' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Icon
                  style={{ alignSelf: 'center', paddingHorizontal: '10%' }}
                  name="twitter"
                  size={12}
                  color="#000"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.textSize, { alignItems: 'center' }]}>
                  {item.complaint_id}
                </Text>
              </View>
              <View style={{ flex: 6 }}>
                <Text style={styles.textSize} numberOfLines={1}>
                  {item.complaint_text}
                </Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Icon
                  style={{ alignSelf: 'center', paddingHorizontal: '10%' }}
                  name="window-close"
                  size={12}
                  color="#000"
                />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={[styles.textSize, { paddingHorizontal: '4%' }]}>
                  {moment(item.last_modified_on).format('DD MMM YYYY, h:mm a')}
                </Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={[styles.textSize, { paddingHorizontal: '4%' }]}>
                  {moment(item.created_on).format('DD MMM YYYY, h:mm a')}
                </Text>
              </View>
            </View>
          )
        }}
        ListHeaderComponent={() => (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text>Medium</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>ID</Text>
            </View>
            <View style={{ flex: 6, alignItems: 'center' }}>
              <Text>Complaints</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text>Status</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center' }}>
              <Text>Created Date</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center' }}>
              <Text>Last Modified Date</Text>
            </View>
          </View>
        )}
        keyExtractor={(index: any) => index.toString()}
      />
    </View>
  )
}

const mapStateToProps = (state: any) => {
  return {
    token: state.loginReducer.token,
  }
}

export default connect(mapStateToProps)(UserHistory)

const styles = StyleSheet.create({
  textSize: { fontSize: 12 },
})
