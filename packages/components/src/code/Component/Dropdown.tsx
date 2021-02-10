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
import { Button, Overlay, Divider } from 'react-native-elements'

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

const Dropdown = (props: any) => {
  const { dropdownList } = props
  const [displayList, setDisplayList] = useState(false)
  const [textField, setTextField] = useState('')
  const [multipleTextField, setMultipleTextField] = useState('')

  const onInputPress = () => {
    setDisplayList(!displayList)
  }

  const onDropdownSelect = (item: any) => {
    setTextField(item.text)
    setDisplayList(!displayList)
    props.selectedItem(item)
  }

  return (
    <View style={{ flex: 1, paddingLeft: '10%' }}>
      <TouchableOpacity onPress={onInputPress}>
        {textField}
        <TextInput
          style={styles.input}
          placeholder="Select Data"
          value={textField}
        />
      </TouchableOpacity>

      <View style={{ backgroundColor: 'gray' }}>
        <Modal
          style={{ flex: 1 }}
          animationType="none"
          transparent={displayList}
          visible={displayList}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '50%',
              marginHorizontal: '40%',
              marginTop: '30%',
              alignSelf: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                // borderRadius: 5,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <FlatList
                style={{ paddingHorizontal: '2%' }}
                data={dropdownList}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        padding: '1%',
                        borderBottomWidth: 0.2,
                        borderBottomColor: 'gray',
                      }}
                    >
                      <Text onPress={() => onDropdownSelect(item)}>
                        {item.text}
                      </Text>
                    </View>
                  )
                }}
                keyExtractor={(index: any) => index.toString()}
              />
            </View>
          </View>
        </Modal>
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
    // borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    // width: '10%',
    // height:"10%"
  },
})

export default Dropdown
