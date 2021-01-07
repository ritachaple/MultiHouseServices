import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const colors = ['red', 'green', 'blue', 'black']

const List = (props: any) => {
  const [item] = props
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.complaintText}>{item.complaint_text}</Text>
        <Text>{item.user_name}</Text>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '2%',
  },
  text: {
    fontSize: 14,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: '2%',
    paddingTop: '2%',
  },
  complaintText: {
    fontSize: 17,
  },
  square: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    position: 'absolute',
    right: '5%',
    bottom: '10%',
    // alignSelf: 'flex-end',
  },
})

export default List
