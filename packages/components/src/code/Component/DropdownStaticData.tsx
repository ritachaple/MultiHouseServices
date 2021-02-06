import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const DropdownStaticData = (props: any) => {
  const { list, style, defaultValue, dropdownName } = props

  const [isDropdownShow, setIsDropdownShow] = useState(false)
  const [DropdownType, setDropdownType] = useState(defaultValue)

  const onDropdownSelect = (item: any) => {
    setDropdownType(item)
    props.setType(item)
    setDropdownShow()
  }

  const setDropdownShow = () => {
    setIsDropdownShow(!isDropdownShow)
  }

  return (
    <View style={{ paddingLeft: '10%' }}>
      <TouchableOpacity
        style={[style, { flexDirection: 'row' }]}
        onPress={() => {
          setDropdownShow()
        }}
      >
        <Text style={styles.dropdownText}>
          {dropdownName}: {DropdownType}
        </Text>
        <Icon
          style={{ paddingVertical: '2%' }}
          name="angle-down"
          size={15}
          color="#909091"
        />
      </TouchableOpacity>
      <View style={{ backgroundColor: 'gray' }}>
        <Modal
          style={{ flex: 1 }}
          animationType="none"
          transparent={isDropdownShow}
          visible={isDropdownShow}
        >
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '50%',
              marginHorizontal: '40%',
              marginTop: '30%',
              marginBottom: 0,
              alignSelf: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                flex: 1,
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <FlatList
                style={{ paddingHorizontal: '2%' }}
                data={list}
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
                      <Text onPress={() => onDropdownSelect(item)}>{item}</Text>
                    </View>
                  )
                }}
                keyExtractor={(index: any) => index.toString()}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

export default DropdownStaticData

const styles = StyleSheet.create({
  dropdownText: {
    fontSize: 12,
    color: '#909091',
    fontWeight: '600',
  },
})
