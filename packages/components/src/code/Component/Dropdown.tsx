import React, { useState } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Overlay } from 'react-native-elements'

const tickitStatus = [
  'Pending',
  'Assigned',
  'Resolve',
  'Closed',
  'Escalated',
  'Reopened',
  'Blocked',
  'Qwerty3',
]

const Dropdown = () => {
  const [displayList, setDisplayList] = useState(false)
  const [textField, setTextField] = useState('')

  const onInputPress = () => {
    setDisplayList(!displayList)
  }

  const onDropdownSelect = (item: any) => {
    setTextField(item)
    setDisplayList(!displayList)
  }

  return (
    <View style={{ flex: 1, padding: '4%' }}>
      <TouchableOpacity onPress={onInputPress}>
        <TextInput
          // style={{borderColor: 'gray'}}
          // value={dropdown}
          style={styles.input}
          placeholder="SelectData"
          value={textField}
        />
      </TouchableOpacity>
      {/* {displayList? */}
      <View style={{ backgroundColor: 'gray' }}>
        <Overlay
          style={{ flex: 1 }}
          isVisible={displayList}
          onBackdropPress={onInputPress}
        >
          <FlatList
            style={{ paddingHorizontal: '2%' }}
            data={tickitStatus}
            renderItem={({ item, index }) => {
              return (
                //    <View>
                <Text onPress={() => onDropdownSelect(item)}>{item}</Text>
                //   </View>
              )
            }}
            keyExtractor={(index: any) => index.toString()}
          />
        </Overlay>
      </View>

      {/* :""
            } */}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    // flex: 1,
    // paddingTop: 10,
    // paddingRight: 10,
    // paddingBottom: 10,
    paddingLeft: 0,
    // backgroundColor: '#fff',
    color: '#424242',
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    // width: '10%',
    // height:"10%"
  },
})

export default Dropdown
