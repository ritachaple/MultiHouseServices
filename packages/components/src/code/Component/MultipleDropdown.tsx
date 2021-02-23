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
import Icon from 'react-native-vector-icons/FontAwesome'
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

const MultipleDropdown = (props: any) => {
  const { dropdownList } = props
  const [displayList, setDisplayList] = useState(false)
  const [multipleTextField, setMultipleTextField] = useState([] as any)

  const onInputPress = () => {
    if (dropdownList.length > 0) {
      setDisplayList(!displayList)
    }
  }

  //   const onDropdownSelect = (item: any) => {
  //     setMultipleTextField(item.text)
  //     setDisplayList(!displayList)
  //     props.selectedItem(item)
  //   }

  const onDropdownSelect = (item: any) => {
    try {
      const data = [...multipleTextField, item.text]
      // data[item]
      console.log(data)
      setMultipleTextField(data)
      props.selectedItem(item)
    } catch (error) {
      console.error('dropdown errro', error)
    }
  }

  const removeItem = (item: any) => {
    try {
      const data = [...multipleTextField]
      const index = data.indexOf(item.text)
      // console.log("index",index);
      data.splice(index, 1)
      // console.log("after deleted data", data);
      setMultipleTextField(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* <TextInput
          
          placeholder="Select Data"
        //   value={textField}
        value = {
            multipleTextField.slice(0, 1).map((item:any, i:any) => {
                console.log("textInput",item);
                
                return (
                <Text style={{paddingHorizontal:"0.5%"}}>{item}</Text>
                    );
                  })
                }
        /> */}
      <TouchableOpacity style={styles.input} onPress={onInputPress}>
        {multipleTextField.length > 0 ? (
          multipleTextField.slice(0, 2).map((item: any, i: any) => {
            console.log('textInput', item)

            return <Text style={{ paddingHorizontal: '1%' }}>{item}</Text>
          })
        ) : (
          <Text>Select Data</Text>
        )}
      </TouchableOpacity>

      <View style={{ backgroundColor: 'gray' }}>
        <Modal
          style={{ flex: 1 }}
          animationType="none"
          transparent={displayList}
          visible={displayList}
        >
          <DropDownList>
            <Icon
              name="remove"
              onPress={onInputPress}
              style={{ marginLeft: '90%', paddingTop: '1%' }}
              size={12}
              color="#000"
            />
            <FlatList
              style={{ flex: 1, paddingHorizontal: '2%' }}
              data={dropdownList}
              renderItem={({ item, index }) => {
                const isCheck = Boolean(
                  multipleTextField.find((value: any) => {
                    return value === item.text
                  }),
                )
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      backgroundColor: isCheck ? '#3498DB' : '#fff',
                      borderBottomWidth: 0.2,
                      borderBottomColor: 'gray',
                    }}
                  >
                    <View
                      style={{
                        flex: 7,
                        justifyContent: 'flex-start',
                        padding: '1%',
                      }}
                    >
                      <Text onPress={() => onDropdownSelect(item)}>
                        {item.text}
                      </Text>
                    </View>
                    {isCheck ? (
                      <Icon
                        name="remove"
                        onPress={() => removeItem(item)}
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          paddingTop: '1%',
                        }}
                        size={12}
                        color="#000"
                      />
                    ) : (
                      <></>
                    )}
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
    flexDirection: 'row',
  },
})

export default MultipleDropdown
