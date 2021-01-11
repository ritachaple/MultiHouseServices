import React from 'react'
import { View, Text, StyleSheet, CheckBox } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Hoverable } from 'react-native-web-hover'
import { Avatar, Badge, withBadge } from 'react-native-elements'

const colors = ['red', 'green', 'blue', 'black']

const List = ({ item }: { item: any }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.complaintId}>
          {/* <Icon name="twitter" size={15} color="#000" /> */}
          {/* <Icon name="facebook-square" size={15} color="#000"/> */}

          <Hoverable>
            {({ hovered }) =>
              hovered ? (
                <CheckBox value={false} style={styles.checkbox} />
              ) : (
                <Icon name="twitter" size={15} color="#000" />
              )
            }
          </Hoverable>
          <Text>#{item.complaint_id}</Text>
        </View>

        <View style={{ flex: 5, paddingLeft: '2%' }}>
          <Hoverable>
            {({ hovered }) => (
              <Text
                style={[
                  styles.complaintText,
                  { textDecorationLine: hovered ? 'underline' : 'none' },
                ]}
                numberOfLines={1}
              >
                {item.complaint_text}
              </Text>
            )}
          </Hoverable>
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
                  <View style={styles.fakeFactorShape}>
                    <Text
                      style={[styles.category, { color: 'white', fontSize: 7 }]}
                    >
                      Half true
                    </Text>
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
        <View style={styles.iconStyle}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ paddingRight: '10%' }}>
              <Hoverable>
                {({ hovered }) => (
                  <Icon
                    name="smile-o"
                    size={15}
                    onPress={() => {
                      console.log('icon')
                    }}
                    color={hovered ? 'green' : 'grey'}
                  />
                )}
              </Hoverable>
            </View>
            <View style={{ paddingRight: '10%' }}>
              <Hoverable>
                {({ hovered }) => (
                  <Icon
                    name="meh-o"
                    size={15}
                    onPress={() => {
                      console.log('meh-o')
                    }}
                    color={hovered ? '#dbab16' : 'grey'}
                  />
                )}
              </Hoverable>
            </View>
            <Hoverable>
              {({ hovered }) => (
                <Icon
                  style={{ paddingRight: '10%' }}
                  name="frown-o"
                  size={15}
                  onPress={() => {
                    console.log('frown-o')
                  }}
                  color={hovered ? 'red' : 'grey'}
                />
              )}
            </Hoverable>
          </View>

          <Icon
            name="square"
            style={{ paddingTop: '1%' }}
            size={12}
            color={
              colors[item.priority_id] ? colors[item.priority_id] : 'yellow'
            }
          />

          <View>
            <Icon name="navicon" size={15} color="gray" />
            <Text style={styles.threadCount}>{item.thread_count}</Text>
          </View>

          {/* <Icon name="times-rectangle" size={15} color="gray"/> */}
          <Icon name="hourglass-half" size={15} color="gray" />

          {/* <View
            style={[
              styles.square,
              {
                backgroundColor: colors[item.priority_id]
                  ? colors[item.priority_id]
                  : 'yellow',
              },
            ]}
          /> */}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: '1%',
    borderBottomColor: '#dce3de',
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
    marginTop: '0.2%',
    // marginRight: '5%',
    paddingBottom: 1,
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
    color: '#333',
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
  },
  iconStyle: {
    flex: 2,
    flexDirection: 'row',
    paddingTop: '2%',
    paddingLeft: '4%',
    paddingRight: '2%',
    justifyContent: 'space-between',
  },
  checkbox: {
    // borderColor: 'none',
    height: 10,
    width: 10,
  },
  threadCount: {
    color: '#000',
    fontSize: 8,
    position: 'absolute',
    top: '-5%',
    right: '-50%',
  },
})

export default List
