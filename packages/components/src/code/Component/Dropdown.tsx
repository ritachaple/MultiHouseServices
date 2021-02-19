import React, { useState } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Overlay, Divider } from 'react-native-elements'
import DropDownList from './DropDownList'

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

  const onInputPress = () => {
    if (dropdownList.length > 0) {
      setDisplayList(!displayList)
    }
  }

  const onDropdownSelect = (item: any) => {
    setTextField(item.text)
    setDisplayList(!displayList)
    props.selectedItem(item)
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity onPress={onInputPress}>
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
          <DropDownList>
            <FlatList
              style={{ flex: 1, paddingHorizontal: '2%' }}
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
          </DropDownList>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 0,
    // backgroundColor: '#fff',
    color: '#424242',
    // borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: '1%',
  },
})

export default Dropdown
