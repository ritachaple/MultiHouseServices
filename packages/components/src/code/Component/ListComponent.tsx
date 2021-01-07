import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import moment from 'moment'
// import { Icon, SocialIcon } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/Ionicons';
import { Icon, SocialIcon } from 'react-native-elements'

const colors = ['red', 'green', 'blue', 'black']

const List = ({ item }: { item: any }) => {
  // const {item} = props;
  // console.log('List item: ',props);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ height: '10', width: '10' }}>
          {/* <SocialIcon
  type='facebook'
/> */}
          {/* <Icon
  size={10}
  name='entypo-twitter'
  color='#517fa4'
/> */}
        </View>

        <View style={styles.complaintId}>
          <Text>#{item.complaint_id}</Text>
        </View>

        <View style={{ flex: 8 }}>
          <Text style={[styles.complaintText]} numberOfLines={1}>
            {item.complaint_text}
          </Text>
          <View style={styles.moreDetails}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.username}>{item.user_name}</Text>
              <Text style={styles.complaintTimeZone}>
                Created:{moment(item.created_on).format('DD MMM YYYY, h:mm a')}
              </Text>
              <Text style={styles.complaintTimeZone}>
                Updated:{' '}
                {moment(item.last_modified_on).format('DD MMM YYYY, h:mm a')}
              </Text>
              <Text style={styles.viewLink}>View</Text>
            </View>

            <View>
              <Text style={styles.postLink}>Post</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.category}>Cartegory :</Text>
              <View style={styles.ovalShape}>
                <Text
                  style={[styles.category, { color: 'white', fontSize: 7 }]}
                >
                  Acp name
                </Text>
              </View>
              {item.fake_factor !== null ? (
                <View style={{ flexDirection: 'row', paddingLeft: '1%' }}>
                  <Text style={styles.category}>Fake Factor:</Text>
                  {/* <View style={styles.ovalShape}>
              <Text style={[styles.category,{color:"white",fontSize:7}]} >Half true</Text>
            </View> */}
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <View style={{ flex: 2, flexDirection: 'row' }}>
          {/* <Icon name="ios-book" color="#4F8EF7" /> */}
          <View
            style={[
              styles.square,
              {
                backgroundColor: colors[item.priority_id]
                  ? colors[item.priority_id]
                  : 'yellow',
              },
            ]}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: '1%',
    paddingBottom: '1%',
    borderBottomColor: '#969998',
    borderBottomWidth: 0.1,
    // flexDirection:"row"
  },
  complaintId: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1,
    // marginTop: "2%",
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  moreDetails: {
    color: '#3d9189',
    // fontSize: 9,
    // overflow: 'visible',
    marginTop: '0.2%',
    // marginRight: '5%',

    paddingBottom: 1,
    // borderColor: 'black',
    // borderWidth: 1,
    // paddingLeft: '2%',
    // paddingTop: 1,
  },
  category: {
    color: '#aaa',
    letterSpacing: 0.1,
    fontSize: 8,
    justifyContent: 'center',
    paddingRight: 1,
  },
  username: {
    fontSize: 9,
    color: '#3d9189',
    // overflow: 'visible',
    marginTop: 1,
    // marginRight: 5,
  },
  complaintText: {
    color: ' #333',
    fontSize: 12,
    // lineHeight: 1,
    marginTop: '1%',
    // marginHorizontal: 5,
    // overflow: 'hidden'
  },
  complaintTimeZone: {
    fontSize: 8,
    color: '#aaa',
    letterSpacing: 0.1,
    marginTop: 1,
    // marginRight: 5,
    marginLeft: '3%',
  },
  viewLink: {
    fontSize: 8,
    color: '#337ab7',
    marginLeft: '3%',
  },
  postLink: {
    fontSize: 8,
    color: '#337ab7',
  },
  square: {
    width: 10,
    height: 10,
    position: 'absolute',
    right: '20%',
    bottom: '10%',
  },
  ovalShape: {
    padding: 1,
    backgroundColor: '#5bc0de',
    borderRadius: 20,
    paddingHorizontal: '2%',
  },
  fakeFactorShape: {
    padding: 1,
    backgroundColor: '#D44638',
    borderRadius: 20,
    paddingHorizontal: '2%',
  },
})

export default List
